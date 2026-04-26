import React from "react";
import { IoMdClose } from "react-icons/io";
import { MdDragIndicator } from "react-icons/md";
import LightButton from "@/components/ui/LightButton";
import LightDangerButton from "@/components/ui/LightDangerButton";
import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import AddBlockMenu from "@/components/editor/AddBlockMenu";
import { POST_BLOCK_TYPE } from "../../types";
import { BlockCatalogEntry } from "@/lib/blocks/BlockCatalog";

type SectionRowButtonsProps = {
  onAdd: (blockType: POST_BLOCK_TYPE) => void;
  onDelete: () => void;
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap | undefined;
  catalog: BlockCatalogEntry[];
};

export default function SectionRowButtons({
  onAdd,
  onDelete,
  attributes,
  listeners,
  catalog,
}: SectionRowButtonsProps) {
  return (
    <div
      className={
        "absolute -right-28 h-fit flex justify-around items-center border-l-2 pl-2 border-neutral"
      }
    >
      <AddBlockMenu onAdd={onAdd} catalog={catalog} />

      <LightButton
        className={"h-fit w-fit p-2 rounded-full cursor-grab"}
        {...attributes}
        {...listeners}
      >
        <MdDragIndicator className={"size-fit"} />
      </LightButton>

      <LightDangerButton
        onClick={onDelete}
        className={"h-fit w-fit p-2 font-bold rounded-full"}
      >
        <IoMdClose className={"size-fit cursor-pointer"} />
      </LightDangerButton>
    </div>
  );
}
