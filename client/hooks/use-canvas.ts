import { SOCKET_EVENTS } from "@/lib/constants";
import { socket } from "@/lib/socket";
import { draw, drawWithDataUrl } from "@/lib/utils";
import { useUserStore } from "@/stores/use-user";
import { useRouter } from "next/navigation";
import React from "react";

export default function useDraw({
  canvasRef,
  containerRef,
  roomId,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  roomId: string;
}) {
  const [canvasLoading, setCanvasLoading] = React.useState(true);

  const user = useUserStore((state) => state.user);
  const router = useRouter();
  React.useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [router, user]);

  React.useEffect(() => {
    const setCanvasDim = () => {
      if (!canvasRef.current || !containerRef.current) {
        return;
      }
      const { width, height } = containerRef.current.getBoundingClientRect();

      canvasRef.current.width = width;

      canvasRef.current.height = height;
    };
    setCanvasDim();
  }, [canvasRef, containerRef]);

  React.useEffect(() => {
    const canvasElement = canvasRef.current;
    const ctx = canvasElement?.getContext("2d");
    if (!ctx || !canvasElement) return;
    socket.emit("client:client-ready", roomId);

    socket.on("server:client-loaded", () => {
      setCanvasLoading(false);
    });

    socket.on("server:get-canvas-state", () => {
      const canvasState = canvasRef.current?.toDataURL();
      if (!canvasState) return;

      socket.emit("client:send-canvas-state", { canvasState, roomId });
    });

    socket.on("server:send-canvas-state", (canvasState) => {
      drawWithDataUrl(canvasState, ctx, canvasElement);
      setCanvasLoading(false);
    });

    socket.on(SOCKET_EVENTS.UPDATE_CANVAS, (drawOptions: any) => {
      if (!ctx) {
        return;
      }
      draw({ ...drawOptions, ctx });
    });

    socket.on("server:undo-canvas", (canvasState) => {
      drawWithDataUrl(canvasState, ctx, canvasElement);
    });

    socket.on("server:redo-canvas", (canvasState) => {
      drawWithDataUrl(canvasState, ctx, canvasElement);
    });

    return () => {
      socket.off("server:get-canvas-state");
      socket.off("server:send-canvas-state");
      socket.off(SOCKET_EVENTS.UPDATE_CANVAS);
      socket.off("server:undo-canvas");
      socket.off("server:redo-canvas");
    };
  }, [canvasRef, roomId]);

  return {
    canvasLoading,
  };
}
