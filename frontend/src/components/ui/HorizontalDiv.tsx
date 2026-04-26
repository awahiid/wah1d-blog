type HorizontalDiv = {
  left?: boolean;
  top?: boolean;
  right?: boolean;
  bottom?: boolean;
};

export default function HorizontalDiv({
  left = false,
  top = false,
  right = false,
  bottom = false,
}: HorizontalDiv) {
  const borderClasses = [
    left ? "border-l-2" : "",
    top ? "border-t-2" : "",
    right ? "border-r-2" : "",
    bottom ? "border-b-2" : "",
  ]
    .join(" ")
    .trim();

  return (
    <div className="w-full max-w-screen-xl h-9 pl-9 pr-9">
      <div className={`w-full h-full ${borderClasses} border-neutral`}></div>
    </div>
  );
}
