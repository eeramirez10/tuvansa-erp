import { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { getInventoryAnnualPurchasesByCode } from "../api/inventories.api";
import type { InventoryAnnualPurchaseRow } from "../types/inventory.types";
import { useModal } from "../../ui/hooks/useModal";
import { MODAL_IDS } from "../../ui/store/modal.store";
import { useInventoriesStore } from "../store/inventories.store";

export type AnnualPurchasesSummaryRow = {
  year: number;
  ene: number;
  feb: number;
  mar: number;
  abr: number;
  may: number;
  jun: number;
  jul: number;
  ago: number;
  sep: number;
  oct: number;
  nov: number;
  dic: number;
  total: number;
};

const emptySummaryRow = (): AnnualPurchasesSummaryRow => ({
  year: 0,
  ene: 0,
  feb: 0,
  mar: 0,
  abr: 0,
  may: 0,
  jun: 0,
  jul: 0,
  ago: 0,
  sep: 0,
  oct: 0,
  nov: 0,
  dic: 0,
  total: 0,
});

const asNumber = (value: number | null | undefined): number => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return 0;
  }

  return value;
};

const yearFromRow = (row: InventoryAnnualPurchaseRow): number => asNumber(row.year);

const rowTotal = (row: InventoryAnnualPurchaseRow): number =>
  asNumber(row.total) ||
  asNumber(row.ene) +
    asNumber(row.feb) +
    asNumber(row.mar) +
    asNumber(row.abr) +
    asNumber(row.may) +
    asNumber(row.jun) +
    asNumber(row.jul) +
    asNumber(row.ago) +
    asNumber(row.sep) +
    asNumber(row.oct) +
    asNumber(row.nov) +
    asNumber(row.dic);

const aggregateByYear = (rows: InventoryAnnualPurchaseRow[]): AnnualPurchasesSummaryRow[] => {
  const map = new Map<number, AnnualPurchasesSummaryRow>();

  rows.forEach((row) => {
    const year = yearFromRow(row);
    if (!year) {
      return;
    }

    const acc = map.get(year) ?? { ...emptySummaryRow(), year };
    acc.ene += asNumber(row.ene);
    acc.feb += asNumber(row.feb);
    acc.mar += asNumber(row.mar);
    acc.abr += asNumber(row.abr);
    acc.may += asNumber(row.may);
    acc.jun += asNumber(row.jun);
    acc.jul += asNumber(row.jul);
    acc.ago += asNumber(row.ago);
    acc.sep += asNumber(row.sep);
    acc.oct += asNumber(row.oct);
    acc.nov += asNumber(row.nov);
    acc.dic += asNumber(row.dic);
    acc.total += rowTotal(row);
    map.set(year, acc);
  });

  return [...map.values()].sort((a, b) => a.year - b.year);
};

const sumRows = (rows: AnnualPurchasesSummaryRow[]): AnnualPurchasesSummaryRow => {
  return rows.reduce((acc, row) => {
    acc.ene += row.ene;
    acc.feb += row.feb;
    acc.mar += row.mar;
    acc.abr += row.abr;
    acc.may += row.may;
    acc.jun += row.jun;
    acc.jul += row.jul;
    acc.ago += row.ago;
    acc.sep += row.sep;
    acc.oct += row.oct;
    acc.nov += row.nov;
    acc.dic += row.dic;
    acc.total += row.total;
    return acc;
  }, emptySummaryRow());
};

export const useInventoryComprasAnualesResumenModal = () => {
  const { isOpen, close } = useModal(MODAL_IDS.INVENTORY_COMPRAS_ANUALES_RESUMEN);
  const { selectedCode, detail } = useInventoriesStore(
    useShallow((state) => ({
      selectedCode: state.selectedCode,
      detail: state.detail,
    })),
  );
  const currentCode = (selectedCode ?? detail?.identity.code ?? "").trim();

  const [rawRows, setRawRows] = useState<InventoryAnnualPurchaseRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setRawRows([]);
      setError(null);
      return;
    }

    if (!currentCode) {
      setRawRows([]);
      setError("No hay producto seleccionado.");
      return;
    }

    let isCancelled = false;
    const abortController = new AbortController();

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getInventoryAnnualPurchasesByCode(currentCode, {
          signal: abortController.signal,
        });
        if (!isCancelled) {
          setRawRows(response.data);
        }
      } catch (loadError) {
        if (loadError instanceof DOMException && loadError.name === "AbortError") {
          return;
        }
        if (!isCancelled) {
          setRawRows([]);
          setError(loadError instanceof Error ? loadError.message : "Error cargando compras anuales resumen.");
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

  const rows = useMemo(() => aggregateByYear(rawRows), [rawRows]);
  const totals = useMemo(() => sumRows(rows), [rows]);

  return {
    isOpen,
    close,
    currentCode,
    rows,
    totals,
    fromDate: "31/12/1900",
    isLoading,
    error,
  };
};
