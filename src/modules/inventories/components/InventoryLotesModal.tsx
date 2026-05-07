import { Square, X } from "lucide-react";
import { useInventoryLotesModal } from "../hooks/useInventoryLotesModal";
import { formatFixed } from "../utils/formatFixed";
import { formatLegacyDate } from "../utils/formatLegacyDate";

function InventoryLotesModal() {
  const {
    isOpen,
    close,
    currentCode,
    rows,
    selectedRow,
    selectedRowKey,
    setSelectedRowKey,
    isLoading,
    error,
    totalAvailable,
    selectedMovementBalance,
  } = useInventoryLotesModal();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <section className="flex h-[min(560px,78vh)] w-[min(980px,92vw)] flex-col border border-[#2f8ce8] bg-[#ececec]">
        <header className="flex h-[30px] items-center justify-between border-b border-[#99a4af] bg-[#f0f0f0] px-2">
          <div className="flex items-center gap-1">
            <span className="h-[12px] w-[12px] border border-[#8fa6cc] bg-white" />
            <h2 className="text-[12px] leading-none font-semibold text-[#1e293b]">Auxiliar de lotes</h2>
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

        <div className="grid min-h-0 flex-1 grid-cols-[60%_40%] gap-[4px] p-[4px]">
          <section className="min-h-0 border border-[#a6adb5] bg-[#efefef]">
            <div className="modal-scroll h-full overflow-auto">
              <table className="w-max min-w-full border-collapse text-[11px] leading-none text-[#1d2836]">
                <thead className="sticky top-0 z-10 bg-[#dcdcdc]">
                  <tr>
                    <th className="w-[92px] border border-[#a6adb5] px-1 py-[5px] text-left font-normal">Fecha</th>
                    <th className="w-[92px] border border-[#a6adb5] px-1 py-[5px] text-left font-normal">Caducidad</th>
                    <th className="w-[150px] border border-[#a6adb5] px-1 py-[5px] text-left font-normal">Pedimento</th>
                    <th className="w-[64px] border border-[#a6adb5] px-1 py-[5px] text-left font-normal">Aduana</th>
                    <th className="w-[72px] border border-[#a6adb5] px-1 py-[5px] text-left font-normal">Lote</th>
                    <th className="w-[86px] border border-[#a6adb5] px-1 py-[5px] text-left font-normal">Disponible</th>
                    <th className="w-[42px] border border-[#a6adb5] px-1 py-[5px] text-left font-normal">Alm</th>
                    <th className="w-[96px] border border-[#a6adb5] px-1 py-[5px] text-left font-normal">Localización</th>
                    <th className="w-[88px] border border-[#a6adb5] px-1 py-[5px] text-left font-normal">Secuencia</th>
                    <th className="w-[84px] border border-[#a6adb5] px-1 py-[5px] text-left font-normal">Costo</th>
                    <th className="w-[84px] border border-[#a6adb5] px-1 py-[5px] text-left font-normal">Advalorem</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr
                      key={row.key}
                      onClick={() => setSelectedRowKey(row.key)}
                      className={`cursor-default ${
                        selectedRowKey === row.key ? "bg-[#cfe5ff]" : "bg-[#efefef] odd:bg-[#f4f4f4]"
                      }`}
                    >
                      <td className="border border-[#a6adb5] px-1 py-[5px]">{formatLegacyDate(row.date)}</td>
                      <td className="border border-[#a6adb5] px-1 py-[5px]">{formatLegacyDate(row.expirationAt)}</td>
                      <td className="border border-[#a6adb5] px-1 py-[5px]">{row.pedimento}</td>
                      <td className="border border-[#a6adb5] px-1 py-[5px]">{row.customs}</td>
                      <td className="border border-[#a6adb5] px-1 py-[5px]">{row.lot}</td>
                      <td className="border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.available, 4)}</td>
                      <td className="border border-[#a6adb5] px-1 py-[5px]">{row.warehouse}</td>
                      <td className="border border-[#a6adb5] px-1 py-[5px]">{row.location}</td>
                      <td className="border border-[#a6adb5] px-1 py-[5px] text-right">
                        {row.sequence ?? ""}
                      </td>
                      <td className="border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.cost, 4)}</td>
                      <td className="border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.adValorem, 4)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {isLoading ? (
                <div className="sticky bottom-0 border-t border-[#a6adb5] bg-[#f6f6f6] px-2 py-1 text-[11px] text-[#334155]">
                  Cargando lotes...
                </div>
              ) : null}
              {error ? (
                <div className="sticky bottom-0 border-t border-[#a6adb5] bg-[#ffe7e7] px-2 py-1 text-[11px] text-[#8b1e1e]">
                  {error}
                </div>
              ) : null}
            </div>
          </section>

          <section className="min-h-0 border border-[#a6adb5] bg-[#efefef]">
            <div className="modal-scroll h-full overflow-auto">
              <table className="w-full border-collapse text-[11px] leading-none text-[#1d2836]">
                <thead className="sticky top-0 z-10 bg-[#dcdcdc]">
                  <tr>
                    <th className="w-[76px] border border-[#a6adb5] px-1 py-[5px] text-left font-normal">Fecha</th>
                    <th className="w-[102px] border border-[#a6adb5] px-1 py-[5px] text-left font-normal">Doc.</th>
                    <th className="w-[86px] border border-[#a6adb5] px-1 py-[5px] text-left font-normal">Entradas</th>
                    <th className="w-[86px] border border-[#a6adb5] px-1 py-[5px] text-left font-normal">Salidas</th>
                    <th className="w-[44px] border border-[#a6adb5] px-1 py-[5px] text-left font-normal">Alm</th>
                  </tr>
                </thead>
                <tbody>
                  {(selectedRow?.movements ?? []).map((row, index) => (
                    <tr key={`${row.document}-${row.date ?? ""}-${index}`} className="bg-[#efefef] odd:bg-[#f4f4f4]">
                      <td className="border border-[#a6adb5] px-1 py-[5px]">{formatLegacyDate(row.date)}</td>
                      <td className="border border-[#a6adb5] px-1 py-[5px] text-[#144d84]">{row.document}</td>
                      <td className="border border-[#a6adb5] px-1 py-[5px] text-right">
                        {row.entries ? formatFixed(row.entries, 2) : ""}
                      </td>
                      <td className="border border-[#a6adb5] px-1 py-[5px] text-right">
                        {row.exits ? formatFixed(row.exits, 2) : ""}
                      </td>
                      <td className="border border-[#a6adb5] px-1 py-[5px]">{row.warehouse}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <footer className="flex h-[40px] items-center justify-between border-t border-[#a1a8af] bg-[#ececec] px-2">
          <div className="flex items-center gap-3">
            <button type="button" className="h-[24px] min-w-[58px] border border-[#9da3aa] bg-[#d8d8d8] px-2 text-[11px]">
              Cambiar
            </button>
            <button type="button" className="h-[24px] min-w-[124px] border border-[#9da3aa] bg-[#d8d8d8] px-2 text-[11px]">
              Rellena pedimentos
            </button>
            <span className="inline-flex h-[20px] w-[92px] items-center justify-end border border-[#a7adb3] bg-[#d8d9db] px-[4px] text-[11px]">
              {formatFixed(totalAvailable, 4)}
            </span>
            <button type="button" className="h-[24px] min-w-[88px] border border-[#9da3aa] bg-[#d8d8d8] px-2 text-[11px]">
              Traspaso
            </button>
          </div>

          <span className="inline-flex h-[20px] w-[90px] items-center justify-end border border-[#a7adb3] bg-[#d8d9db] px-[4px] text-[11px]">
            {formatFixed(selectedMovementBalance, 3)}
          </span>
        </footer>
      </section>
    </div>
  );
}

export default InventoryLotesModal;
