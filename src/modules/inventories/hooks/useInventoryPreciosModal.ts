import { useShallow } from "zustand/react/shallow";
import { useModal } from "../../ui/hooks/useModal";
import { MODAL_IDS } from "../../ui/store/modal.store";
import { useInventoriesStore } from "../store/inventories.store";

type PriceRow = {
  list: number;
  price: number;
  currency: number;
  percent: number;
};

type ModalPricingData = {
  isOpen: boolean;
  close: () => void;
  currentCode: string;
  cost: number;
  decimals: number;
  rows: PriceRow[];
  planPos: [number, number, number];
  priceLevel: number;
};

const PRICE_LISTS = [1, 2, 3, 6, 7, 8, 9, 10, 11, 12, 13] as const;

const asNumber = (value: number | null | undefined): number => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return 0;
  }

  return value;
};

const calculatePercent = (price: number, cost: number): number => {
  if (!Number.isFinite(price) || price === 0) {
    return 0;
  }

  return ((price - cost) / price) * 100;
};

export const useInventoryPreciosModal = (): ModalPricingData => {
  const { isOpen, close } = useModal(MODAL_IDS.INVENTORY_PRECIOS);
  const { selectedCode, detail } = useInventoriesStore(
    useShallow((state) => ({
      selectedCode: state.selectedCode,
      detail: state.detail,
    })),
  );

  const currentCode = (selectedCode ?? detail?.identity.code ?? "").trim();
  const cost = asNumber(detail?.purchases.lastFiveCost ?? detail?.pricing.price5);
  const listPriceByNumber = new Map<number, number>();
  const listCurrencyByNumber = new Map<number, number>();
  const listPercentByNumber = new Map<number, number>();

  if (detail?.others.prices.lists) {
    for (const row of detail.others.prices.lists) {
      listPriceByNumber.set(row.list, asNumber(row.price));
      listCurrencyByNumber.set(row.list, asNumber(row.currency));
      listPercentByNumber.set(row.list, asNumber(row.percent));
    }
  }

  listPriceByNumber.set(1, asNumber(detail?.pricing.price1));
  listPriceByNumber.set(2, asNumber(detail?.pricing.price2));
  listPriceByNumber.set(3, asNumber(detail?.pricing.price3));
  listPriceByNumber.set(6, asNumber(detail?.pricing.price6 || listPriceByNumber.get(6)));

  listCurrencyByNumber.set(1, asNumber(detail?.pricing.currency1));
  listCurrencyByNumber.set(2, asNumber(detail?.pricing.currency2));
  listCurrencyByNumber.set(3, asNumber(detail?.pricing.currency3));

  const rows: PriceRow[] = PRICE_LISTS.map((listNumber) => {
    const price = asNumber(listPriceByNumber.get(listNumber));
    const currency = asNumber(listCurrencyByNumber.get(listNumber));
    const legacyPercent = listPercentByNumber.get(listNumber);
    const percent = legacyPercent !== undefined ? legacyPercent : calculatePercent(price, cost);

    return {
      list: listNumber,
      price,
      currency,
      percent,
    };
  });

  return {
    isOpen,
    close,
    currentCode,
    cost,
    decimals: 0,
    rows,
    // Pending backend extension: these three fields are not mapped in current inventory detail DTO.
    planPos: [0, 0, 0],
    // Pending backend extension: INIVELPRECIO is not mapped in current inventory detail DTO.
    priceLevel: 0,
  };
};
