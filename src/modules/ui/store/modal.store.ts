import { create } from "zustand";

export const MODAL_IDS = {
  INVENTORY_SEARCH: "inventorySearch",
} as const;

export type ModalId = (typeof MODAL_IDS)[keyof typeof MODAL_IDS];

type ModalOpenById = Partial<Record<ModalId, boolean>>;

type ModalStore = {
  openById: ModalOpenById;
  openModal: (id: ModalId) => void;
  closeModal: (id: ModalId) => void;
  closeAllModals: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  openById: {},
  openModal: (id) => {
    set((state) => ({
      openById: {
        ...state.openById,
        [id]: true,
      },
    }));
  },
  closeModal: (id) => {
    set((state) => ({
      openById: {
        ...state.openById,
        [id]: false,
      },
    }));
  },
  closeAllModals: () => {
    set({ openById: {} });
  },
}));
