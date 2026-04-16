import { useShallow } from "zustand/react/shallow";
import { useModalStore, type ModalId } from "../store/modal.store";

type UseModalReturn = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useModal = (modalId: ModalId): UseModalReturn => {
  const { isOpen, openModal, closeModal } = useModalStore(
    useShallow((state) => ({
      isOpen: Boolean(state.openById[modalId]),
      openModal: state.openModal,
      closeModal: state.closeModal,
    })),
  );

  return {
    isOpen,
    open: () => openModal(modalId),
    close: () => closeModal(modalId),
  };
};
