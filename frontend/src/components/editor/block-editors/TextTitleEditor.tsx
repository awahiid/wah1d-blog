import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { JSX } from 'react';
import Placeholder from "@tiptap/extension-placeholder";

type TitleEditorProps = {
  content: string;
  editable: boolean;
  onEdit: (text: string) => void;
};

/**
 * TextTitleEditor component for editing the title content.
 * Uses Tiptap editor with the StarterKit extension for text editing.
 *
 * @param {TitleEditorProps} props - The properties for the TextTitleEditor component.
 * @param {string} props.content - The initial content of the title.
 * @param {boolean} props.editable - Flag indicating whether the editor is editable.
 * @param {Function} props.onEdit - Callback function to handle title content updates.
 * @returns {JSX.Element} The rendered title editor.
 */
export function TextTitleEditor({ content, editable, onEdit }: TitleEditorProps): JSX.Element {
  const titleEditor = useEditor({
    extensions: [StarterKit, Placeholder],
    editorProps: {
      attributes: {
        class: "font-semibold text-3xl",
      },
    },
    content: content,
    immediatelyRender: false,
    onUpdate: (event) => onEdit(event.editor.getHTML()),
  });

  titleEditor?.setOptions({ editable });

  return (
    <div className={"sm:w-[760px] w-screen px-9 sm:p-0  h-fit flex flex-col gap-4"}>
      <EditorContent editor={titleEditor} />
    </div>
  );
}
