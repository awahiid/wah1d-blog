import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import CharacterCount from '@tiptap/extension-character-count';
import { MAX_DESCRIPTION_LENGTH } from '@/config/config';
import React, { useEffect } from 'react';
import Placeholder from "@tiptap/extension-placeholder";

type DescriptionEditorProps = {
  content: string;
  editable: boolean;
  onEdit: (description: string) => void;
};

const DescriptionEditor = React.memo(({ content, onEdit, editable }: DescriptionEditorProps) => {
  const descriptionEditor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {},
        },
      }),
      CharacterCount.configure({ limit: MAX_DESCRIPTION_LENGTH }),
      Placeholder,
    ],
    content: content,
    immediatelyRender: false,
    onUpdate: (event) => {
      onEdit(event.editor.getText());
    },
  });

  useEffect(() => {
    if (content) {
      descriptionEditor?.commands.setContent(content);
    }
  }, []);

  descriptionEditor?.setOptions({ editable });

  return <EditorContent editor={descriptionEditor} />;
});

DescriptionEditor.displayName = "DescriptionEditor";

export default DescriptionEditor;
