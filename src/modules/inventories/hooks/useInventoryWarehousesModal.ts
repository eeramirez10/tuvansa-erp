import { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { getInventoryWarehousesByCode } from "../api/inventories.api";
import { useModal } from "../../ui/hooks/useModal";
import { MODAL_IDS } from "../../ui/store/modal.store";
import { useInventoriesStore } from "../store/inventories.store";
import type { InventoryWarehouse } from "../types/inventory.types";

export type WarehouseRow = {
  cd: string;
  alm: string;
  description: string;
  qty: number;
  min: number;
  max: number;
  veol: number;
  minStore: number;
  sales6: number;
  order: number;
  assigned: number;
  physical: number;
  count: number;
  td: number;
  a: string;
  transit: number;
  createdAt: string | null;
  lastSale: string | null;
  providerOrder: number;
  location: string;
  accumulatedSales: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  price: number;
  totalReceipts: number;
  curve: number;
};

const asNumber = (value: number | null | undefined): number => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return 0;
  }
  return value;
};

const mapWarehouseToRow = (warehouse: InventoryWarehouse): WarehouseRow => ({
  cd: warehouse.cd === null ? "0" : String(warehouse.cd),
  alm: warehouse.warehouse,
  description: warehouse.description,
  qty: asNumber(warehouse.quantity),
  min: asNumber(warehouse.minimum),
  max: asNumber(warehouse.maximum),
  veol: asNumber(warehouse.veol),
  minStore: asNumber(warehouse.minimumStore),
  sales6: asNumber(warehouse.sales6),
  order: asNumber(warehouse.order),
  assigned: asNumber(warehouse.assigned),
  physical: asNumber(warehouse.physical),
  count: asNumber(warehouse.countInventory),
  td: asNumber(warehouse.allStores),
  a: warehouse.status,
  transit: asNumber(warehouse.transit),
  createdAt: warehouse.createdAt,
  lastSale: warehouse.lastSaleAt,
  providerOrder: asNumber(warehouse.providerOrder),
  location: warehouse.location,
  accumulatedSales: asNumber(warehouse.accumulatedSales),
  s1: asNumber(warehouse.s1),
  s2: asNumber(warehouse.s2),
  s3: asNumber(warehouse.s3),
  s4: asNumber(warehouse.s4),
  s5: asNumber(warehouse.s5),
  s6: asNumber(warehouse.s6),
  price: asNumber(warehouse.price),
  totalReceipts: asNumber(warehouse.totalReceipts),
  curve: asNumber(warehouse.curve),
});

export const useInventoryWarehousesModal = () => {
  const { isOpen, close } = useModal(MODAL_IDS.INVENTORY_WAREHOUSES);
  const { selectedCode, detail } = useInventoriesStore(
    useShallow((state) => ({
      selectedCode: state.selectedCode,
      detail: state.detail,
    })),
  );
  const [rows, setRows] = useState<WarehouseRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentCode = (selectedCode ?? detail?.identity.code ?? "").trim();

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

    const loadWarehouses = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getInventoryWarehousesByCode(currentCode);
        if (!isCancelled) {
          setRows(response.data.map(mapWarehouseToRow));
        }
      } catch (loadError) {
        if (!isCancelled) {
          setRows([]);
          setError(loadError instanceof Error ? loadError.message : "Error cargando almacenes.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadWarehouses();

    return () => {
      isCancelled = true;
    };
  }, [isOpen, currentCode]);

  const totalRow = useMemo<WarehouseRow>(
    () => ({
      cd: "",
      alm: "",
      description: "TOTAL",
      qty: rows.reduce((acc, row) => acc + row.qty, 0),
      min: 0,
      max: 0,
      veol: 0,
      minStore: 0,
      sales6: 0,
      order: 0,
      assigned: 0,
      physical: 0,
      count: 0,
      td: 0,
      a: "",
      transit: 0,
      createdAt: null,
      lastSale: null,
      providerOrder: 0,
      location: "",
      accumulatedSales: 0,
      s1: 0,
      s2: 0,
      s3: 0,
      s4: 0,
      s5: 0,
      s6: 0,
      price: 0,
      totalReceipts: rows.reduce((acc, row) => acc + row.totalReceipts, 0),
      curve: 0,
    }),
    [rows],
  );

  return {
    isOpen,
    close,
    rows,
    totalRow,
    isLoading,
    error,
    currentCode,
  };
};
