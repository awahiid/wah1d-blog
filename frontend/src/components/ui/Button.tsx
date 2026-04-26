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
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    onClick();
  };

  return (
    <button
      className={cn(
        "active:scale-95 rounded relative overflow-hidden duration-75 bg-black w-fit p-3 h-fit cursor-pointer select-none  text-white flex flex-nowrap text-nowrap justify-center items-center gap-9 font-normal",
        className,
      )}
      onClick={handleClick}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => {
        setVisible(false);
        setClicked(false);
      }}
    >
      {visible && cursor && (
        <Cursor
          className={cn(
            "bg-neutral mix-blend-exclusion",
            clicked
              ? "transition-all duration-1000 w-screen h-screen rounded-none"
              : "w-3 h-3 rounded-full",
          )}
        />
      )}
      <div className={"absolute size-full top-0 right-0"}></div>
      {children}
    </button>
  );
}
