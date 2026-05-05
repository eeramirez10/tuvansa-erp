import { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useModal } from "../../ui/hooks/useModal";
import { MODAL_IDS } from "../../ui/store/modal.store";
import { useInventoriesStore } from "../store/inventories.store";
import { getInventoryPurchasesBySupplierByCode } from "../api/inventories.api";
import type { InventoryPurchaseBySupplierRow } from "../types/inventory.types";

export type PurchaseBySupplierRow = {
  code: string;
  supplier: string;
  quantity: number;
  amount: number;
};

const asNumber = (value: number | null | undefined): number => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return 0;
  }

  return value;
};

const mapRow = (row: InventoryPurchaseBySupplierRow): PurchaseBySupplierRow => ({
  code: row.code,
  supplier: row.supplier,
  quantity: asNumber(row.quantity),
  amount: asNumber(row.amount),
});

export const useInventoryComprasProveedorModal = () => {
  const { isOpen, close } = useModal(MODAL_IDS.INVENTORY_COMPRAS_PROVEEDOR);
  const { selectedCode, detail } = useInventoriesStore(
    useShallow((state) => ({
      selectedCode: state.selectedCode,
      detail: state.detail,
    })),
  );

  const currentCode = (selectedCode ?? detail?.identity.code ?? "").trim();
  const [rows, setRows] = useState<PurchaseBySupplierRow[]>([]);
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

    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getInventoryPurchasesBySupplierByCode(currentCode, {
          signal: abortController.signal,
        });

        if (!isCancelled) {
          setRows(response.data.map(mapRow));
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
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Error cargando compras por proveedor.",
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

  const summary = useMemo(() => {
    const fallbackTotalQuantity = rows.reduce((acc, row) => acc + row.quantity, 0);
    const fallbackTotalAmount = rows.reduce((acc, row) => acc + row.amount, 0);

    return {
      totalQuantity: metaTotalQuantity || fallbackTotalQuantity,
      totalAmount: metaTotalAmount || fallbackTotalAmount,
    };
  }, [rows, metaTotalAmount, metaTotalQuantity]);

  return {
    isOpen,
    close,
    currentCode,
    rows,
    summary,
    isLoading,
    error,
  };
};
