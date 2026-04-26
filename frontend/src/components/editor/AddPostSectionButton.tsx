import { IoMdAdd } from "react-icons/io";
import LightButton from "@/components/ui/LightButton";

type AddPostSectionButtonProps = {
  onClick: () => void;
};

export default function AddPostSectionButton({
  onClick,
}: AddPostSectionButtonProps) {
  return (
    <LightButton
      className={
        "w-full h-[4.5rem] border-2 border-neutral border-b-0 border-t-0 flex justify-center items-center gap-4"
      }
      onClick={onClick}
    >
      <IoMdAdd />
    </LightButton>
  );
}
