import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import React, { useEffect } from 'react';
import Placeholder from "@tiptap/extension-placeholder";

type TitleEditorProps = {
  content: string;
  editable: boolean;
  onEdit: (title: string) => void;
};

const TitleEditor = React.memo(({ content, editable, onEdit }: TitleEditorProps) => {
  const titleEditor = useEditor({
    extensions: [StarterKit, Placeholder],
    editorProps: {
      attributes: {
        class: "post-title",
      },
    },
    content: content ?? "<p>Título del post</p>",
    immediatelyRender: false,
    onUpdate: (event) => {
      onEdit(event.editor.getText());
    },
  });

  useEffect(() => {
    if(content){
      titleEditor?.commands.setContent(content);
    }
  }, []);

  titleEditor?.setOptions({ editable });

  return <EditorContent spellCheck="false" editor={titleEditor} />;
});

TitleEditor.displayName = "TitleEditor";

export default TitleEditor;