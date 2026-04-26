"use client";

import React from "react";
import { cn } from "@/utils/cn";

type ButtonProps = {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function LightButton({
  children = "Button",
  className,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <span
      className={cn(
        "active:scale-95 duration-75 select-none transition-transform w-36 h-12 bg-white text-black flex justify-center items-center gap-9 font-normal cursor-pointer hover:bg-neutral",
        className,
      )}
      onPointerCancelCapture={(e) =>
        e.currentTarget.dispatchEvent(
          new MouseEvent("mouseleave", { bubbles: true }),
        )
      }
      onClick={onClick}
      {...props}
    >
      {children}
    </span>
  );
}
