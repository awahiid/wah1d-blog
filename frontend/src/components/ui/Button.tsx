"use client";

import { HTMLMotionProps } from "framer-motion";
import React, { useState } from "react";
import { cn } from "@/utils/cn";
import Cursor from "@/components/animations/Cursor";

type ButtonProps = HTMLMotionProps<"button"> &
  React.HTMLProps<HTMLButtonElement> & {
    children?: React.ReactNode;
    onClick?: () => void;
    cursor?: boolean;
    className?: string;
  };

export default function Button({
  children = "Button",
  onClick = () => {},
  cursor = true,
  className,
}: ButtonProps) {
  const [visible, setVisible] = useState(false);

  return (
    <button
      className={cn(
        "active:scale-95 peer rounded-sm relative overflow-hidden duration-75  will-change-transform bg-black w-fit p-3 h-fit cursor-pointer select-none text-white flex flex-nowrap text-nowrap justify-center items-center gap-9 font-normal",
        className,
      )}
      onClick={onClick}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      { visible && cursor && <Cursor className={"bg-neutral mix-blend-exclusion size-3"}/> }
      <div className={"absolute size-full top-0 right-0"}></div>
      {children}
    </button>
  );
}
