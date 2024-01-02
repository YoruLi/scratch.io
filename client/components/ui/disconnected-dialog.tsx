"use client";
import { socket } from "@/lib/socket";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

export default function DisconnectedDialog() {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    socket.on("disconnected", () => {
      triggerRef.current?.click();
    });

    return () => {
      socket.off("disconnected");
    };
  }, []);
  return (
    <Dialog>
      <DialogTrigger ref={triggerRef} className="hidden"></DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>You were disconnected!</DialogTitle>
          <DialogDescription>
            You were out of the browser for a while and lost the connection.
            Please create a new room or join a room to draw again.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
