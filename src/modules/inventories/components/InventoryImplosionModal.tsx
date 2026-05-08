import { X } from "lucide-react";
import { useInventoriesStore } from "../store/inventories.store";
import { useModal } from "../../ui/hooks/useModal";
import { MODAL_IDS } from "../../ui/store/modal.store";

function InventoryImplosionModal() {
  const { isOpen, close } = useModal(MODAL_IDS.INVENTORY_IMPLOSION);
  const detail = useInventoriesStore((state) => state.detail);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <section className="flex h-[min(292px,60vh)] w-[min(542px,96vw)] flex-col border border-[#2f8ce8] bg-[#ececec]">
        <header className="flex h-[24px] items-center justify-between border-b border-[#a9b0b8] bg-[#f0f0f0] px-2">
          <div className="text-[12px] leading-none font-semibold text-[#1f2933]">Implosión</div>
          <button
            type="button"
            onClick={close}
            className="grid h-[18px] w-[18px] place-items-center border border-[#6d747b] bg-[#ededed] text-[#2c3948]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </header>

        <div className="min-h-0 flex-1 p-[6px] text-[11px] text-[#1f2933]">
          <div className="mb-[4px] grid grid-cols-[64px_110px_1fr] items-center gap-x-[6px]">
            <span className="text-right">Código</span>
            <span className="inline-flex h-[18px] items-center border border-[#a7adb3] bg-white px-[4px]">{detail?.identity.code ?? ""}</span>
            <span className="inline-flex h-[18px] items-center bg-[#d8d9db] px-[4px]">{detail?.identity.description ?? ""}</span>
          </div>

          <div className="mb-[1px] grid grid-cols-[90px_1fr_74px_70px] gap-x-[6px] px-[2px]">
            <span>Código</span>
            <span>Descripción</span>
            <span>Cantidad</span>
            <span>% costo</span>
          </div>
          <div className="modal-scroll h-[calc(100%-60px)] overflow-auto border border-[#a7adb3] bg-[#efefef]" />
        </div>

        <footer className="flex items-center gap-[6px] border-t border-[#a7adb3] px-[6px] py-[5px] text-[11px]">
          <button className="h-[24px] min-w-[72px] border border-[#9da3ab] bg-[#d7d7d7]">Siguiente</button>
          <button className="h-[24px] min-w-[72px] border border-[#9da3ab] bg-[#d7d7d7]">Anterior</button>
          <button className="h-[24px] min-w-[72px] border border-[#9da3ab] bg-[#d7d7d7]">Encontrar</button>
          <button className="h-[24px] min-w-[128px] border border-[#9da3ab] bg-[#d7d7d7]">Encontrar selección</button>
          <button onClick={close} className="h-[24px] min-w-[72px] border border-[#9da3ab] bg-[#d7d7d7]">
            Terminar
          </button>
        </footer>
      </section>
    </div>
  );
}

export default InventoryImplosionModal;
