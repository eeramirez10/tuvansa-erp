import { Square, X } from "lucide-react";
import { useInventoryLotesModal } from "../hooks/useInventoryLotesModal";
import { formatFixed } from "../utils/formatFixed";
import { formatLegacyDate } from "../utils/formatLegacyDate";
import { LegacyModalLoader } from "../../shared/components/legacy-form/LegacyModalLoader";
import { useLegacyTableSort } from "../../shared/hooks/useLegacyTableSort";
import { ManagedWindowLayer } from "../../ui/components/ManagedWindowLayer";
import { MODAL_IDS } from "../../ui/store/modal.store";

const LOTE_COLUMNS = [
  { key: "date", label: "Fecha", width: "w-[92px]" },
  { key: "expirationAt", label: "Caducidad", width: "w-[92px]" },
  { key: "pedimento", label: "Pedimento", width: "w-[150px]" },
  { key: "customs", label: "Aduana", width: "w-[64px]" },
  { key: "lot", label: "Lote", width: "w-[72px]" },
  { key: "available", label: "Disponible", width: "w-[86px]" },
  { key: "warehouse", label: "Alm", width: "w-[42px]" },
  { key: "location", label: "Localización", width: "w-[96px]" },
  { key: "sequence", label: "Secuencia", width: "w-[88px]" },
  { key: "cost", label: "Costo", width: "w-[84px]" },
  { key: "adValorem", label: "Advalorem", width: "w-[84px]" },
] as const;

const MOVEMENT_COLUMNS = [
  { key: "date", label: "Fecha", width: "w-[76px]" },
  { key: "document", label: "Doc.", width: "w-[102px]" },
  { key: "entries", label: "Entradas", width: "w-[86px]" },
  { key: "exits", label: "Salidas", width: "w-[86px]" },
  { key: "warehouse", label: "Alm", width: "w-[44px]" },
] as const;

function InventoryLotesModal() {
  const {
    isOpen,
    close,
    currentCode,
    rows,
    selectedRowKey,
    setSelectedRowKey,
    isLoading,
    error,
    totalAvailable,
    selectedMovementBalance,
  } = useInventoryLotesModal();
  type LoteSortKey = (typeof LOTE_COLUMNS)[number]["key"];
  type MovementSortKey = (typeof MOVEMENT_COLUMNS)[number]["key"];

  const { sortState: lotesSortState, sortedRows: sortedLoteRows, handleSort: handleLotesSort } = useLegacyTableSort(
    rows,
    (row, key: LoteSortKey) => row[key],
  );

  const selectedSortedRow =
    sortedLoteRows.find((row) => row.key === selectedRowKey) ??
    sortedLoteRows[0] ??
    null;

  const { sortState: movementSortState, sortedRows: sortedMovements, handleSort: handleMovementSort } = useLegacyTableSort(
    selectedSortedRow?.movements ?? [],
    (row, key: MovementSortKey) => row[key],
  );

  if (!isOpen) {
    return null;
  }

  return (
    <ManagedWindowLayer windowId={MODAL_IDS.INVENTORY_LOTES} isOpen={isOpen}>
      <section className="flex h-[min(560px,78vh)] w-[min(980px,92vw)] flex-col border border-[#2f8ce8] bg-[#ececec]">
        <header className="flex h-[30px] items-center justify-between border-b border-[#99a4af] bg-[#f0f0f0] px-2">
          <div className="flex items-center gap-1">
            <span className="h-[12px] w-[12px] border border-[#8fa6cc] bg-white" />
            <h2 className="text-[12px] leading-none font-semibold text-[#1e293b]">Auxiliar de lotes</h2>
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

        <div className="grid min-h-0 flex-1 grid-cols-[60%_40%] gap-[4px] p-[4px]">
          <section className="min-h-0 border border-[#a6adb5] bg-[#efefef]">
            <div className="relative modal-scroll h-full overflow-auto">
              <table className="w-max min-w-full border-collapse text-[11px] leading-none text-[#1d2836]">
                <thead className="sticky top-0 z-10 bg-[#dcdcdc]">
                  <tr>
                    {LOTE_COLUMNS.map((column) => (
                      <th
                        key={column.key}
                        onClick={() => handleLotesSort(column.key)}
                        className={`${column.width} cursor-pointer border border-[#a6adb5] px-1 py-[5px] text-left font-normal hover:bg-[#d6dee7]`}
                      >
                        {column.label}
                        {lotesSortState?.key === column.key ? (
                          <span className="ml-1">{lotesSortState.direction === "asc" ? "▲" : "▼"}</span>
                        ) : null}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedLoteRows.map((row) => (
                    <tr
                      key={row.key}
                      onClick={() => setSelectedRowKey(row.key)}
                      className={`cursor-default ${
                        selectedRowKey === row.key ? "bg-[#cfe5ff]" : "bg-[#efefef] odd:bg-[#f4f4f4]"
                      }`}
                    >
                      <td className="border border-[#a6adb5] px-1 py-[5px]">{formatLegacyDate(row.date)}</td>
                      <td className="border border-[#a6adb5] px-1 py-[5px]">{formatLegacyDate(row.expirationAt)}</td>
                      <td className="border border-[#a6adb5] px-1 py-[5px]">{row.pedimento}</td>
                      <td className="border border-[#a6adb5] px-1 py-[5px]">{row.customs}</td>
                      <td className="border border-[#a6adb5] px-1 py-[5px]">{row.lot}</td>
                      <td className="border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.available, 4)}</td>
                      <td className="border border-[#a6adb5] px-1 py-[5px]">{row.warehouse}</td>
                      <td className="border border-[#a6adb5] px-1 py-[5px]">{row.location}</td>
                      <td className="border border-[#a6adb5] px-1 py-[5px] text-right">
                        {row.sequence ?? ""}
                      </td>
                      <td className="border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.cost, 4)}</td>
                      <td className="border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.adValorem, 4)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {isLoading ? <LegacyModalLoader label="Cargando lotes..." /> : null}
              {error ? (
                <div className="sticky bottom-0 border-t border-[#a6adb5] bg-[#ffe7e7] px-2 py-1 text-[11px] text-[#8b1e1e]">
                  {error}
                </div>
              ) : null}
            </div>
          </section>

          <section className="min-h-0 border border-[#a6adb5] bg-[#efefef]">
            <div className="modal-scroll h-full overflow-auto">
              <table className="w-full border-collapse text-[11px] leading-none text-[#1d2836]">
                <thead className="sticky top-0 z-10 bg-[#dcdcdc]">
                  <tr>
                    {MOVEMENT_COLUMNS.map((column) => (
                      <th
                        key={column.key}
                        onClick={() => handleMovementSort(column.key)}
                        className={`${column.width} cursor-pointer border border-[#a6adb5] px-1 py-[5px] text-left font-normal hover:bg-[#d6dee7]`}
                      >
                        {column.label}
                        {movementSortState?.key === column.key ? (
                          <span className="ml-1">{movementSortState.direction === "asc" ? "▲" : "▼"}</span>
                        ) : null}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedMovements.map((row, index) => (
                    <tr key={`${row.document}-${row.date ?? ""}-${index}`} className="bg-[#efefef] odd:bg-[#f4f4f4]">
                      <td className="border border-[#a6adb5] px-1 py-[5px]">{formatLegacyDate(row.date)}</td>
                      <td className="border border-[#a6adb5] px-1 py-[5px] text-[#144d84]">{row.document}</td>
                      <td className="border border-[#a6adb5] px-1 py-[5px] text-right">
                        {row.entries ? formatFixed(row.entries, 2) : ""}
                      </td>
                      <td className="border border-[#a6adb5] px-1 py-[5px] text-right">
                        {row.exits ? formatFixed(row.exits, 2) : ""}
                      </td>
                      <td className="border border-[#a6adb5] px-1 py-[5px]">{row.warehouse}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <footer className="flex h-[40px] items-center justify-between border-t border-[#a1a8af] bg-[#ececec] px-2">
          <div className="flex items-center gap-3">
            <button type="button" className="h-[24px] min-w-[58px] border border-[#9da3aa] bg-[#d8d8d8] px-2 text-[11px]">
              Cambiar
            </button>
            <button type="button" className="h-[24px] min-w-[124px] border border-[#9da3aa] bg-[#d8d8d8] px-2 text-[11px]">
              Rellena pedimentos
            </button>
            <span className="inline-flex h-[20px] w-[92px] items-center justify-end border border-[#a7adb3] bg-[#d8d9db] px-[4px] text-[11px]">
              {formatFixed(totalAvailable, 4)}
            </span>
            <button type="button" className="h-[24px] min-w-[88px] border border-[#9da3aa] bg-[#d8d8d8] px-2 text-[11px]">
              Traspaso
            </button>
          </div>

          <span className="inline-flex h-[20px] w-[90px] items-center justify-end border border-[#a7adb3] bg-[#d8d9db] px-[4px] text-[11px]">
            {formatFixed(selectedMovementBalance, 3)}
          </span>
        </footer>
      </section>
    </ManagedWindowLayer>
  );
}

export default InventoryLotesModal;
