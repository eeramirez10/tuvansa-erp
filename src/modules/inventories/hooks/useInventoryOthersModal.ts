import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { useModal } from "../../ui/hooks/useModal";
import { MODAL_IDS } from "../../ui/store/modal.store";
import { useInventoriesStore } from "../store/inventories.store";

type PriceRow = {
  list: number;
  price: number | null;
  currency: number | null;
  percent: number | null;
};

export const useInventoryOthersModal = () => {
  const { isOpen, close } = useModal(MODAL_IDS.INVENTORY_OTHERS);
  const {
    selectedCode,
    detail,
  } = useInventoriesStore(
    useShallow((state) => ({
      selectedCode: state.selectedCode,
      detail: state.detail,
    })),
  );

  const currentCode = (selectedCode ?? detail?.identity.code ?? "").trim();
  const others = detail?.others;

  const priceRows = useMemo<PriceRow[]>(
    () =>
      others?.prices.lists ?? [
        { list: 4, price: detail?.pricing.price4 ?? null, currency: null, percent: null },
        { list: 5, price: detail?.pricing.price5 ?? null, currency: null, percent: null },
        { list: 6, price: detail?.pricing.price6 ?? null, currency: null, percent: null },
        { list: 7, price: null, currency: null, percent: null },
        { list: 8, price: null, currency: null, percent: null },
        { list: 9, price: null, currency: null, percent: null },
        { list: 10, price: null, currency: null, percent: null },
        { list: 11, price: null, currency: null, percent: null },
        { list: 12, price: null, currency: null, percent: null },
        { list: 13, price: null, currency: null, percent: null },
        { list: 14, price: null, currency: null, percent: null },
        { list: 15, price: null, currency: null, percent: null },
        { list: 16, price: null, currency: null, percent: null },
        { list: 17, price: null, currency: null, percent: null },
        { list: 18, price: null, currency: null, percent: null },
      ],
    [others?.prices.lists, detail?.pricing.price4, detail?.pricing.price5, detail?.pricing.price6],
  );

  return {
    isOpen,
    close,
    currentCode,
    detail,
    others,
    priceRows,
  };
};
