import { X } from "lucide-react";
import { useInventoriesStore } from "../store/inventories.store";
import { useModal } from "../../ui/hooks/useModal";
import { MODAL_IDS } from "../../ui/store/modal.store";

function InventoryAlternosModal() {
  const { isOpen, close } = useModal(MODAL_IDS.INVENTORY_ALTERNOS);
  const detail = useInventoriesStore((state) => state.detail);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <section className="flex h-[min(442px,74vh)] w-[min(790px,96vw)] flex-col border border-[#2f8ce8] bg-[#ececec]">
        <header className="flex h-[24px] items-center justify-between border-b border-[#a9b0b8] bg-[#f0f0f0] px-2">
          <div className="text-[12px] leading-none font-semibold text-[#1f2933]">Alternos</div>
          <button
            type="button"
            onClick={close}
            className="grid h-[18px] w-[18px] place-items-center border border-[#6d747b] bg-[#ededed] text-[#2c3948]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-[1fr_82px] gap-[6px] p-[4px] text-[11px] text-[#1f2933]">
          <div className="min-h-0">
            <div className="mb-[4px] grid grid-cols-[58px_116px_1fr] items-center gap-x-[6px]">
              <span className="text-right">Código</span>
              <span className="inline-flex h-[18px] items-center border border-[#a7adb3] bg-white px-[4px]">{detail?.identity.code ?? ""}</span>
              <span className="inline-flex h-[18px] items-center bg-[#d8d9db] px-[4px]">{detail?.identity.description ?? ""}</span>
            </div>

            <div className="mb-[1px] grid grid-cols-[90px_1fr_58px_58px_52px_52px_42px] gap-x-[4px]">
              <span className="inline-flex h-[18px] border border-[#a7adb3] bg-[#d8d9db]" />
              <span className="inline-flex h-[18px] border border-[#a7adb3] bg-[#d8d9db]" />
              <span className="inline-flex h-[18px] border border-[#a7adb3] bg-[#d8d9db]" />
              <span className="inline-flex h-[18px] border border-[#a7adb3] bg-[#d8d9db]" />
              <span className="inline-flex h-[18px] border border-[#a7adb3] bg-[#d8d9db]" />
              <span className="inline-flex h-[18px] border border-[#a7adb3] bg-[#d8d9db]" />
              <span className="inline-flex h-[18px] border border-[#a7adb3] bg-[#d8d9db]" />
            </div>

            <div className="mb-[1px] grid grid-cols-[90px_1fr_58px_58px_52px_52px_42px] gap-x-[4px] px-[2px]">
              <span>Código</span>
              <span>Descripción</span>
              <span>Stock</span>
              <span>Precio 1</span>
              <span>Vta</span>
              <span>Iguales</span>
              <span>%</span>
            </div>

            <div className="modal-scroll h-[calc(100%-90px)] overflow-auto border border-[#a7adb3] bg-[#efefef]" />

            <div className="mt-[6px] flex items-center gap-[6px]">
              <button className="h-[24px] min-w-[72px] border border-[#9da3ab] bg-[#d7d7d7] px-2">Siguiente</button>
              <button className="h-[24px] min-w-[72px] border border-[#9da3ab] bg-[#d7d7d7] px-2">Anterior</button>
              <button className="h-[24px] min-w-[72px] border border-[#9da3ab] bg-[#d7d7d7] px-2">Encuentra</button>
              <button className="h-[24px] min-w-[72px] border border-[#9da3ab] bg-[#d7d7d7] px-2">Cambio</button>
              <button className="h-[24px] min-w-[72px] border border-[#9da3ab] bg-[#d7d7d7] px-2">Terminar</button>
            </div>

            <div className="mt-[4px]">
              <button className="h-[24px] min-w-[62px] border border-[#2f8ce8] bg-[#ececec] px-2">✓ Foto</button>
            </div>
          </div>

          <div className="flex flex-col justify-end gap-[6px] pb-[44px]">
            <button className="h-[36px] border border-[#9da3ab] bg-[#d7d7d7] text-[11px] text-[#5d9f67]">✓ OK</button>
            <button onClick={close} className="h-[36px] border border-[#9da3ab] bg-[#d7d7d7] text-[11px] text-[#c48181]">
              ✕ Cancelar
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InventoryAlternosModal;
