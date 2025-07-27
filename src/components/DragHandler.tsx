import type { FC } from "react";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

const DragHandler: FC<SyntheticListenerMap> = (listeners) => {
  return (
    <div
      className="absolute top-0 right-0 w-0 h-0 border-b-[24px] border-r-[24px] border-b-transparent cursor-grab rounded-sm"
      {...listeners}
    />
  );
};

export default DragHandler;
