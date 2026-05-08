import { rightConsultas } from "../constants";
import { useModal } from "../../ui/hooks/useModal";
import { MODAL_IDS } from "../../ui/store/modal.store";
import { legacyButtonClass, legacyPendingButtonClass } from "../../../core/ui-classes";

type TripleConsultaButtonProps = {
  label: string;
  onMainClick?: () => void;
  onStarClick?: () => void;
  onCtClick?: () => void;
  pendingMain?: boolean;
  pendingStar?: boolean;
  pendingCt?: boolean;
};

type DoubleConsultaButtonProps = {
  leftLabel: string;
  rightLabel: string;
  onLeftClick?: () => void;
  onRightClick?: () => void;
  pendingLeft?: boolean;
  pendingRight?: boolean;
};

function DoubleConsultaButton({
  leftLabel,
  rightLabel,
  onLeftClick,
  onRightClick,
  pendingLeft = false,
  pendingRight = false,
}: DoubleConsultaButtonProps) {
  return (
    <div className="flex h-[24px]">
      <button
        type="button"
        onClick={onLeftClick}
        className={["h-full flex-1", legacyButtonClass, pendingLeft ? legacyPendingButtonClass : ""].join(" ")}
      >
        {leftLabel}
      </button>
      <button
        type="button"
        onClick={onRightClick}
        className={["h-full flex-1", legacyButtonClass, pendingRight ? legacyPendingButtonClass : ""].join(" ")}
      >
        {rightLabel}
      </button>
    </div>
  );
}

function TripleConsultaButton({
  label,
  onMainClick,
  onStarClick,
  onCtClick,
  pendingMain = false,
  pendingStar = false,
  pendingCt = false,
}: TripleConsultaButtonProps) {
  return (
    <div className={["flex h-[24px] "].join("")}>
      <button
        type="button"
        onClick={onMainClick}
        className={["h-full flex-1", legacyButtonClass, pendingMain ? legacyPendingButtonClass : ""].join(" ")}
      >
        {label}
      </button>
      <button
        type="button"
        onClick={onStarClick}
        className={["h-full w-[24px]", legacyButtonClass, pendingStar ? legacyPendingButtonClass : ""].join(" ")}
      >
        *
      </button>
      <button
        type="button"
        onClick={onCtClick}
        className={["h-full w-[34px]", legacyButtonClass, pendingCt ? legacyPendingButtonClass : ""].join(" ")}
      >
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
  const { open: openVentasSucursalModal } = useModal(MODAL_IDS.INVENTORY_VENTAS_SUCURSAL);
  const { open: openVentasAnualesModal } = useModal(MODAL_IDS.INVENTORY_VENTAS_ANUALES);
  const { open: openVentasAnualesResumenModal } = useModal(MODAL_IDS.INVENTORY_VENTAS_ANUALES_RESUMEN);
  const { open: openOrdenadoProveedoresModal } = useModal(MODAL_IDS.INVENTORY_ORDENADO_PROVEEDORES);
  const { open: openComprasProveedorModal } = useModal(MODAL_IDS.INVENTORY_COMPRAS_PROVEEDOR);
  const { open: openComprasDesglosadasModal } = useModal(MODAL_IDS.INVENTORY_COMPRAS_DESGLOSADAS);
  const { open: openComprasAnualesModal } = useModal(MODAL_IDS.INVENTORY_COMPRAS_ANUALES);
  const { open: openComprasAnualesResumenModal } = useModal(MODAL_IDS.INVENTORY_COMPRAS_ANUALES_RESUMEN);
  const { open: openVentasDesglosadasModal } = useModal(MODAL_IDS.INVENTORY_VENTAS_DESGLOSADAS);
  const { open: openCotizadoProveedoresModal } = useModal(MODAL_IDS.INVENTORY_COTIZADO_PROVEEDORES);
  const { open: openBonificacionesModal } = useModal(MODAL_IDS.INVENTORY_BONIFICACIONES);
  const { open: openWipModal } = useModal(MODAL_IDS.INVENTORY_WIP);
  const { open: openPiezasSurtidasModal } = useModal(MODAL_IDS.INVENTORY_PIEZAS_SURTIDAS);
  const { open: openPiezasModal } = useModal(MODAL_IDS.INVENTORY_PIEZAS);
  const { open: openHabilitacionesPendientesModal } = useModal(MODAL_IDS.INVENTORY_HABILITACIONES_PENDIENTES);
  const { open: openDocumentosModal } = useModal(MODAL_IDS.INVENTORY_DOCUMENTOS);
  const { open: openCurvaTmpModal } = useModal(MODAL_IDS.INVENTORY_CURVA_TMP);
  const { open: openCurva2Modal } = useModal(MODAL_IDS.INVENTORY_CURVA_2);
  const { open: openPedidosAsteriscoModal } = useModal(MODAL_IDS.INVENTORY_PEDIDOS_ASTERISCO);
  const { open: openPedidosCtModal } = useModal(MODAL_IDS.INVENTORY_PEDIDOS_CT);

  const getConsultaHandler = (item: string): (() => void) | undefined => {
    if (item === "Auxiliar") return openAuxiliarModal;
    if (item === "Cotizaciones por cliente") return openCotizacionesClienteModal;
    if (item === "Ventas por sucursal") return openVentasSucursalModal;
    if (item === "Ventas anuales") return openVentasAnualesModal;
    if (item === "Ventas anuales resumen") return openVentasAnualesResumenModal;
    if (item === "Ordenado a proveedores  CT") return openOrdenadoProveedoresModal;
    if (item === "Compras por proveedor  DT") return openComprasProveedorModal;
    if (item === "Compras desglosadas") return openComprasDesglosadasModal;
    if (item === "Compras anuales") return openComprasAnualesModal;
    if (item === "Compras anuales resumen") return openComprasAnualesResumenModal;
    if (item === "Ventas desglosadas") return openVentasDesglosadasModal;
    if (item === "Cotizado a proveedores  CT") return openCotizadoProveedoresModal;
    if (item === "Piezas") return openPiezasModal;
    if (item === "Piezas surtidas") return openPiezasSurtidasModal;
    if (item === "WIP                   CT") return openWipModal;
    if (item === "Habilitaciones pendientes") return openHabilitacionesPendientesModal;
    if (item === "Documentos") return openDocumentosModal;
    if (item === "Bonificaciones") return openBonificacionesModal;

    return undefined;
  };

  const pendingModalOnlyItems = new Set([
    "Piezas",
    "Piezas surtidas",
    "WIP                   CT",
    "Habilitaciones pendientes",
    "Documentos",
    "Bonificaciones",
  ]);

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
            return (
              <TripleConsultaButton
                key={`${item}-${idx}`}
                label={item}
                onMainClick={openVentasClienteModal}
                pendingStar
                pendingCt
              />
            );
          }

          if (item === "Curva Tmp.      Curva 2") {
            return (
              <DoubleConsultaButton
                key={`${item}-${idx}`}
                leftLabel="Curva Tmp."
                rightLabel="Curva 2"
                onLeftClick={openCurvaTmpModal}
                onRightClick={openCurva2Modal}
                pendingLeft
                pendingRight
              />
            );
          }

          const onClick = getConsultaHandler(item);
          const isPending = !onClick || pendingModalOnlyItems.has(item);

          return (
            <button
              key={`${item}-${idx}`}
              type="button"
              onClick={onClick}
              className={[legacyButtonClass, isPending ? legacyPendingButtonClass : ""].join(" ")}
            >
              {item}
            </button>
          );
        })}
      </div>
    </aside>
  );
};
