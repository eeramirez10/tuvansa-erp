import { useModal } from "../../ui/hooks/useModal";
import { MODAL_IDS } from "../../ui/store/modal.store";
import { inventoryActionItems } from "../constants/inventory-actions.config";
import { LegacyActionPanel } from "../../shared/components/legacy-actions/LegacyActionPanel";


export const  InventoryActionsPanel = () => {
  const { open: openWarehousesModal } = useModal(MODAL_IDS.INVENTORY_WAREHOUSES);
  const { open: openOthersModal } = useModal(MODAL_IDS.INVENTORY_OTHERS);

  const actionsHandlers: Partial<Record<string, () => void>> = {
    almacenes: openWarehousesModal,
    otros: openOthersModal,
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
