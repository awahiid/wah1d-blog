import { BlockEntry } from "@/lib/blocks/BlockEntry";
import { TextTitleEditor } from "@/components/editor/block-editors/TextTitleEditor";
import TextTitleBlock from "@/lib/blocks/TextTitleBlock";
import TextBlock from "@/lib/blocks/TextBlock";
import { TextEditor } from "@/components/editor/block-editors/TextEditor";
import CodeBlock from "@/lib/blocks/CodeBlock";
import CodeEditor from "@/components/editor/block-editors/CodeEditor";

export const BLOCK_ENTRIES = [
  new BlockEntry(TextTitleBlock, TextTitleEditor),
  new BlockEntry(TextBlock, TextEditor),
  new BlockEntry(CodeBlock, CodeEditor)
];
