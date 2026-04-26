import { useEditor, EditorContent, EditorEvents } from '@tiptap/react';
import { StarterKit } from "@tiptap/starter-kit";
import { useCallback, useEffect } from 'react';
import Placeholder from "@tiptap/extension-placeholder";

type TextEditorProps = {
  content: string;
  editable: boolean;
  onEdit: (text: string) => void;
};

export function TextEditor({ content, editable, onEdit }: TextEditorProps) {
  const textEditor = useEditor({
    extensions: [StarterKit, Placeholder],
    content: "<p>Texto de párrafo</p>",
    immediatelyRender: false,
    onUpdate: useCallback((event: EditorEvents['update']) => {
      onEdit(event.editor.getHTML());
    }, [onEdit]),
  });

  useEffect(() => {
    if (textEditor && content) {
      textEditor.commands.setContent(content);
    }
  }, [textEditor]);

  useEffect(() => {
    if (textEditor) {
      textEditor.setOptions({ editable });
    }
  }, [editable, textEditor]);

  return (
    <div className="w-[760px] leading-7 font-light text-lg h-full">
      <EditorContent editor={textEditor} />
    </div>
  );
}
