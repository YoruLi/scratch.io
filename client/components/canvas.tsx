"use client";
import { draw } from "@/lib/utils";

import { DrawOptions } from "@/types/draw";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import UndoButton from "./undo-button";
import RedoButton from "./redo-button";

import { socket } from "@/lib/socket";
import { Skeleton } from "./ui/skeleton";
import ClearButton from "./clear-button";

import { Size } from "@/types/size";
import ColorPaletteButton from "./color-palette-button";
import useDraw from "@/hooks/use-draw";
import { useCanvasStore } from "@/stores/use-canvas";
import useCanvas from "@/hooks/use-canvas";
import Members from "./members";

export default function DrawingCanvas() {
  const params = useSearchParams();

  const { roomId } = useParams();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const strokeW = params.get("strokeWidth") ?? "S";
  const strokeColor = useCanvasStore((state) => state.strokeColor);

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

  const { canvasRef, onStart, clear, undo, redo } = useDraw(onDrawCanvas);

  const { canvasLoading } = useCanvas({ canvasRef, containerRef, roomId: roomId as string });

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
        <div className="space-x-2">
          <ColorPaletteButton />
          <Members />
        </div>
        <div className="space-x-2 *:z-20">
          <UndoButton undo={undo} canvasRef={canvasRef} />
          <RedoButton redo={redo} />
          <ClearButton clear={clear} canvasRef={canvasRef} />M
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
