import { useCanvasStore } from "@/stores/use-canvas";
import React from "react";

export default function ColorOpacity() {
  const setOpacity = useCanvasStore((state) => state.setStrokeColorOpacity);
  const strokeColor = useCanvasStore((state) => state.strokeColor);
  return (
    <>
      <input
        type="range"
        min="0.1"
        max="1"
        step="0.1"
        value={strokeColor.opacity}
        onChange={(e) => {
          setOpacity(Number(e.target.value));
        }}
        className="w-full bg-transparent cursor-pointer appearance-none  disabled:opacity-50 disabled:pointer-events-none focus:outline-none
"
        id="basic-range-slider-usage"
      />
    </>
  );
}
