import { cn } from "@/utils/cn";

type SectionButtonProps = {
  text: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
};

export default function SectionButton({
  text,
  selected,
  onClick,
  className,
}: SectionButtonProps) {
  return (
    <button
      className={cn(
        "relative bg-white active:scale-1 text-black min-w-min h-full overflow-hidden   flex items-center pl-9 pr-9 border-r-2 border-neutral cursor-pointer " +
          className,
        selected
          ? "bg-black text-white"
          : "hover:bg-neutral50 hover:text-black",
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
