import { X } from "lucide-react";
import { useModal } from "../../ui/hooks/useModal";
import { MODAL_IDS } from "../../ui/store/modal.store";

function InventoryCaracteristicasModal() {
  const { isOpen, close } = useModal(MODAL_IDS.INVENTORY_CARACTERISTICAS);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <section className="flex h-[min(500px,78vh)] w-[min(182px,92vw)] flex-col border border-[#2f8ce8] bg-[#ececec]">
        <header className="flex h-[24px] items-center justify-between border-b border-[#a9b0b8] bg-[#f0f0f0] px-2">
          <div className="flex items-center gap-1">
            <span className="h-[12px] w-[12px] border border-[#8fa6cc] bg-white" />
            <span className="text-[12px] leading-none font-semibold text-[#1f2933]">Consultas</span>
          </div>
          <button
            type="button"
            onClick={close}
            className="grid h-[18px] w-[18px] place-items-center border border-[#6d747b] bg-[#ededed] text-[#2c3948]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </header>

        <div className="flex flex-1 flex-col gap-[7px] p-[8px] text-[11px]">
          <button className="h-[24px] border border-[#2f8ce8] bg-[#ececec]">Componentes</button>
          <button className="h-[24px] border border-[#9da3ab] bg-[#d7d7d7]">Instrucciones</button>
          <button className="h-[24px] border border-[#9da3ab] bg-[#d7d7d7]">Fotos</button>
          <button className="h-[24px] border border-[#9da3ab] bg-[#d7d7d7]">Medidas</button>

          <div className="flex-1" />

          <button className="h-[24px] border border-[#9da3ab] bg-[#d7d7d7]">Cat. Medidas básicas</button>
          <button className="h-[24px] border border-[#9da3ab] bg-[#d7d7d7]">Imprime</button>
          <button className="h-[24px] border border-[#9da3ab] bg-[#d7d7d7]">Libreta</button>
        </div>
      </section>
    </div>
  );
}

export default InventoryCaracteristicasModal;
