import type { InputHTMLAttributes } from "react";
import { legacyFormTokens, type LegacyAlign } from "./legacy-form.tokens";

type LegacyInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  align?: LegacyAlign;
  w?: string;
};

export function LegacyInput({ align = "left", className = "", type = "text", w = "", ...rest }: LegacyInputProps) {

  return (
    <input
      type={type}
      className={[
        "min-w-0",
        legacyFormTokens.controlBase,
        legacyFormTokens.inputBg,
        legacyFormTokens.disabled,
        legacyFormTokens.focus,
        align === "left" ? "text-left" : align === "center" ? "text-center" : "text-right",
        w,
        className
      ].join(" ")}
      {...rest}
    />
  );
}
