import Block from "@/lib/blocks/Block";
import { IconType } from "react-icons";
import { MdTitle } from "react-icons/md";
import { POST_BLOCK_TYPE } from "@/types";

export default class TextTitleBlock extends Block<string> {
  readonly name: string = "Título de párrafo";
  readonly type: POST_BLOCK_TYPE = POST_BLOCK_TYPE.TEXT_TITLE;
  readonly icon: IconType = MdTitle;

  constructor(
    id: number,
    position: number,
    content: string = "<h1>Título de párrafo</h1>",
    editable: boolean = true,
  ) {
    super(id, position, content, editable);
  }
}
