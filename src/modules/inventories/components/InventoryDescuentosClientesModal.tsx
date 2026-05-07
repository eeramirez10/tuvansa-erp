import { X } from "lucide-react";
import { useModal } from "../../ui/hooks/useModal";
import { MODAL_IDS } from "../../ui/store/modal.store";

const HEADERS = ["Llave", "Desc 1", "Desc 2", "Precio", "Fecha", "Vence", "Cant I.", "Cant F.", "Depto.", "Observaciones"];

function InventoryDescuentosClientesModal() {
  const { isOpen, close } = useModal(MODAL_IDS.INVENTORY_DESCUENTOS_CLIENTES);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <section className="flex h-[min(360px,70vh)] w-[min(820px,96vw)] flex-col border border-[#2f8ce8] bg-[#ececec]">
        <header className="flex h-[24px] items-center justify-between border-b border-[#a9b0b8] bg-[#f0f0f0] px-2">
          <div className="flex items-center gap-1">
            <span className="h-[12px] w-[12px] border border-[#8fa6cc] bg-white" />
            <span className="text-[12px] leading-none font-semibold text-[#1f2933]">Descuentos especiales</span>
          </div>
          <button
            type="button"
            onClick={close}
            className="grid h-[18px] w-[18px] place-items-center border border-[#6d747b] bg-[#ededed] text-[#2c3948]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </header>

        <div className="flex min-h-0 flex-1 flex-col p-[6px]">
          <div className="mb-[2px] grid grid-cols-[86px_48px_48px_72px_72px_72px_66px_66px_68px_1fr] gap-[4px]">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="inline-flex h-[20px] border border-[#a7adb3] bg-[#d8d9db]" />
            ))}
          </div>

          <div className="mb-[2px] grid grid-cols-[86px_48px_48px_72px_72px_72px_66px_66px_68px_1fr] px-[2px] text-[11px] leading-none text-[#1f2933]">
            {HEADERS.map((head) => (
              <span key={head} className="underline">
                {head}
              </span>
            ))}
          </div>

          <div className="modal-scroll min-h-0 flex-1 overflow-auto border border-[#a7adb3] bg-[#efefef]" />

          <div className="mt-[4px] flex items-center justify-between">
            <div className="flex gap-[8px]">
              <button type="button" className="h-[24px] min-w-[76px] border border-[#9da3ab] bg-[#d7d7d7] px-2 text-[11px]">
                Cambiar
              </button>
              <button type="button" className="h-[24px] min-w-[96px] border border-[#9da3ab] bg-[#d7d7d7] px-2 text-[11px]">
                Copiar a tiendas
              </button>
            </div>
            <div className="flex gap-[8px]">
              <button type="button" className="h-[24px] min-w-[60px] border border-[#9da3ab] bg-[#d7d7d7] px-2 text-[11px] text-[#7b8792]">
                OK
              </button>
              <button
                type="button"
                onClick={close}
                className="h-[24px] min-w-[68px] border border-[#9da3ab] bg-[#d7d7d7] px-2 text-[11px] text-[#7b8792]"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InventoryDescuentosClientesModal;
