import React, { useEffect, useRef, useState } from "react";
import { ImageData } from "@/lib/blocks/ImagesBlock";
import ImageEditor from "@/components/editor/block-editors/ImageEditor";

type ImagesEditorProps = {
  content: ImageData[];
  editable: boolean;
  onEdit: (images: ImageData[]) => void;
};

export default function ImagesEditor({ content, editable, onEdit }: ImagesEditorProps) {
  const [images, setImages] = useState<ImageData[]>(content);
  const imageId = useRef(0);

  useEffect(() => {
    imageId.current = content.length;
  }, [content.length]);

  const addImage = (index: number) => {
    setImages((prev) => {
      const newImage: ImageData = {
        id: imageId.current,
        width: 200,
        height: 200,
      };
      imageId.current++;
      const updated = [...prev];
      updated.splice(index + 1, 0, newImage);
      onEdit(updated);
      return [...updated];
    });
  };

  const removeImage = (index: number) => {
    if (images.length > 1) {
      setImages((prev) => {
        const updated = [...prev];
        updated.splice(index, 1);
        onEdit(updated);
        return [...updated];
      });
    }
  };

  return (
    <div className={"flex flex-col max-w-screen sm:w-max sm:flex-row  justify-center gap-9 items-center overflow-visible p-9"}>
      {images.map((image, index) => (
        <div
          key={image.id}
          className={"w-fit relative h-fit flex flex-col items-center justify-center gap-4"}
        >
          <ImageEditor
            addImage={() => addImage(index)}
            removeImage={() => removeImage(index)}
            image={image}
            editable={editable}
          />
        </div>
      ))}
    </div>
  );
}
