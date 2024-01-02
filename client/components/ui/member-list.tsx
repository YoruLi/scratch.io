"use client";
import { SOCKET_EVENTS } from "@/lib/constants";
import { socket } from "@/lib/socket";
import { useMembers } from "@/stores/use-members";
import React from "react";
import Circle from "./circle";
import { COLORS } from "./color-palette";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/stores/use-user";
import { toast } from "sonner";

export function MemberList() {
  const [members, setMembers] = useMembers((state) => [
    state.members,
    state.setMembers,
  ]);
  const userStore = useUserStore((state) => state.user);

  React.useEffect(() => {
    socket.on(SOCKET_EVENTS.NEW_MEMBERS, (members) => {
      setMembers(members);
    });

    socket.on("server:send-notification", ({ title, message }) => {
      toast.message(title, {
        description: message,
      });
    });

    return () => {
      socket.off(SOCKET_EVENTS.NEW_MEMBERS);
      socket.off("server:send-notification");
    };
  }, [setMembers]);
  return (
    <div className="flex flex-col self-start justify-start items-start gap-3">
      {members.map((user, index) => {
        return (
          <div className="flex gap-2" key={user.id}>
            <Circle
              key={user.id}
              shadow={user.id === userStore?.id}
              currentColor={COLORS[index]}
              size="2rem"
              className={cn(
                "grid place-items-center my-0 !bg-transparent *:text-white text-sm  border-2 border-muted-foreground"
              )}
            >
              <span className="uppercase">{user.username.split("")[0]}</span>
            </Circle>
            <span className="text-white self-center mx-2">{user.username}</span>
          </div>
        );
      })}
    </div>
  );
}
