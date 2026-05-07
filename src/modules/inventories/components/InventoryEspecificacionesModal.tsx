import { X } from "lucide-react";
import { useModal } from "../../ui/hooks/useModal";
import { MODAL_IDS } from "../../ui/store/modal.store";

function InventoryEspecificacionesModal() {
  const { isOpen, close } = useModal(MODAL_IDS.INVENTORY_ESPECIFICACIONES);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <section className="flex h-[min(760px,88vh)] w-[min(730px,96vw)] flex-col border border-[#2f8ce8] bg-[#ececec]">
        <header className="flex h-[24px] items-center justify-between border-b border-[#a9b0b8] bg-[#f0f0f0] px-2">
          <div className="flex items-center gap-1">
            <span className="h-[12px] w-[12px] border border-[#8fa6cc] bg-white" />
            <span className="text-[12px] leading-none font-semibold text-[#1f2933]">Especificaciones</span>
          </div>
          <button
            type="button"
            onClick={close}
            className="grid h-[18px] w-[18px] place-items-center border border-[#6d747b] bg-[#ededed] text-[#2c3948]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-[144px_1fr_86px] gap-[8px] p-[8px]">
          <div className="space-y-[4px] pt-[14px]">
            {Array.from({ length: 20 }).map((_, idx) => (
              <span key={idx} className="block h-[19px] bg-[#d8d9db]" />
            ))}
          </div>

          <div className="modal-scroll min-h-0 overflow-auto border border-[#2c2c2c] bg-[#efefef]">
            {Array.from({ length: 26 }).map((_, idx) => (
              <div key={idx} className="h-[22px] border-b border-[#2c2c2c]" />
            ))}
          </div>

          <div className="flex flex-col justify-end gap-[6px] pb-[30px]">
            <button className="h-[38px] border border-[#9da3ab] bg-[#d7d7d7] text-[25px] text-[#5d9f67]">✓</button>
            <button className="h-[38px] border border-[#9da3ab] bg-[#d7d7d7] text-[24px] text-[#c48181]">✕</button>
          </div>
        </div>

        <footer className="px-[8px] pb-[8px]">
          <button type="button" className="h-[24px] min-w-[84px] border border-[#2f8ce8] bg-[#ececec] px-2 text-[11px]">
            Cambiar
          </button>
        </footer>
      </section>
    </div>
  );
}

export default InventoryEspecificacionesModal;
