import Block from "@/lib/blocks/Block";
import { IconType } from "react-icons";
import { MdTitle } from "react-icons/md";
import { POST_BLOCK_TYPE } from "@/types";

export default class TitleBlock extends Block<string> {
  readonly name: string = "Título de post";
  readonly type: POST_BLOCK_TYPE = POST_BLOCK_TYPE.TITLE;
  readonly icon: IconType = MdTitle;
  contentText: string = "Título del post";

  constructor(
    id: number,
    position: number,
    content: string = "<p>Título del post.</p>",
    editable: boolean = true,
  ) {
    super(id, position, content, editable);
  }
}
