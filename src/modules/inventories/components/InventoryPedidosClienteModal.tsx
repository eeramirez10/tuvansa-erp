import { Square, X } from "lucide-react";
import { useInventoryPedidosClienteData } from "../hooks/useInventoryPedidosModals";
import { formatFixed } from "../utils/formatFixed";
import { formatLegacyDate } from "../utils/formatLegacyDate";

const CLIENTE_COLUMNS = [
  { key: "code", label: "Código", width: "w-[72px]" },
  { key: "description", label: "Descripción", width: "w-[290px]" },
  { key: "dueDate", label: "Fecha E.", width: "w-[80px]" },
  { key: "num", label: "Núm.", width: "w-[78px]" },
  { key: "ordered", label: "Pedido", width: "w-[66px]" },
  { key: "supplied", label: "Surtido", width: "w-[66px]" },
  { key: "remaining", label: "Resta", width: "w-[58px]" },
  { key: "assigned", label: "Asignado", width: "w-[66px]" },
  { key: "price", label: "Precio", width: "w-[88px]" },
  { key: "externalNum", label: "Núm. ellos", width: "w-[84px]" },
  { key: "pieces", label: "Pzas", width: "w-[72px]" },
  { key: "warehouse", label: "Alm.", width: "w-[48px]" },
  { key: "wms", label: "WMS", width: "w-[56px]" },
] as const;

function InventoryPedidosClienteModal() {
  const { isOpen, close, currentCode, rows, isLoading, error, summary } = useInventoryPedidosClienteData();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
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

        <div className="modal-scroll min-h-0 flex-1 overflow-auto border-b border-[#9ca3ab]">
          <table className="w-max min-w-full border-collapse bg-[#efefef] text-[11px] leading-none text-[#1d2836]">
            <thead className="sticky top-0 z-10 bg-[#dcdcdc]">
              <tr>
                {CLIENTE_COLUMNS.map((column) => (
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
                  <td className="w-[72px] border border-[#a6adb5] px-1 py-[5px]">{row.code}</td>
                  <td className="w-[290px] border border-[#a6adb5] px-1 py-[5px]">{row.description}</td>
                  <td className="w-[80px] border border-[#a6adb5] px-1 py-[5px]">{formatLegacyDate(row.expectedDate)}</td>
                  <td className="w-[78px] border border-[#a6adb5] px-1 py-[5px]">{row.number}</td>
                  <td className="w-[66px] border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.ordered, 0)}</td>
                  <td className="w-[66px] border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.supplied, 0)}</td>
                  <td className="w-[58px] border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.remaining, 0)}</td>
                  <td className="w-[66px] border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.assigned, 0)}</td>
                  <td className="w-[88px] border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.price, 2)}</td>
                  <td className="w-[84px] border border-[#a6adb5] px-1 py-[5px]">{row.externalNumber}</td>
                  <td className="w-[72px] border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.pieces, 0)}</td>
                  <td className="w-[48px] border border-[#a6adb5] px-1 py-[5px]">{row.warehouse}</td>
                  <td className="w-[56px] border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.wms, 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {isLoading ? (
            <div className="sticky bottom-0 border-t border-[#a6adb5] bg-[#f6f6f6] px-2 py-1 text-[11px] text-[#334155]">
              Cargando pedidos por cliente...
            </div>
          ) : null}
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
              className="h-[26px] min-w-[48px] border border-[#a9afb6] bg-[#d8d8d8] px-2 text-[11px] text-[#7a828b] disabled:opacity-90"
            >
              OK
            </button>
            <button
              type="button"
              disabled
              className="h-[26px] min-w-[62px] border border-[#a9afb6] bg-[#d8d8d8] px-2 text-[11px] text-[#7a828b] disabled:opacity-90"
            >
              Cancelar
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}

export default InventoryPedidosClienteModal;
