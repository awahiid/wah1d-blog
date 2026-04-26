import Block from "@/lib/blocks/Block";
import { IconType } from "react-icons";
import { MdOutlineDateRange } from "react-icons/md";
import { formatDate } from "@/utils/utils";
import { POST_BLOCK_TYPE } from "@/types";

export type DateContent = {
  date: string;
  html: string;
};

export default class DateBlock extends Block<DateContent> {
  readonly name: string = "Fecha del post";
  readonly type: POST_BLOCK_TYPE = POST_BLOCK_TYPE.DATE;
  readonly icon: IconType = MdOutlineDateRange;

  constructor(id: number, position: number | null, content?: DateContent, editable: boolean = true) {
    const newContent: DateContent = {
      date: new Date().toDateString(),
      html: `<p>${formatDate(new Date())}</p>`,
    };

    super(id, position, content ?? newContent, editable);
  }
}
