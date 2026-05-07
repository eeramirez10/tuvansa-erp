import { X } from "lucide-react";
import { LegacyInput } from "../../shared/components/legacy-form/LegacyInput";
import { useModal } from "../../ui/hooks/useModal";
import { MODAL_IDS } from "../../ui/store/modal.store";

function InventoryCanalesModal() {
  const { isOpen, close } = useModal(MODAL_IDS.INVENTORY_CANALES);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <section className="flex h-[min(580px,80vh)] w-[min(1060px,96vw)] flex-col border border-[#2f8ce8] bg-[#ececec]">
        <header className="flex h-[24px] items-center justify-between border-b border-[#a9b0b8] bg-[#f0f0f0] px-2">
          <div className="flex items-center gap-1">
            <span className="h-[12px] w-[12px] border border-[#8fa6cc] bg-white" />
            <span className="text-[12px] leading-none font-semibold text-[#1f2933]">Canales Omnicanal</span>
          </div>
          <button
            type="button"
            onClick={close}
            className="grid h-[18px] w-[18px] place-items-center border border-[#6d747b] bg-[#ededed] text-[#2c3948]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-[140px_1fr] gap-[8px] p-[8px]">
          <aside className="border border-[#b0b5ba] bg-[#efefef] p-[6px]">
            <div className="mb-[8px] h-[24px] bg-[#1179ba] text-center text-[14px] leading-[24px] font-bold text-white">Acciones</div>
            <button type="button" className="h-[24px] w-[98px] border border-[#9da3ab] bg-[#d7d7d7] text-[12px]">
              Alta
            </button>
          </aside>

          <div className="grid min-h-0 grid-cols-[360px_1fr] gap-[12px]">
            <section className="min-h-0 border border-[#b0b5ba] bg-[#efefef]">
              <div className="grid h-[24px] grid-cols-[52px_1fr_40px] border-b border-[#a7adb3] bg-[#dcdcdc] text-[11px]">
                <div className="flex items-center border-r border-[#a7adb3] px-2">Cod...</div>
                <div className="flex items-center justify-center border-r border-[#a7adb3]">Nombre</div>
                <div />
              </div>
              <div className="modal-scroll h-[calc(100%-24px)] overflow-auto bg-[#efefef]" />
            </section>

            <section className="space-y-[6px] pt-[4px] text-[11px] text-[#2f3943]">
              <div className="grid grid-cols-[52px_1fr] items-center gap-x-[8px]">
                <span className="text-right">Código</span>
                <span className="inline-flex h-[18px] w-[44px] items-center bg-[#d8d9db] px-[4px]" />
              </div>
              <div className="grid grid-cols-[52px_1fr] items-center gap-x-[8px]">
                <span className="text-right">Nombre</span>
                <span className="inline-flex h-[18px] items-center bg-[#d8d9db] px-[4px]" />
              </div>
              <div className="grid grid-cols-[52px_1fr] items-center gap-x-[8px]">
                <span className="text-right">SKU</span>
                <LegacyInput readOnly value="" />
              </div>
              <div className="grid grid-cols-[52px_1fr] items-center gap-x-[8px]">
                <span className="text-right">Familia</span>
                <LegacyInput readOnly value="" />
              </div>
              <div className="grid grid-cols-[52px_1fr] items-center gap-x-[8px]">
                <span className="text-right">Familia 2</span>
                <LegacyInput readOnly value="" />
              </div>
              <div className="grid grid-cols-[52px_1fr] items-center gap-x-[8px]">
                <span className="text-right">Familia 3</span>
                <LegacyInput readOnly value="" />
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InventoryCanalesModal;
