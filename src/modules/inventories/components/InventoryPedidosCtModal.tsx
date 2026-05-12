import { Square, X } from "lucide-react";
import { useInventoryPedidosCtData } from "../hooks/useInventoryPedidosModals";
import { formatFixed } from "../utils/formatFixed";
import { formatLegacyDate } from "../utils/formatLegacyDate";
import { LegacyModalLoader } from "../../shared/components/legacy-form/LegacyModalLoader";
import { useLegacyTableSort } from "../../shared/hooks/useLegacyTableSort";
import { ManagedWindowLayer } from "../../ui/components/ManagedWindowLayer";
import { MODAL_IDS } from "../../ui/store/modal.store";

const CT_COLUMNS = [
  { key: "code", label: "Código", width: "w-[64px]" },
  { key: "description", label: "Descripción", width: "w-[300px]" },
  { key: "num", label: "Núm.", width: "w-[84px]" },
  { key: "ordered", label: "Pedido", width: "w-[64px]" },
  { key: "supplied", label: "Surtido", width: "w-[66px]" },
  { key: "remaining", label: "Resta", width: "w-[56px]" },
  { key: "dueDate", label: "Fecha E.", width: "w-[80px]" },
  { key: "expiresAt", label: "Vence", width: "w-[80px]" },
  { key: "price", label: "Precio", width: "w-[84px]" },
  { key: "externalNum", label: "Núm. ellos", width: "w-[118px]" },
] as const;

function InventoryPedidosCtModal() {
  const { isOpen, close, currentCode, rows, isLoading, error, summary } = useInventoryPedidosCtData();
  type SortKey = (typeof CT_COLUMNS)[number]["key"];

  const { sortState, sortedRows, handleSort } = useLegacyTableSort(
    rows,
    (row, key: SortKey) => {
      switch (key) {
        case "num":
          return row.number;
        case "ordered":
          return row.ordered;
        case "supplied":
          return row.supplied;
        case "remaining":
          return row.remaining;
        case "dueDate":
          return row.expectedDate ?? "";
        case "expiresAt":
          return row.expiresAt ?? "";
        case "price":
          return row.price;
        case "externalNum":
          return row.externalNumber;
        case "code":
          return row.code;
        case "description":
          return row.description;
        default:
          return "";
      }
    },
  );

  if (!isOpen) {
    return null;
  }

  return (
    <ManagedWindowLayer windowId={MODAL_IDS.INVENTORY_PEDIDOS_CT} isOpen={isOpen}>
      <section className="flex h-[min(560px,78vh)] w-[min(980px,92vw)] flex-col border border-[#2f8ce8] bg-[#ececec]">
        <header className="flex h-[30px] items-center justify-between border-b border-[#99a4af] bg-[#f0f0f0] px-2">
          <div className="flex items-center gap-1">
            <span className="h-[12px] w-[12px] border border-[#8fa6cc] bg-white" />
            <h2 className="text-[12px] leading-none font-semibold text-[#1e293b]">Pedidos por cliente</h2>
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
                {CT_COLUMNS.map((column) => (
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
              {sortedRows.map((row, index) => (
                <tr key={`${row.code}-${row.number}-${index}`} className="bg-[#efefef] odd:bg-[#f4f4f4]">
                  <td className="w-[64px] border border-[#a6adb5] px-1 py-[5px]">{row.code}</td>
                  <td className="w-[300px] border border-[#a6adb5] px-1 py-[5px]">{row.description}</td>
                  <td className="w-[84px] border border-[#a6adb5] px-1 py-[5px]">{row.number}</td>
                  <td className="w-[64px] border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.ordered, 0)}</td>
                  <td className="w-[66px] border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.supplied, 0)}</td>
                  <td className="w-[56px] border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.remaining, 0)}</td>
                  <td className="w-[80px] border border-[#a6adb5] px-1 py-[5px]">{formatLegacyDate(row.expectedDate)}</td>
                  <td className="w-[80px] border border-[#a6adb5] px-1 py-[5px]">{formatLegacyDate(row.expiresAt)}</td>
                  <td className="w-[84px] border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.price, 2)}</td>
                  <td className="w-[118px] border border-[#a6adb5] px-1 py-[5px]">{row.externalNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {isLoading ? <LegacyModalLoader label="Cargando pedidos por cliente CT..." /> : null}
          {error ? (
            <div className="sticky bottom-0 border-t border-[#a6adb5] bg-[#ffe7e7] px-2 py-1 text-[11px] text-[#8b1e1e]">
              {error}
            </div>
          ) : null}

          <div className="border-x border-b border-[#a6adb5] bg-[#d7d7d7] px-2 py-1">
            <div className="flex items-center gap-[2px]">
              {Array.from({ length: 16 }).map((_, index) => (
                <span key={index} className="h-[20px] w-[42px] border border-[#9ca3aa] bg-[#efefef]" />
              ))}
            </div>
          </div>

          <div className="h-[200px] border-x border-b border-[#a6adb5] bg-[#efefef]" />
        </div>

        <footer className="flex items-end gap-[6px] border-t border-[#a1a8af] bg-[#ececec] px-2 py-1">
          <span className="text-[20px] leading-none">¯</span>
          <span className="text-[11px]">Total</span>
          <div className="h-[22px] w-[72px] border border-[#a0a6ad] bg-[#d8d8d8] px-1 text-right text-[11px] leading-[20px]">
            {formatFixed(summary.totalOrdered, 0)}
          </div>
          <div className="h-[22px] w-[72px] border border-[#a0a6ad] bg-[#d8d8d8] px-1 text-right text-[11px] leading-[20px]">
            {formatFixed(summary.totalSupplied, 0)}
          </div>
          <button type="button" className="h-[24px] min-w-[44px] border border-[#9da3aa] bg-[#d8d8d8] px-2 text-[11px]">
            Pedido
          </button>
          <button type="button" className="h-[24px] min-w-[48px] border border-[#9da3aa] bg-[#d8d8d8] px-2 text-[11px]">
            Surtido
          </button>
          <button type="button" className="h-[24px] min-w-[42px] border border-[#9da3aa] bg-[#d8d8d8] px-2 text-[11px]">
            Resta
          </button>
          <button type="button" className="h-[24px] min-w-[94px] border border-[#9da3aa] bg-[#d8d8d8] px-2 text-[11px]">
            Filtrar Tipo
          </button>
        </footer>
      </section>
    </ManagedWindowLayer>
  );
}

export default InventoryPedidosCtModal;
