import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import React from "react";

type DateEditorProps = {
  content: string;
  editable: boolean;
  onEdit: (date: string) => void;
};

const DateEditor = React.memo(({ content }: DateEditorProps) => {
  const dateEditor = useEditor({
    extensions: [StarterKit],
    content: content,
    immediatelyRender: false,
    editable: false,
  });

  return <EditorContent editor={dateEditor} />;
});

DateEditor.displayName = "DateEditor";

export default DateEditor;