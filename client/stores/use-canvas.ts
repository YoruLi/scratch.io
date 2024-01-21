import { Color, StrokeColor } from "@/types/draw";
import { create } from "zustand";

type CanvasState = {
  // strokeColor: Color | string;
  strokeColor: StrokeColor;
  strokeWidth: string;
  setStrokeColor: (color: Color | string) => void;
  setStrokeColorOpacity: (opacity: number) => void;
};

export const useCanvasStore = create<CanvasState>((set) => ({
  strokeColor: {
    color: "#000000",
    opacity: 1,
  },
  strokeWidth: "1",
  setStrokeColor: (newColor) =>
    set((state) => ({
      strokeColor: {
        ...state.strokeColor,
        color: newColor,
      },
    })),
  setStrokeColorOpacity: (newOpacity) =>
    set((state) => ({
      strokeColor: {
        ...state.strokeColor,
        opacity: newOpacity,
      },
    })),
}));
