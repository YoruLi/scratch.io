"use client";
import * as React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";

import { Input } from "./ui/input";
import useMediaQuery from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import CopyButton from "./copy-button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { socket } from "@/lib/socket";
import { SOCKET_EVENTS } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/use-user";
import { useMembers } from "@/stores/use-members";

type Props = {
  roomId: string;
} & React.HTMLProps<HTMLElement>;

export default function CreateRoom({ roomId, className }: Props) {
  const [open, setOpen] = React.useState<boolean>(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="link" className={className}>
            Create room
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]  border-none bg-main">
          <DialogHeader>
            <DialogTitle className="text-scratch">Create room</DialogTitle>
            <DialogDescription>
              Share the room-code and draw on the same canvas with your friends in real-time.
            </DialogDescription>
          </DialogHeader>
          <CreateRoomForm roomId={roomId} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="link" className={className}>
            Create room
          </Button>
        </DrawerTrigger>
        <DrawerContent className="bg-main  border-none p-4">
          <DrawerHeader className="text-left px-0 py-5">
            <DrawerTitle className="text-[#3ecb8f]">Create room</DrawerTitle>
            <DrawerDescription>
              Share the room-code and draw on the same canvas with your friends in real-time.
            </DrawerDescription>
          </DrawerHeader>
          <CreateRoomForm roomId={roomId} />
        </DrawerContent>
      </Drawer>
    </>
  );
}

function CreateRoomForm({ roomId }: { roomId: string }) {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const setMembers = useMembers((state) => state.setMembers);
  const createRoomSchema = z.object({
    username: z
      .string()
      .min(2, "Username must contain at least 2 characters")
      .max(50, "Username must not contain more than 50 characters"),
  });
  type CreatRoomForm = z.infer<typeof createRoomSchema>;

  const onSubmit = ({ username }: CreatRoomForm) => {
    socket.emit(SOCKET_EVENTS.CREATE_ROOM, {
      roomId,
      username,
    });
  };

  React.useEffect(() => {
    socket.on(SOCKET_EVENTS.ROOM_JOINED, ({ user, roomId, members }) => {
      setUser(user);
      setMembers(members);
      router.replace(`/${roomId}`);
    });

    function handleErrorMessage({ message }: { message: string }) {
      console.log("dasdsda");
    }

    socket.on("room-not-found", handleErrorMessage);

    socket.on("invalid-data", handleErrorMessage);

    return () => {
      socket.off(SOCKET_EVENTS.ROOM_JOINED);
      socket.off("room-not-found");
      socket.off("invalid-data", handleErrorMessage);
    };
  }, [router, setUser, setMembers]);
  const form = useForm<CreatRoomForm>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      username: "",
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"grid items-start gap-4"}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#3ecb8f] ">Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="user123"
                  {...field}
                  className="bg-transparent !ring-0 !ring-offset-0 outline-none text-white border focus:border-white/50 border-white/20"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div>
          <p className="mb-2 text-sm font-medium text-[#3ecb8f] ">Room ID</p>

          <div className="flex h-10 w-full items-center justify-between rounded-md border  border-white/20 bg-transparent px-3 py-2 text-sm text-muted-foreground">
            <span>{roomId}</span>
            <CopyButton value={roomId} />
          </div>
        </div>
        <Button
          type="submit"
          variant={"link"}
          className="bg-transparent mx-auto text-scratch hover:shadow-[#3ecb8e6d] transition-shadow hover:shadow-md border border-[#3ecb8e90] max-w-[16em] lg:max-w-xs font-bold rounded-md"
        >
          Create room
        </Button>
      </form>
    </Form>
  );
}
