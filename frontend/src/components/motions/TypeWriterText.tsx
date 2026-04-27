import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { COLOR_NEUTRAL, COLOR_PRIMARY } from "@/styles/stylesConstants";

type TypeWriterTextProps = {
  text: string;
  className?: string;
};

export default function TypeWriterText({
  text,
  className,
}: TypeWriterTextProps) {
  const letters = text.split("");

  return (
    <div className={cn("flex h-fit", className)}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, color: COLOR_NEUTRAL }}
          animate={{ opacity: 1, color: COLOR_PRIMARY }}
          transition={{
            delay: index * 0.1,
            duration: 0.4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            repeatDelay: 1,
          }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
}
