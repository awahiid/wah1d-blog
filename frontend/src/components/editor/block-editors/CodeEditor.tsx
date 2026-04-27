import { EditorContent, useEditor } from '@tiptap/react';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { StarterKit } from '@tiptap/starter-kit';
import typescript from 'highlight.js/lib/languages/typescript';
import { createLowlight } from 'lowlight';
import 'highlight.js/styles/github.css';
import { CodeBlockContent } from '@/lib/blocks/CodeBlock';

type CodeEditorProps = {
  content: CodeBlockContent;
  editable: boolean;
  onEdit: (code: CodeBlockContent) => void;
};

const lowlight = createLowlight({ typescript });

/**
 * CodeEditor component that allows editing of code, file name, and language.
 * Uses Tiptap with the CodeBlockLowlight extension for syntax highlighting.
 *
 * @param {CodeEditorProps} props - The component properties.
 */
export default function CodeEditor({ content, editable, onEdit }: CodeEditorProps) {
  const codeEditor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      CodeBlockLowlight.configure({ lowlight: lowlight }),
    ],
    content: content.code,
    immediatelyRender: false,
    onUpdate: (event) => {
      onEdit({ ...content, code: event.editor.getHTML() });
    },
  });

  const fileNameEditor = useEditor({
    extensions: [StarterKit.configure({ codeBlock: false })],
    content: content.fileName,
    immediatelyRender: false,
    onUpdate: (event) => {
      onEdit({ ...content, fileName: event.editor.getHTML() });
    },
  });

  const languageEditor = useEditor({
    extensions: [StarterKit.configure({ codeBlock: false })],
    content: content.language,
    immediatelyRender: false,
    onUpdate: (event) => {
      onEdit({ ...content, language: event.editor.getHTML() });
    },
  });

  codeEditor?.setOptions({ editable });
  fileNameEditor?.setOptions({ editable });
  languageEditor?.setOptions({ editable });

  return (
    <div className={'w-screen px-9 sm:w-full sm:p-0 sm:min-w-[760px] pt-2 pb-2'}>
      <div className="w-full flex justify-between p-4 pb-2 text-black border-neutral border border-b-0 rounded-t-md">
        <EditorContent
          className={'min-w-20'}
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          editor={fileNameEditor}
        />
        <EditorContent
          className={'min-w-20 text-end'}
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          editor={languageEditor}
        />
      </div>
      <EditorContent
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        editor={codeEditor}
      />
    </div>
  );
}
