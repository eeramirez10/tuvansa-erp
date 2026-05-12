import { Copy, Square, X } from "lucide-react";
import type { ReactNode } from "react";
import { useManagedWindow } from "../hooks/useManagedWindow";
import type { WindowId } from "../store/window-manager.store";

type ManagedWindowFrameProps = {
  windowId: WindowId;
  isOpen: boolean;
  title: string;
  className: string;
  onClose: () => void;
  children: ReactNode;
};

export function ManagedWindowFrame({
  windowId,
  isOpen,
  title,
  className,
  onClose,
  children,
}: ManagedWindowFrameProps) {
  const {
    windowRef,
    frameStyle,
    isMaximized,
    onFocusWindow,
    onTitleMouseDown,
    onToggleMaximize,
  } = useManagedWindow({
    windowId,
    isOpen,
  });

  if (!isOpen) {
    return null;
  }

  const { zIndex, ...layoutStyle } = frameStyle;

  return (
    <div className="pointer-events-none fixed inset-0 p-4" style={{ zIndex }}>
      <section
        ref={windowRef}
        data-managed-window="true"
        style={layoutStyle}
        onMouseDown={onFocusWindow}
        className={`pointer-events-auto fixed flex flex-col border border-[#2f8ce8] bg-[#ececec] text-[11px] text-black shadow-[0_8px_18px_rgba(0,0,0,0.25)] ${isMaximized ? "inset-0 h-full w-full" : ""} ${className}`}
      >
        <header
          onMouseDown={onTitleMouseDown}
          onDoubleClick={onToggleMaximize}
          className="flex h-[24px] shrink-0 cursor-move items-center justify-between border-b border-[#9aa2aa] bg-[#f6f6f6] px-[4px]"
        >
          <div className="flex items-center gap-[3px]">
            <span className="h-[12px] w-[12px] border border-[#8fa6cc] bg-white" />
            <h2 className="text-[12px] leading-none font-normal">{title}</h2>
          </div>
          <div className="flex items-center gap-[8px]">
            <button type="button" onClick={onToggleMaximize} className="grid h-[16px] w-[16px] place-items-center bg-transparent">
              {isMaximized ? <Copy className="h-3 w-3" /> : <Square className="h-3 w-3" />}
            </button>
            <button type="button" onClick={onClose} className="grid h-[16px] w-[16px] place-items-center bg-transparent">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </header>
        {children}
      </section>
    </div>
  );
}
