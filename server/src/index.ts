import express from "express";
import { Server, type Socket } from "socket.io";
import http from "http";
import cors from "cors";
import z from "zod";
import { validatedJoinRoom } from "./shared/validation";
import { JoinRoomData } from "./shared/types";
import { SOCKET_EVENTS } from "./shared/constants";
import {
  addRedoPoints,
  addUndoPoint,
  addUser,
  deleteLastUndoPoint,
  deleteRedoPoint,
  getLastRedoPoint,
  getLastUndoPoint,
  getMembers,
  getUser,
  removeUserFromRoom,
} from "./shared/data";
const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server);

const validatedJoinRoomData = (socket: Socket, joinRoomData: JoinRoomData) => {
  try {
    return validatedJoinRoom.parse(joinRoomData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      socket.emit("invalid-data", {
        message: "The entities you provided are not valid",
        joinRoomData,
      });
    }
  }
};

function joinRoom(socket: Socket, roomId: string, username: string) {
  socket.join(roomId);

  const user = {
    id: socket.id,
    username: username,
  };

  addUser({ ...user, roomId });

  const members = getMembers(roomId);

  socket.emit(SOCKET_EVENTS.ROOM_JOINED, { user, roomId, members });
  socket.to(roomId).emit(SOCKET_EVENTS.NEW_MEMBERS, members);
  socket.to(roomId).emit("server:send-notification", {
    title: "New member",
    message: `${user.username}, has arrived`,
  });
}

function isRoomCreated(roomId: string) {
  const rooms = [...io.sockets.adapter.rooms];

  return rooms?.some((room) => room[0] === roomId);
}

function leaveRoom(socket: Socket) {
  const user = getUser(socket.id);

  if (!user) return;

  const { username, roomId } = user;
  removeUserFromRoom(socket.id);

  const members = getMembers(roomId);
  socket.to(roomId).emit(SOCKET_EVENTS.NEW_MEMBERS, members);
  socket.to(roomId).emit("server:send-notification", {
    title: "Member decided to departure!",
    message: `${user.username}, left the room`,
  });
}

io.on("connection", (socket: Socket) => {
  socket.on(SOCKET_EVENTS.CREATE_ROOM, (joinRoomData: JoinRoomData) => {
    const validatedData = validatedJoinRoomData(socket, joinRoomData);

    if (!validatedData) return;
    const { roomId, username } = validatedData;

    joinRoom(socket, roomId, username);
  });

  socket.on(SOCKET_EVENTS.JOIN_ROOM, (joinRoomData: JoinRoomData) => {
    const validatedData = validatedJoinRoomData(socket, joinRoomData);

    if (!validatedData) return;

    const { roomId, username } = validatedData;

    if (isRoomCreated(roomId)) {
      return joinRoom(socket, roomId, username);
    }

    socket.emit("room-not-found", {
      message: "Oops! The Room ID doesn't exist or hasn't been created yet.",
    });
  });

  socket.on("client:client-ready", (roomId: string) => {
    const members = getMembers(roomId);

    if (members.length === 1) return socket.emit("server:client-loaded");

    if (!members[0]) return;

    socket.to(members[0].id).emit("server:get-canvas-state");
  });

  socket.on("client:send-canvas-state", ({ canvasState, roomId }) => {
    const members = getMembers(roomId);

    const lastMemberJoined = members[members.length - 1];
    if (!lastMemberJoined) return;
    socket
      .to(lastMemberJoined.id)
      .emit("server:send-canvas-state", canvasState);
  });

  socket.on(SOCKET_EVENTS.DRAW, ({ drawOptions, roomId }) => {
    socket.to(roomId).emit(SOCKET_EVENTS.UPDATE_CANVAS, drawOptions);
  });

  socket.on("client:clear", (roomId: string) => {
    socket.to(roomId).emit("server:clear");
  });

  socket.on("client:undo-canvas", ({ canvasState, roomId }) => {
    socket.to(roomId).emit("server:undo-canvas", canvasState);
  });

  socket.on("client:redo-canvas", ({ canvasState, roomId }) => {
    socket.to(roomId).emit("server:redo-canvas", canvasState);
  });

  socket.on("client:get-last-undo-point-canvas", (roomId: string) => {
    const lastUndoPoint = getLastUndoPoint(roomId);

    socket.emit("server:last-undo-point-canvas", lastUndoPoint);
  });

  socket.on("client:get-last-redo-point-canvas", (roomId: string) => {
    const lastRedoPoint = getLastRedoPoint(roomId);

    socket.emit("server:last-redo-point-canvas", lastRedoPoint);
  });

  socket.on(
    "client:add-undo-point-canvas",
    ({ roomId, undoPoint }: { roomId: string; undoPoint: string }) => {
      addUndoPoint(roomId, undoPoint);
    }
  );

  socket.on(
    "client:add-redo-point-canvas",
    ({ roomId, redoPoint }: { roomId: string; redoPoint: string }) => {
      addRedoPoints(roomId, redoPoint);
    }
  );

  socket.on("client:delete-last-undo-point-canvas", (roomId: string) => {
    deleteLastUndoPoint(roomId);
  });

  socket.on("client:delete-last-redo-point-canvas", (roomId: string) => {
    deleteRedoPoint(roomId);
  });

  socket.on("disconnect", () => {
    socket.emit("disconnected");
    leaveRoom(socket);
  });
});

const PORT = process.env.NEXT_PUBLIC_URL || 3001;
server.listen(PORT, () => console.log("Server is running on port", PORT));
