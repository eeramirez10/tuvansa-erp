import { useCallback, useEffect, useMemo, useRef, type MouseEvent as ReactMouseEvent } from "react";
import { useShallow } from "zustand/react/shallow";
import { useWindowManagerStore, type WindowId } from "../store/window-manager.store";

type UseManagedWindowInput = {
  windowId: WindowId;
  isOpen: boolean;
};

type WindowStyle = {
  zIndex: number;
  left: string | number;
  top: string | number;
  transform: string;
  width?: number;
  height?: number;
};

type UseManagedWindowResult = {
  windowRef: (node: HTMLElement | null) => void;
  frameStyle: WindowStyle;
  isMaximized: boolean;
  onFocusWindow: () => void;
  onTitleMouseDown: (event: ReactMouseEvent<HTMLElement>) => void;
  onLayerMouseDown: (event: ReactMouseEvent<HTMLElement>) => void;
  onResizeHandleMouseDown: (direction: ResizeDirection) => (event: ReactMouseEvent<HTMLElement>) => void;
  onToggleMaximize: () => void;
};

type DragState = {
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
};

type ResizeState = {
  direction: ResizeDirection;
  startX: number;
  startY: number;
  startLeft: number;
  startTop: number;
  startWidth: number;
  startHeight: number;
};

export type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

const clamp = (value: number, min: number, max: number): number => {
  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
};

const MIN_VISIBLE_X = 80;
const MIN_VISIBLE_Y = 28;
const HEADER_DRAG_HEIGHT = 30;
const MIN_WINDOW_WIDTH = 240;
const MIN_WINDOW_HEIGHT = 160;

const isInteractiveElement = (target: EventTarget | null): boolean => {
  if (!target) {
    return false;
  }

  const elementTarget =
    target instanceof Element ? target : target instanceof Node ? target.parentElement : null;

  if (!elementTarget) {
    return false;
  }

  return Boolean(elementTarget.closest("button, input, select, textarea, a, [role='button']"));
};

export const useManagedWindow = ({ windowId, isOpen }: UseManagedWindowInput): UseManagedWindowResult => {
  const dragStateRef = useRef<DragState | null>(null);
  const resizeStateRef = useRef<ResizeState | null>(null);
  const frameRef = useRef<HTMLElement | null>(null);
  const {
    windowState,
    registerWindow,
    unregisterWindow,
    focusWindow,
    setWindowPosition,
    setWindowSize,
    toggleWindowMaximize,
  } = useWindowManagerStore(
    useShallow((state) => ({
      windowState: state.windows[windowId],
      registerWindow: state.registerWindow,
      unregisterWindow: state.unregisterWindow,
      focusWindow: state.focusWindow,
      setWindowPosition: state.setWindowPosition,
      setWindowSize: state.setWindowSize,
      toggleWindowMaximize: state.toggleWindowMaximize,
    })),
  );

  useEffect(() => {
    if (isOpen) {
      registerWindow(windowId);
      return;
    }

    unregisterWindow(windowId);
  }, [isOpen, registerWindow, unregisterWindow, windowId]);

  const onFocusWindow = useCallback(() => {
    focusWindow(windowId);
  }, [focusWindow, windowId]);

  const startDrag = useCallback(
    (event: ReactMouseEvent<HTMLElement>, frameElement: HTMLElement) => {
      if (event.button !== 0 || windowState?.maximized) {
        return;
      }

      const frameRect = frameElement.getBoundingClientRect();
      const currentPosition = windowState?.position;

      if (!currentPosition) {
        setWindowPosition(windowId, {
          x: frameRect.left,
          y: frameRect.top,
        });
      }

      dragStateRef.current = {
        offsetX: event.clientX - frameRect.left,
        offsetY: event.clientY - frameRect.top,
        width: frameRect.width,
        height: frameRect.height,
      };

      const onMouseMove = (moveEvent: MouseEvent) => {
        const dragState = dragStateRef.current;
        if (!dragState) {
          return;
        }

        const minX = Math.min(0, window.innerWidth - dragState.width);
        const maxX = Math.max(0, window.innerWidth - MIN_VISIBLE_X);
        const minY = 0;
        const maxY = Math.max(0, window.innerHeight - MIN_VISIBLE_Y);

        const nextX = clamp(moveEvent.clientX - dragState.offsetX, minX, maxX);
        const nextY = clamp(moveEvent.clientY - dragState.offsetY, minY, maxY);

        setWindowPosition(windowId, {
          x: nextX,
          y: nextY,
        });
      };

      const onMouseUp = () => {
        dragStateRef.current = null;
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      event.preventDefault();
    },
    [setWindowPosition, windowId, windowState?.position],
  );

  const startResize = useCallback(
    (event: ReactMouseEvent<HTMLElement>, direction: ResizeDirection, frameElement: HTMLElement) => {
      if (event.button !== 0 || windowState?.maximized) {
        return;
      }

      const frameRect = frameElement.getBoundingClientRect();
      const currentPosition = windowState?.position ?? {
        x: frameRect.left,
        y: frameRect.top,
      };

      setWindowPosition(windowId, currentPosition);

      resizeStateRef.current = {
        direction,
        startX: event.clientX,
        startY: event.clientY,
        startLeft: currentPosition.x,
        startTop: currentPosition.y,
        startWidth: frameRect.width,
        startHeight: frameRect.height,
      };

      const onMouseMove = (moveEvent: MouseEvent) => {
        const resizeState = resizeStateRef.current;
        if (!resizeState) {
          return;
        }

        const dx = moveEvent.clientX - resizeState.startX;
        const dy = moveEvent.clientY - resizeState.startY;

        let nextLeft = resizeState.startLeft;
        let nextTop = resizeState.startTop;
        let nextWidth = resizeState.startWidth;
        let nextHeight = resizeState.startHeight;

        const hasEast = resizeState.direction.includes("e");
        const hasWest = resizeState.direction.includes("w");
        const hasNorth = resizeState.direction.includes("n");
        const hasSouth = resizeState.direction.includes("s");

        if (hasEast) {
          nextWidth = resizeState.startWidth + dx;
        }

        if (hasSouth) {
          nextHeight = resizeState.startHeight + dy;
        }

        if (hasWest) {
          nextWidth = resizeState.startWidth - dx;
          nextLeft = resizeState.startLeft + dx;
        }

        if (hasNorth) {
          nextHeight = resizeState.startHeight - dy;
          nextTop = resizeState.startTop + dy;
        }

        if (nextWidth < MIN_WINDOW_WIDTH) {
          if (hasWest) {
            nextLeft -= MIN_WINDOW_WIDTH - nextWidth;
          }
          nextWidth = MIN_WINDOW_WIDTH;
        }

        if (nextHeight < MIN_WINDOW_HEIGHT) {
          if (hasNorth) {
            nextTop -= MIN_WINDOW_HEIGHT - nextHeight;
          }
          nextHeight = MIN_WINDOW_HEIGHT;
        }

        nextWidth = Math.min(nextWidth, window.innerWidth);
        nextHeight = Math.min(nextHeight, window.innerHeight);

        const minX = Math.min(0, window.innerWidth - nextWidth);
        const maxX = Math.max(0, window.innerWidth - MIN_VISIBLE_X);
        const minY = 0;
        const maxY = Math.max(0, window.innerHeight - MIN_VISIBLE_Y);

        nextLeft = clamp(nextLeft, minX, maxX);
        nextTop = clamp(nextTop, minY, maxY);

        setWindowPosition(windowId, {
          x: Math.round(nextLeft),
          y: Math.round(nextTop),
        });

        setWindowSize(windowId, {
          width: Math.round(nextWidth),
          height: Math.round(nextHeight),
        });
      };

      const onMouseUp = () => {
        resizeStateRef.current = null;
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      event.preventDefault();
      event.stopPropagation();
    },
    [setWindowPosition, setWindowSize, windowId, windowState?.maximized, windowState?.position],
  );

  const onTitleMouseDown = useCallback(
    (event: ReactMouseEvent<HTMLElement>) => {
      const frameElement = (event.currentTarget as HTMLElement).closest("[data-managed-window='true']") as HTMLElement | null;
      if (!frameElement) {
        return;
      }

      startDrag(event, frameElement);
    },
    [startDrag],
  );

  const onLayerMouseDown = useCallback(
    (event: ReactMouseEvent<HTMLElement>) => {
      if (event.defaultPrevented) {
        return;
      }

      const frameElement = (event.currentTarget as HTMLElement).closest("[data-managed-window='true']") as HTMLElement | null;
      if (!frameElement) {
        return;
      }

      const frameRect = frameElement.getBoundingClientRect();
      const inHeaderBand = event.clientY - frameRect.top <= HEADER_DRAG_HEIGHT;
      if (!inHeaderBand) {
        return;
      }

      if (isInteractiveElement(event.target)) {
        return;
      }

      startDrag(event, frameElement);
    },
    [startDrag],
  );

  const onResizeHandleMouseDown = useCallback(
    (direction: ResizeDirection) => (event: ReactMouseEvent<HTMLElement>) => {
      const frameElement = (event.currentTarget as HTMLElement).closest("[data-managed-window='true']") as HTMLElement | null;
      if (!frameElement) {
        return;
      }

      focusWindow(windowId);
      startResize(event, direction, frameElement);
    },
    [focusWindow, startResize, windowId],
  );

  const onToggleMaximize = useCallback(() => {
    focusWindow(windowId);
    toggleWindowMaximize(windowId, {
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, [focusWindow, toggleWindowMaximize, windowId]);

  const windowRef = useCallback(
    (node: HTMLElement | null) => {
      frameRef.current = node;
    },
    [],
  );

  useEffect(() => {
    if (!isOpen || !windowState?.maximized) {
      return;
    }

    const syncMaximizedSize = () => {
      setWindowPosition(windowId, { x: 0, y: 0 });
      setWindowSize(windowId, {
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    syncMaximizedSize();
    window.addEventListener("resize", syncMaximizedSize);
    return () => window.removeEventListener("resize", syncMaximizedSize);
  }, [isOpen, setWindowPosition, setWindowSize, windowId, windowState?.maximized]);

  useEffect(() => {
    if (!isOpen || !windowState?.position || !windowState?.size) {
      return;
    }

    const currentPosition = windowState.position;
    const currentSize = windowState.size;

    const clampToViewport = () => {
      const minX = Math.min(0, window.innerWidth - currentSize.width);
      const maxX = Math.max(0, window.innerWidth - MIN_VISIBLE_X);
      const minY = 0;
      const maxY = Math.max(0, window.innerHeight - MIN_VISIBLE_Y);

      const nextX = clamp(currentPosition.x, minX, maxX);
      const nextY = clamp(currentPosition.y, minY, maxY);

      if (nextX !== currentPosition.x || nextY !== currentPosition.y) {
        setWindowPosition(windowId, { x: nextX, y: nextY });
      }
    };

    clampToViewport();
    window.addEventListener("resize", clampToViewport);
    return () => window.removeEventListener("resize", clampToViewport);
  }, [isOpen, setWindowPosition, windowId, windowState?.position, windowState?.size]);

  const frameStyle = useMemo<WindowStyle>(() => {
    const zIndex = windowState?.zIndex ?? 70;

    if (!windowState?.position) {
      return {
        zIndex,
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: windowState?.size?.width,
        height: windowState?.size?.height,
      };
    }

    return {
      zIndex,
      left: windowState.position.x,
      top: windowState.position.y,
      transform: "none",
      width: windowState?.size?.width,
      height: windowState?.size?.height,
    };
  }, [windowState]);

  return {
    windowRef,
    frameStyle,
    isMaximized: windowState?.maximized ?? false,
    onFocusWindow,
    onTitleMouseDown,
    onLayerMouseDown,
    onResizeHandleMouseDown,
    onToggleMaximize,
  };
};
