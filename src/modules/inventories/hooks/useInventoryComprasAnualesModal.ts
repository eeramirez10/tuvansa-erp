import { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useModal } from "../../ui/hooks/useModal";
import { MODAL_IDS } from "../../ui/store/modal.store";
import { useInventoriesStore } from "../store/inventories.store";
import { getInventoryAnnualPurchasesByCode } from "../api/inventories.api";
import type { InventoryAnnualPurchaseRow } from "../types/inventory.types";

export type InventoryAnnualPurchasesRow = {
  code: string;
  name: string;
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

const asNumber = (value: number | null | undefined): number => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return 0;
  }

  return value;
};

const mapAnnualPurchasesRow = (row: InventoryAnnualPurchaseRow): InventoryAnnualPurchasesRow => ({
  code: row.code,
  name: row.supplier,
  year: asNumber(row.year),
  ene: asNumber(row.ene),
  feb: asNumber(row.feb),
  mar: asNumber(row.mar),
  abr: asNumber(row.abr),
  may: asNumber(row.may),
  jun: asNumber(row.jun),
  jul: asNumber(row.jul),
  ago: asNumber(row.ago),
  sep: asNumber(row.sep),
  oct: asNumber(row.oct),
  nov: asNumber(row.nov),
  dic: asNumber(row.dic),
  total: asNumber(row.total),
});

const toTotals = (rows: InventoryAnnualPurchasesRow[]) => {
  return rows.reduce(
    (acc, row) => {
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
    },
    {
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
    },
  );
};

export const useInventoryComprasAnualesModal = () => {
  const { isOpen, close } = useModal(MODAL_IDS.INVENTORY_COMPRAS_ANUALES);
  const { selectedCode, detail } = useInventoriesStore(
    useShallow((state) => ({
      selectedCode: state.selectedCode,
      detail: state.detail,
    })),
  );

  const currentCode = (selectedCode ?? detail?.identity.code ?? "").trim();
  const [rows, setRows] = useState<InventoryAnnualPurchasesRow[]>([]);
  const [metaTotals, setMetaTotals] = useState({
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
  const [hasMetaTotals, setHasMetaTotals] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setRows([]);
      setHasMetaTotals(false);
      setMetaTotals({
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
      setError(null);
      return;
    }

    if (!currentCode) {
      setRows([]);
      setHasMetaTotals(false);
      setMetaTotals({
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
      setError("No hay producto seleccionado.");
      return;
    }

    let isCancelled = false;
    const abortController = new AbortController();

    const loadAnnualPurchases = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getInventoryAnnualPurchasesByCode(currentCode, {
          signal: abortController.signal,
        });

        if (!isCancelled) {
          setRows(response.data.map(mapAnnualPurchasesRow));
          setHasMetaTotals(true);
          setMetaTotals({
            ene: asNumber(response.meta.totals?.ene),
            feb: asNumber(response.meta.totals?.feb),
            mar: asNumber(response.meta.totals?.mar),
            abr: asNumber(response.meta.totals?.abr),
            may: asNumber(response.meta.totals?.may),
            jun: asNumber(response.meta.totals?.jun),
            jul: asNumber(response.meta.totals?.jul),
            ago: asNumber(response.meta.totals?.ago),
            sep: asNumber(response.meta.totals?.sep),
            oct: asNumber(response.meta.totals?.oct),
            nov: asNumber(response.meta.totals?.nov),
            dic: asNumber(response.meta.totals?.dic),
            total: asNumber(response.meta.totals?.total),
          });
        }
      } catch (loadError) {
        if (loadError instanceof DOMException && loadError.name === "AbortError") {
          return;
        }

        if (!isCancelled) {
          setRows([]);
          setHasMetaTotals(false);
          setMetaTotals({
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
          setError(loadError instanceof Error ? loadError.message : "Error cargando compras anuales.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadAnnualPurchases();

    return () => {
      isCancelled = true;
      abortController.abort();
    };
  }, [isOpen, currentCode]);

  const totals = useMemo(() => toTotals(rows), [rows]);

  return {
    isOpen,
    close,
    currentCode,
    rows,
    totals: hasMetaTotals ? metaTotals : totals,
    isLoading,
    error,
  };
};
