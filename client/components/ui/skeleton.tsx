import { cn } from "@/lib/utils";
import React from "react";

export function Skeleton({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("animate-pulse bg-muted-foreground ", className)}></div>
  );
}
