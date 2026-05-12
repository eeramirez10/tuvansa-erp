import { useMemo } from "react";
import { Square, X } from "lucide-react";
import { useInventoryCotizacionesClienteData } from "../hooks/useInventoryPedidosModals";
import { formatFixed } from "../utils/formatFixed";
import { formatLegacyDate } from "../utils/formatLegacyDate";
import { LegacyModalLoader } from "../../shared/components/legacy-form/LegacyModalLoader";
import { ManagedWindowLayer } from "../../ui/components/ManagedWindowLayer";
import { MODAL_IDS } from "../../ui/store/modal.store";

const COTIZACIONES_COLUMNS = [
  { key: "code", label: "Código", width: "w-[88px]" },
  { key: "description", label: "Descripción", width: "w-[300px]" },
  { key: "expectedDate", label: "Fecha E.", width: "w-[84px]" },
  { key: "number", label: "Núm.", width: "w-[72px]" },
  { key: "ordered", label: "Pedid.", width: "w-[56px]" },
  { key: "supplied", label: "Surt.", width: "w-[56px]" },
  { key: "remaining", label: "Resta", width: "w-[56px]" },
  { key: "assigned", label: "Asign.", width: "w-[56px]" },
  { key: "externalNumber", label: "Núm. ellos", width: "w-[108px]" },
] as const;

function InventoryCotizacionesClienteModal() {
  const { isOpen, close, currentCode, rows, isLoading, error } = useInventoryCotizacionesClienteData();

  const summary = useMemo(() => {
    const assigned = rows.reduce((acc, row) => acc + row.assigned, 0);
    const stock = rows.reduce((acc, row) => acc + row.supplied, 0);
    const available = stock - assigned;
    const total = rows.reduce((acc, row) => acc + row.ordered, 0);
    const missing = total - stock;

    return { assigned, available, stock, total, missing };
  }, [rows]);

  if (!isOpen) {
    return null;
  }

  return (
    <ManagedWindowLayer windowId={MODAL_IDS.INVENTORY_COTIZACIONES_CLIENTE} isOpen={isOpen}>
      <section className="flex h-[min(560px,78vh)] w-[min(980px,92vw)] flex-col border border-[#2f8ce8] bg-[#ececec]">
        <header className="flex h-[30px] items-center justify-between border-b border-[#99a4af] bg-[#f0f0f0] px-2">
          <div className="flex items-center gap-1">
            <span className="h-[12px] w-[12px] border border-[#8fa6cc] bg-white" />
            <h2 className="text-[12px] leading-none font-semibold text-[#1e293b]">Cotizaciones por cliente</h2>
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

        <div className="flex items-center justify-end border-b border-[#a3abb3] px-2 py-1">
          <span className="inline-flex h-[22px] w-[52px] items-center border border-[#a7adb3] bg-[#d8d9db] px-[4px]" />
          <span className="ml-1 inline-flex h-[22px] w-[64px] items-center justify-end border border-[#a7adb3] bg-[#d8d9db] px-[4px] text-[11px]">
            0.000
          </span>
        </div>

        <div className="relative modal-scroll min-h-0 flex-1 overflow-auto border-b border-[#9ca3ab]">
          <table className="w-max min-w-full border-collapse bg-[#efefef] text-[11px] leading-none text-[#1d2836]">
            <thead className="sticky top-0 z-10 bg-[#dcdcdc]">
              <tr>
                {COTIZACIONES_COLUMNS.map((column) => (
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
                <tr key={`${row.code}-${row.number}-${index}`} className="bg-[#efefef] odd:bg-[#f4f4f4]">
                  <td className="w-[88px] border border-[#a6adb5] px-1 py-[5px]">{row.code}</td>
                  <td className="w-[300px] border border-[#a6adb5] px-1 py-[5px]">{row.description}</td>
                  <td className="w-[84px] border border-[#a6adb5] px-1 py-[5px]">{formatLegacyDate(row.expectedDate)}</td>
                  <td className="w-[72px] border border-[#a6adb5] px-1 py-[5px]">{row.number}</td>
                  <td className="w-[56px] border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.ordered, 0)}</td>
                  <td className="w-[56px] border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.supplied, 0)}</td>
                  <td className="w-[56px] border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.remaining, 0)}</td>
                  <td className="w-[56px] border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.assigned, 0)}</td>
                  <td className="w-[108px] border border-[#a6adb5] px-1 py-[5px]">{row.externalNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {isLoading ? <LegacyModalLoader label="Cargando cotizaciones por cliente..." /> : null}
          {error ? (
            <div className="sticky bottom-0 border-t border-[#a6adb5] bg-[#ffe7e7] px-2 py-1 text-[11px] text-[#8b1e1e]">
              {error}
            </div>
          ) : null}
        </div>

        <footer className="border-t border-[#a1a8af] bg-[#ececec] px-2 pt-1 pb-2">
          <div className="mb-1 flex items-center gap-[8px]">
            <div className="w-[86px]">
              <div className="mb-[2px] text-center text-[11px]">Asignado</div>
              <div className="h-[22px] border border-[#a0a6ad] bg-[#d8d8d8] px-1 text-right text-[11px] leading-[20px]">
                {formatFixed(summary.assigned, 3)}
              </div>
            </div>
            <div className="w-[86px]">
              <div className="mb-[2px] text-center text-[11px]">Disponible</div>
              <div className="h-[22px] border border-[#a0a6ad] bg-[#d8d8d8] px-1 text-right text-[11px] leading-[20px]">
                {formatFixed(summary.available, 3)}
              </div>
            </div>
            <div className="w-[86px]">
              <div className="mb-[2px] text-center text-[11px]">Stock</div>
              <div className="h-[22px] border border-[#a0a6ad] bg-[#d8d8d8] px-1 text-right text-[11px] leading-[20px]">
                {formatFixed(summary.stock, 3)}
              </div>
            </div>
            <div className="w-[86px]">
              <div className="mb-[2px] text-center text-[11px]">Total</div>
              <div className="h-[22px] border border-[#a0a6ad] bg-[#d8d8d8] px-1 text-right text-[11px] leading-[20px]">
                {formatFixed(summary.total, 3)}
              </div>
            </div>
            <div className="w-[86px]">
              <div className="mb-[2px] text-center text-[11px]">Faltante</div>
              <div className="h-[22px] border border-[#a0a6ad] bg-[#d8d8d8] px-1 text-right text-[11px] leading-[20px]">
                {formatFixed(summary.missing, 3)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-[8px]">
            <button type="button" className="h-[26px] min-w-[132px] border border-[#9da3aa] bg-[#d8d8d8] px-2 text-[11px]">
              Filtrar pedidos surtidos
            </button>
            <button type="button" className="h-[26px] min-w-[66px] border border-[#1c6fb4] bg-[#d8d8d8] px-2 text-[11px]">
              Asignar
            </button>
            <button
              type="button"
              disabled
              className="h-[26px] min-w-[62px] border border-[#a9afb6] bg-[#d8d8d8] px-2 text-[11px] text-[#7a828b] disabled:opacity-90"
            />
          </div>
        </footer>
      </section>
    </ManagedWindowLayer>
  );
}

export default InventoryCotizacionesClienteModal;
