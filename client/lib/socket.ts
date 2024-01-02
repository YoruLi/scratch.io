import { io } from "socket.io-client";

const server = process.env.NEXT_PUBLIC_URL as string;

export const socket = io(server, { transports: ["websocket"] });
