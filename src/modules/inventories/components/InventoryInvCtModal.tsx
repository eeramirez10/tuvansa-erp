import { X } from "lucide-react";
import { useModal } from "../../ui/hooks/useModal";
import { MODAL_IDS } from "../../ui/store/modal.store";

const COLUMN_LABELS = [
  "Stock",
  "Pedido",
  "Ordenado",
  "Surtible",
  "Faltante",
  "Sobrante",
  "Inv.-Pedido",
  "Asignado",
  "Disponible",
  "Asignable",
  "Mínimos",
  "Transito",
  "Prepack",
];

function InventoryInvCtModal() {
  const { isOpen, close } = useModal(MODAL_IDS.INVENTORY_INV_CT);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <section className="flex h-[min(520px,75vh)] w-[min(960px,96vw)] flex-col border border-[#2f8ce8] bg-[#ececec]">
        <header className="flex h-[24px] items-center justify-between border-b border-[#a9b0b8] bg-[#f0f0f0] px-2">
          <div className="flex items-center gap-1">
            <span className="h-[12px] w-[12px] border border-[#8fa6cc] bg-white" />
            <span className="text-[12px] leading-none font-semibold text-[#1f2933]">Stock</span>
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
          <div className="grid grid-cols-[44px_1fr]">
            <span className="inline-flex h-[42px] items-center text-[11px] text-[#1f2933]">TOTAL</span>
            <div className="grid h-[42px] grid-cols-[repeat(21,minmax(0,1fr))] border border-[#a7adb3] bg-[#efefef]">
              {Array.from({ length: 21 }).map((_, idx) => (
                <span key={idx} className="border-r border-[#a7adb3]" />
              ))}
            </div>
          </div>
          <div className="modal-scroll h-[calc(100%-42px)] overflow-auto border border-t-0 border-[#a7adb3] bg-[#efefef]" />
        </div>

        <footer className="flex items-center justify-between border-t border-[#a7adb3] px-[6px] py-[6px]">
          <div className="flex flex-wrap gap-[2px]">
            {COLUMN_LABELS.map((item) => (
              <button key={item} className="h-[24px] border border-[#9da3ab] bg-[#d7d7d7] px-[8px] text-[11px]">
                {item}
              </button>
            ))}
          </div>

          <div className="inline-flex items-end gap-[3px]">
            <span className="mb-[1px] h-[20px] border border-[#9da3ab] bg-[#d7d7d7] px-[8px] text-[11px] leading-[19px]">Alm</span>
            <span className="mb-[1px] h-[20px] border border-[#9da3ab] bg-[#d7d7d7] px-[8px] text-[11px] leading-[19px]">01-99</span>
            <span className="h-[18px] w-[16px] border border-[#a7adb3] bg-[#d8d9db] text-[10px] leading-[17px] text-center">0</span>
            <span className="h-[18px] w-[16px] border border-[#2f8ce8] bg-[#d8d9db] text-[10px] leading-[17px] text-center">1</span>
            <span className="h-[18px] w-[16px] border border-[#a7adb3] bg-[#d8d9db] text-[10px] leading-[17px] text-center">2</span>
            <span className="h-[18px] w-[16px] border border-[#a7adb3] bg-[#d8d9db] text-[10px] leading-[17px] text-center">3</span>
            <span className="h-[18px] w-[28px] border border-[#a7adb3] bg-[#d8d9db] text-[10px] leading-[17px] text-center">Tot</span>
          </div>
        </footer>
      </section>
    </div>
  );
}

export default InventoryInvCtModal;
