import { Square, X } from "lucide-react";
import { formatFixed } from "../utils/formatFixed";
import { useInventoryVentasSucursalModal } from "../hooks/useInventoryVentasSucursalModal";

const COLUMNS = [
  { key: "branch", label: "Sucursal", width: "w-[72px]" },
  { key: "code", label: "Código", width: "w-[92px]" },
  { key: "client", label: "Cliente", width: "w-[360px]" },
  { key: "quantity", label: "Cantidad", width: "w-[88px]" },
  { key: "amount", label: "Importe", width: "w-[110px]" },
] as const;

function InventoryVentasSucursalModal() {
  const { isOpen, close, currentCode, rows, isLoading, error, summary } = useInventoryVentasSucursalModal();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <section className="flex h-[min(560px,78vh)] w-[min(980px,92vw)] flex-col border border-[#2f8ce8] bg-[#ececec]">
        <header className="flex h-[30px] items-center justify-between border-b border-[#99a4af] bg-[#f0f0f0] px-2">
          <div className="flex items-center gap-1">
            <span className="h-[12px] w-[12px] border border-[#8fa6cc] bg-white" />
            <h2 className="text-[12px] leading-none font-semibold text-[#1e293b]">Productos vendidos por sucursal</h2>
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
                <tr key={`${row.code}-${row.client}-${index}`} className="bg-[#efefef] odd:bg-[#f4f4f4]">
                  <td className="w-[72px] border border-[#a6adb5] px-1 py-[5px]">{row.branch}</td>
                  <td className="w-[92px] border border-[#a6adb5] px-1 py-[5px] text-[#144d84]">{row.code}</td>
                  <td className="w-[360px] border border-[#a6adb5] px-1 py-[5px]">{row.client}</td>
                  <td className="w-[88px] border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.quantity, 2)}</td>
                  <td className="w-[110px] border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.amount, 2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {isLoading ? (
            <div className="sticky bottom-0 border-t border-[#a6adb5] bg-[#f6f6f6] px-2 py-1 text-[11px] text-[#334155]">
              Cargando ventas por sucursal...
            </div>
          ) : null}
          {error ? (
            <div className="sticky bottom-0 border-t border-[#a6adb5] bg-[#ffe7e7] px-2 py-1 text-[11px] text-[#8b1e1e]">
              {error}
            </div>
          ) : null}
        </div>

        <footer className="flex h-[28px] items-center justify-end gap-[4px] border-t border-[#a1a8af] bg-[#ececec] px-2">
          <span className="inline-flex h-[20px] w-[92px] items-center justify-end border border-[#a0a6ad] bg-[#d8d8d8] px-1 text-[11px] text-[#2f3943]">
            {formatFixed(summary.totalQuantity, 2)}
          </span>
          <span className="inline-flex h-[20px] w-[118px] items-center justify-end border border-[#a0a6ad] bg-[#d8d8d8] px-1 text-[11px] text-[#2f3943]">
            {formatFixed(summary.totalAmount, 2)}
          </span>
        </footer>
      </section>
    </div>
  );
}

export default InventoryVentasSucursalModal;
