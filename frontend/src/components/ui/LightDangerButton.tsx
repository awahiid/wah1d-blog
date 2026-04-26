"use client";

import { motion } from "framer-motion";
import { LIGHT_DANGER_BUTTON_VARIANTS } from "@/styles/stylesConstants";
import React from "react";
import { cn } from "@/utils/cn";

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export default function LightDangerButton({
  children = "Delete button",
  onClick = () => {},
  className,
}: ButtonProps) {
  return (
    <motion.div
      className={cn(
        "w-36 h-12 flex justify-center items-center gap-9 font-normal cursor-pointer",
        className,
      )}
      variants={LIGHT_DANGER_BUTTON_VARIANTS}
      initial={"initial"}
      whileHover={"hovered"}
      whileTap={"clicked"}
      transition={{ duration: 0.1 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
