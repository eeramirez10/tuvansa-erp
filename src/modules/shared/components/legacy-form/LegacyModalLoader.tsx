type LegacyModalLoaderProps = {
  label?: string;
};

export function LegacyModalLoader({ label = "Cargando..." }: LegacyModalLoaderProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 grid place-items-center bg-white/55">
      <div className="flex items-center gap-[8px] border border-[#98a3af] bg-[#f3f4f6] px-[10px] py-[6px] text-[11px] text-[#1f2933]">
        <span className="h-[14px] w-[14px] animate-spin rounded-full border-2 border-[#1b6ff8] border-t-transparent" />
        <span>{label}</span>
      </div>
    </div>
  );
}

