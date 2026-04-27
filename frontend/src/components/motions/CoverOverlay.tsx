"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useMousePosition } from "@/utils/useMousePosition";

type CoverOverlayProps = {
  cover: string;
};

export default function CoverOverlay({ cover }: CoverOverlayProps) {
  const controls = useAnimationControls();
  const { x, y } = useMousePosition();

  const handleHover = (variant: string): void => {
    controls.start(variant);
  };

  return (
    <>
      <motion.div
        className="absolute w-full h-full z-10 bg-transparent"
        onHoverStart={() => {
          handleHover("hovered");
        }}
        onHoverEnd={() => {
          handleHover("initial");
        }}
      >
        <motion.img
          src={cover}
          alt="portada"
          className="absolute h-[300px] object-contain"
          initial={{
            opacity: 0,
            width: "0",
          }}
          animate={controls}
          transition={{ duration: 0 }}
          variants={{
            initial: { opacity: 0, width: "0" },
            hovered: { opacity: 1, width: "auto" },
          }}
          style={{
            left: `${x}px`,
            top: `${y}px`,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        />
      </motion.div>
    </>
  );
}
