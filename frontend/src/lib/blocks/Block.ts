import { IconType } from "react-icons";
import { POST_BLOCK_TYPE, PostBlock } from "@/types";

export type SerializableContent =
  | string
  | number
  | boolean
  | { [key: string]: SerializableContent }
  | SerializableContent[];

/**
 * Represents an abstract content block in the system.
 * Each block has a type, a name, and specific content.
 * This class serves as a base for specific blocks with varied content to use in the post editor.
 *
 * @template C The type of content the block holds.
 */
export default abstract class Block<C extends SerializableContent> {
  id: number;
  abstract readonly name: string;
  abstract readonly type: POST_BLOCK_TYPE;
  abstract readonly icon: IconType;
  position: number = 0;
  editable: boolean = true;
  content: C;

  protected constructor(id: number, position: number | null, content: C, editable: boolean) {
    this.id = id;
    this.position = position ?? this.position;
    this.content = content;
    this.editable = editable;
  }

  setContent(content: C): void {
    this.content = content;
  }

  getContent(): PostBlock<C> {
    return {
      id: this.id,
      type: this.type,
      content: this.content,
    };
  }
}
