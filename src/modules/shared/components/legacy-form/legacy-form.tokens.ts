export const legacyFormTokens = {
  text: "text-[11px] leading-none text-[#2f3943]",
  label: "bg-[#d8d9db] text-[11px] leading-none font-semibold text-[#2f3943]",
  controlBase:
    "h-[18px] border border-[#b8c1cb] bg-white px-[4px] text-[11px] font-normal text-[#1f2933] outline-none",
  fieldBg: "bg-[#d8d9db] text-[#4b5563] cursor-not-allowed select-none h-[18px]   px-[4px] text-[11px] font-normal text-[#1f2933] outline-none",
  inputBg: "",
  selectBg: "",
  disabled: "disabled:cursor-not-allowed disabled:opacity-70",
  focus: "focus:border-[#5f88b0]",
  checkbox:
    "h-[12px] w-[12px] appearance-none border border-[#9ca3af] bg-[#dbdcde] align-middle checked:bg-[#cfd8e3]"
} as const;

export const legacyAlignTokens = {
  left: "justify-start text-left",
  center: "justify-center text-center",
  right: "justify-end text-right"
} as const;

export type LegacyAlign = keyof typeof legacyAlignTokens;
