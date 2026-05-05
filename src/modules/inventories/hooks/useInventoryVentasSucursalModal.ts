import { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { getInventorySalesByBranchByCode } from "../api/inventories.api";
import { useModal } from "../../ui/hooks/useModal";
import { MODAL_IDS } from "../../ui/store/modal.store";
import { useInventoriesStore } from "../store/inventories.store";
import type { InventoryBranchSaleRow } from "../types/inventory.types";

export type BranchSaleRow = {
  branch: string;
  code: string;
  client: string;
  quantity: number;
  amount: number;
};

type BranchSalesSummary = {
  totalQuantity: number;
  totalAmount: number;
};

const asNumber = (value: number | null | undefined): number => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return 0;
  }

  return value;
};

const mapBranchSaleRow = (row: InventoryBranchSaleRow): BranchSaleRow => ({
  branch: row.branch || "0",
  code: row.code,
  client: row.client,
  quantity: asNumber(row.quantity),
  amount: asNumber(row.amount),
});

export const useInventoryVentasSucursalModal = () => {
  const { isOpen, close } = useModal(MODAL_IDS.INVENTORY_VENTAS_SUCURSAL);
  const { selectedCode, detail } = useInventoriesStore(
    useShallow((state) => ({
      selectedCode: state.selectedCode,
      detail: state.detail,
    })),
  );

  const currentCode = (selectedCode ?? detail?.identity.code ?? "").trim();

  const [rows, setRows] = useState<BranchSaleRow[]>([]);
  const [metaTotalQuantity, setMetaTotalQuantity] = useState(0);
  const [metaTotalAmount, setMetaTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setRows([]);
      setMetaTotalQuantity(0);
      setMetaTotalAmount(0);
      setError(null);
      return;
    }

    if (!currentCode) {
      setRows([]);
      setMetaTotalQuantity(0);
      setMetaTotalAmount(0);
      setError("No hay producto seleccionado.");
      return;
    }

    let isCancelled = false;
    const abortController = new AbortController();

    const loadBranchSales = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getInventorySalesByBranchByCode(currentCode, {
          signal: abortController.signal,
        });

        if (!isCancelled) {
          setRows(response.data.map(mapBranchSaleRow));
          setMetaTotalQuantity(asNumber(response.meta.totalQuantity));
          setMetaTotalAmount(asNumber(response.meta.totalAmount));
        }
      } catch (loadError) {
        if (loadError instanceof DOMException && loadError.name === "AbortError") {
          return;
        }

        if (!isCancelled) {
          setRows([]);
          setMetaTotalQuantity(0);
          setMetaTotalAmount(0);
          setError(loadError instanceof Error ? loadError.message : "Error cargando ventas por sucursal.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadBranchSales();

    return () => {
      isCancelled = true;
      abortController.abort();
    };
  }, [isOpen, currentCode]);

  const summary = useMemo<BranchSalesSummary>(() => {
    const fallbackQuantity = rows.reduce((acc, row) => acc + row.quantity, 0);
    const fallbackAmount = rows.reduce((acc, row) => acc + row.amount, 0);

    return {
      totalQuantity: metaTotalQuantity || fallbackQuantity,
      totalAmount: metaTotalAmount || fallbackAmount,
    };
  }, [rows, metaTotalAmount, metaTotalQuantity]);

  return {
    isOpen,
    close,
    currentCode,
    rows,
    isLoading,
    error,
    summary,
  };
};
