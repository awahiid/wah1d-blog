import Block, { SerializableContent } from "@/lib/blocks/Block";
import { POST_BLOCK_TYPE } from "@/types";
import { BlockEntry } from "@/lib/blocks/BlockEntry";
import { BlockCatalog } from "@/lib/blocks/BlockCatalog";

/**
 * Represents a factory of blocks that associates block classes with its type and component that will render that class.
 * It has a registry that keeps track of each entry and a catalog that resumes the available blocks (Might be needed in the UI).
 */
export class BlockFactory {
  blockRegistry = new Map<POST_BLOCK_TYPE, BlockEntry<SerializableContent, Block<SerializableContent>>>();
  catalog: BlockCatalog = new BlockCatalog();

  registerBlock(blockEntry: BlockEntry<SerializableContent, Block<SerializableContent>>) {
    if (!this.blockRegistry.has(blockEntry.type)) {
      this.blockRegistry.set(blockEntry.type, blockEntry);
      this.catalog.addEntry(blockEntry);
    } else {
      throw new Error("Block already registered");
    }
  }

  createBlock(
    blockType: POST_BLOCK_TYPE,
    id: number,
    position: number,
    content?: SerializableContent,
    editable?: boolean,
  ): Block<SerializableContent> {
    const blockEntry = this.blockRegistry.get(blockType);
    if (!blockEntry) throw new Error(`Block ${blockType} not registered`);

    if (content && editable != undefined) return new blockEntry.block(id, position, content, editable);
    if (content) return new blockEntry.block(id, position, content);
    return new blockEntry.block(id, position);
  }

  getComponent(blockType: POST_BLOCK_TYPE) {
    const blockEntry = this.blockRegistry.get(blockType);

    if (blockEntry) return blockEntry.component;

    throw new Error(`Block ${blockType} not registered`);
  }
}