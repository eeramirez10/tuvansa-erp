import { rightConsultas } from "../constants"


export const InventoryConsultasPanel = () => {

  return (
    <aside className="border border-[#9ca4ac] bg-[#d7d7d7]">
      <div className="flex h-[26px] items-center justify-between border-b border-[#9ca4ac] px-[6px] text-[11px] font-semibold text-[#4a5158]">
        <span>Consultas</span>
        <span className="text-[15px] leading-none">×</span>
      </div>
      <div className="grid gap-[2px] p-[4px]">
        {rightConsultas.map((item, idx) => (
          <button
            key={`${item}-${idx}`}
            type="button"
            className="h-[24px] border border-[#a0a6ad] bg-[#dcdcdc] px-2 text-center text-[11px] leading-[22px] font-semibold text-[#3f464f]"
          >
            {item}
          </button>
        ))}
      </div>
    </aside>
  )
}