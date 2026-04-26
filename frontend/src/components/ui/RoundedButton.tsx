"use client";

import { HTMLMotionProps } from "framer-motion";
import React from "react";
import { cn } from "@/utils/cn";

type ButtonProps = HTMLMotionProps<"button"> &
  React.HTMLProps<HTMLButtonElement> & {
    children?: React.ReactNode;
    onClick?: () => void;
    className?: string;
  };

export default function Button({
  children = "Button",
  onClick = () => {},
  className,
}: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-full active:scale-95 duration-75 w-fit h-12 bg-black text-white flex flex-nowrap text-nowrap justify-center items-center gap-9 font-normal cursor-pointer p-4 select-none",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
