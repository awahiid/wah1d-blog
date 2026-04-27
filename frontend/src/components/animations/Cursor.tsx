"use client";

import { useMousePosition } from "@/utils/useMousePosition";
import { cn } from "@/utils/cn";
import React from "react";

type CursorProps = {
  children?: React.ReactNode;
  className?: string;
};

export default function Cursor({ className, children }: CursorProps) {
  const { x, y } = useMousePosition();

  if (x === 0 && y === 0) return null;

  return (
    <div
      className={cn("absolute rounded-full bg-black w-9 h-9", className)}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }}
    >
      {children}
    </div>
  );
}
