import { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { getInventoryLotesByCode } from "../api/inventories.api";
import { useModal } from "../../ui/hooks/useModal";
import { MODAL_IDS } from "../../ui/store/modal.store";
import { useInventoriesStore } from "../store/inventories.store";
import type { InventoryLoteMovementRow, InventoryLoteRow } from "../types/inventory.types";

type LoteMovementRow = {
  sequence: number | null;
  date: string | null;
  document: string;
  entries: number;
  exits: number;
  warehouse: string;
};

export type LoteRow = {
  key: string;
  sequence: number | null;
  date: string | null;
  expirationAt: string | null;
  pedimento: string;
  customs: string;
  lot: string;
  available: number;
  warehouse: string;
  location: string;
  cost: number;
  adValorem: number;
  movements: LoteMovementRow[];
};

const asNumber = (value: number | null | undefined): number => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return 0;
  }
  return value;
};

const mapMovementRow = (row: InventoryLoteMovementRow): LoteMovementRow => ({
  sequence: row.sequence ?? null,
  date: row.date,
  document: row.document ?? "",
  entries: asNumber(row.entries),
  exits: asNumber(row.exits),
  warehouse: row.warehouse ?? "",
});

const mapLoteRow = (row: InventoryLoteRow): LoteRow => {
  const normalizedSequence = row.sequence ?? null;
  const key = [
    row.pedimento ?? "",
    row.warehouse ?? "",
    normalizedSequence === null ? "" : String(normalizedSequence),
  ].join("|");

  return {
    key,
    sequence: normalizedSequence,
    date: row.date,
    expirationAt: row.expirationAt,
    pedimento: row.pedimento ?? "",
    customs: row.customsOffice ?? "",
    lot: row.lot ?? "",
    available: asNumber(row.available),
    warehouse: row.warehouse ?? "",
    location: row.location ?? "",
    cost: asNumber(row.cost),
    adValorem: asNumber(row.adValorem),
    movements: (row.movements ?? []).map(mapMovementRow),
  };
};

export const useInventoryLotesModal = () => {
  const { isOpen, close } = useModal(MODAL_IDS.INVENTORY_LOTES);
  const { selectedCode, detail } = useInventoriesStore(
    useShallow((state) => ({
      selectedCode: state.selectedCode,
      detail: state.detail,
    })),
  );

  const currentCode = (selectedCode ?? detail?.identity.code ?? "").trim();

  const [rows, setRows] = useState<LoteRow[]>([]);
  const [selectedRowKey, setSelectedRowKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setRows([]);
      setSelectedRowKey(null);
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
      setSelectedRowKey(null);
      setError("No hay producto seleccionado.");
      return;
    }

    let isCancelled = false;
    const abortController = new AbortController();

    const loadLotes = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getInventoryLotesByCode(currentCode, {
          signal: abortController.signal,
        });

        if (!isCancelled) {
          const mappedRows = response.data.map(mapLoteRow);
          setRows(mappedRows);
          setSelectedRowKey(mappedRows[0]?.key ?? null);
        }
      } catch (loadError) {
        if (loadError instanceof DOMException && loadError.name === "AbortError") {
          return;
        }

        if (!isCancelled) {
          setRows([]);
          setSelectedRowKey(null);
          setError(loadError instanceof Error ? loadError.message : "Error cargando lotes.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadLotes();

    return () => {
      isCancelled = true;
      abortController.abort();
    };
  }, [isOpen, currentCode]);

  const selectedRow = useMemo(
    () => rows.find((row) => row.key === selectedRowKey) ?? rows[0] ?? null,
    [rows, selectedRowKey]
  );

  const totalAvailable = useMemo(
    () => rows.reduce((acc, row) => acc + row.available, 0),
    [rows]
  );

  const selectedMovementBalance = useMemo(() => {
    if (!selectedRow) {
      return 0;
    }

    return selectedRow.movements.reduce(
      (acc, movement) => acc + movement.entries - movement.exits,
      0
    );
  }, [selectedRow]);

  return {
    isOpen,
    close,
    currentCode,
    rows,
    selectedRow,
    selectedRowKey,
    setSelectedRowKey,
    isLoading,
    error,
    totalAvailable,
    selectedMovementBalance,
  };
};

