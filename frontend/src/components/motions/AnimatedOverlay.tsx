"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function AnimatedOverlay() {
  const [hasAnimated, setHasAnimated] = useState(false);

  return (
    <>
      {!hasAnimated && (
        <motion.div
          className="absolute w-full h-full bg-white bottom-0 z-10 overflow-hidden"
          initial={{
            opacity: 1,
          }}
          whileInView={{
            opacity: 0,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          onAnimationComplete={() => setHasAnimated(true)}
        />
      )}
    </>
  );
}
