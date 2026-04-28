import { legacyAlignTokens, legacyFormTokens, type LegacyAlign } from "./legacy-form.tokens";

type LegacyFieldProps = {
  value?: string | number | null;
  className?: string;
  align?: LegacyAlign;
  title?: string;
};

export function LegacyField({ value = "", className = "", align = "left", title }: LegacyFieldProps) {
  const safeValue = value === null || value === undefined ? "" : String(value);

  return (
    <span
      title={title}
      className={[
        "inline-flex items-center",
      
        legacyFormTokens.fieldBg,
        legacyAlignTokens[align],
        className
      ].join(" ")}
    >
      {safeValue}
    </span>
  );
}
