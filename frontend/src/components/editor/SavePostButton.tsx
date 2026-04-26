import { IoMdCheckmark } from "react-icons/io";
import Button from "@/components/ui/Button";

type SavePostButtonProps = {
  onClick: () => void;
};

export default function SavePostButton({ onClick }: SavePostButtonProps) {
  return (
    <Button onClick={onClick}>
      Subir post
      <IoMdCheckmark />
    </Button>
  );
}
