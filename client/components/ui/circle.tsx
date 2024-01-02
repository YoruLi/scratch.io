import { cn } from "@/lib/utils";
import React from "react";

type ComponentProps = {
  size?: string;
  currentColor?: string;
  shadow?: boolean;
};

const Circle = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & ComponentProps
>((props, ref) => {
  const { size, currentColor, shadow, className, children, ...rest } = props;
  return (
    <div
      ref={ref}
      className={cn(`rounded-full block  mx-auto my-4 shadow-lg`, className)}
      style={{
        backgroundColor: currentColor,
        borderColor: currentColor,

        boxShadow: shadow ? `0px 0px 20px ${currentColor}` : undefined,
        width: size ?? "80px",
        height: size ?? "80px",
      }}
      {...rest}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export default Circle;
