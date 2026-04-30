import { rightConsultas } from "../constants";
import { useModal } from "../../ui/hooks/useModal";
import { MODAL_IDS } from "../../ui/store/modal.store";

type TripleConsultaButtonProps = {
  label: string;
  onMainClick?: () => void;
  onStarClick?: () => void;
  onCtClick?: () => void;
};

function TripleConsultaButton({ label, onMainClick, onStarClick, onCtClick }: TripleConsultaButtonProps) {
  return (
    <div className="flex h-[24px] border border-[#a0a6ad] bg-[#dcdcdc] text-[11px] font-semibold text-[#3f464f]">
      <button
        type="button"
        onClick={onMainClick}
        className="h-full flex-1 border-r border-[#a0a6ad] px-2 text-center leading-[22px]"
      >
        {label}
      </button>
      <button
        type="button"
        onClick={onStarClick}
        className="h-full w-[24px] border-r border-[#a0a6ad] text-center leading-[22px]"
      >
        *
      </button>
      <button type="button" onClick={onCtClick} className="h-full w-[34px] text-center leading-[22px]">
        CT
      </button>
    </div>
  );
}

export const InventoryConsultasPanel = () => {
  const { open: openAuxiliarModal } = useModal(MODAL_IDS.INVENTORY_AUXILIAR);
  const { open: openPedidosClienteModal } = useModal(MODAL_IDS.INVENTORY_PEDIDOS_CLIENTE);
  const { open: openCotizacionesClienteModal } = useModal(MODAL_IDS.INVENTORY_COTIZACIONES_CLIENTE);
  const { open: openVentasClienteModal } = useModal(MODAL_IDS.INVENTORY_VENTAS_CLIENTE);
  const { open: openVentasDesglosadasModal } = useModal(MODAL_IDS.INVENTORY_VENTAS_DESGLOSADAS);
  const { open: openPedidosAsteriscoModal } = useModal(MODAL_IDS.INVENTORY_PEDIDOS_ASTERISCO);
  const { open: openPedidosCtModal } = useModal(MODAL_IDS.INVENTORY_PEDIDOS_CT);

  return (
    <aside className="border border-[#9ca4ac] bg-[#d7d7d7]">
      <div className="flex h-[26px] items-center justify-between border-b border-[#9ca4ac] px-[6px] text-[11px] font-semibold text-[#4a5158]">
        <span>Consultas</span>
        <span className="text-[15px] leading-none">×</span>
      </div>
      <div className="grid gap-[2px] p-[4px]">
        {rightConsultas.map((item, idx) => {
          if (item === "Pedidos por cliente") {
            return (
              <TripleConsultaButton
                key={`${item}-${idx}`}
                label={item}
                onMainClick={openPedidosClienteModal}
                onStarClick={openPedidosAsteriscoModal}
                onCtClick={openPedidosCtModal}
              />
            );
          }

          if (item === "Ventas por cliente") {
            return <TripleConsultaButton key={`${item}-${idx}`} label={item} onMainClick={openVentasClienteModal} />;
          }

          return (
            <button
              key={`${item}-${idx}`}
              type="button"
              onClick={
                item === "Auxiliar"
                  ? openAuxiliarModal
                  : item === "Cotizaciones por cliente"
                    ? openCotizacionesClienteModal
                    : item === "Ventas desglosadas"
                      ? openVentasDesglosadasModal
                    : undefined
              }
              className="h-[24px] border border-[#a0a6ad] bg-[#dcdcdc] px-2 text-center text-[11px] leading-[22px] font-semibold text-[#3f464f]"
            >
              {item}
            </button>
          );
        })}
      </div>
    </aside>
  );
};
