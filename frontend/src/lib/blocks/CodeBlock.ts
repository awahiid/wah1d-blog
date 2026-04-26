import Block from "@/lib/blocks/Block";
import { IconType } from "react-icons";
import { IoMdCode } from "react-icons/io";
import { POST_BLOCK_TYPE } from "@/types";

export type CodeBlockContent = {
  fileName: string;
  language: string;
  code: string;
};

export default class CodeBlock extends Block<CodeBlockContent> {
  readonly name: string = "Snippet de código";
  readonly type: POST_BLOCK_TYPE = POST_BLOCK_TYPE.CODE;
  readonly icon: IconType = IoMdCode;

  constructor(
    id: number,
    position: number,
    content: CodeBlockContent = {
      fileName: "file.ts",
      language: "TS",
      code: '<pre><code>console.log("Hola mundo!");</code></pre>',
    },
    editable: boolean = true,
  ) {
    super(id, position, content, editable);
  }
}
