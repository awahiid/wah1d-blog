import { POST_BLOCK_TYPE } from "@/types";
import Block, { SerializableContent } from "@/lib/blocks/Block";
import { JSX } from 'react';

/**
 * Represents an entry in the block register.
 * Each block entry must define its type, block and the component that will render that block.
 *
 * @example
 * ```
 * const titleBlockEntry = new BlockEntry(TitleBlock, TitleEditor);
 * ```
 */
export class BlockEntry<C extends SerializableContent, B extends Block<C>> {
  type: POST_BLOCK_TYPE;

  constructor(
      public block: new (id: number, position: number, content?: C, editable?: boolean) => B,
      public component: (props: { content: C, editable: boolean, onEdit: (content: C) => void }) => JSX.Element,
  ) {
    this.type = new block(0, 0).type;
  }
}

