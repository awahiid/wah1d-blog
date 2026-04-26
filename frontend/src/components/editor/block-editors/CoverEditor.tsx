'use client';

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MdImage } from "react-icons/md";
import usePostStore from "@/stores/usePostStore";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import LightButton from "@/components/ui/LightButton";
import {createImageURL} from "@/utils/utils";

export default function CoverEditor() {
  const id = usePostStore(state => state.id);
  const covers = usePostStore(state => state.covers);
  const setCovers = usePostStore(state => state.setCovers);
  const uploadImage = usePostStore(state => state.uploadCover);
  const deleteImage = usePostStore(state => state.deleteMedia);
  const editable = usePostStore(state => state.editable);

  const [coverState, setCoverState] = useState<(string | null)[]>([]);
  const [selectedCover, setSelectedCover] = useState<number>(0);

  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const initialCovers: string[] = [
      ...covers.slice(0, 4).map(c => c ?? null),
      ...Array(Math.max(0, 4 - covers.length)).fill(null)
    ];

    setCoverState(initialCovers);
  }, [covers]);

  const onUpload = async (index: number, imageFile: File) => {
    const newName = await uploadImage(imageFile);

    const updatedCovers = [...coverState];
    const prevName = updatedCovers[index];
    if(prevName) await deleteImage(prevName);
    updatedCovers[index] = newName;

    setCoverState(updatedCovers);
    setSelectedCover(index);
    setCovers(updatedCovers.filter((cover) => cover != null && cover != "") as string[] ?? []);
  };

  const onDelete = async (index: number) => {
    const updatedCovers = [...coverState];
    const prevName = updatedCovers[index];
    if(prevName) await deleteImage(prevName);
    updatedCovers[index] = null;
    setSelectedCover(
      Math.max(
        updatedCovers.findIndex((cover) => cover != null),
        0,
      ),
    );
    const updatedContent = updatedCovers.map((c) => {
      const match = c?.split("/").pop();
      return match ?? "";
    });
    setCoverState(updatedCovers);
    setCovers(updatedContent.filter((cover) => cover != ""));
  };

  return (
    <div className="size-full relative p-9 ">
      <ImageEditor
        index={selectedCover}
        width={800}
        height={800}
        editable={editable}
        src={coverState[selectedCover] && id ? createImageURL(id, coverState[selectedCover]) : undefined}
        onUpload={onUpload}
        onClick={() => setSelectedCover(selectedCover)}
        onDelete={onDelete}
        className={cn(editable ? "hover:outline outline-1" : "" )}
      />
      <div className={"absolute bottom-20 right-20 flex gap-9"}>
        {coverState.map((cover, index) => {
          if (index != selectedCover) {
            return (
              <ImageEditor
                key={index}
                index={index}
                width={200}
                height={200}
                editable={editable}
                src={cover && id ? createImageURL(id, cover) : undefined}
                onUpload={onUpload}
                className={cn("size-20 bg-white hover:outline outline-1")}
                onClick={() => setSelectedCover(index)}
                onDelete={onDelete}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

type ImageEditorProps = {
  index: number;
  width: number;
  height: number;
  src?: string;
  editable: boolean;
  onUpload: (index: number, imageFile: File) => void;
  className?: string;
  onClick?: () => void;
  onDelete: (index: number) => void;
};

function ImageEditor({
  index,
  width,
  height,
  src,
  editable,
  onUpload,
  className,
  onClick,
  onDelete,
}: ImageEditorProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showDelete, setShowDelete] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];
    if (imageFile) {
      onUpload(index, imageFile);
    }
  };

  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  return (
    <motion.div
      className={cn(
        "relative w-full h-full cursor-pointer bg-neutral",
        className,
        !editable && !src ? "hidden" : "block",
      )}
      onHoverStart={() => setShowDelete(true)}
      onHoverEnd={() => setShowDelete(false)}
      animate={{ scale: 1 }}
      transition={{
        bounce: 0,
      }}
    >
      {src && (
        <Image
          src={src}
          alt={`Cover ${index}`}
          width={width}
          height={height}
          className="size-full object-cover object-center"
          onClick={onClick}
        />
      )}
      {editable && (
        <>
          <div
            className={cn(
              "absolute min-w-full inset-0 border border-neutral flex items-center justify-center gap-3 text-2xl cursor-pointer transition-opacity",
              src ? "opacity-0 hover:bg-neutral50 hover:opacity-70" : "",
            )}
            onClick={triggerFileInput}
          >
            <MdImage />
            <span className={cn(width > 200 ? "block" : "hidden")}>
              Portada
            </span>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <LightButton
            onClick={() => onDelete(index)}
            className={cn(
              "absolute p-1 size-fit rounded-full -top-2 -right-2 transition-opacity duration-75",
              showDelete && src ? "opacity-100" : "opacity-0",
            )}
          >
            <IoClose></IoClose>
          </LightButton>
        </>
      )}
    </motion.div>
  );
}
