import { useEffect, useState } from "react";
import { inventoryTabs } from "../constants";
import { useInventoriesStore } from "../store/inventories.store";
import { useShallow } from "zustand/shallow";

type InventoryTabKey = (typeof inventoryTabs)[number]["key"];
export const useInventoriesPage = () => {
  const [activeTab, setActiveTab] = useState<InventoryTabKey>("general");

  const {
    detail,
    initialize,
  } = useInventoriesStore(
    useShallow((state) => ({
      detail: state.detail,
      initialize: state.initialize,
    })),
  );

  useEffect(() => {
    void initialize();
  }, [initialize]);

  return {
    setActiveTab,
    activeTab,
    detail,
    identity: detail?.identity,
    pricing: detail?.pricing,
    accumulators: detail?.accumulators,
    storage: detail?.storage,
    dimensions: detail?.dimensions,
    purchases: detail?.purchases,
    accounts: detail?.accounts,
    indicators: detail?.indicators
  };
};
