import { socket } from "@/lib/socket";
import { draw, drawWithDataUrl } from "@/lib/utils";
import React from "react";

type Point = {
  x: number;
  y: number;
};

interface DrawProps {
  ctx: CanvasRenderingContext2D;
  currentPoint: Point;
  prevPoint: Point | undefined;
}

export default function useDraw(onDrawCanvas: (props: DrawProps) => void) {
  const [mouseDown, setMouseDown] = React.useState(false);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const prevPoint = React.useRef<Point>();

  const onStart = React.useCallback(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    setMouseDown(true);
  }, []);

  const onEnd = () => {
    setMouseDown(false);
    prevPoint.current = undefined;
  };

  React.useEffect(() => {
    const computePointInCanvas = (clientX: number, clientY: number) => {
      const canvasEl = canvasRef.current;
      if (!canvasEl) return;

      const rect = canvasEl.getBoundingClientRect();

      const x = clientX - rect.left;

      const y = clientY - rect.top;
      return { x, y };
    };

    const move = (e: MouseEvent | TouchEvent) => {
      if (!mouseDown) {
        return;
      }
      const canvasEl = canvasRef.current;

      const ctx = canvasEl?.getContext("2d");
      let currentPoint: { x: number; y: number } | undefined;

      if (e instanceof MouseEvent) {
        currentPoint = computePointInCanvas(e.clientX, e.clientY);
      }
      if (!ctx || !currentPoint) {
        return;
      }

      onDrawCanvas({ ctx, currentPoint, prevPoint: prevPoint.current });
      prevPoint.current = currentPoint;
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchmove", move);
    window.addEventListener("touchend", onEnd);

    return () => {
      window.removeEventListener("mousemove", move);
      window.addEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", onEnd);
    };
  }, [mouseDown, onDrawCanvas]);

  const clear = () => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const ctx = canvasElement?.getContext("2d");

    ctx?.clearRect(0, 0, canvasElement?.width, canvasElement?.height);
  };

  const undo = (undoPoint: string) => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const ctx = canvasElement.getContext("2d");
    if (!ctx) return;

    drawWithDataUrl(undoPoint, ctx, canvasElement);
  };

  const redo = (redoPoint: string) => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const ctx = canvasElement.getContext("2d");
    if (!ctx) return;

    drawWithDataUrl(redoPoint, ctx, canvasElement);
  };

  return { canvasRef, onStart, onEnd, clear, undo, redo };
}
