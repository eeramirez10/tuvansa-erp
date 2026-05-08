import { X } from "lucide-react";
import { useModal } from "../../ui/hooks/useModal";
import { MODAL_IDS } from "../../ui/store/modal.store";

function Column({ title, width }: { title: string; width: string }) {
  return (
    <div className={width}>
      <div className="mb-[2px] text-[11px]">{title}</div>
      <div className="space-y-[1px]">
        {Array.from({ length: 18 }).map((_, idx) => (
          <span key={idx} className="block h-[20px] border border-[#a7adb3] bg-[#efefef]" />
        ))}
      </div>
    </div>
  );
}

function InventoryEspecificCalModal() {
  const { isOpen, close } = useModal(MODAL_IDS.INVENTORY_ESPECIFIC_CAL);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <section className="flex h-[min(620px,84vh)] w-[min(1004px,98vw)] flex-col border border-[#2f8ce8] bg-[#ececec]">
        <header className="flex h-[24px] items-center justify-between border-b border-[#a9b0b8] bg-[#f0f0f0] px-2">
          <div className="flex items-center gap-1">
            <span className="h-[12px] w-[12px] border border-[#8fa6cc] bg-white" />
            <span className="text-[12px] leading-none font-semibold text-[#1f2933]">Especificaciones de calidad</span>
          </div>
          <button
            type="button"
            onClick={close}
            className="grid h-[18px] w-[18px] place-items-center border border-[#6d747b] bg-[#ededed] text-[#2c3948]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-[294px_1fr] gap-[6px] p-[3px] text-[11px] text-[#1f2933]">
          <section className="min-h-0 border border-[#a7adb3] bg-[#efefef]">
            <div className="grid h-[22px] grid-cols-[60px_1fr] border-b border-[#a7adb3] bg-[#dcdcdc]">
              <span className="border-r border-[#a7adb3] px-[4px] leading-[21px]">Código</span>
              <span className="px-[4px] leading-[21px]">Nombre</span>
            </div>
            <div className="grid h-[22px] grid-cols-[60px_1fr] border-b border-[#a7adb3]">
              <span className="border-r border-[#a7adb3]" />
              <span className="px-[4px] leading-[21px]">ALTA EN CALCULO</span>
            </div>
            <div className="modal-scroll h-[calc(100%-84px)] overflow-auto border-t border-[#a7adb3]" />
            <div className="mt-[4px] grid grid-cols-3 gap-[6px] px-[6px] pb-[6px]">
              <button className="h-[24px] border border-[#2f8ce8] bg-[#ececec]">▦ Alta</button>
              <button className="h-[24px] border border-[#9da3ab] bg-[#d7d7d7]">▦ Baja</button>
              <button className="h-[24px] border border-[#9da3ab] bg-[#d7d7d7]">▤ Cambio</button>
            </div>
          </section>

          <section className="min-h-0">
            <div className="modal-scroll h-full overflow-auto border border-[#a7adb3] bg-[#efefef] p-[4px]">
              <div className="flex gap-[8px]">
                <Column title="" width="w-[56px]" />
                <Column title="Prueba / Especificación" width="w-[218px]" />
                <Column title="Mínimo" width="w-[76px]" />
                <Column title="Máximo" width="w-[76px]" />
                <Column title="Unidad" width="w-[56px]" />
                <Column title="Obs" width="w-[224px]" />
              </div>
            </div>
          </section>
        </div>

        <footer className="flex items-center justify-between border-t border-[#a7adb3] px-[8px] py-[4px] text-[11px]">
          <div className="flex items-center gap-[6px]">
            <span>Secuencia:</span>
            <span className="inline-flex h-[18px] w-[80px] items-center border border-[#a7adb3] bg-[#d8d9db] px-[4px]" />
          </div>
          <div className="flex items-center gap-[6px]">
            <button className="h-[36px] min-w-[66px] border border-[#9da3ab] bg-[#d7d7d7] text-[#5d9f67]">✓ OK</button>
            <button onClick={close} className="h-[36px] min-w-[74px] border border-[#9da3ab] bg-[#d7d7d7] text-[#c48181]">
              ✕ Cancelar
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}

export default InventoryEspecificCalModal;
