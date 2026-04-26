"use client";

import { IoMdAdd, IoMdClose } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { Menu, MenuItem } from "@/components/ui/FloatingMenu";
import Button from "@/components/ui/Button";
import usePostStore from "@/stores/usePostStore";
import { cn } from "@/utils/cn";

type RemovableTagProps = {
  tag: string;
  onClick: () => void;
};

function RemovableTag({ tag, onClick }: RemovableTagProps) {
  const editable = usePostStore(state => state.editable);

  return (
    <Button
      className={cn(
        "bg-black text-white h-fit w-fit flex items-center justify-center pl-4 pr-4 pt-2 pb-2 rounded-full gap-1 cursor-pointer select-none",
        editable ? "hover:bg-red-500" : "",
      )}
      onClick={onClick}
      cursor={false}
    >
      {tag}
      {editable && <IoMdClose />}
    </Button>
  );
}

export default function SelectTagsContainer() {
  const loadedTags = usePostStore(state => state.loadedTags);
  const selectedTags = usePostStore(state => state.selectedTags);
  const addTag = usePostStore(state => state.addTag);
  const removeTag = usePostStore(state => state.removeTag);
  const loadTags = usePostStore(state => state.loadTags);
  const editable = usePostStore(state => state.editable);

  const [tags, setTags] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTags().then(() => {
      setTags(loadedTags)
      setLoading(false);
    });
  }, [loadTags]);

  const handleTagClick = (index: number) => {
    if (editable) {
      removeTag(index);
    }
  };

  const triggerButton = (
    <Button
      className={"rounded-full border-none text-white font-normal h-fit w-fit gap-2 pt-2 pb-2 pl-4 pr-4"}
      cursor={false}
    >
      <IoMdAdd />
      Añadir etiqueta
    </Button>
  );

  return (
    <div className="w-full max-w-screen-xl h-20 text-nowrap flex items-center justify-center border-b-2 border-neutral gap-2">
      {!loading && editable && (
        <Menu label="" triggerButton={triggerButton} className={"min-w-52"}>
          {tags!.map((tag, index) => (
            <MenuItem
              label={tag}
              key={index}
              onClick={() => addTag(tag)}
            />
          ))}
        </Menu>
      )}
      {selectedTags.map((tag, index) => (
        <RemovableTag
          key={index}
          tag={tag}
          onClick={() => handleTagClick(index)}
        />
      ))}
    </div>
  );
}
