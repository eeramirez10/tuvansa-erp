import type { ReactNode, SelectHTMLAttributes } from "react";
import { legacyFormTokens } from "./legacy-form.tokens";

type LegacySelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  children?: ReactNode;
};

export function LegacySelect({ children, className = "", ...rest }: LegacySelectProps) {
  return (
    <select
      className={[
        "min-w-0",
        legacyFormTokens.controlBase,
        legacyFormTokens.selectBg,
        legacyFormTokens.disabled,
        legacyFormTokens.focus,
        className
      ].join(" ")}
      {...rest}
    >
      {children}
    </select>
  );
}
