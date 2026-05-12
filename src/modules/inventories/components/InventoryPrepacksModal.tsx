import { X } from "lucide-react";
import { useInventoriesStore } from "../store/inventories.store";
import { useModal } from "../../ui/hooks/useModal";
import { MODAL_IDS } from "../../ui/store/modal.store";
import { ManagedWindowLayer } from "../../ui/components/ManagedWindowLayer";

function InventoryPrepacksModal() {
  const { isOpen, close } = useModal(MODAL_IDS.INVENTORY_PREPACKS);
  const detail = useInventoriesStore((state) => state.detail);

  if (!isOpen) {
    return null;
  }

  return (
    <ManagedWindowLayer windowId={MODAL_IDS.INVENTORY_PREPACKS} isOpen={isOpen}>
      <section className="flex h-[min(420px,74vh)] w-[min(860px,96vw)] flex-col border border-[#2f8ce8] bg-[#ececec]">
        <header className="flex h-[24px] items-center justify-between border-b border-[#a9b0b8] bg-[#f0f0f0] px-2">
          <div className="flex items-center gap-1">
            <span className="h-[12px] w-[12px] border border-[#8fa6cc] bg-white" />
            <span className="text-[12px] leading-none font-semibold text-[#1f2933]">Prepacks</span>
          </div>
          <button
            type="button"
            onClick={close}
            className="grid h-[18px] w-[18px] place-items-center border border-[#6d747b] bg-[#ededed] text-[#2c3948]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-[46px_1fr] p-[6px]">
          <div className="border border-r-0 border-[#a7adb3] bg-[#efefef]" />
          <div className="min-h-0 border border-[#a7adb3] bg-[#efefef] p-[8px]">
            <div className="mb-[6px] inline-flex items-end gap-[2px]">
              {Array.from({ length: 18 }).map((_, idx) => (
                <span key={idx} className="h-[18px] w-[30px] border border-[#a7adb3] bg-[#d8d9db]" />
              ))}
              <span className="ml-[4px] h-[18px] w-[30px] border border-[#a7adb3] bg-[#d8d9db] text-[11px] leading-[17px] text-center">
                Tot
              </span>
            </div>

            <div className="mb-[6px] inline-flex items-center gap-[2px]">
              {Array.from({ length: 18 }).map((_, idx) => (
                <span key={idx} className="inline-flex h-[16px] w-[30px] items-center border border-[#a7adb3] bg-[#d8d9db] px-[3px] text-[10px]">
                  {idx === 0 ? "0.00" : "0.00"}
                </span>
              ))}
              <span className="h-[16px] w-[30px] border border-[#a7adb3] bg-[#d8d9db]" />
            </div>

            <div className="modal-scroll h-[calc(100%-40px)] overflow-auto border border-[#a7adb3] bg-[#efefef]" />
          </div>
        </div>

        <footer className="grid grid-cols-[1fr_84px] gap-[8px] border-t border-[#a7adb3] p-[6px]">
          <div>
            <div className="mb-[4px] inline-flex h-[18px] w-[98px] items-center border border-[#a7adb3] bg-[#d8d9db] px-[4px] text-[11px]">
              {detail?.identity.code || ""}
            </div>
            <div className="mb-[4px] inline-flex h-[18px] w-[250px] items-center border border-[#a7adb3] bg-[#d8d9db] px-[4px]" />
            <div className="inline-flex h-[18px] w-[250px] items-center border border-[#a7adb3] bg-[#d8d9db] px-[4px]" />
          </div>

          <div className="space-y-[4px]">
            <button className="h-[34px] w-full border border-[#2f8ce8] bg-[#ececec] text-[11px] text-[#5d9f67]">✓ OK</button>
            <button
              onClick={close}
              className="h-[34px] w-full border border-[#9da3ab] bg-[#d7d7d7] text-[11px] text-[#c48181]"
            >
              ✕ Cancelar
            </button>
          </div>
        </footer>
      </section>
    </ManagedWindowLayer>
  );
}

export default InventoryPrepacksModal;
