type TagProps = {
  tag: Tag;
};

export default function Tag({ tag }: TagProps) {
  return (
    <div
      className={
        "bg-black text-white h-fit w-fit flex items-center justify-center pl-4 pr-4 pt-2 pb-2 rounded-full gap-1 cursor-pointer select-none"
      }
    >
      {tag.text}
    </div>
  );
}
