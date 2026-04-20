import { X } from "lucide-react";
import { useInventoryWarehousesModal } from "../hooks/useInventoryWarehousesModal";

const COLUMNS = [
  { key: "cd", label: "CD", width: "w-[36px]" },
  { key: "alm", label: "Alm.", width: "w-[48px]" },
  { key: "description", label: "Descripción", width: "w-[132px]" },
  { key: "qty", label: "Cant.", width: "w-[68px]" },
  { key: "min", label: "Mín.", width: "w-[42px]" },
  { key: "max", label: "Máx.", width: "w-[42px]" },
  { key: "veol", label: "VEOL", width: "w-[42px]" },
  { key: "minStore", label: "Min tda", width: "w-[52px]" },
  { key: "sales6", label: "Vta 6 s", width: "w-[44px]" },
  { key: "order", label: "Pedido", width: "w-[56px]" },
  { key: "assigned", label: "Asign.", width: "w-[52px]" },
  { key: "physical", label: "Físico", width: "w-[52px]" },
  { key: "count", label: "I. Conteo", width: "w-[52px]" },
  { key: "td", label: "De tds", width: "w-[52px]" },
  { key: "a", label: "A", width: "w-[22px]" },
  { key: "transit", label: "Tránsito", width: "w-[56px]" },
  { key: "createdAt", label: "Alta", width: "w-[66px]" },
  { key: "lastSale", label: "Ult vta", width: "w-[70px]" },
  { key: "providerOrder", label: "Ord. Prv.", width: "w-[58px]" },
  { key: "location", label: "Localización", width: "w-[90px]" },
  { key: "accumulatedSales", label: "Vta. acum", width: "w-[74px]" },
  { key: "s1", label: "S1", width: "w-[42px]" },
  { key: "s2", label: "S2", width: "w-[42px]" },
  { key: "s3", label: "S3", width: "w-[42px]" },
  { key: "s4", label: "S4", width: "w-[42px]" },
  { key: "s5", label: "S5", width: "w-[42px]" },
  { key: "s6", label: "S6", width: "w-[42px]" },
  { key: "price", label: "Precio", width: "w-[54px]" },
  { key: "totalReceipts", label: "Tot Recs", width: "w-[56px]" },
  { key: "curve", label: "Curva", width: "w-[56px]" },
] as const;

const NUMERIC_COLUMNS = new Set<string>([
  "qty",
  "min",
  "max",
  "veol",
  "minStore",
  "sales6",
  "order",
  "assigned",
  "physical",
  "count",
  "td",
  "transit",
  "providerOrder",
  "accumulatedSales",
  "s1",
  "s2",
  "s3",
  "s4",
  "s5",
  "s6",
  "price",
  "totalReceipts",
  "curve",
]);

const formatQty = (value: unknown): string => {
  const n = Number(value ?? 0);
  if (Number.isNaN(n)) {
    return "0.000";
  }
  return n.toFixed(3);
};

const formatInt = (value: unknown): string => {
  const n = Number(value ?? 0);
  if (Number.isNaN(n)) {
    return "0";
  }
  return String(Math.trunc(n));
};

const formatLegacyDate = (value: string | null): string => {
  if (!value || value === "1900-12-31") {
    return "31/12/1900";
  }

  const [year, month, day] = value.slice(0, 10).split("-");

  if (!year || !month || !day) {
    return "31/12/1900";
  }

  return `${day}/${month}/${year}`;
};

function InventoryWarehousesModal() {
  const { isOpen, close, rows, totalRow, isLoading, error, currentCode } = useInventoryWarehousesModal();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-2">
      <section className="flex h-[min(650px,92vh)] w-[min(1810px,99vw)] flex-col border border-[#2f8ce8] bg-[#ececec]">
        <header className="flex h-[30px] items-center justify-between border-b border-[#99a4af] bg-[#f0f0f0] px-2">
          <div className="flex items-center gap-1">
            <span className="h-[12px] w-[12px] border border-[#8fa6cc] bg-white" />
            <h2 className="text-[12px] leading-none font-semibold text-[#1e293b]">Almacenes</h2>
          </div>
          <div className="mr-auto ml-3 text-[11px] text-[#3a4552]">{currentCode ? `Producto: ${currentCode}` : ""}</div>
          <button
            type="button"
            onClick={close}
            className="grid h-[22px] w-[22px] place-items-center border border-[#6d747b] bg-[#ededed] text-[#2c3948]"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-auto border-b border-[#9ca3ab]">
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
              <tr className="bg-[#cfe6f6]">
                {COLUMNS.map((column) => (
                  <td
                    key={`total-${column.key}`}
                    className={[
                      `${column.width} border border-[#a6adb5] px-1 py-[5px]`,
                      column.key === "description" ? "font-semibold" : "",
                      column.key === "qty" ? "text-right" : "",
                    ].join(" ")}
                  >
                    {column.key === "description" ? totalRow.description : null}
                    {column.key === "qty" ? formatQty(totalRow.qty) : null}
                    {column.key === "totalReceipts" ? formatInt(totalRow.totalReceipts) : null}
                  </td>
                ))}
              </tr>

              {rows.map((row) => (
                <tr key={`${row.alm}-${row.description}`} className="bg-[#efefef] odd:bg-[#f4f4f4]">
                  {COLUMNS.map((column) => {
                    const value = row[column.key];
                    const cellValue = NUMERIC_COLUMNS.has(column.key)
                      ? column.key === "qty"
                        ? formatQty(value)
                        : formatInt(value)
                      : column.key === "createdAt" || column.key === "lastSale"
                        ? formatLegacyDate(value as string | null)
                      : String(value ?? "");

                    return (
                      <td
                        key={`${row.alm}-${column.key}`}
                        className={[
                          `${column.width} border border-[#a6adb5] px-1 py-[5px]`,
                          NUMERIC_COLUMNS.has(column.key) ? "text-right" : "",
                          column.key === "description" ? "font-semibold" : "",
                        ].join(" ")}
                      >
                        {cellValue}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          {isLoading ? (
            <div className="sticky bottom-0 border-t border-[#a6adb5] bg-[#f6f6f6] px-2 py-1 text-[11px] text-[#334155]">
              Cargando almacenes...
            </div>
          ) : null}
          {error ? (
            <div className="sticky bottom-0 border-t border-[#a6adb5] bg-[#ffe7e7] px-2 py-1 text-[11px] text-[#8b1e1e]">
              {error}
            </div>
          ) : null}
        </div>

        <footer className="flex h-[42px] items-center gap-2 border-t border-[#a1a8af] bg-[#ececec] px-2">
          <div className="h-[28px] w-[86px] border border-[#a0a6ad] bg-[#e5e5e5] px-2 text-right text-[11px] leading-[26px]">
            {formatQty(totalRow.qty)}
          </div>
          <button type="button" className="h-[30px] min-w-[130px] border border-[#9da3aa] bg-[#d8d8d8] px-3 text-[11px]">
            Filtrar tst
          </button>
          <button type="button" className="h-[30px] min-w-[120px] border border-[#9da3aa] bg-[#d8d8d8] px-3 text-[11px]">
            Localización
          </button>
          <button type="button" className="h-[30px] min-w-[100px] border border-[#9da3aa] bg-[#d8d8d8] px-3 text-[11px]">
            Min. Tda.
          </button>
          <div className="h-[28px] w-[74px] border border-[#a0a6ad] bg-[#e5e5e5] px-2 text-right text-[11px] leading-[26px]">
            0
          </div>
          <button type="button" className="h-[30px] min-w-[84px] border border-[#9da3aa] bg-[#d8d8d8] px-3 text-[11px]">
            Costo
          </button>
          <button type="button" className="h-[30px] min-w-[84px] border border-[#9da3aa] bg-[#d8d8d8] px-3 text-[11px]">
            Precio
          </button>
        </footer>
      </section>
    </div>
  );
}

export default InventoryWarehousesModal;
