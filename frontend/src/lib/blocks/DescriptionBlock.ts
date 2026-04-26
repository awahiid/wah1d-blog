import Block from "@/lib/blocks/Block";
import { IconType } from "react-icons";
import { MdShortText } from "react-icons/md";
import { POST_BLOCK_TYPE } from "@/types";

export default class DescriptionBlock extends Block<string> {
  readonly name: string = "Description";
  readonly type: POST_BLOCK_TYPE = POST_BLOCK_TYPE.DESCRIPTION;
  readonly icon: IconType = MdShortText;
  contentText: string = 'Descripción';

  constructor(
    id: number,
    content: string = "<p>Descripción.</p>",
    editable: boolean = true,
  ) {
    super(id, content, editable);
  }
}
