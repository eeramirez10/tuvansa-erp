import { X } from "lucide-react";
import { useInventoriesStore } from "../store/inventories.store";
import { useModal } from "../../ui/hooks/useModal";
import { MODAL_IDS } from "../../ui/store/modal.store";
import { ManagedWindowLayer } from "../../ui/components/ManagedWindowLayer";

function InventoryComponentesModal() {
  const { isOpen, close } = useModal(MODAL_IDS.INVENTORY_COMPONENTES);
  const detail = useInventoriesStore((state) => state.detail);

  if (!isOpen) {
    return null;
  }

  return (
    <ManagedWindowLayer windowId={MODAL_IDS.INVENTORY_COMPONENTES} isOpen={isOpen}>
      <section className="flex h-[min(640px,84vh)] w-[min(1048px,98vw)] flex-col border border-[#2f8ce8] bg-[#ececec]">
        <header className="flex h-[24px] items-center justify-between border-b border-[#a9b0b8] bg-[#f0f0f0] px-2">
          <div className="flex items-center gap-1">
            <span className="h-[12px] w-[12px] border border-[#8fa6cc] bg-white" />
            <span className="text-[12px] leading-none font-semibold text-[#1f2933]">Componentes</span>
          </div>
          <button
            type="button"
            onClick={close}
            className="grid h-[18px] w-[18px] place-items-center border border-[#6d747b] bg-[#ededed] text-[#2c3948]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </header>

        <div className="min-h-0 flex-1 p-[3px] text-[11px] text-[#1f2933]">
          <div className="mb-[3px] grid grid-cols-[56px_114px_1fr_34px_68px_32px] items-center gap-x-[4px]">
            <span className="text-right">Código</span>
            <span className="inline-flex h-[18px] items-center border border-[#a7adb3] bg-white px-[4px]">{detail?.identity.code ?? ""}</span>
            <span className="inline-flex h-[18px] items-center bg-[#d8d9db] px-[4px]">{detail?.identity.description ?? ""}</span>
            <span className="text-right">Lote</span>
            <span className="inline-flex h-[18px] items-center border border-[#a7adb3] bg-white px-[4px] justify-end">0.000000</span>
            <span className="inline-flex h-[18px] items-center bg-[#d8d9db] px-[4px]">M</span>
          </div>

          <div className="mb-[1px] grid grid-cols-[90px_1fr_22px_38px_38px_130px_72px_92px_78px_56px_56px_50px] gap-x-[0px]">
            {Array.from({ length: 12 }).map((_, idx) => (
              <span key={idx} className="h-[18px] border border-[#a7adb3] bg-[#d8d9db]" />
            ))}
          </div>
          <div className="mb-[1px] grid grid-cols-[90px_1fr_22px_38px_38px_130px_72px_92px_78px_56px_56px_50px] px-[2px]">
            <span>Código</span>
            <span>Descripción</span>
            <span />
            <span>Gen</span>
            <span>H2</span>
            <span>Orden Uso</span>
            <span>Cantidad</span>
            <span>Importe</span>
            <span>Costo</span>
            <span>K</span>
            <span>L</span>
            <span>Unidad</span>
          </div>

          <div className="modal-scroll h-[calc(100%-130px)] overflow-auto border border-[#a7adb3] bg-[#efefef]" />

          <div className="mt-[6px] grid grid-cols-[1fr_508px] gap-[8px]">
            <div>
              <div className="mb-[4px] grid grid-cols-[repeat(5,minmax(0,1fr))] gap-[6px]">
                <button className="h-[24px] border border-[#9da3ab] bg-[#d7d7d7]">Siguiente</button>
                <button className="h-[24px] border border-[#9da3ab] bg-[#d7d7d7]">Anterior</button>
                <button className="h-[24px] border border-[#9da3ab] bg-[#d7d7d7]">Encontrar</button>
                <button className="h-[24px] border border-[#9da3ab] bg-[#d7d7d7]">Cambio</button>
                <button className="h-[24px] border border-[#9da3ab] bg-[#d7d7d7]">Borrar</button>
              </div>

              <div className="mb-[4px] grid grid-cols-[120px_1fr_88px_88px_88px] gap-[6px]">
                <button className="h-[24px] border border-[#9da3ab] bg-[#d7d7d7]">Encuentra selección</button>
                <button className="h-[24px] border border-[#9da3ab] bg-[#d7d7d7]">Previo</button>
                <button className="h-[24px] border border-[#9da3ab] bg-[#d7d7d7]">Integrar</button>
                <button className="h-[24px] border border-[#9da3ab] bg-[#d7d7d7]">Terminar</button>
                <span />
              </div>

              <div className="grid grid-cols-[64px_36px] gap-[6px]">
                <button className="h-[24px] border border-[#2f8ce8] bg-[#ececec]">Foto</button>
                <button className="h-[24px] border border-[#9da3ab] bg-[#d7d7d7]">🖨</button>
              </div>
            </div>

            <div>
              <div className="mb-[4px] grid grid-cols-[90px_100px_100px_100px_100px] gap-[4px]">
                <span className="inline-flex h-[22px] items-center justify-end border border-[#a7adb3] bg-[#d8d9db] px-[4px]">0.000000</span>
                <span className="inline-flex h-[22px] items-center justify-end border border-[#a7adb3] bg-[#d8d9db] px-[4px]">0.0000</span>
                <span className="inline-flex h-[22px] items-center justify-end border border-[#a7adb3] bg-[#d8d9db] px-[4px]">0.0000</span>
                <span className="inline-flex h-[22px] items-center justify-end border border-[#a7adb3] bg-[#d8d9db] px-[4px]">0.0000</span>
                <span className="inline-flex h-[22px] items-center justify-end border border-[#a7adb3] bg-[#d8d9db] px-[4px]">1e100 PE</span>
              </div>

              <div className="grid grid-cols-[90px_100px_100px_100px_100px] gap-[4px]">
                <span className="inline-flex h-[22px] items-center justify-end px-[4px]">MAF</span>
                <span className="inline-flex h-[22px] items-center justify-end border border-[#a7adb3] bg-[#d8d9db] px-[4px]">0.0</span>
                <span className="inline-flex h-[22px] border border-[#a7adb3] bg-[#d8d9db]" />
                <span className="inline-flex h-[22px] items-center justify-end border border-[#a7adb3] bg-[#d8d9db] px-[4px]">0.00</span>
                <span className="inline-flex h-[22px] border border-[#a7adb3] bg-[#d8d9db]" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </ManagedWindowLayer>
  );
}

export default InventoryComponentesModal;
