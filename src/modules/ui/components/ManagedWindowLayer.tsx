import type { ReactNode } from "react";
import { useManagedWindow } from "../hooks/useManagedWindow";
import type { WindowId } from "../store/window-manager.store";

type ManagedWindowLayerProps = {
  windowId: WindowId;
  isOpen: boolean;
  children: ReactNode;
};

export function ManagedWindowLayer({ windowId, isOpen, children }: ManagedWindowLayerProps) {
  const { windowRef, frameStyle, isMaximized, onFocusWindow, onLayerMouseDown } = useManagedWindow({
    windowId,
    isOpen,
  });

  if (!isOpen) {
    return null;
  }

  const { zIndex, ...layoutStyle } = frameStyle;

  return (
    <div className="pointer-events-none fixed inset-0 p-4" style={{ zIndex }}>
      <div
        ref={windowRef}
        data-managed-window="true"
        style={layoutStyle}
        onMouseDown={onFocusWindow}
        onMouseDownCapture={onLayerMouseDown}
        className={`pointer-events-auto fixed ${isMaximized ? "inset-0 h-full w-full" : ""}`}
      >
        <div data-window-content="true" className="h-full w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
