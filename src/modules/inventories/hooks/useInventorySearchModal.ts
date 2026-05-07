import { FormEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
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
  const activeSearchControllerRef = useRef<AbortController | null>(null);
  const lastSearchKeyRef = useRef<string>("");
  const { isOpen, close: closeModalRaw } = useModal(MODAL_IDS.INVENTORY_SEARCH);
  const { list, isListLoading, listError, loadInventories, selectInventory } = useInventoriesStore(
    useShallow((state) => ({
      list: state.list,
      isListLoading: state.isListLoading,
      listError: state.listError,
      loadInventories: state.loadInventories,
      selectInventory: state.selectInventory,
    })),
  );

  const cancelSearchRequest = useCallback(() => {
    activeSearchControllerRef.current?.abort();
    activeSearchControllerRef.current = null;
  }, []);

  const runSearch = useCallback(
    (query?: string, searchBy: "auto" | "code" | "description" = "auto") => {
      const normalizedQuery = query?.trim() ?? "";
      const searchKey = `${searchBy}:${normalizedQuery}`;

      if (lastSearchKeyRef.current === searchKey && isListLoading) {
        return;
      }

      cancelSearchRequest();
      const controller = new AbortController();
      activeSearchControllerRef.current = controller;
      lastSearchKeyRef.current = searchKey;

      void loadInventories({
        q: normalizedQuery || undefined,
        searchBy,
        limit: 10,
        offset: 0,
        autoSelectFallback: false,
        signal: controller.signal,
      });
    },
    [cancelSearchRequest, isListLoading, loadInventories],
  );

  const closeModal = useCallback(() => {
    cancelSearchRequest();
    lastSearchKeyRef.current = "";
    closeModalRaw();
  }, [cancelSearchRequest, closeModalRaw]);

  useEffect(() => () => {
    cancelSearchRequest();
  }, [cancelSearchRequest]);

  useEffect(() => {
    if (!isOpen) {
      cancelSearchRequest();
      return;
    }

    setActiveCode((current) => {
      if (current && list.some((item) => item.code === current)) {
        return current;
      }

      return list[0]?.code ?? null;
    });
  }, [isOpen, list, cancelSearchRequest]);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = `${searchCode} ${searchDescription}`.trim();

    runSearch(query.length > 0 ? query : undefined, "auto");
  };

  const handleDescriptionInputTab = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Tab" || event.shiftKey) {
      return;
    }

    const query = searchDescription.trim();

    runSearch(query.length > 0 ? query : undefined, "description");
  };

  const handleCodeInputTab = (event: KeyboardEvent<HTMLInputElement>) => {
    if ((event.key !== "Tab" && event.key !== 'Enter') || event.shiftKey) {
      return;
    }

    const codeQuery = searchCode.trim();

    if (!codeQuery) {
      return;
    }

    runSearch(codeQuery, "code");
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
