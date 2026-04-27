import usePostStore from "@/stores/usePostStore";
import React, {useEffect, useRef, useState} from "react";
import {ResizableBox, ResizeCallbackData} from "react-resizable";
import { IoIosImage, IoMdAdd, IoMdClose } from "react-icons/io";
import { ImageData } from "@/lib/blocks/ImagesBlock";
import Image from "next/image";
import LightButton from "@/components/ui/LightButton";
import LightDangerButton from "@/components/ui/LightDangerButton";
import { MdOutlineImage } from "react-icons/md";
import {createImageURL} from "@/utils/utils";

type ImageEditorProps = {
  image: ImageData;
  addImage: () => void;
  removeImage: () => void;
  editable?: boolean;
};

const getMaxConstraints = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    return [
        Math.min(640, w * 0.6),
        Math.min(500, h * 0.8),
    ] as [number, number];
};

export default function ImageEditor({
  image,
  addImage,
  removeImage,
  editable = true,
}: ImageEditorProps) {
  const id = usePostStore(state => state.id);
  const uploadImage = usePostStore(state => state.uploadMedia);
  const deleteImage = usePostStore(state => state.deleteMedia);
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(image.name && id ? createImageURL(id, image.name) : null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if(image.name) await deleteImage(image.name);
      const newName = await uploadImage(selectedFile);
      setPreview(createImageURL(id!, newName));
      image.name = newName;
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleResize = (_event: React.SyntheticEvent, { size }: ResizeCallbackData) => {
    image.width = size.width;
    image.height = size.height;
  };

  const [max, setMax] = useState(getMaxConstraints());

  useEffect(() => {
    const handle = () => setMax(getMaxConstraints());
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  return (
    <div className={"w-fit h-fit flex flex-col items-center justify-center gap-2"}>
      <ResizableBox
        resizeHandles={editable ? ["se"] : []}
        axis={"both"}
        width={image.width}
        height={image.height}
        maxConstraints={max}
        minConstraints={[300, 100]}
        onResize={handleResize}
        className={"h-full w-72 relative flex justify-center items-center"}
      >
        <div className={"relative bg-neutral50 opacity-95 border border-neutral bold text-2xl size-full flex gap-9 justify-center items-center"}>
          {!preview && (
            <>
              <IoIosImage></IoIosImage>
              <p>Imágen</p>
            </>
          )}
          {preview && (
            <Image
              className={"absolute size-full object-cover object-center"}
              src={preview ? preview : ""}
              alt="Vista previa de la imagen"
              width={300}
              height={300}
            />
          )}
        </div>
        {editable && (
          <ImageEditorButtons
            addImage={addImage}
            removeImage={removeImage}
            uploadImage={handleButtonClick}
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={inputRef}
          style={{ display: "none" }}
        />
      </ResizableBox>
    </div>
  );
}

type ImageEditorButtonProps = {
  addImage: () => void;
  removeImage: () => void;
  uploadImage: () => void;
};

function ImageEditorButtons({
  addImage,
  removeImage,
  uploadImage,
}: ImageEditorButtonProps) {
  return (
      <div className={"absolute bottom-2 flex items-center justify-center gap-2"}>
        <LightButton
            onClick={addImage}
            className={"w-fit h-fit p-2 rounded-full border border-neutral"}
        >
          <IoMdAdd />
        </LightButton>
        <LightButton
            onClick={uploadImage}
            className={"w-fit h-fit p-2 rounded-full border border-neutral"}
        >
          <MdOutlineImage />
        </LightButton>
        <LightDangerButton
            onClick={removeImage}
            className={"w-fit h-fit p-2 rounded-full border border-neutral"}
        >
          <IoMdClose />
        </LightDangerButton>
      </div>
  );
}