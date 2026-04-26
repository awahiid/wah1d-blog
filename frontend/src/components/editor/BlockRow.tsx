import React from "react";
import SectionRowButtons from "@/components/editor/SectionRowButtons";
import { useSortable } from "@dnd-kit/sortable";
import Block, { SerializableContent } from "@/lib/blocks/Block";
import usePostStore from "@/stores/usePostStore";

interface BlockRowBlocks {
  block: Block<SerializableContent>;
  index: number;
}

export default function BlockRow({ block, index }: BlockRowBlocks) {
  const { attributes, listeners, setNodeRef, transform, transition,isDragging, } = useSortable({ id: block.id });

  const blockFactory = usePostStore(state => state.blockFactory);
  const addBlock = usePostStore(state => state.addBlock);
  const removeBlock = usePostStore(state => state.removeBlock);
  const updateContent = usePostStore(state => state.updateContent);
  const editable = usePostStore(state => state.editable);

  let style;
  if (transform != null) {
    const { x, y } = transform;
    style = {
      zIndex: isDragging ? 10 : 0,
      transform: `translate3d(${x}px, ${y}px, 0)`,
      transition,
      outline: isDragging ? "1px solid #D3ECFF" : "",
      boxShadow: isDragging
        ? "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
        : "",
    };
  }

  const BlockComponent = blockFactory.getComponent(block.type);

  return (
    <>
      <div
        className={"relative h-max flex flex-row gap-9 bg-white items-center justify-center rounded-sm p-2"}
        ref={setNodeRef}
        style={style}
      >
        <BlockComponent content={block.content} editable={editable} onEdit={(content) => updateContent(content, block.id)}></BlockComponent>
        {editable && (
          <SectionRowButtons
            attributes={attributes}
            listeners={listeners}
            onAdd={(type) => addBlock(type, index)}
            onDelete={() => removeBlock(index)}
            catalog={blockFactory.catalog.catalog}
          />
        )}
      </div>
    </>
  );
}
