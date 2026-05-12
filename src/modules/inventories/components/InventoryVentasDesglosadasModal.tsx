import { Square, X } from "lucide-react";
import { formatFixed } from "../utils/formatFixed";
import { formatLegacyDate } from "../utils/formatLegacyDate";
import { useInventoryVentasDesglosadasModal } from "../hooks/useInventoryVentasDesglosadasModal";
import { LegacyModalLoader } from "../../shared/components/legacy-form/LegacyModalLoader";
import { ManagedWindowLayer } from "../../ui/components/ManagedWindowLayer";
import { MODAL_IDS } from "../../ui/store/modal.store";

const COLUMNS = [
  { key: "code", label: "Código", width: "w-[78px]" },
  { key: "name", label: "Nombre", width: "w-[330px]" },
  { key: "quantity", label: "Cantidad", width: "w-[70px]" },
  { key: "price", label: "Precio", width: "w-[72px]" },
  { key: "document", label: "Doc.", width: "w-[74px]" },
  { key: "date", label: "Fecha", width: "w-[84px]" },
  { key: "unitPrice", label: "Precio US", width: "w-[78px]" },
  { key: "tcDolar", label: "TC Dólar", width: "w-[86px]" },
  { key: "percentDesc", label: "% Desc", width: "w-[68px]" },
] as const;

function InventoryVentasDesglosadasModal() {
  const { isOpen, close, currentCode, rows, total, isLoading, error } = useInventoryVentasDesglosadasModal();

  if (!isOpen) {
    return null;
  }

  return (
    <ManagedWindowLayer windowId={MODAL_IDS.INVENTORY_VENTAS_DESGLOSADAS} isOpen={isOpen}>
      <section className="flex h-[min(560px,78vh)] w-[min(1080px,96vw)] flex-col border border-[#2f8ce8] bg-[#ececec]">
        <header className="flex h-[30px] items-center justify-between border-b border-[#99a4af] bg-[#f0f0f0] px-2">
          <div className="flex items-center gap-1">
            <span className="h-[12px] w-[12px] border border-[#8fa6cc] bg-white" />
            <h2 className="text-[12px] leading-none font-semibold text-[#1e293b]">Ventas desglosadas</h2>
          </div>
          <div className="mr-auto ml-3 text-[11px] text-[#3a4552]">
            {currentCode ? `Producto: ${currentCode}` : ""}
          </div>
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
                    className={`${column.width} border border-[#a6adb5] px-1 py-[5px] text-left font-normal`}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={`${row.code}-${row.document}-${index}`} className="bg-[#efefef] odd:bg-[#f4f4f4]">
                  <td className="w-[78px] border border-[#a6adb5] px-1 py-[5px]">{row.code}</td>
                  <td className="w-[330px] border border-[#a6adb5] px-1 py-[5px]">{row.name}</td>
                  <td className="w-[70px] border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.quantity, 3)}</td>
                  <td className="w-[72px] border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.price, 2)}</td>
                  <td className="w-[74px] border border-[#a6adb5] px-1 py-[5px]">{row.document}</td>
                  <td className="w-[84px] border border-[#a6adb5] px-1 py-[5px]">{formatLegacyDate(row.date)}</td>
                  <td className="w-[78px] border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.unitPrice, 2)}</td>
                  <td className="w-[86px] border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.tcDolar, 5)}</td>
                  <td className="w-[68px] border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.percentDesc, 2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {isLoading ? <LegacyModalLoader label="Cargando ventas desglosadas..." /> : null}
          {error ? (
            <div className="sticky bottom-0 border-t border-[#a6adb5] bg-[#ffe7e7] px-2 py-1 text-[11px] text-[#8b1e1e]">
              {error}
            </div>
          ) : null}
        </div>

        <footer className="flex h-[42px] items-center justify-between border-t border-[#a1a8af] bg-[#ececec] px-2">
          <button
            type="button"
            className="inline-flex h-[28px] min-w-[112px] items-center justify-center gap-1 border border-[#8f959c] bg-[#d9d9d9] px-3 text-[11px] text-[#2f3943]"
          >
            <span className="text-[12px]">🧿</span>
            <span>Último</span>
          </button>

          <span className="inline-flex h-[20px] w-[180px] items-center justify-end border border-[#a0a6ad] bg-[#d8d8d8] px-2 text-[11px] text-[#2f3943]">
            {formatFixed(total, 3)}
          </span>
        </footer>
      </section>
    </ManagedWindowLayer>
  );
}

export default InventoryVentasDesglosadasModal;
