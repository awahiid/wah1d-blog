import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { motion } from "framer-motion";
import { MdOutlineNorth } from "react-icons/md";
import React from "react";
import LightButton from "@/components/ui/LightButton";
import { MdDelete } from "react-icons/md";

type ShowSectionButtonProps = {
  open: boolean;
  onClick: () => void;
};

export function ShowSectionButton({ open, onClick }: ShowSectionButtonProps) {
  const iconVariants = {
    closed: {
      transform: "rotate(180deg)",
    },
  };

  const handleClick = () => {
    onClick();
  };

  const textEditor = useEditor({
    extensions: [StarterKit],
    content: `<p>Nombre de sección</p>`,
    immediatelyRender: false,
  });

  return (
    <LightButton
      className={
        "w-full h-[4.5rem] bg-transparent border-2 border-neutral border-b-0 border-t-0 flex justify-center items-center gap-4 cursor-pointer"
      }
      onClick={() => handleClick()}
    >
      <motion.div variants={iconVariants} animate={open ? "" : "closed"}>
        <MdOutlineNorth />
      </motion.div>
      <EditorContent
        onClick={(event: React.MouseEvent) => event.stopPropagation()}
        editor={textEditor}
      />
      <MdDelete />
    </LightButton>
  );
}
