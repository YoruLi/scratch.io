"use client";
import { draw, drawWithDataUrl } from "@/lib/utils";
import { useCanvas } from "@/stores/use-canvas";
import { useUserStore } from "@/stores/use-user";
import { DrawOptions } from "@/types/draw";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import UndoButton from "./undo-button";
import RedoButton from "./redo-button";
import { SOCKET_EVENTS } from "@/lib/constants";
import { socket } from "@/lib/socket";
import { Skeleton } from "./skeleton";
import ClearButton from "./clear-button";

import { Size } from "@/types/size";
import ColorPaletteButton from "./color-palette-button";
import useDraw from "@/hooks/use-draw";

export default function DrawingCanvas() {
  const params = useSearchParams();
  const router = useRouter();
  const { roomId } = useParams();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [canvasLoading, setCanvasLoading] = React.useState(true);

  const strokeW = params.get("strokeWidth") ?? "S";

  const strokeColor = useCanvas((state) => state.strokeColor);
  const user = useUserStore((state) => state.user);

  React.useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [router, user]);

  const onDrawCanvas = React.useCallback(
    ({ ctx, currentPoint, prevPoint }: DrawOptions) => {
      const options = {
        ctx,
        currentPoint,
        prevPoint,
        strokeColor,
        strokeWidth: strokeW as Size,
      };
      draw(options);
      socket.emit("draw", { drawOptions: options, roomId });
    },
    [strokeColor, strokeW, roomId]
  );

  // * pass the function to hook. useDraw hook manage the logic
  const { canvasRef, onStart, clear, undo, redo } = useDraw(onDrawCanvas);

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
  }, [canvasRef]);

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

  const handleOnStart = () => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    socket.emit("client:add-undo-point-canvas", {
      roomId,
      undoPoint: canvasElement.toDataURL(),
    });
    onStart();
  };

  return (
    <>
      <div className="relative flex justify-between w-full [&>div>span]:bg-white ">
        <ColorPaletteButton />
        <div className="space-x-2 *:z-20">
          <UndoButton undo={undo} canvasRef={canvasRef} />
          <RedoButton redo={redo} />
          <ClearButton clear={clear} canvasRef={canvasRef} />
        </div>
      </div>
      <div
        ref={containerRef}
        className="relative flex h-full w-full *:rounded  rounded items-center justify-center"
      >
        <canvas
          id="canvas"
          ref={canvasRef}
          onMouseDown={handleOnStart}
          onTouchStart={handleOnStart}
          className="touch-none relative  bg-white  shadow-lg shadow-[#b9b5ba2d] "
          width={0}
          height={0}
          // style={{ width: "100%", height: "100%" }}
        />
        {canvasLoading && <Skeleton className="absolute size-full" />}
      </div>
    </>
  );
}
