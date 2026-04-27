import { useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

const backgroundVariants = {
  initial: {
    opacity: 0,
    transition: {
      delay: 1,
      duration: 0.5,
    },
  },
  end: {
    scale: 0,
    bgRound: '100%'
  }
};

export default function PostTransition() {
  const [cover, setCover] = useState(true);
  const controls = useAnimation();
  const bgControls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await bgControls.start("initial");
      await bgControls.start("end");
      await bgControls.start("exit");
      setCover(false);
    };
    sequence();
  }, [controls]);

  return (
    <AnimatePresence>
      {cover && (
        <>
          <motion.div
            variants={backgroundVariants}
            animate={bgControls}
            className="fixed flex items-center inset-0 size-full z-50 bg-neutral"
          >
            <div className={'absolute inset-0 pattern-grid-white pattern-size-20'}></div>
            <div className={'absolute inset-0 bg-gradient-to-r from-transparent via-neutral to-transparent'}></div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
