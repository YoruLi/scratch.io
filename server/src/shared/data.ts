import { User } from "./types";

let users: User[] = [];

const addUser = (user: User) => {
  users.push(user);
};

const getMembers = (roomId: string) => {
  return users.filter((user) => user.roomId === roomId);
};

const getUser = (userId: string) => {
  const user = users.find((user) => user.id === userId);

  return user;
};

const removeUserFromRoom = (userId) => {
  users = users.filter((user) => user.id !== userId);
};

const undoPoints = new Map<string, string[]>();
const redoPoints = new Map<string, string[]>();

const addUndoPoint = (roomId: string, undoPoint: string) => {
  const room = undoPoints.get(roomId);

  room ? room.push(undoPoint) : undoPoints.set(roomId, [undoPoint]);
};

const getLastUndoPoint = (roomId: string) => {
  const room = undoPoints.get(roomId);

  if (!room || room?.length === 0) return;
  const lastPoint = room[room?.length - 1];

  return lastPoint;
};

const deleteLastUndoPoint = (roomId: string) => {
  const room = undoPoints.get(roomId);

  if (room && Array.isArray(room) && room.length > 0) {
    room.pop();
  }
};

const addRedoPoints = (roomId: string, redoPoint: string) => {
  const redo = redoPoints.get(roomId);

  redo ? redo.push(redoPoint) : redoPoints.set(roomId, [redoPoint]);
};

const getLastRedoPoint = (roomId: string) => {
  const room = redoPoints.get(roomId);

  if (!room || room?.length === 0) return;
  const lastPoint = room[room?.length - 1];

  return lastPoint;
};

const deleteRedoPoint = (roomId: string) => {
  const room = redoPoints.get(roomId);

  if (room && Array.isArray(room) && room.length > 0) {
    return room.pop();
  }
};

export {
  addUser,
  getMembers,
  getUser,
  removeUserFromRoom,
  addUndoPoint,
  getLastUndoPoint,
  deleteLastUndoPoint,
  addRedoPoints,
  deleteRedoPoint,
  getLastRedoPoint,
};
