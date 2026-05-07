import { X } from "lucide-react";
import { useModal } from "../../ui/hooks/useModal";
import { MODAL_IDS } from "../../ui/store/modal.store";

function InventorySkusModal() {
  const { isOpen, close } = useModal(MODAL_IDS.INVENTORY_SKUS);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <section className="flex h-[min(240px,60vh)] w-[min(300px,94vw)] flex-col border border-[#2f8ce8] bg-[#ececec]">
        <header className="flex h-[24px] items-center justify-between border-b border-[#a9b0b8] bg-[#f0f0f0] px-2">
          <div className="flex items-center gap-1">
            <span className="h-[12px] w-[12px] border border-[#8fa6cc] bg-white" />
            <span className="text-[12px] leading-none font-semibold text-[#1f2933]">SKUs</span>
          </div>
          <button
            type="button"
            onClick={close}
            className="grid h-[18px] w-[18px] place-items-center border border-[#6d747b] bg-[#ededed] text-[#2c3948]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </header>

        <div className="min-h-0 flex-1 p-[6px]">
          <div className="grid h-[24px] grid-cols-[18px_1fr_100px] border border-[#a7adb3] bg-[#dcdcdc] text-[11px]">
            <span className="border-r border-[#a7adb3] px-[4px] leading-[23px]">L</span>
            <span className="border-r border-[#a7adb3] text-center leading-[23px]">SKU</span>
            <span className="text-center leading-[23px]">Cantidad</span>
          </div>
          <div className="modal-scroll h-[calc(100%-24px)] overflow-auto border border-t-0 border-[#a7adb3] bg-[#efefef]">
            <div className="h-[22px] border-b border-[#a7adb3]" />
            <div className="grid h-[22px] grid-cols-[18px_1fr_100px]">
              <span className="border-r border-[#a7adb3]" />
              <span className="border-r border-[#a7adb3]" />
              <span className="px-[6px] text-[11px] leading-[21px]">0.00</span>
            </div>
          </div>
        </div>

        <footer className="flex items-center justify-between px-[8px] pb-[8px]">
          <button
            onClick={close}
            className="h-[28px] min-w-[68px] border border-[#9da3ab] bg-[#d7d7d7] px-[8px] text-[11px] text-[#7b8792]"
          >
            Cancelar
          </button>
          <button className="h-[28px] min-w-[76px] border border-[#9da3ab] bg-[#d7d7d7] px-[8px] text-[11px] text-[#7b8792]">
            OK
          </button>
          <button className="h-[28px] min-w-[80px] border border-[#2f8ce8] bg-[#ececec] px-[8px] text-[11px] text-[#1f2933]">
            Cambio
          </button>
        </footer>
      </section>
    </div>
  );
}

export default InventorySkusModal;
