import { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useModal } from "../../ui/hooks/useModal";
import { MODAL_IDS } from "../../ui/store/modal.store";
import { useInventoriesStore } from "../store/inventories.store";
import { getInventoryQuotedSuppliersByCode } from "../api/inventories.api";
import type { InventoryQuotedSupplierRow } from "../types/inventory.types";

export type QuotedSupplierRow = {
  code: string;
  description: string;
  oc: string;
  um: string;
  ordered: number;
  supplied: number;
  remaining: number;
  date: string | null;
  expectedDate: string | null;
  observations: string;
  date2: string | null;
};

const asNumber = (value: number | null | undefined): number => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return 0;
  }

  return value;
};

const mapRow = (row: InventoryQuotedSupplierRow): QuotedSupplierRow => ({
  code: row.code,
  description: row.description,
  oc: row.oc,
  um: row.um,
  ordered: asNumber(row.ordered),
  supplied: asNumber(row.supplied),
  remaining: asNumber(row.remaining),
  date: row.date,
  expectedDate: row.expectedDate,
  observations: row.observations,
  date2: row.date2
});

export const useInventoryCotizadoProveedoresModal = () => {
  const { isOpen, close } = useModal(MODAL_IDS.INVENTORY_COTIZADO_PROVEEDORES);
  const { selectedCode, detail } = useInventoriesStore(
    useShallow((state) => ({
      selectedCode: state.selectedCode,
      detail: state.detail
    }))
  );

  const currentCode = (selectedCode ?? detail?.identity.code ?? "").trim();
  const [rows, setRows] = useState<QuotedSupplierRow[]>([]);
  const [metaStock, setMetaStock] = useState(0);
  const [metaPending, setMetaPending] = useState(0);
  const [metaTotal, setMetaTotal] = useState(0);
  const [pendingOnly, setPendingOnly] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setRows([]);
      setMetaStock(0);
      setMetaPending(0);
      setMetaTotal(0);
      setError(null);
      setPendingOnly(true);
      return;
    }

    if (!currentCode) {
      setRows([]);
      setMetaStock(0);
      setMetaPending(0);
      setMetaTotal(0);
      setError("No hay producto seleccionado.");
      return;
    }

    let isCancelled = false;
    const abortController = new AbortController();

    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getInventoryQuotedSuppliersByCode(currentCode, {
          signal: abortController.signal,
          pending: pendingOnly
        });

        if (!isCancelled) {
          setRows(response.data.map(mapRow));
          setMetaStock(asNumber(response.meta.stock));
          setMetaPending(asNumber(response.meta.pending));
          setMetaTotal(asNumber(response.meta.total));
        }
      } catch (loadError) {
        if (loadError instanceof DOMException && loadError.name === "AbortError") {
          return;
        }

        if (!isCancelled) {
          setRows([]);
          setMetaStock(0);
          setMetaPending(0);
          setMetaTotal(0);
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Error cargando cotizado a proveedores."
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
  }, [isOpen, currentCode, pendingOnly]);

  const summary = useMemo(() => {
    const fallbackStock = rows.reduce((acc, row) => acc + row.supplied, 0);
    const fallbackPending = rows.reduce((acc, row) => acc + row.remaining, 0);
    const stock = metaStock || fallbackStock;
    const pending = metaPending || fallbackPending;
    const total = metaTotal || stock + pending;

    return {
      stock,
      pending,
      total
    };
  }, [rows, metaStock, metaPending, metaTotal]);

  const togglePendingOnly = () => {
    setPendingOnly((previous) => !previous);
  };

  return {
    isOpen,
    close,
    currentCode,
    rows,
    summary,
    pendingOnly,
    togglePendingOnly,
    isLoading,
    error
  };
};
