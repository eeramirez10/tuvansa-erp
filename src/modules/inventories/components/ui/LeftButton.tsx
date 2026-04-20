
export const LeftButton = ({ label, emphasize = false }: { label: string; emphasize?: boolean }) => {
  return (
    <button
      type="button"
      className={[
        "h-[24px] border border-[#9da3a8] bg-[#d4d4d4] px-1 text-center text-[11px] leading-[22px]",
        emphasize ? "font-bold text-[#1a4f88]" : "font-semibold text-[#3f4852]",
      ].join(" ")}
    >
      {label}
    </button>
  );
}