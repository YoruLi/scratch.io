import { cn } from "@/lib/utils";
import React from "react";

interface BadgeProps extends React.HTMLProps<HTMLSpanElement> {}
const Badge: React.FC<BadgeProps> = ({ children, ...props }) => {
  const { className, onClick } = props;
  return (
    <span
      className={cn(
        "hover:bg-muted cursor-pointer border p-1 rounded inline-flex justify-center items-center",
        className
      )}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

Badge.displayName = "Badge";

export default Badge;
