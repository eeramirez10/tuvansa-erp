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

const parseOptionalLegacyNumber = (rawValue: unknown): number | undefined => {
  if (rawValue === undefined || rawValue === null || String(rawValue).trim() === "") {
    return undefined;
  }

  const numericValue = Number(rawValue);
  return Number.isFinite(numericValue) ? numericValue : undefined;
};

const LEGACY_DEST = parseOptionalLegacyNumber(import.meta.env.VITE_LEGACY_DEST) ?? 0;
const LEGACY_MULTICIA = parseOptionalLegacyNumber(import.meta.env.VITE_LEGACY_MULTICIA) ?? 1;

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
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [selectedRowKey, setSelectedRowKey] = useState<string | null>(null);
  const [warehouseFilter, setWarehouseFilter] = useState<string | null>(null);

  const currentCode = (selectedCode ?? detail?.identity.code ?? "").trim();

  useEffect(() => {
    if (!isOpen) {
      setRows([]);
      setStockPrevious(0);
      setError(null);
      setSelectedWarehouse("");
      setSelectedRowKey(null);
      setWarehouseFilter(null);
    }
  }, [isOpen]);

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
          alm: warehouseFilter ?? undefined,
          dest: LEGACY_DEST,
          multicia: LEGACY_MULTICIA,
          signal: abortController.signal,
        });
        if (!isCancelled) {
          const mappedRows = response.data.map(mapAuxiliarToRow);
          setRows(mappedRows);
          setStockPrevious(
            response.meta.stockPrevious === undefined || Number.isNaN(response.meta.stockPrevious)
              ? 0
              : response.meta.stockPrevious,
          );
          setSelectedWarehouse("");
          setSelectedRowKey(null);
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
  }, [isOpen, currentCode, warehouseFilter]);

  const selectWarehouse = (warehouse: string) => {
    setError(null);
    setSelectedWarehouse(warehouse);
  };

  const selectRow = (rowKey: string, warehouse: string) => {
    setSelectedRowKey(rowKey);
    selectWarehouse(warehouse);
  };

  const filterBySelectedWarehouse = () => {
    const normalizedWarehouse = selectedWarehouse.trim();
    if (!normalizedWarehouse) {
      setError("Selecciona un renglón antes de filtrar almacén.");
      return;
    }

    setWarehouseFilter(normalizedWarehouse);
  };

  return {
    isOpen,
    close,
    currentCode,
    rows,
    stockPrevious,
    isLoading,
    error,
    selectedWarehouse,
    selectedRowKey,
    warehouseFilter,
    selectWarehouse,
    selectRow,
    filterBySelectedWarehouse,
  };
};
