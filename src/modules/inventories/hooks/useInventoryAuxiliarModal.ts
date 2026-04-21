import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { getInventoryAuxiliarByCode } from "../api/inventories.api";
import { useModal } from "../../ui/hooks/useModal";
import { MODAL_IDS } from "../../ui/store/modal.store";
import { useInventoriesStore } from "../store/inventories.store";
import type { InventoryAuxiliarRow } from "../types/inventory.types";

export type AuxiliarRow = {
  date: string | null;
  document: string;
  tm: string;
  cost: number;
  entries: number;
  exits: number;
  stock: number;
  warehouse: string;
  pieces: number;
  route: string;
  user: number;
  revaluation: number;
  reference: string;
};

const asNumber = (value: number | null | undefined): number => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return 0;
  }
  return value;
};

const mapAuxiliarToRow = (row: InventoryAuxiliarRow): AuxiliarRow => ({
  date: row.date,
  document: row.document,
  tm: row.tm,
  cost: asNumber(row.cost),
  entries: asNumber(row.entries),
  exits: asNumber(row.exits),
  stock: asNumber(row.stock),
  warehouse: row.warehouse,
  pieces: asNumber(row.pieces),
  route: row.route,
  user: asNumber(row.user),
  revaluation: asNumber(row.revaluation),
  reference: row.reference,
});

export const useInventoryAuxiliarModal = () => {
  const { isOpen, close } = useModal(MODAL_IDS.INVENTORY_AUXILIAR);
  const { selectedCode, detail } = useInventoriesStore(
    useShallow((state) => ({
      selectedCode: state.selectedCode,
      detail: state.detail,
    })),
  );

  const [rows, setRows] = useState<AuxiliarRow[]>([]);
  const [stockPrevious, setStockPrevious] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentCode = (selectedCode ?? detail?.identity.code ?? "").trim();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (!currentCode) {
      setRows([]);
      setStockPrevious(0);
      setError("No hay producto seleccionado.");
      return;
    }

    let isCancelled = false;
    const abortController = new AbortController();

    const loadAuxiliar = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getInventoryAuxiliarByCode(currentCode, {
          signal: abortController.signal,
        });
        if (!isCancelled) {
          setRows(response.data.map(mapAuxiliarToRow));
          setStockPrevious(
            response.meta.stockPrevious === undefined || Number.isNaN(response.meta.stockPrevious)
              ? 0
              : response.meta.stockPrevious,
          );
        }
      } catch (loadError) {
        if (loadError instanceof DOMException && loadError.name === "AbortError") {
          return;
        }

        if (!isCancelled) {
          setRows([]);
          setStockPrevious(0);
          setError(loadError instanceof Error ? loadError.message : "Error cargando auxiliar.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadAuxiliar();

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
    stockPrevious,
    isLoading,
    error,
  };
};
