import { useState } from "react";
import { inventoryTabs } from "../constants";
import { useInventoriesStore } from "../store/inventories.store";
import { useShallow } from "zustand/shallow";

type InventoryTabKey = (typeof inventoryTabs)[number]["key"];
export const useInventoriesPage = () => {
  const [activeTab, setActiveTab] = useState<InventoryTabKey>("general");

  const {
    detail,
  } = useInventoriesStore(
    useShallow((state) => ({
      detail: state.detail,
    })),
  );

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
    imports: detail?.imports,
    production: detail?.production,
    taxes: detail?.taxes,
    accounts: detail?.accounts,
    indicators: detail?.indicators
  };
};
