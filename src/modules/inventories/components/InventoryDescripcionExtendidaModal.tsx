import { X } from "lucide-react";
import { useModal } from "../../ui/hooks/useModal";
import { MODAL_IDS } from "../../ui/store/modal.store";
import { useInventoriesStore } from "../store/inventories.store";
import { ManagedWindowLayer } from "../../ui/components/ManagedWindowLayer";

type DescriptionBlock = {
  key: string;
  label: string;
  value: string;
};

function InventoryDescripcionExtendidaModal() {
  const { isOpen, close } = useModal(MODAL_IDS.INVENTORY_DESCR_EXT);
  const detail = useInventoriesStore((state) => state.detail);

  if (!isOpen) {
    return null;
  }

  const blocks: DescriptionBlock[] = [
    {
      key: "full",
      label: "COMPLETA",
      value: detail?.identity.extendedDescription || detail?.identity.description || "",
    },
    {
      key: "line2",
      label: "",
      value: "",
    },
    {
      key: "line3",
      label: "",
      value: "",
    },
    {
      key: "line4",
      label: "",
      value: "",
    },
    {
      key: "urls",
      label: "URL'S",
      value: "",
    },
  ];

  return (
    <ManagedWindowLayer windowId={MODAL_IDS.INVENTORY_DESCR_EXT} isOpen={isOpen}>
      <section className="grid h-[min(620px,90vh)] w-[min(760px,96vw)] grid-cols-[1fr_84px] border border-[#2f8ce8] bg-[#ececec]">
        <div className="flex min-h-0 flex-col border-r border-[#b1b8bf]">
          <header className="flex h-[30px] items-center justify-between border-b border-[#99a4af] bg-[#f0f0f0] px-2">
            <div className="flex items-center gap-1">
              <span className="h-[12px] w-[12px] border border-[#8fa6cc] bg-white" />
              <h2 className="text-[12px] leading-none font-semibold text-[#1e293b]">Descripción extendida</h2>
            </div>
            <button
              type="button"
              onClick={close}
              className="grid h-[18px] w-[18px] place-items-center border border-[#6d747b] bg-[#ededed] text-[#2c3948]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </header>

          <div className="flex min-h-0 flex-1 flex-col gap-[4px] p-[2px]">
            {blocks.map((block, index) => (
              <div key={block.key} className="flex min-h-0 flex-1 flex-col">
                <div className="mb-[2px] flex items-center gap-[2px]">
                  <button
                    type="button"
                    className="inline-flex h-[24px] min-w-[66px] items-center justify-center border border-[#9ca3ab] bg-[#d7d7d7] px-2 text-[11px] text-[#2f3943]"
                  >
                    Cambiar
                  </button>
                  <span className="inline-flex h-[16px] min-w-[78px] items-center bg-[#dcdcdc] px-2 text-[22px] leading-none font-medium text-[#1f2933]">
                    {block.label}
                  </span>
                </div>

                <textarea
                  value={block.value}
                  readOnly
                  className={[
                    "modal-scroll w-full resize-none border border-[#b1b8bf] bg-[#e7e7e7] px-[3px] py-[2px]",
                    "text-[11px] leading-[15px] text-[#1f2933]",
                    index === blocks.length - 1 ? "h-[76px]" : "flex-1",
                  ].join(" ")}
                />
              </div>
            ))}

            <div className="pt-[2px]">
              <button
                type="button"
                className="inline-flex h-[24px] min-w-[146px] items-center justify-center border border-[#2f8ce8] bg-[#f0f0f0] px-2 text-[11px] text-[#1f2933]"
              >
                Cambiar todo
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-end gap-[4px] p-[6px]">
          <button
            type="button"
            className="inline-flex h-[38px] items-center justify-center border border-[#9ca3ab] bg-[#d7d7d7] text-[27px] text-[#5e9f68]"
          >
            ✓
          </button>
          <button
            type="button"
            onClick={close}
            className="inline-flex h-[38px] items-center justify-center border border-[#9ca3ab] bg-[#d7d7d7] text-[26px] text-[#c28181]"
          >
            ✕
          </button>
        </div>
      </section>
    </ManagedWindowLayer>
  );
}

export default InventoryDescripcionExtendidaModal;
