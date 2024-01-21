import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Palette } from "lucide-react";
import ColorPalette from "./color-palette";
import StrokeWidthCanvas from "./stroke-width-canvas";
import ColorOpacity from "./color-opacity";

export default function ColorPaletteButton() {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Open right panel" className="z-20">
            <Palette size={20} />
          </Button>
        </SheetTrigger>

        <SheetContent className="lg:w-[20rem] w-[80%] p-0 bg-slate-800 border-none !text-muted">
          <div className=" h-full space-y-4 pt-10 w-[17rem] mx-auto ">
            <div className="bg-slate-800 p-3">
              <span className="text-muted text-xs">Color palette</span>
              <ColorPalette />
            </div>
            <div className="bg-slate-800 p-3">
              <span className="text-muted text-xs">Stroke width</span>
              <StrokeWidthCanvas />
            </div>
            <div className="bg-slate-800 p-3">
              <span className="text-muted text-xs">Opacity</span>
              <ColorOpacity />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
