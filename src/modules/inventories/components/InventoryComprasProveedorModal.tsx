import { Square, X } from "lucide-react";
import { formatFixed } from "../utils/formatFixed";
import { useInventoryComprasProveedorModal } from "../hooks/useInventoryComprasProveedorModal";
import { LegacyModalLoader } from "../../shared/components/legacy-form/LegacyModalLoader";
import { ManagedWindowLayer } from "../../ui/components/ManagedWindowLayer";
import { MODAL_IDS } from "../../ui/store/modal.store";

const COLUMNS = [
  { key: "code", label: "Código", width: "w-[82px]" },
  { key: "supplier", label: "Proveedor", width: "w-[350px]" },
  { key: "quantity", label: "Cantidad", width: "w-[110px]" },
  { key: "amount", label: "Importe", width: "w-[128px]" },
] as const;

function InventoryComprasProveedorModal() {
  const { isOpen, close, currentCode, rows, summary, isLoading, error } = useInventoryComprasProveedorModal();

  if (!isOpen) {
    return null;
  }

  return (
    <ManagedWindowLayer windowId={MODAL_IDS.INVENTORY_COMPRAS_PROVEEDOR} isOpen={isOpen}>
      <section className="flex h-[min(560px,78vh)] w-[min(980px,92vw)] flex-col border border-[#2f8ce8] bg-[#ececec]">
        <header className="flex h-[30px] items-center justify-between border-b border-[#99a4af] bg-[#f0f0f0] px-2">
          <div className="flex items-center gap-1">
            <span className="h-[12px] w-[12px] border border-[#8fa6cc] bg-white" />
            <h2 className="text-[12px] leading-none font-semibold text-[#1e293b]">Compras por proveedor</h2>
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
              {rows.map((row) => (
                <tr key={`${row.code}-${row.supplier}`} className="bg-[#efefef] odd:bg-[#f4f4f4]">
                  <td className="w-[82px] border border-[#a6adb5] px-1 py-[4px]">{row.code}</td>
                  <td className="w-[350px] border border-[#a6adb5] px-1 py-[4px]">{row.supplier}</td>
                  <td className="w-[110px] border border-[#a6adb5] px-1 py-[4px] text-right">{formatFixed(row.quantity, 2)}</td>
                  <td className="w-[128px] border border-[#a6adb5] px-1 py-[4px] text-right">{formatFixed(row.amount, 2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {isLoading ? <LegacyModalLoader label="Cargando compras por proveedor..." /> : null}
        </div>

        <footer className="flex h-[28px] items-center justify-end gap-[4px] border-t border-[#a1a8af] bg-[#ececec] px-2">
          <span className="text-[11px] text-[#1d2836]">Total</span>
          <span className="inline-flex h-[20px] w-[110px] items-center justify-end border border-[#a0a6ad] bg-[#d8d8d8] px-1 text-[11px] text-[#2f3943]">
            {formatFixed(summary.totalQuantity, 2)}
          </span>
          <span className="inline-flex h-[20px] w-[128px] items-center justify-end border border-[#a0a6ad] bg-[#d8d8d8] px-1 text-[11px] text-[#2f3943]">
            {formatFixed(summary.totalAmount, 2)}
          </span>
        </footer>
      </section>
    </ManagedWindowLayer>
  );
}

export default InventoryComprasProveedorModal;
