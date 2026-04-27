import React, { useState } from 'react';
import usePostStore from "@/stores/usePostStore";
import { motion, Variants } from 'framer-motion';
import LightButton from "@/components/ui/LightButton";
import TypeWriterText from '@/components/animations/TypeWriterText';
import Button from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import { RiEditFill } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import { MdOutlineDownloadDone } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";

export default function EditPageTools() {
  const editable = usePostStore(state => state.editable)
  const setEditable = usePostStore(state => state.setEditable)

  return (
    <div className="mx-9 max-w-screen-xl w-fit fixed bottom-0 mb-2 bg-neutral bg-opacity-50 border-neutral rounded-full overflow-hidden backdrop-blur-md">
      <div className="p-2 h-full flex gap-2 justify-between items-center backdrop-blur-lg">
        <div
          className="flex items-center justify-center gap-2"
        >
          <LightButton
            onClick={() => setEditable(!editable)}
            className="h-fit w-fit gap-4 p-2 px-4 rounded-full hover:bg-black hover:text-white"
          >
            {editable ? <AiOutlineEye /> : <RiEditFill />}
            {editable ? "Preview" : "Edit"}
          </LightButton>

          <UpdatePostButton/>
          <PublishPostButton/>
        </div>
      </div>
    </div>
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
      <MdOutlineDownloadDone  />
      {!updating && <>Save</>}
      {updating && <TypeWriterText text="Saving" className="text-md" />}
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
      className={cn(`text-md h-fit relative w-fit gap-4 p-2 px-4 rounded-full ${bgColor} transition-colors`, publishing ? 'active:scale-1' : '')}
      cursor={false}
    >
      <motion.div
        className={cn(publishing ? 'text-neutral scale-125' : '')}
        variants={publishPostVariants}
        animate={publishing ? 'published' : 'initial'}
      >
        <IoSend />
      </motion.div>
      {!publishing && <>Upload</>}
      {publishing && <>Uploading</>}
    </Button>
  )
}