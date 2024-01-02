import { cn } from "@/lib/utils";
import React from "react";

interface SvgProps {
  path: string;
  viewBox?: string;
}

const Svg = React.forwardRef<
  React.ReactSVGElement,
  React.ComponentPropsWithoutRef<"svg"> & SvgProps
>((props, ref) => {
  const { path, viewBox = "0 0 24 24", className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-8", className)}
      viewBox={viewBox}
    >
      <path d={path}></path>
    </svg>
  );
});

Svg.displayName = "Svg";

export default Svg;
