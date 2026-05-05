import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { getInventoryPurchasesBreakdownByCode } from "../api/inventories.api";
import { useModal } from "../../ui/hooks/useModal";
import { MODAL_IDS } from "../../ui/store/modal.store";
import { useInventoriesStore } from "../store/inventories.store";
import type { InventoryPurchaseBreakdownRow } from "../types/inventory.types";

export type PurchaseBreakdownRow = {
  code: string;
  supplier: string;
  quantity: number;
  price: number;
  document: string;
  date: string | null;
  pieces: number;
  exchangeRate: number;
  dollarsAmount: number;
};

const asNumber = (value: number | null | undefined): number => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return 0;
  }

  return value;
};

const mapRow = (row: InventoryPurchaseBreakdownRow): PurchaseBreakdownRow => ({
  code: row.code,
  supplier: row.supplier,
  quantity: asNumber(row.quantity),
  price: asNumber(row.price),
  document: row.document,
  date: row.date,
  pieces: asNumber(row.pieces),
  exchangeRate: asNumber(row.dollarExchangeRate),
  dollarsAmount: asNumber(row.amountDollars),
});

const parseOptionalLegacyNumber = (rawValue: unknown): number | undefined => {
  if (rawValue === undefined || rawValue === null || String(rawValue).trim() === "") {
    return undefined;
  }

  const numericValue = Number(rawValue);
  return Number.isFinite(numericValue) ? numericValue : undefined;
};

const LEGACY_DEST = parseOptionalLegacyNumber(import.meta.env.VITE_LEGACY_DEST) ?? 0;
const LEGACY_MULTICIA = parseOptionalLegacyNumber(import.meta.env.VITE_LEGACY_MULTICIA) ?? 1;

export const useInventoryComprasDesglosadasModal = () => {
  const { isOpen, close } = useModal(MODAL_IDS.INVENTORY_COMPRAS_DESGLOSADAS);
  const { selectedCode, detail } = useInventoriesStore(
    useShallow((state) => ({
      selectedCode: state.selectedCode,
      detail: state.detail,
    })),
  );

  const currentCode = (selectedCode ?? detail?.identity.code ?? "").trim();
  const [rows, setRows] = useState<PurchaseBreakdownRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setRows([]);
      setError(null);
      return;
    }

    if (!currentCode) {
      setRows([]);
      setError("No hay producto seleccionado.");
      return;
    }

    let isCancelled = false;
    const abortController = new AbortController();

    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getInventoryPurchasesBreakdownByCode(currentCode, {
          dest: LEGACY_DEST,
          multicia: LEGACY_MULTICIA,
          signal: abortController.signal,
        });

        if (!isCancelled) {
          setRows(response.data.map(mapRow));
        }
      } catch (loadError) {
        if (loadError instanceof DOMException && loadError.name === "AbortError") {
          return;
        }

        if (!isCancelled) {
          setRows([]);
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Error cargando compras desglosadas.",
          );
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    void load();

    return () => {
      isCancelled = true;
      abortController.abort();
    };
  }, [isOpen, currentCode]);

  return {
    isOpen,
    close,
    currentCode,
    rows,
    isLoading,
    error,
  };
};
