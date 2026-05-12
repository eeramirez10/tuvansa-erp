import { Square, X } from "lucide-react";
import { formatInteger } from "../utils/formatInteger";
import { useInventoryComprasAnualesModal } from "../hooks/useInventoryComprasAnualesModal";
import { LegacyModalLoader } from "../../shared/components/legacy-form/LegacyModalLoader";
import { useLegacyTableSort } from "../../shared/hooks/useLegacyTableSort";
import { ManagedWindowLayer } from "../../ui/components/ManagedWindowLayer";
import { MODAL_IDS } from "../../ui/store/modal.store";

const COLUMNS = [
  { key: "code", label: "Código", width: "w-[82px]" },
  { key: "name", label: "Nombre", width: "w-[300px]" },
  { key: "year", label: "Año", width: "w-[52px]" },
  { key: "ene", label: "Ene", width: "w-[52px]" },
  { key: "feb", label: "Feb", width: "w-[52px]" },
  { key: "mar", label: "Mar", width: "w-[52px]" },
  { key: "abr", label: "Abr", width: "w-[52px]" },
  { key: "may", label: "May", width: "w-[52px]" },
  { key: "jun", label: "Jun", width: "w-[52px]" },
  { key: "jul", label: "Jul", width: "w-[52px]" },
  { key: "ago", label: "Ago", width: "w-[52px]" },
  { key: "sep", label: "Sep", width: "w-[52px]" },
  { key: "oct", label: "Oct", width: "w-[52px]" },
  { key: "nov", label: "Nov", width: "w-[52px]" },
  { key: "dic", label: "Dic", width: "w-[52px]" },
  { key: "total", label: "Total", width: "w-[60px]" },
] as const;

const monthKeys = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"] as const;

const renderMonthValue = (value: number): string => {
  if (value === 0) {
    return "";
  }

  return formatInteger(value);
};

function InventoryComprasAnualesModal() {
  const { isOpen, close, currentCode, rows, totals, isLoading, error } = useInventoryComprasAnualesModal();
  type SortKey = (typeof COLUMNS)[number]["key"];

  const { sortState, sortedRows, handleSort } = useLegacyTableSort(
    rows,
    (row, key: SortKey) => row[key],
  );

  if (!isOpen) {
    return null;
  }

  return (
    <ManagedWindowLayer windowId={MODAL_IDS.INVENTORY_COMPRAS_ANUALES} isOpen={isOpen}>
      <section className="flex h-[min(620px,84vh)] w-[min(1280px,98vw)] flex-col border border-[#2f8ce8] bg-[#ececec]">
        <header className="flex h-[30px] items-center justify-between border-b border-[#99a4af] bg-[#f0f0f0] px-2">
          <div className="flex items-center gap-1">
            <span className="h-[12px] w-[12px] border border-[#8fa6cc] bg-white" />
            <h2 className="text-[12px] leading-none font-semibold text-[#1e293b]">Compras Anuales</h2>
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
                    {column.label}
                    {sortState?.key === column.key ? (
                      <span className="ml-1">{sortState.direction === "asc" ? "▲" : "▼"}</span>
                    ) : null}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#f3f3f3]">
                <td className="w-[82px] border border-[#a6adb5] px-1 py-[4px] text-[#1c4a7f]">Totales:</td>
                <td className="w-[300px] border border-[#a6adb5] px-1 py-[4px]" />
                <td className="w-[52px] border border-[#a6adb5] px-1 py-[4px]" />
                {monthKeys.map((key) => (
                  <td key={key} className="w-[52px] border border-[#a6adb5] px-1 py-[4px] text-right">
                    {renderMonthValue(totals[key])}
                  </td>
                ))}
                <td className="w-[60px] border border-[#a6adb5] px-1 py-[4px] text-right">{renderMonthValue(totals.total)}</td>
              </tr>

              {sortedRows.map((row, index) => (
                <tr key={`${row.code}-${row.year}-${index}`} className="bg-[#efefef] odd:bg-[#f4f4f4]">
                  <td className="w-[82px] border border-[#a6adb5] px-1 py-[4px] text-[#0f4578]">{row.code}</td>
                  <td className="w-[300px] border border-[#a6adb5] px-1 py-[4px]">{row.name}</td>
                  <td className="w-[52px] border border-[#a6adb5] px-1 py-[4px]">{row.year}</td>
                  {monthKeys.map((key) => (
                    <td key={key} className="w-[52px] border border-[#a6adb5] px-1 py-[4px] text-right">
                      {renderMonthValue(row[key])}
                    </td>
                  ))}
                  <td className="w-[60px] border border-[#a6adb5] px-1 py-[4px] text-right">
                    {renderMonthValue(row.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isLoading ? <LegacyModalLoader label="Cargando compras anuales..." /> : null}
          {error ? (
            <div className="sticky bottom-0 border-t border-[#a6adb5] bg-[#ffe7e7] px-2 py-1 text-[11px] text-[#8b1e1e]">
              {error}
            </div>
          ) : null}
        </div>
      </section>
    </ManagedWindowLayer>
  );
}

export default InventoryComprasAnualesModal;
