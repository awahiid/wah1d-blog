import { IoMdClose } from "react-icons/io";
import { cn } from "@/utils/cn";

type TagProps = {
  text: string;
  selected: boolean;
  onClick: () => void;
};

export default function SelectableTag({ text, selected, onClick }: TagProps) {
  return (
    <button
      className={cn(
        "px-4 py-3 sm:py-4 sm:px-6 text-sm sm:text-md h-fit active:scale-95 duration-75 w-fit flex items-center justify-center rounded-full gap-2 cursor-pointer select-none",
        selected
          ? "bg-black text-white"
          : "bg-white border border-neutral text-black hover:bg-neutral-100 hover:text-black hover:bg-neutral-50",
      )}
      onClick={onClick}
    >
      <span className="text-sm sm:text-md">{text}</span>
      {selected && <IoMdClose className="text-sm sm:text-md" />}
    </button>
  );
}
