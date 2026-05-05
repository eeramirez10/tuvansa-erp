import { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useModal } from "../../ui/hooks/useModal";
import { MODAL_IDS } from "../../ui/store/modal.store";
import { useInventoriesStore } from "../store/inventories.store";
import { getInventoryOrderedSuppliersByCode } from "../api/inventories.api";
import type { InventoryOrderedSupplierRow } from "../types/inventory.types";

export type OrderedSupplierRow = {
  code: string;
  description: string;
  oc: string;
  branch: string;
  um: string;
  ordered: number;
  supplied: number;
  remaining: number;
  price: number;
  providerOc: string;
  expectedDate: string | null;
  date: string | null;
  warehouse: string;
  observations: string;
  confirmed: number;
  expiresAt: string | null;
  createdAt: string | null;
  confirmedAt: string | null;
};

const asNumber = (value: number | null | undefined): number => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return 0;
  }

  return value;
};

const mapRow = (row: InventoryOrderedSupplierRow): OrderedSupplierRow => ({
  code: row.code,
  description: row.description,
  oc: row.oc,
  branch: row.branch,
  um: row.um,
  ordered: asNumber(row.ordered),
  supplied: asNumber(row.supplied),
  remaining: asNumber(row.remaining),
  price: asNumber(row.price),
  providerOc: row.providerOc,
  expectedDate: row.expectedDate,
  date: row.date,
  warehouse: row.warehouse,
  observations: row.observations,
  confirmed: asNumber(row.confirmed),
  expiresAt: row.expiresAt,
  createdAt: row.createdAt,
  confirmedAt: row.confirmedAt,
});

export const useInventoryOrdenadoProveedoresModal = () => {
  const { isOpen, close } = useModal(MODAL_IDS.INVENTORY_ORDENADO_PROVEEDORES);
  const { selectedCode, detail } = useInventoriesStore(
    useShallow((state) => ({
      selectedCode: state.selectedCode,
      detail: state.detail,
    })),
  );

  const currentCode = (selectedCode ?? detail?.identity.code ?? "").trim();
  const [rows, setRows] = useState<OrderedSupplierRow[]>([]);
  const [metaStock, setMetaStock] = useState(0);
  const [metaPending, setMetaPending] = useState(0);
  const [metaTotal, setMetaTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setRows([]);
      setMetaStock(0);
      setMetaPending(0);
      setMetaTotal(0);
      setError(null);
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
        const response = await getInventoryOrderedSuppliersByCode(currentCode, {
          signal: abortController.signal,
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
              : "Error cargando ordenado a proveedores.",
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
    const fallbackStock = rows.reduce((acc, row) => acc + row.supplied, 0);
    const fallbackPending = rows.reduce((acc, row) => acc + row.remaining, 0);
    const stock = metaStock || fallbackStock;
    const pending = metaPending || fallbackPending;
    const total = metaTotal || stock + pending;

    return {
      stock,
      pending,
      total,
    };
  }, [rows, metaStock, metaPending, metaTotal]);

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
