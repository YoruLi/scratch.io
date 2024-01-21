"use client";
import React from "react";
import { cn, hexToRgba } from "@/lib/utils";
import Svg from "./ui/svg";
import { upArrow } from "@/lib/svgs";
import { useCanvasStore } from "@/stores/use-canvas";
import { COLORS_NAME } from "@/lib/constants";

export const COLORS = Object.values(COLORS_NAME);

const ALL_COLORS = Object.values(COLORS);

// Initially visible colors
const INITIAL_VISIBLE_COLORS = COLORS.slice(0, 6);

export default function ColorPalette() {
  const [strokeColor, setStrokeColor] = useCanvasStore((state) => [
    state.strokeColor,
    state.setStrokeColor,
  ]);

  const [showAllColors, setShowAllColors] = React.useState(false);
  const [colors, setColors] = React.useState(INITIAL_VISIBLE_COLORS);
  const handleToggleColors = () => {
    setShowAllColors(!showAllColors);
    setColors(showAllColors ? INITIAL_VISIBLE_COLORS : ALL_COLORS);
  };

  return (
    <>
      <div className="w-full xl:relative ">
        <div className="w-full">
          <div
            className="w-full py-4 rounded mt-2 mb-2"
            style={{
              backgroundColor: hexToRgba(strokeColor.color, strokeColor.opacity),
            }}
          />
        </div>
        <div
          className="grid bg-transparent lg:py-4 py-2 rounded  shadow-muted lg:shadow transition-all "
          style={{
            gridTemplateColumns: "repeat(6,1fr)",
            gap: "8px",
            gridGap: "8px",

            height: showAllColors ? "auto" : "50px",
            overflow: "hidden",
          }}
        >
          {ALL_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => {
                setStrokeColor(color);
              }}
              className={cn(`rounded-full aspect-square size-8 transition-all visible `, {
                "outline-2 outline outline-offset-[2px] outline-muted-foreground ":
                  color === strokeColor.color,
              })}
              style={{
                backgroundColor: `${color}`,
                boxShadow:
                  "inset 0 0 0 2px rgba(255, 255, 255, 0.12), 0 0 0.12em rgba(0, 0, 0, 0.12)",
                opacity: colors.includes(color) ? 1 : 0,
                visibility: colors.includes(color) ? "visible" : "hidden",
                transition: "opacity 0.3s ease-in-out",
              }}
            />
          ))}
        </div>

        <button
          onClick={handleToggleColors}
          className="inline-grid text-center w-full [grid-column-start:1] [grid-column-end:7] text-sm text-slate-700 py-2"
        >
          {showAllColors ? (
            <div className=" w-full rounded outline outline-1 py-1 grid place-items-center *:transition-all *:hover:fill-white hover:bg-slate-700">
              <Svg path={upArrow.path} className="fill-muted-foreground size-5 transition-all" />
            </div>
          ) : (
            <div className=" w-full rounded outline outline-1 py-1 grid place-items-center *:transition-all *:hover:fill-white hover:bg-slate-700">
              <Svg
                path={upArrow.path}
                className="fill-muted-foreground  size-5 transition-all rotate-180"
              />
            </div>
          )}
        </button>
        <label
          htmlFor="picker"
          className={` py-2 mt-4 flex-grow cursor-pointer relative hover:text-white outline outline-1 text-muted-foreground  hover:bg-slate-700 outline-slate-700 text-xs  text-center bg-transparent rounded grid place-content-center`}
        >
          Choose a color
          <input
            id="picker"
            type="color"
            onChange={(event) => setStrokeColor(event.target.value)}
            className=" absolute opacity-0 cursor-pointer"
          />
        </label>
      </div>
    </>
  );
}
