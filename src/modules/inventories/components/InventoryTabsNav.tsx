import React from "react";
import { inventoryTabs } from "../constants"
type InventoryTabKey = (typeof inventoryTabs)[number]["key"];

type Props = {
  onChangeTab:(activeTab: InventoryTabKey) => void
  activeTab: InventoryTabKey
}

export const InventoryTabsNav:React.FC<Props> = ({ activeTab, onChangeTab}) => {

  return (

    <div className="mt-[4px] flex flex-wrap gap-[1px]">
      {inventoryTabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onChangeTab(tab.key)}
          className={[
            "h-[24px] border border-[#a2aab2] px-[10px] text-[11px] leading-[22px] font-semibold",
            activeTab === tab.key ? "bg-[#1579ba] text-white" : "bg-[#dedede] text-[#3f464f]",
          ].join(" ")}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )

}