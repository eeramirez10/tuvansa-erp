import { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { getInventorySalesBreakdownByCode } from "../api/inventories.api";
import { useModal } from "../../ui/hooks/useModal";
import { MODAL_IDS } from "../../ui/store/modal.store";
import { useInventoriesStore } from "../store/inventories.store";
import type { InventorySalesBreakdownRow } from "../types/inventory.types";

export type VentaDesglosadaRow = {
  code: string;
  name: string;
  quantity: number;
  price: number;
  document: string;
  date: string | null;
  unitPrice: number;
  tcDolar: number;
  percentDesc: number;
  oc: string;
  sucursal: string;
};

const asNumber = (value: number | null | undefined): number => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return 0;
  }

  return value;
};

const mapSalesBreakdownRow = (row: InventorySalesBreakdownRow): VentaDesglosadaRow => ({
  code: row.code,
  name: row.name,
  quantity: asNumber(row.quantity),
  price: asNumber(row.price),
  document: row.document,
  date: row.date,
  unitPrice: asNumber(row.unitPrice),
  tcDolar: asNumber(row.dollarExchangeRate),
  percentDesc: asNumber(row.discountPercent),
  oc: row.purchaseOrder,
  sucursal: row.branch,
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

export const useInventoryVentasDesglosadasModal = () => {
  const { isOpen, close } = useModal(MODAL_IDS.INVENTORY_VENTAS_DESGLOSADAS);
  const { selectedCode, detail } = useInventoriesStore(
    useShallow((state) => ({
      selectedCode: state.selectedCode,
      detail: state.detail,
    })),
  );

  const currentCode = (selectedCode ?? detail?.identity.code ?? "").trim();
  const [rows, setRows] = useState<VentaDesglosadaRow[]>([]);
  const [metaTotal, setMetaTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setRows([]);
      setMetaTotal(0);
      setError(null);
      return;
    }

    if (!currentCode) {
      setRows([]);
      setMetaTotal(0);
      setError("No hay producto seleccionado.");
      return;
    }

    let isCancelled = false;
    const abortController = new AbortController();

    const loadSalesBreakdown = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getInventorySalesBreakdownByCode(currentCode, {
          dest: LEGACY_DEST,
          multicia: LEGACY_MULTICIA,
          signal: abortController.signal,
        });

        if (!isCancelled) {
          setRows(response.data.map(mapSalesBreakdownRow));
          setMetaTotal(asNumber(response.meta.totalQuantity));
        }
      } catch (loadError) {
        if (loadError instanceof DOMException && loadError.name === "AbortError") {
          return;
        }

        if (!isCancelled) {
          setRows([]);
          setMetaTotal(0);
          setError(
            loadError instanceof Error ? loadError.message : "Error cargando ventas desglosadas.",
          );
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadSalesBreakdown();

    return () => {
      isCancelled = true;
      abortController.abort();
    };
  }, [isOpen, currentCode]);

  const total = useMemo(() => {
    const fallbackTotal = rows.reduce((acc, row) => acc + row.price, 0);
    return metaTotal || fallbackTotal;
  }, [metaTotal, rows]);

  return {
    isOpen,
    close,
    currentCode,
    rows,
    total,
    isLoading,
    error,
  };
};
