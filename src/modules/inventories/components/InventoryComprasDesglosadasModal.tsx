import { Square, X } from "lucide-react";
import { formatFixed } from "../utils/formatFixed";
import { formatLegacyDate } from "../utils/formatLegacyDate";
import { useInventoryComprasDesglosadasModal } from "../hooks/useInventoryComprasDesglosadasModal";
import { LegacyModalLoader } from "../../shared/components/legacy-form/LegacyModalLoader";
import { ManagedWindowLayer } from "../../ui/components/ManagedWindowLayer";
import { MODAL_IDS } from "../../ui/store/modal.store";

const COLUMNS = [
  { key: "code", label: "Código", width: "w-[74px]" },
  { key: "supplier", label: "Proveedor", width: "w-[350px]" },
  { key: "quantity", label: "Cantidad", width: "w-[98px]" },
  { key: "price", label: "Precio", width: "w-[80px]" },
  { key: "document", label: "Doc.", width: "w-[96px]" },
  { key: "date", label: "Fecha", width: "w-[92px]" },
  { key: "pieces", label: "Pzas", width: "w-[86px]" },
  { key: "exchangeRate", label: "T.C.", width: "w-[88px]" },
  { key: "dollarsAmount", label: "Importe dlls", width: "w-[104px]" },
] as const;

function InventoryComprasDesglosadasModal() {
  const { isOpen, close, currentCode, rows, isLoading, error } = useInventoryComprasDesglosadasModal();

  if (!isOpen) {
    return null;
  }

  return (
    <ManagedWindowLayer windowId={MODAL_IDS.INVENTORY_COMPRAS_DESGLOSADAS} isOpen={isOpen}>
      <section className="flex h-[min(560px,78vh)] w-[min(980px,92vw)] flex-col border border-[#2f8ce8] bg-[#ececec]">
        <header className="flex h-[30px] items-center justify-between border-b border-[#99a4af] bg-[#f0f0f0] px-2">
          <div className="flex items-center gap-1">
            <span className="h-[12px] w-[12px] border border-[#8fa6cc] bg-white" />
            <h2 className="text-[12px] leading-none font-semibold text-[#1e293b]">Compras por proveedor</h2>
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
              {error ? (
                <tr>
                  <td
                    colSpan={COLUMNS.length}
                    className="border border-[#a6adb5] px-2 py-[6px] text-center text-[11px] text-[#8b1d1d]"
                  >
                    {error}
                  </td>
                </tr>
              ) : null}
              {!error && rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={COLUMNS.length}
                    className="border border-[#a6adb5] px-2 py-[6px] text-center text-[11px] text-[#45515f]"
                  >
                    Sin datos.
                  </td>
                </tr>
              ) : null}
              {rows.map((row, index) => (
                <tr key={`${row.code}-${row.document}-${index}`} className="bg-[#efefef] odd:bg-[#f4f4f4]">
                  <td className="w-[74px] border border-[#a6adb5] px-1 py-[4px]">{row.code}</td>
                  <td className="w-[350px] border border-[#a6adb5] px-1 py-[4px]">{row.supplier}</td>
                  <td className="w-[98px] border border-[#a6adb5] px-1 py-[4px] text-right">{formatFixed(row.quantity, 3)}</td>
                  <td className="w-[80px] border border-[#a6adb5] px-1 py-[4px] text-right">{formatFixed(row.price, 2)}</td>
                  <td className="w-[96px] border border-[#a6adb5] px-1 py-[4px]">{row.document}</td>
                  <td className="w-[92px] border border-[#a6adb5] px-1 py-[4px]">{formatLegacyDate(row.date)}</td>
                  <td className="w-[86px] border border-[#a6adb5] px-1 py-[4px] text-right">{formatFixed(row.pieces, 0)}</td>
                  <td className="w-[88px] border border-[#a6adb5] px-1 py-[4px] text-right">{formatFixed(row.exchangeRate, 2)}</td>
                  <td className="w-[104px] border border-[#a6adb5] px-1 py-[4px] text-right">{formatFixed(row.dollarsAmount, 2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {isLoading ? <LegacyModalLoader label="Cargando compras desglosadas..." /> : null}
        </div>

        <footer className="flex h-[38px] items-center gap-[8px] border-t border-[#a1a8af] bg-[#ececec] px-2">
          <button
            type="button"
            className="inline-flex h-[24px] min-w-[74px] items-center justify-center border border-[#8f959c] bg-[#d9d9d9] px-3 text-[11px] text-[#2f3943]"
          >
            Último
          </button>
          <button
            type="button"
            className="inline-flex h-[24px] min-w-[168px] items-center justify-center border border-[#8f959c] bg-[#d9d9d9] px-3 text-[11px] text-[#2f3943]"
          >
            Ver gastos de importación
          </button>
        </footer>
      </section>
    </ManagedWindowLayer>
  );
}

export default InventoryComprasDesglosadasModal;
