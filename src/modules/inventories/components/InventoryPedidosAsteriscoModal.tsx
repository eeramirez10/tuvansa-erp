import { Square, X } from "lucide-react";
import { useInventoryPedidosAsteriscoModal } from "../hooks/useInventoryPedidosModals";
import { ManagedWindowLayer } from "../../ui/components/ManagedWindowLayer";
import { MODAL_IDS } from "../../ui/store/modal.store";

const ASTERISCO_COLUMNS = [
  { key: "code", label: "Código", width: "w-[96px]" },
  { key: "description", label: "Descripción", width: "w-[260px]" },
  { key: "dueDate", label: "Fecha E.", width: "w-[86px]" },
  { key: "num", label: "Núm.", width: "w-[72px]" },
  { key: "ordered", label: "Pedido", width: "w-[62px]" },
  { key: "supplied", label: "Surtido", width: "w-[62px]" },
  { key: "remaining", label: "Resta", width: "w-[52px]" },
  { key: "assigned", label: "Asignado", width: "w-[70px]" },
  { key: "price", label: "Precio", width: "w-[66px]" },
] as const;

const FOOTER_SUMMARY = [
  { label: "Asignado", value: "0.000" },
  { label: "Por Asignar", value: "1214.750" },
  { label: "Stock", value: "1214.750" },
  { label: "Total", value: "0.000" },
  { label: "Faltante", value: "-1214.750" },
];

function InventoryPedidosAsteriscoModal() {
  const { isOpen, close, currentCode } = useInventoryPedidosAsteriscoModal();

  if (!isOpen) {
    return null;
  }

  return (
    <ManagedWindowLayer windowId={MODAL_IDS.INVENTORY_PEDIDOS_ASTERISCO} isOpen={isOpen}>
      <section className="flex h-[min(560px,78vh)] w-[min(980px,92vw)] flex-col border border-[#2f8ce8] bg-[#ececec]">
        <header className="flex h-[30px] items-center justify-between border-b border-[#99a4af] bg-[#f0f0f0] px-2">
          <div className="flex items-center gap-1">
            <span className="h-[12px] w-[12px] border border-[#8fa6cc] bg-white" />
            <h2 className="text-[12px] leading-none font-semibold text-[#1e293b]">Pedidos por *</h2>
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
                {ASTERISCO_COLUMNS.map((column) => (
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
              {Array.from({ length: 12 }).map((_, index) => (
                <tr key={index} className="h-[24px] bg-[#efefef] odd:bg-[#f4f4f4]">
                  {ASTERISCO_COLUMNS.map((column) => (
                    <td key={`${index}-${column.key}`} className={`${column.width} border border-[#a6adb5] px-1 py-[5px]`} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className="border-t border-[#a1a8af] bg-[#ececec] px-2 pt-1 pb-2">
          <div className="mb-1 flex items-center gap-[8px]">
            {FOOTER_SUMMARY.map((metric) => (
              <div key={metric.label} className="w-[86px]">
                <div className="mb-[2px] text-center text-[11px]">{metric.label}</div>
                <div className="h-[22px] border border-[#a0a6ad] bg-[#d8d8d8] px-1 text-right text-[11px] leading-[20px]">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-[96px_96px_96px_96px_32px_96px] gap-[2px]">
            <button type="button" className="h-[22px] border border-[#1c6fb4] bg-[#d8d8d8] text-[11px]">
              AGENTE
            </button>
            <button type="button" className="h-[22px] border border-[#9da3aa] bg-[#d8d8d8] text-[11px]">
              GIRO O SECTOR
            </button>
            <button type="button" className="h-[22px] border border-[#9da3aa] bg-[#d8d8d8] text-[11px]">
              SUCURSAL
            </button>
            <span className="h-[22px] border border-[#9da3aa] bg-[#d8d8d8]" />
            <span className="h-[22px] border border-[#9da3aa] bg-[#d8d8d8]" />
            <span className="h-[22px] border border-[#9da3aa] bg-[#d8d8d8]" />
            <span className="h-[22px] border border-[#9da3aa] bg-[#d8d8d8]" />
            <button type="button" className="h-[22px] border border-[#9da3aa] bg-[#d8d8d8] text-[11px]">
              FLETE
            </button>
            <button type="button" className="h-[22px] border border-[#9da3aa] bg-[#d8d8d8] text-[11px]">
              ORIGEN
            </button>
            <button type="button" className="h-[22px] border border-[#9da3aa] bg-[#d8d8d8] text-[11px]">
              PROYECTO
            </button>
          </div>
        </footer>
      </section>
    </ManagedWindowLayer>
  );
}

export default InventoryPedidosAsteriscoModal;
