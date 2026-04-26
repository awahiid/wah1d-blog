import Block from "@/lib/blocks/Block";
import { IconType } from "react-icons";
import { IoMdImage } from "react-icons/io";
import { POST_BLOCK_TYPE } from "@/types";

export type ImageData = {
  id: number;
  width: number;
  height: number;
  name?: string;
};

export default class ImagesBlock extends Block<ImageData[]> {
  readonly name: string = "Imágenes";
  readonly type: POST_BLOCK_TYPE = POST_BLOCK_TYPE.IMAGES;
  readonly icon: IconType = IoMdImage;

  constructor(
    id: number,
    position: number,
    content: ImageData[] = [
      {
        id: 0,
        width: 200,
        height: 200,
      },
    ],
    editable: boolean = true,
  ) {
    super(id, position, content, editable);
  }
}
