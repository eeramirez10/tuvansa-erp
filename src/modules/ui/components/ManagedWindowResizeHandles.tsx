import type { MouseEvent as ReactMouseEvent } from "react";
import type { ResizeDirection } from "../hooks/useManagedWindow";

type ManagedWindowResizeHandlesProps = {
  onResizeHandleMouseDown: (direction: ResizeDirection) => (event: ReactMouseEvent<HTMLElement>) => void;
};

type HandleConfig = {
  direction: ResizeDirection;
  className: string;
};

const HANDLES: HandleConfig[] = [
  { direction: "n", className: "left-2 right-2 top-0 h-[6px] cursor-n-resize" },
  { direction: "s", className: "bottom-0 left-2 right-2 h-[6px] cursor-s-resize" },
  { direction: "e", className: "right-0 top-2 bottom-2 w-[6px] cursor-e-resize" },
  { direction: "w", className: "left-0 top-2 bottom-2 w-[6px] cursor-w-resize" },
  { direction: "ne", className: "right-0 top-0 h-[8px] w-[8px] cursor-ne-resize" },
  { direction: "nw", className: "left-0 top-0 h-[8px] w-[8px] cursor-nw-resize" },
  { direction: "se", className: "bottom-0 right-0 h-[8px] w-[8px] cursor-se-resize" },
  { direction: "sw", className: "bottom-0 left-0 h-[8px] w-[8px] cursor-sw-resize" },
];

export function ManagedWindowResizeHandles({ onResizeHandleMouseDown }: ManagedWindowResizeHandlesProps) {
  return (
    <>
      {HANDLES.map((handle) => (
        <span
          key={handle.direction}
          data-resize-handle={handle.direction}
          onMouseDown={onResizeHandleMouseDown(handle.direction)}
          className={`absolute z-[1] select-none ${handle.className}`}
        />
      ))}
    </>
  );
}
