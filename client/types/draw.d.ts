import { COLORS } from "@/components/color-palette";

type Point = {
  x: number;
  y: number;
};

interface DrawOptions {
  ctx: CanvasRenderingContext2D;
  currentPoint: Point;
  prevPoint: Point | undefined;
}

type StrokeColor = {
  color: Color | string;
  opacity: number;
};
type Color = (typeof COLORS)[number];
