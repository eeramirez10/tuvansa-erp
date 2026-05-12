import { Square, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useInventoryAuxiliarModal } from "../hooks/useInventoryAuxiliarModal";
import type { AuxiliarRow as InventoryAuxiliarModalRow } from "../hooks/useInventoryAuxiliarModal";
import { formatFixed } from "../utils/formatFixed";
import { formatLegacyDate } from "../utils/formatLegacyDate";
import { LegacyModalLoader } from "../../shared/components/legacy-form/LegacyModalLoader";
import { ManagedWindowLayer } from "../../ui/components/ManagedWindowLayer";
import { MODAL_IDS } from "../../ui/store/modal.store";

const COLUMNS = [
  { key: "fecha", label: "Fecha", width: "w-[96px]" },
  { key: "documento", label: "Documento", width: "w-[102px]" },
  { key: "tm", label: "TM", width: "w-[36px]" },
  { key: "costo", label: "Costo", width: "w-[80px]" },
  { key: "entradas", label: "Entradas", width: "w-[82px]" },
  { key: "salidas", label: "Salidas", width: "w-[82px]" },
  { key: "stock", label: "Stock Alm.", width: "w-[82px]" },
  { key: "alm", label: "Alm.", width: "w-[44px]" },
  { key: "pzas", label: "Pzas", width: "w-[74px]" },
  { key: "ruta", label: "Ruta", width: "w-[80px]" },
  { key: "usr", label: "Usr.", width: "w-[38px]" },
  { key: "reval", label: "Reval", width: "w-[48px]" },
  { key: "referencia", label: "Referencia ellos", width: "w-[130px]" },
] as const;

type AuxiliarSortKey = (typeof COLUMNS)[number]["key"];
type AuxiliarSortDirection = "asc" | "desc";
type AuxiliarSortState =
  | {
      key: AuxiliarSortKey;
      direction: AuxiliarSortDirection;
    }
  | null;

const getSortValue = (row: InventoryAuxiliarModalRow, key: AuxiliarSortKey): number | string => {
  switch (key) {
    case "fecha":
      return row.date ? new Date(row.date).getTime() : 0;
    case "documento":
      return row.document;
    case "tm":
      return row.tm;
    case "costo":
      return row.cost;
    case "entradas":
      return row.entries ?? 0;
    case "salidas":
      return row.exits ?? 0;
    case "stock":
      return row.stock;
    case "alm":
      return row.warehouse;
    case "pzas":
      return row.pieces ?? 0;
    case "ruta":
      return row.route;
    case "usr":
      return row.user ?? 0;
    case "reval":
      return row.revaluation;
    case "referencia":
      return row.reference;
    default:
      return "";
  }
};

const compareValues = (a: number | string, b: number | string): number => {
  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  }

  return String(a).localeCompare(String(b), "es", { numeric: true, sensitivity: "base" });
};

function InventoryAuxiliarModal() {
  const {
    isOpen,
    close,
    stockPrevious,
    rows,
    currentCode,
    isLoading,
    error,
    selectedWarehouse,
    selectedRowKey,
    warehouseFilter,
    selectRow,
    filterBySelectedWarehouse,
  } = useInventoryAuxiliarModal();
  const [sortState, setSortState] = useState<AuxiliarSortState>(null);

  const sortedRows = useMemo(() => {
    if (!sortState) {
      return rows;
    }

    const clonedRows = [...rows];
    clonedRows.sort((leftRow, rightRow) => {
      const leftValue = getSortValue(leftRow, sortState.key);
      const rightValue = getSortValue(rightRow, sortState.key);
      const comparison = compareValues(leftValue, rightValue);
      return sortState.direction === "asc" ? comparison : -comparison;
    });

    return clonedRows;
  }, [rows, sortState]);

  const handleSort = (key: AuxiliarSortKey): void => {
    setSortState((currentSortState) => {
      if (!currentSortState || currentSortState.key !== key) {
        return { key, direction: "asc" };
      }

      const nextDirection: AuxiliarSortDirection = currentSortState.direction === "asc" ? "desc" : "asc";
      return { key, direction: nextDirection };
    });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ManagedWindowLayer windowId={MODAL_IDS.INVENTORY_AUXILIAR} isOpen={isOpen}>
      <section className="flex h-[min(560px,78vh)] w-[min(980px,92vw)] flex-col border border-[#2f8ce8] bg-[#ececec]">
        <header className="flex h-[30px] items-center justify-between border-b border-[#99a4af] bg-[#f0f0f0] px-2">
          <div className="flex items-center gap-1">
            <span className="h-[12px] w-[12px] border border-[#8fa6cc] bg-white" />
            <h2 className="text-[12px] leading-none font-semibold text-[#1e293b]">Auxiliar</h2>
          </div>
          <div className="mr-auto ml-3 text-[11px] text-[#3a4552]">{currentCode ? `Producto: ${currentCode}` : ""}</div>
          <div className="flex items-center gap-[6px]">
            <button
              type="button"
              className="grid h-[18px] w-[18px] place-items-center border border-[#6d747b] bg-[#ededed] text-[#2c3948]"
            >
              <Square className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={close}
              className="grid h-[18px] w-[18px] place-items-center border border-[#6d747b] bg-[#ededed] text-[#2c3948]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </header>

        <div className="border-b border-[#a3abb3] px-2 py-1">
          <div className="mx-auto flex w-fit items-center gap-2 text-[12px] text-[#1e293b]">
            <span>Stock anterior</span>
            <span className="inline-flex h-[22px] w-[64px] items-center justify-end border border-[#a7adb3] bg-[#d8d9db] px-[4px]">
              {formatFixed(stockPrevious, 2)}
            </span>
          </div>
        </div>

        <div className="relative modal-scroll min-h-0 flex-1 overflow-auto border-b border-[#9ca3ab]">
          <table className="w-max min-w-full border-collapse bg-[#efefef] text-[11px] leading-none text-[#1d2836]">
            <thead className="sticky top-0 z-10 bg-[#dcdcdc]">
              <tr>
                {COLUMNS.map((column) => (
                  <th
                    key={column.key}
                    onClick={() => handleSort(column.key)}
                    className={`${column.width} cursor-pointer border border-[#a6adb5] px-1 py-[5px] text-left font-normal hover:bg-[#d6dee7]`}
                  >
                    <span>{column.label}</span>
                    {sortState?.key === column.key ? <span className="ml-1">{sortState.direction === "asc" ? "▲" : "▼"}</span> : null}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedRows.map((row) => (
                <tr
                  key={row.rowId}
                  className={`cursor-default ${
                    selectedRowKey === row.rowId
                      ? "bg-[#cfe5ff]"
                      : "bg-[#efefef] odd:bg-[#f4f4f4]"
                  }`}
                  onClick={() =>
                    selectRow(
                      row.rowId,
                      row.warehouse,
                    )
                  }
                >
                  <td className="w-[96px] border border-[#a6adb5] px-1 py-[5px]">{formatLegacyDate(row.date)}</td>
                  <td className="w-[102px] border border-[#a6adb5] px-1 py-[5px] text-[#144d84]">{row.document}</td>
                  <td className="w-[36px] border border-[#a6adb5] px-1 py-[5px] text-center">{row.tm}</td>
                  <td className="w-[80px] border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.cost, 2)}</td>
                  <td className="w-[82px] border border-[#a6adb5] px-1 py-[5px] text-right">{row.entries ? formatFixed(row.entries, 3) : ""}</td>
                  <td className="w-[82px] border border-[#a6adb5] px-1 py-[5px] text-right">{row.exits ? formatFixed(row.exits, 3) : ""}</td>
                  <td className="w-[82px] border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.stock, 3)}</td>
                  <td className="w-[44px] border border-[#a6adb5] px-1 py-[5px]">{row.warehouse}</td>
                  <td className="w-[74px] border border-[#a6adb5] px-1 py-[5px]">{row.pieces ? String(row.pieces) : ""}</td>
                  <td className="w-[80px] border border-[#a6adb5] px-1 py-[5px] text-center">{row.route}</td>
                  <td className="w-[38px] border border-[#a6adb5] px-1 py-[5px] text-right">{row.user ? String(row.user) : ""}</td>
                  <td className="w-[48px] border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.revaluation, 2)}</td>
                  <td className="w-[130px] border border-[#a6adb5] px-1 py-[5px]">{row.reference}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {isLoading ? <LegacyModalLoader label="Cargando auxiliar..." /> : null}
          {error ? (
            <div className="sticky bottom-0 border-t border-[#a6adb5] bg-[#ffe7e7] px-2 py-1 text-[11px] text-[#8b1e1e]">
              {error}
            </div>
          ) : null}
        </div>

        <footer className="flex h-[42px] items-center gap-3 border-t border-[#a1a8af] bg-[#ececec] px-2">
          <button
            type="button"
            onClick={filterBySelectedWarehouse}
            disabled={!selectedWarehouse || !selectedRowKey}
            className="h-[30px] min-w-[130px] border border-[#9da3aa] bg-[#d8d8d8] px-3 text-[11px] disabled:opacity-60"
          >
            Filtrar almacén
          </button>
          <div className="text-[11px] text-[#4b5563]">
            {warehouseFilter ? `Filtro: almacén ${warehouseFilter}` : "Sin filtro de almacén"}
          </div>
          <button type="button" className="h-[30px] min-w-[130px] border border-[#9da3aa] bg-[#d8d8d8] px-3 text-[11px]">
            Filtrar T'S
          </button>
          <button type="button" className="h-[30px] min-w-[130px] border border-[#9da3aa] bg-[#d8d8d8] px-3 text-[11px]">
            TST
          </button>
        </footer>
      </section>
    </ManagedWindowLayer>
  );
}

export default InventoryAuxiliarModal;
