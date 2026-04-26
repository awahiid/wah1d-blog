import React from "react";
import { IoMdAdd } from "react-icons/io";
import { Menu, MenuItem } from "@/components/ui/FloatingMenu";
import LightButton from "@/components/ui/LightButton";
import { POST_BLOCK_TYPE } from "@/types";
import { BlockCatalogEntry } from "@/lib/blocks/BlockCatalog";

type AddBlockMenuProps = {
  onAdd: (sectionType: POST_BLOCK_TYPE) => void;
  catalog: BlockCatalogEntry[];
};

export default function AddBlockMenu({ onAdd, catalog }: AddBlockMenuProps) {
  const triggerButton = (
    <LightButton className={"h-fit p-2 w-fit rounded-full"}>
      <IoMdAdd />
    </LightButton>
  );

  return (
    <Menu label="" triggerButton={triggerButton}>
      {catalog.map((entry, index) => (
        <MenuItem
          label={entry.text}
          icon={entry.icon}
          key={index}
          onClick={() => onAdd(entry.type)}
        />
      ))}
    </Menu>
  );
}
