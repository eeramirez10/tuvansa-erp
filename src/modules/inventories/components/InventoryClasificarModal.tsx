import { X } from "lucide-react";
import { useInventoryClasificarModal } from "../hooks/useInventoryClasificarModal";
import { ManagedWindowLayer } from "../../ui/components/ManagedWindowLayer";
import { MODAL_IDS } from "../../ui/store/modal.store";

function InventoryClasificarModal() {
  const {
    isOpen,
    close,
    selectedRows,
    selectedRowIndex,
    setSelectedRowIndex,
    selectedFamilyTitle,
    availableRows
  } = useInventoryClasificarModal();

  if (!isOpen) {
    return null;
  }

  return (
    <ManagedWindowLayer windowId={MODAL_IDS.INVENTORY_CLASIFICAR} isOpen={isOpen}>
      <section className="flex h-[min(560px,78vh)] w-[min(980px,96vw)] flex-col border border-[#2f8ce8] bg-[#ececec]">
        <header className="flex h-[30px] items-center justify-between border-b border-[#99a4af] bg-[#f0f0f0] px-2">
          <div className="flex items-center gap-1">
            <span className="h-[12px] w-[12px] border border-[#8fa6cc] bg-white" />
            <h2 className="text-[12px] leading-none font-semibold text-[#1e293b]">Seleccion de parametros</h2>
          </div>
          <button
            type="button"
            onClick={close}
            className="grid h-[18px] w-[18px] place-items-center border border-[#6d747b] bg-[#ededed] text-[#2c3948]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-[1fr_72px_340px] gap-[10px] p-[8px]">
          <section className="min-h-0 border border-[#aab1b9] bg-[#efefef]">
            <div className="grid h-[24px] grid-cols-[28px_110px_56px_1fr] border-b border-[#aab1b9] text-[11px] text-[#1d2836]">
              <div />
              <div className="col-span-3 flex items-center justify-start px-2 font-semibold">SELECCIONADOS</div>
            </div>
            <div className="grid h-[24px] grid-cols-[28px_110px_56px_1fr] border-b border-[#aab1b9] bg-[#e6e6e6] text-[11px] text-[#1d2836]">
              <div className="flex items-center border-r border-[#aab1b9] px-1">F.</div>
              <div className="flex items-center border-r border-[#aab1b9] px-1">Fam</div>
              <div className="flex items-center border-r border-[#aab1b9] px-1">Cod.</div>
              <div className="flex items-center px-1">Descripción</div>
            </div>

            <div className="modal-scroll h-[calc(100%-48px)] overflow-auto">
              <table className="w-full border-collapse text-[11px] leading-none text-[#1d2836]">
                <tbody>
                  {selectedRows.map((row, index) => (
                    <tr
                      key={`${row.row}-${row.family}-${index}`}
                      className={`h-[24px] cursor-pointer ${index === selectedRowIndex ? "bg-[#b7d2e7]" : ""}`}
                      onClick={() => setSelectedRowIndex(index)}
                    >
                      <td className="w-[28px] border-r border-b border-[#aab1b9] px-1">{row.row}</td>
                      <td className="w-[110px] border-r border-b border-[#aab1b9] px-1">{row.family}</td>
                      <td className="w-[56px] border-r border-b border-[#aab1b9] px-1">{row.code}</td>
                      <td className="border-b border-[#aab1b9] px-1">{row.description}</td>
                    </tr>
                  ))}

                  {Array.from({ length: 12 }).map((_, idx) => (
                    <tr key={`empty-${idx}`} className="h-[24px]">
                      <td className="border-r border-b border-[#aab1b9] px-1" />
                      <td className="border-r border-b border-[#aab1b9] px-1" />
                      <td className="border-r border-b border-[#aab1b9] px-1" />
                      <td className="border-b border-[#aab1b9] px-1" />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="flex items-start justify-center pt-[66px]">
            <button
              type="button"
              className="inline-flex h-[24px] w-[56px] items-center justify-center border border-[#9ca3ab] bg-[#d7d7d7] text-[11px] text-[#2f3943]"
            >
              &lt;
            </button>
          </div>

          <section className="min-h-0 border border-[#aab1b9] bg-[#efefef]">
            <div className="flex h-[24px] items-center border-b border-[#aab1b9] px-[4px]">
              <span className="inline-flex h-[20px] min-w-[240px] items-center border border-[#8d949b] bg-[#f1f1f1] px-[6px] text-[24px] leading-none font-semibold text-[#1b2430]">
                {selectedFamilyTitle}
              </span>
            </div>
            <div className="grid h-[24px] grid-cols-[56px_1fr] border-b border-[#aab1b9] bg-[#e6e6e6] text-[11px] text-[#1d2836]">
              <div className="flex items-center border-r border-[#aab1b9] px-1">Fam</div>
              <div className="flex items-center px-1">Descripción</div>
            </div>

            <div className="modal-scroll h-[calc(100%-56px)] overflow-auto">
              <table className="w-full border-collapse text-[11px] leading-none text-[#1d2836]">
                <tbody>
                  {availableRows.map((row, index) => (
                    <tr key={`${row.family}-${row.description}-${index}`} className="h-[24px]">
                      <td className="w-[56px] border-r border-b border-[#aab1b9] px-1">{row.family}</td>
                      <td className="border-b border-[#aab1b9] px-1">{row.description}</td>
                    </tr>
                  ))}
                  {Array.from({ length: 24 }).map((_, idx) => (
                    <tr key={`empty-right-${idx}`} className="h-[24px]">
                      <td className="border-r border-b border-[#aab1b9] px-1" />
                      <td className="border-b border-[#aab1b9] px-1" />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex h-[32px] items-center justify-end border-t border-[#aab1b9] px-[4px]">
              <button
                type="button"
                className="inline-flex h-[24px] min-w-[92px] items-center justify-center border border-[#9ca3ab] bg-[#d7d7d7] px-3 text-[11px] text-[#2f3943]"
              >
                Guardar
              </button>
            </div>
          </section>
        </div>
      </section>
    </ManagedWindowLayer>
  );
}

export default InventoryClasificarModal;
