import { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { getInventoryUepsPepsByCode } from "../api/inventories.api";
import { useModal } from "../../ui/hooks/useModal";
import { MODAL_IDS } from "../../ui/store/modal.store";
import { useInventoriesStore } from "../store/inventories.store";
import type { InventoryUepsPepsRow } from "../types/inventory.types";

export type UepsPepsRow = {
  key: string;
  initial: number;
  quantity: number;
  cost: number;
  adValorem: number;
  date: string | null;
  document: string;
  lot: string;
  expirationAt: string | null;
  itemKey: string;
  itemGroup: string;
  warehouse: string;
  provider: string;
  exchangeRate: number;
  costDollars: number;
  adValoremDollars: number;
  totalMxn: number;
};

const asNumber = (value: number | null | undefined): number => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return 0;
  }
  return value;
};

const mapRow = (row: InventoryUepsPepsRow): UepsPepsRow => {
  const quantity = asNumber(row.quantity);
  const cost = asNumber(row.cost);
  const adValorem = asNumber(row.adValorem);
  const exchangeRate = asNumber(row.exchangeRate);

  return {
    key: `${row.key}|${row.keySuffix}|${row.warehouse}|${row.document}|${row.date ?? ""}`,
    initial: asNumber(row.initial),
    quantity,
    cost,
    adValorem,
    date: row.date,
    document: row.document ?? "",
    lot: row.lot ?? "",
    expirationAt: row.expirationAt,
    itemKey: row.key ?? "",
    itemGroup: row.keySuffix ?? "",
    warehouse: row.warehouse ?? "",
    provider: row.provider ?? "",
    exchangeRate,
    costDollars: asNumber(row.costDollars),
    adValoremDollars: asNumber(row.adValoremDollars),
    totalMxn: asNumber(row.total),
  };
};

export const useInventoryUepsPepsModal = () => {
  const { isOpen, close } = useModal(MODAL_IDS.INVENTORY_UEPS_PEPS);
  const { selectedCode, detail } = useInventoriesStore(
    useShallow((state) => ({
      selectedCode: state.selectedCode,
      detail: state.detail,
    })),
  );

  const currentCode = (selectedCode ?? detail?.identity.code ?? "").trim();
  const [rows, setRows] = useState<UepsPepsRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setRows([]);
      setError(null);
      setIsLoading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (!currentCode) {
      setRows([]);
      setError("No hay producto seleccionado.");
      return;
    }

    let isCancelled = false;
    const abortController = new AbortController();

    const loadRows = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getInventoryUepsPepsByCode(currentCode, {
          signal: abortController.signal,
        });

        if (!isCancelled) {
          setRows(response.data.map((row) => mapRow(row)));
        }
      } catch (loadError) {
        if (loadError instanceof DOMException && loadError.name === "AbortError") {
          return;
        }

        if (!isCancelled) {
          setRows([]);
          setError(loadError instanceof Error ? loadError.message : "Error cargando UEPS/PEPS.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadRows();

    return () => {
      isCancelled = true;
      abortController.abort();
    };
  }, [isOpen, currentCode]);

  const totalQuantity = useMemo(
    () => rows.reduce((acc, row) => acc + row.quantity, 0),
    [rows],
  );

  const totalAverageCost = useMemo(() => {
    if (!rows.length) {
      return 0;
    }

    return rows.reduce((acc, row) => acc + row.cost, 0) / rows.length;
  }, [rows]);

  return {
    isOpen,
    close,
    currentCode,
    rows,
    isLoading,
    error,
    totalQuantity,
    totalAverageCost,
  };
};
