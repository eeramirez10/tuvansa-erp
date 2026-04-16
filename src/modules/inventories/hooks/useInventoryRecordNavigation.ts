import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { useInventoriesStore } from "../store/inventories.store";

type UseInventoryRecordNavigationReturn = {
  isEnabled: boolean;
  isLoading: boolean;
  goToPrevious: () => void;
  goToNext: () => void;
};

export const useInventoryRecordNavigation = (): UseInventoryRecordNavigationReturn => {
  const { pathname } = useLocation();
  const isEnabled = pathname.startsWith("/inventarios");
  const { isListLoading, isDetailLoading, selectPreviousInventory, selectNextInventory } = useInventoriesStore(
    useShallow((state) => ({
      isListLoading: state.isListLoading,
      isDetailLoading: state.isDetailLoading,
      selectPreviousInventory: state.selectPreviousInventory,
      selectNextInventory: state.selectNextInventory,
    })),
  );

  const isLoading = isListLoading || isDetailLoading;

  const goToPrevious = useCallback(() => {
    if (!isEnabled || isLoading) {
      return;
    }

    void selectPreviousInventory();
  }, [isEnabled, isLoading, selectPreviousInventory]);

  const goToNext = useCallback(() => {
    if (!isEnabled || isLoading) {
      return;
    }

    void selectNextInventory();
  }, [isEnabled, isLoading, selectNextInventory]);

  return {
    isEnabled,
    isLoading,
    goToPrevious,
    goToNext,
  };
};
