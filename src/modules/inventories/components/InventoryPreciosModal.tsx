import { X } from "lucide-react";
import { LegacyInput } from "../../shared/components/legacy-form/LegacyInput";
import { useModal } from "../../ui/hooks/useModal";
import { MODAL_IDS } from "../../ui/store/modal.store";

const PRICE_ROWS = [1, 2, 3, 6, 7, 8, 9, 10, 11, 12, 13];

function InventoryPreciosModal() {
  const { isOpen, close } = useModal(MODAL_IDS.INVENTORY_PRECIOS);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <section className="flex h-[min(390px,68vh)] w-[min(500px,96vw)] flex-col border border-[#2f8ce8] bg-[#ececec]">
        <header className="flex h-[24px] items-center justify-between border-b border-[#a9b0b8] bg-[#f0f0f0] px-2">
          <div className="flex items-center gap-1">
            <span className="h-[12px] w-[12px] border border-[#8fa6cc] bg-white" />
            <span className="text-[12px] leading-none font-semibold text-[#1f2933]">Precios</span>
          </div>
          <button
            type="button"
            onClick={close}
            className="grid h-[18px] w-[18px] place-items-center border border-[#6d747b] bg-[#ededed] text-[#2c3948]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-[1fr_150px] gap-[6px] p-[6px] text-[11px] text-[#2f3943]">
          <div className="space-y-[3px]">
            <div className="grid grid-cols-[40px_88px_56px_42px] items-center gap-x-[6px]">
              <span>Costo</span>
              <LegacyInput readOnly value="584.9825" align="right" />
              <span>Decimales</span>
              <LegacyInput readOnly value="0" align="right" />
            </div>

            <div className="grid grid-cols-[40px_88px_40px_42px] items-center gap-x-[6px]">
              <span />
              <span />
              <span className="text-center">% / vta</span>
              <span className="text-center">Moneda</span>
            </div>

            <div className="space-y-[1px]">
              {PRICE_ROWS.map((row) => (
                <div key={row} className="grid grid-cols-[40px_88px_40px_42px] items-center gap-x-[6px]">
                  <span>{`Lista ${row}`}</span>
                  <LegacyInput readOnly value={row === 1 ? "59.0500" : "0.0000"} align="right" />
                  <LegacyInput readOnly value={row === 1 ? "-890.66" : "?"} align="right" />
                  <LegacyInput readOnly value="0" align="right" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div className="space-y-[3px]">
              <div className="text-center text-[11px]">Plan POS</div>
              <LegacyInput readOnly value="0.0000" align="right" />
              <LegacyInput readOnly value="0.0000" align="right" />
              <LegacyInput readOnly value="0.0000" align="right" />
              <div className="pt-[6px] text-center text-[11px]">Nivel precio</div>
              <LegacyInput readOnly value="0" align="right" />
            </div>

            <div className="space-y-[3px]">
              <button className="h-[30px] w-full border border-[#9da3ab] bg-[#d7d7d7] text-[11px] text-[#5d9f67]">✓ OK</button>
              <button
                onClick={close}
                className="h-[30px] w-full border border-[#9da3ab] bg-[#d7d7d7] text-[11px] text-[#c48181]"
              >
                ✕ Cancelar
              </button>
            </div>
          </div>
        </div>

        <footer className="px-[6px] pb-[6px]">
          <button type="button" className="h-[24px] min-w-[74px] border border-[#2f8ce8] bg-[#ececec] px-2 text-[11px]">
            Cambio
          </button>
        </footer>
      </section>
    </div>
  );
}

export default InventoryPreciosModal;
