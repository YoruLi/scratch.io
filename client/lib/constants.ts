export const SOCKET_EVENTS = {
  CREATE_ROOM: "create-room",
  ROOM_JOINED: "room-joined",
  JOIN_ROOM: "join-room",
  NEW_MEMBERS: "new-members",
  DRAW: "draw",
  UPDATE_CANVAS: "update-canvas",
} as const;

export const COLORS_NAME = {
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF",
  yellow: "#FFFF00",
  brightBlue: "#00FFFF",
  white: "#FFFFFF",
  black: "#000000",
  orange: "#FFA500",
  purple: "#800080",
  pink: "#FFC0CB",
  gray: "#808080",
  brown: "#8B4513",
} as const;

export const SIZE_VALUES = {
  S: 2,
  M: 4,
  L: 8,
  XL: 16,
  XXL: 32,
} as const;

export const SocketEvents = Object.values(SOCKET_EVENTS);
