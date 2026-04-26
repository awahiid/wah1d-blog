import Block from "@/lib/blocks/Block";
import { IconType } from "react-icons";
import { IoMdImage } from "react-icons/io";
import { POST_BLOCK_TYPE } from "@/types";

export default class CoverBlock extends Block<string[]> {
  readonly name: string = "Portada del post";
  readonly type: POST_BLOCK_TYPE = POST_BLOCK_TYPE.COVER;
  readonly icon: IconType = IoMdImage;

  constructor(id: number, content: string[] = [], editable: boolean = true) {
    super(id, content, editable);
  }
}
