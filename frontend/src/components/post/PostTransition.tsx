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
};

const textVariants = {
  initial: {
    opacity: 0,
    filter: "blur(20px)",
  },
  end: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: 0.2,
    },
  },
};

export default function PostTransition() {
  const [cover, setCover] = useState(true);
  const controls = useAnimation();
  const bgControls = useAnimation();
  const textControls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await bgControls.start("initial");
      await textControls.start("end");
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
            className="fixed flex items-center bottom-0 right-0 size-full z-50 bg-white"
          >
            <motion.div
              className="bg-neutral flex flex-col rounded-full aspect-square w-[200vmax]"
              initial={{ scale: 0 }}
              animate={{ scale: 1, borderRadius: 0 }}
              transition={{ duration: 0.75 }}
            >
              <motion.h1
                variants={textVariants}
                initial={"initial"}
                animate={textControls}
                className="text-3xl sm:text-6xl font-bold z-10 flex flex-col gap-9"
              >
                Post
                <p className="text-xl font-normal sm:text-3xl">
                  {" "}
                  Este es el post{" "}
                </p>
              </motion.h1>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
