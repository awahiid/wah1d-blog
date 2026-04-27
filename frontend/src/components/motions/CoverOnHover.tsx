"use client";

import { useMousePosition } from "@/utils/useMousePosition";

const CoverOnHover = () => {
  const { x, y } = useMousePosition();

  return (
    <div className="absolute w-fit h-fit bg-none">
      <div
        className="absolute w-36 h-36 bg-red-500"
        style={{
          top: `${y}px`,
          left: `${x}px`,
        }}
      />
    </div>
  );
};

export default CoverOnHover;
