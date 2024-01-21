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

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { socket } from "@/lib/socket";
import { SOCKET_EVENTS } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/use-user";
import { useMembers } from "@/stores/use-members";
import { toast } from "sonner";

type Props = React.HTMLProps<HTMLElement>;

export default function JoinRoomButton({ className }: Props) {
  const [open, setOpen] = React.useState<boolean>(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="link" className={className}>
            Join room
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]  border-none bg-main">
          <DialogHeader>
            <DialogTitle className="text-scratch"> Join room</DialogTitle>
            <DialogDescription>
              Share the room-code and draw on the same canvas with your friends in real-time.
            </DialogDescription>
          </DialogHeader>
          <JoinRoomForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="link" className={className}>
            Join room
          </Button>
        </DrawerTrigger>
        <DrawerContent className="bg-main  border-none p-4">
          <DrawerHeader className="text-left px-0 py-5">
            <DrawerTitle className="text-scratch"> Join room</DrawerTitle>
            <DrawerDescription>
              Share the room-code and draw on the same canvas with your friends in real-time.
            </DrawerDescription>
          </DrawerHeader>
          <JoinRoomForm />
        </DrawerContent>
      </Drawer>
    </>
  );
}

function JoinRoomForm() {
  const setUser = useUserStore((state) => state.setUser);
  const setMembers = useMembers((state) => state.setMembers);
  const router = useRouter();
  const createRoomSchema = z.object({
    username: z
      .string()
      .min(2, "Username must contain at least 2 characters")
      .max(50, "Username must not contain more than 50 characters"),
    roomId: z.string().min(1, "El room Id es required"),
  });
  type CreatRoomForm = z.infer<typeof createRoomSchema>;

  const onSubmit = ({ username, roomId }: CreatRoomForm) => {
    socket.emit(SOCKET_EVENTS.JOIN_ROOM, {
      roomId,
      username,
    });
  };

  React.useEffect(() => {
    socket.on("room-not-found", ({ message }: { message: string }) => {
      toast.message(message);
    });

    socket.on(SOCKET_EVENTS.ROOM_JOINED, ({ user, roomId, members }) => {
      setUser(user);
      setMembers(members);
      router.replace(`/${roomId}`);
    });

    return () => {
      socket.off(SOCKET_EVENTS.ROOM_JOINED);
      socket.off("room-not-found");
    };
  }, [router, setUser, setMembers]);

  const form = useForm<CreatRoomForm>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      username: "",
      roomId: "",
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={"grid items-start gap-4"}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel className="text-scratch ">Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="filpo123"
                    {...field}
                    className="bg-transparent !ring-0 !ring-offset-0 outline-none border border-white/20 focus:border-white/50 text-white"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="roomId"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel className="text-scratch ">Room ID</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Room id"
                    {...field}
                    className="bg-transparent !ring-0 !ring-offset-0 outline-none border border-white/20 focus:border-white/50 text-white"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            </>
          )}
        />

        <Button
          type="submit"
          variant={"link"}
          className="bg-transparent  mx-auto  text-scratch hover:shadow-[#3ecb8e6d] transition-shadow hover:shadow-md border border-[#3ecb8e90]  max-w-[16em] lg:max-w-xs font-bold rounded-md"
        >
          Join room
        </Button>
      </form>
    </Form>
  );
}
