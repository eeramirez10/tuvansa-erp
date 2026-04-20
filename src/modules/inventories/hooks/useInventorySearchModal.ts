import { FormEvent, KeyboardEvent, useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useLocation, useNavigate } from "react-router-dom";
import { useInventoriesStore } from "../store/inventories.store";
import { MODAL_IDS } from "../../ui/store/modal.store";
import { useModal } from "../../ui/hooks/useModal";

type UseInventorySearchModalReturn = {
  isOpen: boolean;
  searchCode: string;
  searchDescription: string;
  activeCode: string | null;
  list: ReturnType<typeof useInventoriesStore.getState>["list"];
  isListLoading: boolean;
  listError: string | null;
  setSearchCode: (value: string) => void;
  setSearchDescription: (value: string) => void;
  closeModal: () => void;
  selectRow: (code: string) => void;
  selectProduct: (code: string) => Promise<void>;
  confirmSelect: () => Promise<void>;
  handleSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleCodeInputTab: (event: KeyboardEvent<HTMLInputElement>) => void;
  handleDescriptionInputTab: (event: KeyboardEvent<HTMLInputElement>) => void;
};

export const useInventorySearchModal = (): UseInventorySearchModalReturn => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isInventoriesModule = pathname.startsWith("/inventarios");
  const [searchCode, setSearchCode] = useState("");
  const [searchDescription, setSearchDescription] = useState("");
  const [activeCode, setActiveCode] = useState<string | null>(null);
  const { isOpen, close: closeModal } = useModal(MODAL_IDS.INVENTORY_SEARCH);
  const { list, isListLoading, listError, loadInventories, selectInventory } = useInventoriesStore(
    useShallow((state) => ({
      list: state.list,
      isListLoading: state.isListLoading,
      listError: state.listError,
      loadInventories: state.loadInventories,
      selectInventory: state.selectInventory,
    })),
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setActiveCode((current) => {
      if (current && list.some((item) => item.code === current)) {
        return current;
      }

      return list[0]?.code ?? null;
    });
  }, [isOpen, list]);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = `${searchCode} ${searchDescription}`.trim();

    void loadInventories({
      q: query.length > 0 ? query : undefined,
      offset: 0,
    });
  };

  const handleDescriptionInputTab = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Tab" || event.shiftKey) {
      return;
    }

    const query = searchDescription.trim();

    void loadInventories({
      q: query.length > 0 ? query : undefined,
      offset: 0,
    });
  };

  const handleCodeInputTab = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Tab" || event.shiftKey) {
      return;
    }

    const codeQuery = searchCode.trim();

    if (!codeQuery) {
      return;
    }

    void loadInventories({
      q: codeQuery,
      offset: 0,
    });
  };

  const selectProduct = async (code: string) => {
    if (!isInventoriesModule) {
      navigate("/inventarios");
    }

    await selectInventory(code);
    closeModal();
  };

  const confirmSelect = async () => {
    if (!activeCode) {
      return;
    }

    await selectProduct(activeCode);
  };

  return {
    isOpen,
    searchCode,
    searchDescription,
    activeCode,
    list,
    isListLoading,
    listError,
    setSearchCode,
    setSearchDescription,
    closeModal,
    selectRow: setActiveCode,
    selectProduct,
    confirmSelect,
    handleSearchSubmit,
    handleCodeInputTab,
    handleDescriptionInputTab,
  };
};
