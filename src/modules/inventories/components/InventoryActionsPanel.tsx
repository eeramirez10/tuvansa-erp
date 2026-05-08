import { useModal } from "../../ui/hooks/useModal";
import { MODAL_IDS } from "../../ui/store/modal.store";
import { inventoryActionItems } from "../constants/inventory-actions.config";
import { LegacyActionPanel } from "../../shared/components/legacy-actions/LegacyActionPanel";


export const  InventoryActionsPanel = () => {
  const { open: openWarehousesModal } = useModal(MODAL_IDS.INVENTORY_WAREHOUSES);
  const { open: openOthersModal } = useModal(MODAL_IDS.INVENTORY_OTHERS);
  const { open: openClasificarModal } = useModal(MODAL_IDS.INVENTORY_CLASIFICAR);
  const { open: openDescrExtModal } = useModal(MODAL_IDS.INVENTORY_DESCR_EXT);
  const { open: openLotesModal } = useModal(MODAL_IDS.INVENTORY_LOTES);
  const { open: openUepsPepsModal } = useModal(MODAL_IDS.INVENTORY_UEPS_PEPS);
  const { open: openAltaCtModal } = useModal(MODAL_IDS.INVENTORY_ALTA_CT);
  const { open: openBloquearModal } = useModal(MODAL_IDS.INVENTORY_BLOQUEAR);
  const { open: openCanalesModal } = useModal(MODAL_IDS.INVENTORY_CANALES);
  const { open: openDescuentosClientesModal } = useModal(MODAL_IDS.INVENTORY_DESCUENTOS_CLIENTES);
  const { open: openDescuentosProveedoresModal } = useModal(MODAL_IDS.INVENTORY_DESCUENTOS_PROVEEDORES);
  const { open: openEspecificacionesModal } = useModal(MODAL_IDS.INVENTORY_ESPECIFICACIONES);
  const { open: openInvCtModal } = useModal(MODAL_IDS.INVENTORY_INV_CT);
  const { open: openPreciosModal } = useModal(MODAL_IDS.INVENTORY_PRECIOS);
  const { open: openPrepacksModal } = useModal(MODAL_IDS.INVENTORY_PREPACKS);
  const { open: openSkusModal } = useModal(MODAL_IDS.INVENTORY_SKUS);
  const { open: openAlternosModal } = useModal(MODAL_IDS.INVENTORY_ALTERNOS);
  const { open: openComponentesModal } = useModal(MODAL_IDS.INVENTORY_COMPONENTES);
  const { open: openEspecificCalModal } = useModal(MODAL_IDS.INVENTORY_ESPECIFIC_CAL);
  const { open: openImplosionModal } = useModal(MODAL_IDS.INVENTORY_IMPLOSION);
  const { open: openCaracteristicasModal } = useModal(MODAL_IDS.INVENTORY_CARACTERISTICAS);

  const actionsHandlers: Partial<Record<string, () => void>> = {
    almacenes: openWarehousesModal,
    clasificar: openClasificarModal,
    descrExt: openDescrExtModal,
    otros: openOthersModal,
    lotes: openLotesModal,
    uepsPeps: openUepsPepsModal,
    altaCt: openAltaCtModal,
    bloquear: openBloquearModal,
    canales: openCanalesModal,
    descuentosClientes: openDescuentosClientesModal,
    descuentosProveedores: openDescuentosProveedoresModal,
    especificaciones: openEspecificacionesModal,
    invCt: openInvCtModal,
    precios: openPreciosModal,
    prepacks: openPrepacksModal,
    skus: openSkusModal,
    alternos: openAlternosModal,
    componentes: openComponentesModal,
    especificCal: openEspecificCalModal,
    implosion: openImplosionModal,
    caracteristicas: openCaracteristicasModal,
  }

  const items = inventoryActionItems
  .filter((item) => item.id !== "comprasProd")
  .map((item) => ({
    ...item,
    
    onClick: actionsHandlers[item.id],
  }))

  return <LegacyActionPanel title="Acciones" bottomTitle="Compras/Prod" items={items} />

  // return (
  //   <aside className="border-r border-[#c8ccd1] bg-[#ececec] p-[3px]">
  //     <div className="mb-[3px] h-[24px] bg-[#1676b8] text-center text-[12px] leading-[24px] font-semibold text-white">
  //       Acciones
  //     </div>
  //     <div className="grid gap-[2px]">
  //       {leftActionsTop.map((item) => (
  //         <LeftButton
  //           key={item}
  //           label={item}
  //           onClick={
  //             item === "Almacenes" ? openWarehousesModal : item === "Otros" ? openOthersModal : undefined
  //           }
  //         />
  //       ))}
  //     </div>

  //     <div className="mt-[4px] h-[24px] bg-[#1676b8] text-center text-[12px] leading-[24px] font-semibold text-white">
  //       Compras/Prod
  //     </div>
  //     <div className="mt-[2px] grid gap-[2px]">
  //       {leftActionsBottom.map((item) => (
  //         <LeftButton key={item} label={item} />
  //       ))}
  //     </div>
  //   </aside>
  // );
}
