import { legacyButtonClass, legacyPendingButtonClass } from "../../../../core/ui-classes";
import { LegacyActionItem, LegacyActionsPanelProps } from "./legacy-actions.types";

function ActionButton({ item }: { item: LegacyActionItem }) {
  const { label, emphasize = false, pendingBackend = false, disabled = false, onClick } = item

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={[
        legacyButtonClass,
        pendingBackend ? legacyPendingButtonClass : "",
        // "h-[24px] border border-[#9da3a8] bg-[#d4d4d4] px-1 text-center text-[11px] leading-[22px]",
        // 'hover:bg-legacy-btn-hover',
        pendingBackend ? "font-semibold" : emphasize ? "font-bold text-[#1a4f88]" : "font-semibold text-[#3f4852]"
        // "disabled:cursor-not-allowed disabled:opacity-60",
      ].join(" ")}
    >
      {label}
    </button>
  )

}


export function LegacyActionPanel({
  title = "Acciones",
  bottomTitle,
  items,
  className = "",
}: LegacyActionsPanelProps) {

  const topItems = items.filter(item => (item.section ?? "top") === 'top');
  const bottomItems = items.filter(item => item.section === 'bottom');

  return (

    <aside className={["flex flex-col border-r border-[#c3c8ce] bg-[#e7e7e7]", className].join(" ")}>
      <div className="h-[22px] border-b border-[#8db6d6] bg-[#1179ba] px-2 text-center text-[15px] leading-[22px] font-bold text-white">
        {title}
      </div>

      <div className="flex flex-col gap-[2px] p-[6px]">
        {topItems.map((item) => (
          <ActionButton key={item.id} item={item} />
        ))}
      </div>

      {bottomItems.length > 0 ? (
        <>
          {bottomTitle ? (
            <div className="my-[4px] h-[22px] border-b border-[#8db6d6] bg-[#1179ba] px-2 text-center text-[15px] leading-[22px] font-bold text-white">
              {bottomTitle}
            </div>
          ) : (
            <div className="my-[4px] border-t border-[#c3c8ce]" />
          )}
          <div className="flex flex-col gap-[2px] px-[6px] pb-[6px]">
            {bottomItems.map((item) => (
              <ActionButton key={item.id} item={item} />
            ))}
          </div>
        </>
      ) : null}
    </aside>

  )

}
