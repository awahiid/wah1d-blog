import Block from "@/lib/blocks/Block";
import { IconType } from "react-icons";
import { MdShortText } from "react-icons/md";
import { POST_BLOCK_TYPE } from "@/types";

export default class TextBlock extends Block<string> {
  readonly name: string = "Párrafo de texto";
  readonly type: POST_BLOCK_TYPE = POST_BLOCK_TYPE.TEXT;
  readonly icon: IconType = MdShortText;

  constructor(
    id: number,
    position: number,
    content: string = "<p>Texto de párrafo</p>",
    editable: boolean = true,
  ) {
    super(id, position, content, editable);
  }
}
