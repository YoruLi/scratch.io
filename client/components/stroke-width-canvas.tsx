"use client";

import { SIZE_VALUES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import React from "react";

export enum SizeTags {
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL",
}

const strokeWidthSizes = [
  { tag: SizeTags.S, label: "Pequeño", size: SIZE_VALUES.S },
  { tag: SizeTags.M, label: "Mediano", size: SIZE_VALUES.M },
  { tag: SizeTags.L, label: "Grande", size: SIZE_VALUES.L },
  { tag: SizeTags.XL, label: "Muy Grande", size: SIZE_VALUES.XL },
  { tag: SizeTags.XXL, label: "Demasiado grande", size: SIZE_VALUES.XXL },
];

export default function StrokeWidthCanvas() {
  const { replace } = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const strokeW = params.get("strokeWidth") ?? "S";

  return (
    <div className="inline-flex bg-transparent px-4 py-1 gap-4 rounded-sm  w-full *:mx-auto">
      {strokeWidthSizes.map(({ label, size, tag }) => {
        return (
          <button
            key={tag}
            onClick={() => {
              const searchParams = new URLSearchParams(params);
              searchParams.set("strokeWidth", tag);
              replace(`${pathname}?strokeWidth=${tag}`);
            }}
            className={cn(
              " rounded-full size-8 border border-muted-foreground grid place-items-center",
              {
                "border-muted border-2 *:bg-muted": strokeW === tag,
              }
            )}
          >
            <div
              className="rounded-full block bg-muted-foreground"
              style={{
                width: size,
                height: size,
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
