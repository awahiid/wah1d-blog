"use client";

import {useEffect, useState} from "react";
import SelectableTag from "@/components/home/SelectableTag";
import usePostStore from "@/stores/usePostStore";
import useSearchStore from "@/stores/useSearchStore";

export type SelectableTag = {
  id: number;
  selected: boolean;
  tag: string;
};

export default function TagsContainer({ tags }: { tags: string[] }) {
  const setTags = usePostStore(state => state.setTags);
  const search = useSearchStore(state => state.search);
  const setSearchTags = useSearchStore(state => state.setTags);
  const [sortedTags, setSortedTags] = useState<SelectableTag[]>([]);

  useEffect(() => {
    setTags(tags)
    const selectableTags = tags.map((t, index) => {
      return {
        id: index,
        selected: false,
        tag: t
      }
    })
    setSortedTags(selectableTags);
  }, [setTags, tags])

  const handleClick = async (tag: SelectableTag) => {
    let updated: SelectableTag[] = []
    setSortedTags((prev) => {
      updated = prev.map((t) =>
          t.id === tag.id ? {...t, selected: !t.selected} : t,
      );

      updated.sort((a, b) => {
        if (a.selected === b.selected) return 0;
        return a.selected ? -1 : 1;
      });

      return [...updated];
    });

    setSearchTags([...updated.filter(t => t.selected).map(t => t.tag)])
    await search()
  };

  return (
    <div className={'w-full flex justify-center'}>
      <div
        className="overflow-x-auto w-full max-w-screen-2xl h-[4.7rem] text-nowrap flex items-center border-b-2 border-neutral sm:pl-9 sm:pr-9 px-3 gap-2">
        {sortedTags.map((tag) => (
          <SelectableTag
            key={tag.id}
            text={tag.tag}
            selected={tag.selected}
            onClick={() => handleClick(tag)}
          />
        ))}
      </div>
    </div>
  );
}
