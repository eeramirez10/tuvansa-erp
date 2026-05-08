import { Square, X } from "lucide-react";
import { formatFixed } from "../utils/formatFixed";
import { formatLegacyDate } from "../utils/formatLegacyDate";
import { useInventoryCotizadoProveedoresModal } from "../hooks/useInventoryCotizadoProveedoresModal";

const COLUMNS = [
  { key: "code", label: "Código", width: "w-[84px]" },
  { key: "description", label: "Descripción", width: "w-[210px]" },
  { key: "oc", label: "OC", width: "w-[60px]" },
  { key: "um", label: "UM", width: "w-[40px]" },
  { key: "ordered", label: "Pedido", width: "w-[70px]" },
  { key: "supplied", label: "Surtido", width: "w-[70px]" },
  { key: "remaining", label: "Resta", width: "w-[70px]" },
  { key: "date", label: "Fecha", width: "w-[70px]" },
  { key: "expectedDate", label: "Fecha E.", width: "w-[78px]" },
  { key: "observations", label: "Obs....", width: "w-[250px]" },
  { key: "date2", label: "Fecha 2", width: "w-[68px]" }
] as const;

function InventoryCotizadoProveedoresModal() {
  const {
    isOpen,
    close,
    currentCode,
    rows,
    summary,
    pendingOnly,
    togglePendingOnly,
    isLoading,
    error
  } = useInventoryCotizadoProveedoresModal();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <section className="flex h-[min(500px,76vh)] w-[min(1060px,96vw)] flex-col border border-[#2f8ce8] bg-[#ececec]">
        <header className="flex h-[30px] items-center justify-between border-b border-[#99a4af] bg-[#f0f0f0] px-2">
          <div className="flex items-center gap-1">
            <span className="h-[12px] w-[12px] border border-[#8fa6cc] bg-white" />
            <h2 className="text-[12px] leading-none font-semibold text-[#1e293b]">Cotizado a proveedores</h2>
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

        <div className="modal-scroll min-h-0 flex-1 overflow-auto border-b border-[#9ca3ab]">
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
              {isLoading ? (
                <tr>
                  <td
                    colSpan={COLUMNS.length}
                    className="border border-[#a6adb5] px-2 py-[6px] text-center text-[11px] text-[#45515f]"
                  >
                    Cargando cotizado a proveedores...
                  </td>
                </tr>
              ) : null}
              {!isLoading && error ? (
                <tr>
                  <td
                    colSpan={COLUMNS.length}
                    className="border border-[#a6adb5] px-2 py-[6px] text-center text-[11px] text-[#8b1d1d]"
                  >
                    {error}
                  </td>
                </tr>
              ) : null}
              {!isLoading && !error && rows.length === 0 ? (
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
                <tr key={`${row.code}-${row.oc}-${index}`} className="bg-[#efefef] odd:bg-[#f4f4f4]">
                  <td className="w-[84px] border border-[#a6adb5] px-1 py-[4px]">{row.code}</td>
                  <td className="w-[210px] border border-[#a6adb5] px-1 py-[4px]">{row.description}</td>
                  <td className="w-[60px] border border-[#a6adb5] px-1 py-[4px]">{row.oc}</td>
                  <td className="w-[40px] border border-[#a6adb5] px-1 py-[4px]">{row.um}</td>
                  <td className="w-[70px] border border-[#a6adb5] px-1 py-[4px] text-right">{formatFixed(row.ordered, 0)}</td>
                  <td className="w-[70px] border border-[#a6adb5] px-1 py-[4px] text-right">{formatFixed(row.supplied, 0)}</td>
                  <td className="w-[70px] border border-[#a6adb5] px-1 py-[4px] text-right">{formatFixed(row.remaining, 0)}</td>
                  <td className="w-[70px] border border-[#a6adb5] px-1 py-[4px]">{formatLegacyDate(row.date)}</td>
                  <td className="w-[78px] border border-[#a6adb5] px-1 py-[4px]">{formatLegacyDate(row.expectedDate)}</td>
                  <td className="w-[250px] border border-[#a6adb5] px-1 py-[4px]">{row.observations}</td>
                  <td className="w-[68px] border border-[#a6adb5] px-1 py-[4px]">{formatLegacyDate(row.date2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className="flex items-center justify-between gap-4 border-t border-[#a1a8af] bg-[#ececec] px-2 py-1">
          <button
            type="button"
            onClick={togglePendingOnly}
            className="h-[26px] min-w-[148px] border border-[#1c6fb4] bg-[#d8d8d8] px-2 text-[11px] text-[#1f2d3d]"
          >
            {pendingOnly ? "Filtrar pedidos surtidos" : "Mostrar todos"}
          </button>

          <div className="flex items-end gap-3 text-[11px]">
            <div className="flex flex-col items-end">
              <span>Stock</span>
              <span className="inline-flex h-[20px] w-[92px] items-center justify-end border border-[#a0a6ad] bg-[#d8d8d8] px-1">
                {formatFixed(summary.stock, 3)}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span>Por llegar</span>
              <span className="inline-flex h-[20px] w-[92px] items-center justify-end border border-[#a0a6ad] bg-[#d8d8d8] px-1">
                {formatFixed(summary.pending, 3)}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span>Total</span>
              <span className="inline-flex h-[20px] w-[92px] items-center justify-end border border-[#a0a6ad] bg-[#d8d8d8] px-1">
                {formatFixed(summary.total, 3)}
              </span>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}

export default InventoryCotizadoProveedoresModal;
