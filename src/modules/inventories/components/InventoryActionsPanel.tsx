import { leftActionsBottom, leftActionsTop } from "../constants";
import { LeftButton } from "./ui/LeftButton";


export const  InventoryActionsPanel = () => {
  return (
    <aside className="border-r border-[#c8ccd1] bg-[#ececec] p-[3px]">
      <div className="mb-[3px] h-[24px] bg-[#1676b8] text-center text-[12px] leading-[24px] font-bold text-white">
        Acciones
      </div>
      <div className="grid gap-[2px]">
        {leftActionsTop.map((item) => (
          <LeftButton key={item} label={item} />
        ))}
      </div>

      <div className="mt-[4px] h-[24px] bg-[#1676b8] text-center text-[12px] leading-[24px] font-bold text-white">
        Compras/Prod
      </div>
      <div className="mt-[2px] grid gap-[2px]">
        {leftActionsBottom.map((item) => (
          <LeftButton key={item} label={item} />
        ))}
      </div>
    </aside>
  );
}
