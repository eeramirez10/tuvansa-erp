import { Square, X } from "lucide-react";
import { formatInteger } from "../utils/formatInteger";
import { useInventoryVentasAnualesResumenModal } from "../hooks/useInventoryVentasAnualesResumenModal";

const MONTH_LABELS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"] as const;
const monthKeys = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"] as const;

const colors = ["#ff2929", "#23d326", "#4059ff", "#d6d013", "#ee44e5", "#75dbe7", "#d7a31d", "#bcbcbc", "#8b6a6a", "#3e9bd9"];
const CHART = {
  width: 900,
  height: 260,
  padLeft: 44,
  padRight: 14,
  padTop: 10,
  padBottom: 30,
} as const;

const COLUMNS = [
  { key: "year", label: "Año", width: "w-[46px]" },
  { key: "ene", label: "Ene", width: "w-[44px]" },
  { key: "feb", label: "Feb", width: "w-[44px]" },
  { key: "mar", label: "Mar", width: "w-[44px]" },
  { key: "abr", label: "Abr", width: "w-[44px]" },
  { key: "may", label: "May", width: "w-[44px]" },
  { key: "jun", label: "Jun", width: "w-[44px]" },
  { key: "jul", label: "Jul", width: "w-[44px]" },
  { key: "ago", label: "Ago", width: "w-[44px]" },
  { key: "sep", label: "Sep", width: "w-[44px]" },
  { key: "oct", label: "Oct", width: "w-[44px]" },
  { key: "nov", label: "Nov", width: "w-[44px]" },
  { key: "dic", label: "Dic", width: "w-[44px]" },
  { key: "total", label: "Total", width: "w-[54px]" },
] as const;

const buildPolylinePoints = (values: number[], minValue: number, maxValue: number): string => {
  const plotWidth = CHART.width - CHART.padLeft - CHART.padRight;
  const plotHeight = CHART.height - CHART.padTop - CHART.padBottom;
  const range = Math.max(maxValue - minValue, 1);

  return values
    .map((value, index) => {
      const x = CHART.padLeft + (plotWidth * index) / (values.length - 1);
      const y = CHART.padTop + ((maxValue - value) / range) * plotHeight;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
};

function InventoryVentasAnualesResumenModal() {
  const { isOpen, close, currentCode, rows, totals, fromDate, isLoading, error } = useInventoryVentasAnualesResumenModal();

  const chartValues = rows.map((row) => monthKeys.map((key) => row[key]));
  const flatValues = chartValues.flat();
  const maxData = flatValues.length ? Math.max(...flatValues) : 0;
  const minData = flatValues.length ? Math.min(...flatValues) : 0;
  const maxValue = Math.max(1000, Math.ceil((maxData + 200) / 500) * 500);
  const minValue = Math.min(-1000, Math.floor((minData - 200) / 500) * 500);
  const tickCount = 6;
  const tickValues = Array.from({ length: tickCount }, (_, idx) => {
    return maxValue - ((maxValue - minValue) * idx) / (tickCount - 1);
  });
  const zeroLineY = (() => {
    const range = Math.max(maxValue - minValue, 1);
    const plotHeight = CHART.height - CHART.padTop - CHART.padBottom;
    return CHART.padTop + ((maxValue - 0) / range) * plotHeight;
  })();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <section className="flex h-[min(560px,78vh)] w-[min(980px,92vw)] flex-col border border-[#2f8ce8] bg-[#ececec]">
        <header className="flex h-[30px] items-center justify-between border-b border-[#99a4af] bg-[#f0f0f0] px-2">
          <div className="flex items-center gap-1">
            <span className="h-[12px] w-[12px] border border-[#8fa6cc] bg-white" />
            <h2 className="text-[12px] leading-none font-semibold text-[#1e293b]">Ventas Anuales resumen anual</h2>
          </div>
          <div className="mr-auto ml-3 text-[11px] text-[#3a4552]">{currentCode ? `Producto: ${currentCode}` : ""}</div>
          <div className="flex items-center gap-[6px]">
            <button
              type="button"
              className="grid h-[18px] w-[18px] place-items-center border border-[#6d747b] bg-[#ededed] text-[#2c3948]"
            >
              <Square className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={close}
              className="grid h-[18px] w-[18px] place-items-center border border-[#6d747b] bg-[#ededed] text-[#2c3948]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-[1fr]">
          <div className="modal-scroll min-h-0 overflow-auto border-r border-[#9ca3ab] border-b border-[#9ca3ab]">
            <table className="w-max min-w-full border-collapse bg-[#efefef] text-[11px] leading-none text-[#1d2836]">
              <thead className="sticky top-0 z-10 bg-[#dcdcdc]">
                <tr>
                  {COLUMNS.map((column) => (
                    <th
                      key={column.key}
                      className={`${column.width} border border-[#a6adb5] px-1 py-[5px] text-left font-normal`}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[#f3f3f3]">
                  <td className="w-[46px] border border-[#a6adb5] px-1 py-[4px]" />
                  {monthKeys.map((key) => (
                    <td key={`total-${key}`} className="w-[44px] border border-[#a6adb5] px-1 py-[4px] text-right">
                      {formatInteger(totals[key])}
                    </td>
                  ))}
                  <td className="w-[54px] border border-[#a6adb5] px-1 py-[4px] text-right">{formatInteger(totals.total)}</td>
                </tr>
                {rows.map((row) => (
                  <tr key={row.year} className="bg-[#efefef] odd:bg-[#f4f4f4]">
                    <td className="w-[46px] border border-[#a6adb5] px-1 py-[4px]">{row.year}</td>
                    {monthKeys.map((key) => (
                      <td key={`${row.year}-${key}`} className="w-[44px] border border-[#a6adb5] px-1 py-[4px] text-right">
                        {formatInteger(row[key])}
                      </td>
                    ))}
                    <td className="w-[54px] border border-[#a6adb5] px-1 py-[4px] text-right">{formatInteger(row.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-b border-[#9ca3ab] bg-[#ececec] p-2 text-[11px] text-[#2a3643]">
            <div className="mt-1 text-right">Desde : {fromDate}</div>
          </div>
        </div>

        <div className="flex flex-col border-t border-[#a5acb3] bg-[#efefef] px-4 pt-2 pb-3">
          <div className="text-center text-[42px] leading-[42px] font-semibold italic [font-family:'Times_New_Roman',serif]">
            Ventas anuales
          </div>
          <div className="-mt-1 mb-1 text-center text-[30px] leading-[30px] font-semibold [font-family:'Times_New_Roman',serif]">
            Resumen
          </div>

          <div className="relative mx-auto w-full max-w-[920px] border border-[#2d2d2d] bg-[#f3f3f3]">
            <svg viewBox={`0 0 ${CHART.width} ${CHART.height}`} className="h-[260px] w-full">
              {tickValues.map((value, tick) => {
                const y =
                  CHART.padTop +
                  ((CHART.height - CHART.padTop - CHART.padBottom) * tick) / (tickValues.length - 1);
                return (
                  <g key={tick}>
                    <line
                      x1={CHART.padLeft}
                      y1={y}
                      x2={CHART.width - CHART.padRight}
                      y2={y}
                      stroke="#d2d2d2"
                      strokeWidth="1"
                    />
                    <text x="8" y={y + 4} fontSize="11" fill="#1f2a37">
                      {formatInteger(value)}
                    </text>
                  </g>
                );
              })}

              <line
                x1={CHART.padLeft}
                y1={zeroLineY}
                x2={CHART.width - CHART.padRight}
                y2={zeroLineY}
                stroke="#8b8b8b"
                strokeWidth="1"
              />

              {MONTH_LABELS.map((label, idx) => {
                const x =
                  CHART.padLeft +
                  ((CHART.width - CHART.padLeft - CHART.padRight) * idx) /
                    (MONTH_LABELS.length - 1);
                return (
                  <text key={label} x={x - 9} y={CHART.height - 8} fontSize="11" fill="#1f2a37">
                    {label}
                  </text>
                );
              })}

              {rows.map((row, idx) => {
                const values = monthKeys.map((key) => row[key]);
                const points = buildPolylinePoints(values, minValue, maxValue);
                return <polyline key={row.year} fill="none" stroke={colors[idx % colors.length]} strokeWidth="1.4" points={points} />;
              })}
            </svg>
          </div>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-[11px]">
            {rows.map((row, idx) => (
              <div key={`legend-${row.year}`} className="flex items-center gap-1">
                <span className="inline-block h-[10px] w-[10px] border border-black" style={{ backgroundColor: colors[idx % colors.length] }} />
                <span>{row.year}</span>
              </div>
            ))}
          </div>
        </div>

        {(isLoading || error) && (
          <div
            className={`border-t border-[#a6adb5] px-2 py-1 text-[11px] ${error ? "bg-[#ffe7e7] text-[#8b1e1e]" : "bg-[#f6f6f6] text-[#334155]"}`}
          >
            {error ?? "Cargando ventas anuales resumen..."}
          </div>
        )}
      </section>
    </div>
  );
}

export default InventoryVentasAnualesResumenModal;
