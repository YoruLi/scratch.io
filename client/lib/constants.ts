export const SOCKET_EVENTS = {
  CREATE_ROOM: "create-room",
  ROOM_JOINED: "room-joined",
  JOIN_ROOM: "join-room",
  NEW_MEMBERS: "new-members",
  DRAW: "draw",
  UPDATE_CANVAS: "update-canvas",
} as const;

export const SIZE_VALUES = {
  S: 2,
  M: 4,
  L: 8,
  XL: 16,
  XXL: 32,
} as const;

export const SocketEvents = Object.values(SOCKET_EVENTS);
