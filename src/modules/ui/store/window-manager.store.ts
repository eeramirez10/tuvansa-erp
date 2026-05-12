import { create } from "zustand";

export type WindowId = string;

type WindowPosition = {
  x: number;
  y: number;
};

type WindowSize = {
  width: number;
  height: number;
};

type ManagedWindow = {
  zIndex: number;
  position: WindowPosition | null;
  size: WindowSize | null;
  maximized: boolean;
  restorePosition: WindowPosition | null;
  restoreSize: WindowSize | null;
};

type WindowManagerState = {
  windows: Partial<Record<WindowId, ManagedWindow>>;
  topZIndex: number;
  registerWindow: (id: WindowId) => void;
  unregisterWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  setWindowPosition: (id: WindowId, position: WindowPosition) => void;
  setWindowSize: (id: WindowId, size: WindowSize) => void;
  toggleWindowMaximize: (id: WindowId, viewport: WindowSize) => void;
  resetWindowPosition: (id: WindowId) => void;
};

const WINDOW_Z_INDEX_BASE = 70;

export const useWindowManagerStore = create<WindowManagerState>((set, get) => ({
  windows: {},
  topZIndex: WINDOW_Z_INDEX_BASE,
  registerWindow: (id) => {
    const current = get().windows[id];

    if (current) {
      get().focusWindow(id);
      return;
    }

    set((state) => {
      const nextTop = state.topZIndex + 1;
      return {
        topZIndex: nextTop,
        windows: {
          ...state.windows,
          [id]: {
            zIndex: nextTop,
            position: null,
            size: null,
            maximized: false,
            restorePosition: null,
            restoreSize: null,
          },
        },
      };
    });
  },
  unregisterWindow: (id) => {
    set((state) => {
      if (!state.windows[id]) {
        return state;
      }

      const nextWindows = { ...state.windows };
      delete nextWindows[id];

      return {
        ...state,
        windows: nextWindows,
      };
    });
  },
  focusWindow: (id) => {
    set((state) => {
      const target = state.windows[id];
      if (!target) {
        return state;
      }

      const nextTop = state.topZIndex + 1;
      return {
        topZIndex: nextTop,
        windows: {
          ...state.windows,
          [id]: {
            ...target,
            zIndex: nextTop,
          },
        },
      };
    });
  },
  setWindowPosition: (id, position) => {
    set((state) => {
      const target = state.windows[id];
      if (!target) {
        return state;
      }

      return {
        windows: {
          ...state.windows,
          [id]: {
            ...target,
            position,
            maximized: false,
          },
        },
      };
    });
  },
  setWindowSize: (id, size) => {
    set((state) => {
      const target = state.windows[id];
      if (!target) {
        return state;
      }

      return {
        windows: {
          ...state.windows,
          [id]: {
            ...target,
            size,
          },
        },
      };
    });
  },
  toggleWindowMaximize: (id, viewport) => {
    set((state) => {
      const target = state.windows[id];
      if (!target) {
        return state;
      }

      if (target.maximized) {
        return {
          windows: {
            ...state.windows,
            [id]: {
              ...target,
              maximized: false,
              position: target.restorePosition,
              size: target.restoreSize,
              restorePosition: null,
              restoreSize: null,
            },
          },
        };
      }

      return {
        windows: {
          ...state.windows,
          [id]: {
            ...target,
            maximized: true,
            restorePosition: target.position,
            restoreSize: target.size,
            position: { x: 0, y: 0 },
            size: viewport,
          },
        },
      };
    });
  },
  resetWindowPosition: (id) => {
    set((state) => {
      const target = state.windows[id];
      if (!target) {
        return state;
      }

      return {
        windows: {
          ...state.windows,
          [id]: {
            ...target,
            position: null,
            maximized: false,
            restorePosition: null,
            restoreSize: null,
          },
        },
      };
    });
  },
}));
