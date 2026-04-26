import { StateCreator } from 'zustand';
import TextBlock from '@/lib/blocks/TextBlock';
import TextTitleBlock from '@/lib/blocks/TextTitleBlock';
import { BlockFactory } from '@/lib/blocks/BlockFactory';
import {POST_BLOCK_TYPE} from '@/types';
import Block, { SerializableContent } from '@/lib/blocks/Block';
import { BlockEntry } from '@/lib/blocks/BlockEntry';
import { TextTitleEditor } from '@/components/editor/block-editors/TextTitleEditor';
import { TextEditor } from '@/components/editor/block-editors/TextEditor';
import CodeBlock from '@/lib/blocks/CodeBlock';
import CodeEditor from '@/components/editor/block-editors/CodeEditor';
import ImagesBlock from "@/lib/blocks/ImagesBlock";
import ImagesEditor from '@/components/editor/block-editors/ImagesEditor';

const blockFactory = new BlockFactory();
[
  new BlockEntry(TextTitleBlock, TextTitleEditor),
  new BlockEntry(TextBlock, TextEditor),
  new BlockEntry(CodeBlock, CodeEditor),
  new BlockEntry(ImagesBlock, ImagesEditor),
].forEach(entry => blockFactory.registerBlock(entry as unknown as BlockEntry<SerializableContent, Block<SerializableContent>>));

/**
 * Type representing the structure of the block editor state slice.
 * Handles the block registry, blocklist, and editing state.
 */
export interface BlocksSlice {
  /**
   * Global editable flag applied to all blocks.
   */
  editable: boolean;

  /**
   * Block factory responsible for creating and managing block types and components.
   */
  blockFactory: BlockFactory;

  /**
   * Array of currently rendered blocks in the editor.
   */
  blocks: Block<SerializableContent>[];

  /**
   * Sets the global editable state and applies it to all blocks.
   * @param editable - Whether the blocks should be editable.
   */
  setEditable: (editable: boolean) => void;

  /**
   * Replaces the current blocklist with a new one.
   * @param blocks - The new list of blocks to set.
   */
  setBlocks: (blocks: Block<SerializableContent>[]) => void;

  /**
   * Creates a new block of the specified type and inserts it after the given index.
   * @param type - The type of block to create.
   * @param index - The index after which the new block will be inserted.
   */
  addBlock: (type: POST_BLOCK_TYPE, index: number) => void;

  /**
   * Removes a block at the specified index if more than one block remains.
   * @param index - The index of the block to remove.
   */
  removeBlock: (index: number) => void;

  /**
   * Updates the content of a block with the given ID.
   * Finds the block in the current list and updates its content using the provided value.
   * @param content - The new content to set for the block.
   * @param id - The ID of the block to update.
   */
  updateContent: (content: SerializableContent, id: number) => void
}

const normalize = (blocks: Block<SerializableContent>[]): Block<SerializableContent>[] =>
    blocks.map((b, i) => {
        b.position = i;
        return b;
    });

export const createBlocksSlice: StateCreator<BlocksSlice> = (set, get) => ({
    editable: true,
    blocks: [],
    blockFactory,

    setEditable: (editable: boolean) =>
        set(state => {
          state.blocks.forEach(block => (block.editable = editable));
          return {
            editable,
            blocks: [...state.blocks],
          };
        }),

    setBlocks: (blocks) =>
        set(() => {
            const ids = blocks.map(b => b.id);
            const unique = new Set(ids);

            if (ids.length !== unique.size) throw new Error("Duplicate ids detected in setBlocks");

            return {
                blocks: normalize([...blocks])
            };
        }),

    addBlock: (type, index) =>
        set(state => {
            const ids = state.blocks.map(b => b.id).filter(id => Number.isInteger(id));
            const nextId = ids.length ? Math.max(...ids) + 1 : 0;

            if (ids.includes(nextId)) throw new Error("Duplicate id generation");

            const newBlock = blockFactory.createBlock(
              type,
              nextId,
              index + 1
            );

            const blocks = normalize([
            ...state.blocks.slice(0, index + 1),
            newBlock,
            ...state.blocks.slice(index + 1),
            ]);

            return {
            blocks
            };
        }),

    removeBlock: (index) =>
        set(state => {
          const blocks =
              state.blocks.length > 1
                  ? state.blocks.filter((_, i) => i !== index)
                  : state.blocks;

          return {
            blocks: normalize(blocks),
          };
        }),

    updateContent: (content: SerializableContent, id: number) => {
      const { blocks } = get();
      const block = blocks.find(b => b.id === id);
      if (block) {
        block.setContent(content);
      }
    },
});