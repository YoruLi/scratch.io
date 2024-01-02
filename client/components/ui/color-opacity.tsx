import { useCanvas } from "@/stores/use-canvas";
import React from "react";

export default function ColorOpacity() {
  const setOpacity = useCanvas((state) => state.setStrokeColorOpacity);
  const strokeColor = useCanvas((state) => state.strokeColor);
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
[&::-webkit-slider-thumb]:w-2.5
[&::-webkit-slider-thumb]:h-2.5
[&::-webkit-slider-thumb]:-mt-0.5
[&::-webkit-slider-thumb]:appearance-none
[&::-webkit-slider-thumb]:bg-foreground
[&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(2,7,19)]
[&::-webkit-slider-thumb]:rounded-full
[&::-webkit-slider-thumb]:transition-all
[&::-webkit-slider-thumb]:duration-150
[&::-webkit-slider-thumb]:ease-in-out
[&::-webkit-slider-thumb]:dark:bg-slate-700

[&::-moz-range-thumb]:w-2.5
[&::-moz-range-thumb]:h-2.5
[&::-moz-range-thumb]:appearance-none
[&::-moz-range-thumb]:bg-white/50
[&::-moz-range-thumb]:border-4
[&::-moz-range-thumb]:border-transparent
[&::-moz-range-thumb]:rounded-full
[&::-moz-range-thumb]:transition-all
[&::-moz-range-thumb]:duration-150
[&::-moz-range-thumb]:ease-in-out

[&::-webkit-slider-runnable-track]:w-full
[&::-webkit-slider-runnable-track]:h-2
[&::-webkit-slider-runnable-track]:bg-gray-100/30
[&::-webkit-slider-runnable-track]:rounded-full
[&::-webkit-slider-runnable-track]:dark:bg-gray-700
[&::-moz-range-track]:w-full
[&::-moz-range-track]:h-2
[&::-moz-range-track]:bg-gray-100
[&::-moz-range-track]:rounded-full"
        id="basic-range-slider-usage"
      />
    </>
  );
}
