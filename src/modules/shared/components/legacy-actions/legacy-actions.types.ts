export type LegacyActionSection = "top" | "bottom";

export type LegacyActionItem = {
  id: string
  label: string
  section?: LegacyActionSection
  emphasize?: boolean;
  pendingBackend?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export type LegacyActionsPanelProps = {
  title?: string
  bottomTitle?: string
  items: LegacyActionItem[],
  className?: string
}
