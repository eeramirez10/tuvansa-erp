import { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useModal } from "../../ui/hooks/useModal";
import { MODAL_IDS } from "../../ui/store/modal.store";
import { useInventoriesStore } from "../store/inventories.store";
import { getInventoryClientOrdersByCode } from "../api/inventories.api";
import type { InventoryClientOrderRow } from "../types/inventory.types";

type PedidoModalState = {
  isOpen: boolean;
  close: () => void;
  currentCode: string;
};

const useInventoryPedidoModal = (modalId: keyof typeof MODAL_IDS): PedidoModalState => {
  const { isOpen, close } = useModal(MODAL_IDS[modalId]);
  const { selectedCode, detail } = useInventoriesStore(
    useShallow((state) => ({
      selectedCode: state.selectedCode,
      detail: state.detail,
    })),
  );

  return {
    isOpen,
    close,
    currentCode: (selectedCode ?? detail?.identity.code ?? "").trim(),
  };
};

export const useInventoryPedidosClienteModal = (): PedidoModalState =>
  useInventoryPedidoModal("INVENTORY_PEDIDOS_CLIENTE");

export const useInventoryPedidosAsteriscoModal = (): PedidoModalState =>
  useInventoryPedidoModal("INVENTORY_PEDIDOS_ASTERISCO");

export const useInventoryPedidosCtModal = (): PedidoModalState =>
  useInventoryPedidoModal("INVENTORY_PEDIDOS_CT");

export type ClientOrderRow = {
  code: string;
  description: string;
  expectedDate: string | null;
  expiresAt: string | null;
  number: string;
  ordered: number;
  supplied: number;
  remaining: number;
  assigned: number;
  price: number;
  externalNumber: string;
  pieces: number;
  warehouse: string;
  wms: number;
};

type ClientOrderSummary = {
  assigned: number;
  available: number;
  stock: number;
  total: number;
  missing: number;
};

type ClientOrdersBaseData = {
  isOpen: boolean;
  close: () => void;
  currentCode: string;
  rows: ClientOrderRow[];
  isLoading: boolean;
  error: string | null;
};

type ClientOrdersCtSummary = {
  totalOrdered: number;
  totalSupplied: number;
};

const asNumber = (value: number | null | undefined): number => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return 0;
  }

  return value;
};

const mapClientOrderToRow = (row: InventoryClientOrderRow): ClientOrderRow => ({
  code: row.code,
  description: row.description,
  expectedDate: row.expectedDate,
  expiresAt: row.expiresAt,
  number: row.number,
  ordered: asNumber(row.ordered),
  supplied: asNumber(row.supplied),
  remaining: asNumber(row.remaining),
  assigned: asNumber(row.assigned),
  price: asNumber(row.price),
  externalNumber: row.externalNumber,
  pieces: asNumber(row.pieces),
  warehouse: row.warehouse,
  wms: asNumber(row.wms),
});

const useInventoryClientOrdersData = (
  modalId: "INVENTORY_PEDIDOS_CLIENTE" | "INVENTORY_PEDIDOS_CT",
): ClientOrdersBaseData => {
  const { isOpen, close, currentCode } = useInventoryPedidoModal(modalId);
  const [rows, setRows] = useState<ClientOrderRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

    const loadOrders = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getInventoryClientOrdersByCode(currentCode, {
          signal: abortController.signal,
        });

        if (!isCancelled) {
          setRows(response.data.map(mapClientOrderToRow));
        }
      } catch (loadError) {
        if (loadError instanceof DOMException && loadError.name === "AbortError") {
          return;
        }

        if (!isCancelled) {
          setRows([]);
          setError(loadError instanceof Error ? loadError.message : "Error cargando pedidos por cliente.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadOrders();

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
    isLoading,
    error,
  };
};

export const useInventoryPedidosClienteData = () => {
  const { detail } = useInventoriesStore(
    useShallow((state) => ({
      detail: state.detail,
    })),
  );
  const baseData = useInventoryClientOrdersData("INVENTORY_PEDIDOS_CLIENTE");

  const summary = useMemo<ClientOrderSummary>(() => {
    const assigned = baseData.rows.reduce((acc, row) => acc + row.assigned, 0);
    const stock = asNumber(detail?.accumulators.stockCurrent);
    const available = stock - assigned;
    const total = baseData.rows.reduce((acc, row) => acc + row.ordered, 0);
    const missing = Math.max(total - stock, 0);

    return {
      assigned,
      available,
      stock,
      total,
      missing,
    };
  }, [baseData.rows, detail?.accumulators.stockCurrent]);

  return {
    ...baseData,
    summary,
  };
};

export const useInventoryPedidosCtData = () => {
  const baseData = useInventoryClientOrdersData("INVENTORY_PEDIDOS_CT");

  const summary = useMemo<ClientOrdersCtSummary>(() => {
    const totalOrdered = baseData.rows.reduce((acc, row) => acc + row.ordered, 0);
    const totalSupplied = baseData.rows.reduce((acc, row) => acc + row.supplied, 0);

    return {
      totalOrdered,
      totalSupplied,
    };
  }, [baseData.rows]);

  return {
    ...baseData,
    summary,
  };
};
