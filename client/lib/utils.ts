import { DrawOptions, StrokeColor } from "@/types/draw";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SIZE_VALUES } from "./constants";
import { Size } from "@/types/size";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const getStrokeWidth = (size: Size) => SIZE_VALUES[size] || 2;

interface DrawCanvas extends DrawOptions {
  strokeColor: StrokeColor;
  strokeWidth: Size;
}
export function draw({
  ctx,
  currentPoint,
  prevPoint,
  strokeColor,
  strokeWidth,
}: DrawCanvas) {
  const startPoint = prevPoint ?? currentPoint;

  ctx.strokeStyle = hexToRgba(strokeColor.color, strokeColor.opacity);
  ctx.lineWidth = getStrokeWidth(strokeWidth);
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(startPoint.x, startPoint.y);
  ctx.lineTo(currentPoint.x, currentPoint.y);

  ctx.stroke();
  ctx.closePath();
}

export function drawWithDataUrl(
  canvasDataUrl: string,
  ctx: CanvasRenderingContext2D,
  canvasElement: HTMLCanvasElement
) {
  const img = new Image();

  img.src = canvasDataUrl;
  img.onload = () => {
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    ctx.drawImage(img, 0, 0);
  };
}

export const hexToRgba = (hex: string, opacity: number) => {
  hex = hex.replace(/^#/, "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
