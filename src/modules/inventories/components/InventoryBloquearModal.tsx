import { HelpCircle, X } from "lucide-react";
import { useModal } from "../../ui/hooks/useModal";
import { MODAL_IDS } from "../../ui/store/modal.store";
import { ManagedWindowLayer } from "../../ui/components/ManagedWindowLayer";

function InventoryBloquearModal() {
  const { isOpen, close } = useModal(MODAL_IDS.INVENTORY_BLOQUEAR);

  if (!isOpen) {
    return null;
  }

  return (
    <ManagedWindowLayer windowId={MODAL_IDS.INVENTORY_BLOQUEAR} isOpen={isOpen}>
      <section className="flex w-[min(390px,96vw)] flex-col border border-[#2f8ce8] bg-[#ececec]">
        <header className="flex h-[26px] items-center justify-between border-b border-[#a9b0b8] bg-[#f0f0f0] px-2">
          <div className="text-[12px] leading-none font-semibold text-[#1f2933]">Bloquear</div>
          <button
            type="button"
            onClick={close}
            className="grid h-[18px] w-[18px] place-items-center border border-[#6d747b] bg-[#ededed] text-[#2c3948]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </header>

        <div className="flex items-center gap-3 px-3 py-4">
          <span className="grid h-[28px] w-[28px] place-items-center rounded-full border border-[#006cba] bg-[#1e87d0] text-white">
            <HelpCircle className="h-4 w-4" />
          </span>
          <p className="text-[11px] leading-[14px] text-[#111827]">
            Esta rutina bloquea/desbloquea el producto actual
            <br />
            ¿Continuó?
          </p>
        </div>

        <div className="flex justify-end gap-2 border-t border-[#d0d0d0] px-3 py-2">
          <button
            type="button"
            onClick={close}
            className="h-[22px] min-w-[66px] border border-[#2f8ce8] bg-[#ececec] px-3 text-[12px] text-[#1f2933]"
          >
            Yes
          </button>
          <button
            type="button"
            onClick={close}
            className="h-[22px] min-w-[66px] border border-[#9ca3ab] bg-[#d4d4d4] px-3 text-[12px] text-[#1f2933]"
          >
            No
          </button>
        </div>
      </section>
    </ManagedWindowLayer>
  );
}

export default InventoryBloquearModal;
