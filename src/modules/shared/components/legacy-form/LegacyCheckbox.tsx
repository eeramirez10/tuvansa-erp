import type { InputHTMLAttributes, ReactNode } from "react";
import { legacyFormTokens } from "./legacy-form.tokens";

type LegacyCheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: ReactNode;
  labelClassName?: string;
  wrapperClassName?: string;
};

export function LegacyCheckbox({
  label,
  className = "",
  labelClassName = "",
  wrapperClassName = "",
  ...rest
}: LegacyCheckboxProps) {
  return (
    <label className={`inline-flex items-center gap-[4px] ${wrapperClassName}`}>
      <input type="checkbox" className={`${legacyFormTokens.checkbox} ${className}`} {...rest} />
      {label ? <span className={`${legacyFormTokens.text} ${labelClassName}`}>{label}</span> : null}
    </label>
  );
}
