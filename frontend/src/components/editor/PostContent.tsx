import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import React from "react";
import BlockRow from "@/components/editor/BlockRow";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import usePostStore from "@/stores/usePostStore";
import "react-resizable/css/styles.css";

export default function PostContent() {
  const blocks = usePostStore(state => state.blocks)
  const setBlocks = usePostStore(state => state.setBlocks)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over !== null && active.id !== over.id) {
      const oldIndex = blocks.findIndex((item) => item.id === active.id);
      const newIndex = blocks.findIndex((item) => item.id === over.id);

      setBlocks(arrayMove(blocks, oldIndex, newIndex));
    }
  }

  return (
    <div className={"flex flex-col items-center p-9"}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={blocks.map((block) => block.id)}
          strategy={verticalListSortingStrategy}
        >
          {blocks.map(block => (
            <BlockRow key={block.id} index={block.position} block={block} />
          ))}
        </SortableContext>
      </DndContext>
      <p className={'mx-auto w-full max-w-3xl pt-8 border-t mt-4 border-neutral h-fit text-end'}>Made by Abdel Wahed Mahfoud</p>
    </div>
  );
}
