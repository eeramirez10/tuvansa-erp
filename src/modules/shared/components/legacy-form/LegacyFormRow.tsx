import type { ReactNode } from "react";

type LegacyFormRowProps = {
  label?: ReactNode;
  children: ReactNode;
  className?: string;
  labelClassName?: string;
  contentClassName?: string;
};

export function LegacyFormRow({
  label,
  children,
  className = "",
  labelClassName = "",
  contentClassName = ""
}: LegacyFormRowProps) {
  return (
    <div className={`flex items-center gap-[6px] ${className}`}>
      {label ? <div className={`shrink-0 text-[11px] leading-none text-[#2f3943] ${labelClassName}`}>{label}</div> : null}
      <div className={`min-w-0 flex-1 ${contentClassName}`}>{children}</div>
    </div>
  );
}
