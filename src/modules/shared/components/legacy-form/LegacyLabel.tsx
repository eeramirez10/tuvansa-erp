import type { ReactNode } from "react";
import { legacyFormTokens } from "./legacy-form.tokens";

type LegacyLabelProps = {
  children: ReactNode;
  htmlFor?: string;
  className?: string;
};

export function LegacyLabel({ children, htmlFor, className = "" }: LegacyLabelProps) {
  return (
    <label htmlFor={htmlFor} className={`${legacyFormTokens.label} ${className}`}>
      {children}
    </label>
  );
}
