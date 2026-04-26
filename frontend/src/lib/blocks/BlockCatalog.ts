import { POST_BLOCK_TYPE } from "@/types";
import { IconType } from "react-icons";
import { BlockEntry } from "@/lib/blocks/BlockEntry";
import Block, { SerializableContent } from '@/lib/blocks/Block';

export type BlockCatalogEntry = {
  id: number;
  text: string;
  type: POST_BLOCK_TYPE;
  icon: IconType;
};

/**
 * Represents a Block catalog that resumes the information of Block entries.
 * It is needed in the UI to show the available post blocks that user can edit.
 * */
export class BlockCatalog {
  catalog: BlockCatalogEntry[] = [];

  addEntry(blockEntry: BlockEntry<SerializableContent, Block<SerializableContent>>) {
    const temporalBlock = new blockEntry.block(0);
    this.catalog.push({
      id: this.catalog.length + 1,
      text: temporalBlock.name,
      type: temporalBlock.type,
      icon: temporalBlock.icon,
    });
  }
}
