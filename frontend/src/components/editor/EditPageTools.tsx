import React, { useState } from 'react';
import usePostStore from "@/stores/usePostStore";
import { IoIosArrowDown } from "react-icons/io";
import { motion, useAnimation, Variants } from 'framer-motion';
import LightButton from "@/components/ui/LightButton";
import { MdEdit, MdPreview, MdSave, MdSend } from "react-icons/md";
import TypeWriterText from '@/components/animations/TypeWriterText';
import Button from '@/components/ui/Button';
import { cn } from '@/utils/cn';

const toolsMenuVariants = {
  closed: { width: "fit-content" },
  opened: { width: "100%", maxWidth: "1024px" },
};

const buttonsVariants = {
  closed: { opacity: 0, display: "none" },
  opened: { opacity: 1, display: "flex" },
};

const triggerVariants = {
  opened: { transform: "rotate(-90deg)" },
  closed: { transform: "rotate(90deg)" },
};

export default function EditPageTools() {
  const editable = usePostStore(state => state.editable)
  const setEditable = usePostStore(state => state.setEditable)

  const [menuOpened, setMenuOpened] = useState(true);
  const buttonsControls = useAnimation();
  const menuControls = useAnimation();


  const toggleMenu = () => {
    if (menuOpened) {
      buttonsControls.start("closed").then(() => {
        menuControls.start("closed");
        setMenuOpened(false);
      });
    } else {
      menuControls.start("opened").then(() => {
        buttonsControls.start("opened");
        setMenuOpened(true);
      });
    }
  };

  return (
    <motion.div
      className="w-full max-w-screen-xl fixed bottom-0 mb-2 bg-neutral bg-opacity-50 border-neutral rounded-full overflow-hidden backdrop-blur-md"
      variants={toolsMenuVariants}
      animate={menuControls}
    >

      <div className="p-2 h-full flex gap-2 justify-between items-center backdrop-blur-lg">
        <LightButton
          onClick={toggleMenu}
          className="h-fit w-fit p-3 gap-2 rounded-full hover:bg-black hover:text-white"
        >
          <motion.div
            variants={triggerVariants}
            animate={menuOpened ? "opened" : "closed"}
          >
            <IoIosArrowDown />
          </motion.div>
        </LightButton>

        <motion.div
          className="flex items-center justify-center gap-2"
          variants={buttonsVariants}
          animate={buttonsControls}
          initial={menuOpened ? "opened" : "closed"}
        >
          <LightButton
            onClick={() => setEditable(!editable)}
            className="h-fit w-fit gap-4 p-2 px-4 rounded-full hover:bg-black hover:text-white"
          >
            {editable ? <MdPreview /> : <MdEdit />}
            {editable ? "Previsualizar" : "Editar"}
          </LightButton>

          <UpdatePostButton/>
          <PublishPostButton/>
        </motion.div>
      </div>
    </motion.div>
  );
}

function UpdatePostButton() {
  const updatePost = usePostStore(state => state.updatePost)
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async () => {
    if (updating) return;

    setUpdating(true);

    try {
      await updatePost();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error while saving post', error);
      }
    } finally {
      setUpdating(false);
    }
  };

  return (
    <LightButton
      onClick={handleUpdate}
      className={cn(
        "h-fit w-fit gap-4 p-2 px-4 rounded-full hover:bg-black hover:text-white",
        updating ? 'active:scale-1' : ''
      )}
    >
      <MdSave />
      {!updating && <>Guardar</>}
      {updating && <TypeWriterText text="Guardando" className="text-md" />}
    </LightButton>
  );
}

const publishPostVariants: Variants = {
  initial: {
    translateX: ['-5rem', 0],
    translateY: [0],
    scale: 1
  },
  published: {
    translateX: "18rem",
    transition: {
      duration: 0.7,
    }
  }
};

function PublishPostButton(){
  const publishPost = usePostStore(state => state.publishPost)
  const [publishing, setPublishing] = useState(false);
  const [bgColor, setBgColor] = useState('bg-black');

  const handlePublish = async () => {
    if (publishing) return;

    setPublishing(true);

    try {
      await publishPost();
      setBgColor('bg-green-500');
      setTimeout(() => setBgColor('bg-black'), 1000)
    } catch (error: unknown) {
      setBgColor('bg-red-500');
      setTimeout(() => setBgColor('bg-black'), 1000)
      if (error instanceof Error) {
        console.error('Error while publishing post', error);
      }
    } finally {
      setPublishing(false);
    }
  };

  return (
    <Button
      onClick={handlePublish}
      className={cn(`h-fit relative w-fit gap-4 p-2 px-4 rounded-full ${bgColor} transition-colors`, publishing ? 'active:scale-1' : '')}
      cursor={false}
    >
      <motion.div
        className={cn(publishing ? 'text-neutral scale-125' : '')}
        variants={publishPostVariants}
        animate={publishing ? 'published' : 'initial'}
      >
        <MdSend />
      </motion.div>
      {!publishing && <>Subir post</>}
      {publishing && <>Subiendo</>}
    </Button>
  )
}