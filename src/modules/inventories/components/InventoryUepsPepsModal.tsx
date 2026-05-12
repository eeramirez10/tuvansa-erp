import { Square, X } from "lucide-react";
import { useInventoryUepsPepsModal } from "../hooks/useInventoryUepsPepsModal";
import { formatFixed } from "../utils/formatFixed";
import { formatLegacyDate } from "../utils/formatLegacyDate";
import { LegacyModalLoader } from "../../shared/components/legacy-form/LegacyModalLoader";
import { ManagedWindowLayer } from "../../ui/components/ManagedWindowLayer";
import { MODAL_IDS } from "../../ui/store/modal.store";

function InventoryUepsPepsModal() {
  const { isOpen, close, currentCode, rows, isLoading, error, totalQuantity, totalAverageCost } =
    useInventoryUepsPepsModal();

  if (!isOpen) {
    return null;
  }

  return (
    <ManagedWindowLayer windowId={MODAL_IDS.INVENTORY_UEPS_PEPS} isOpen={isOpen}>
      <section className="flex h-[min(560px,78vh)] w-[min(980px,92vw)] flex-col border border-[#2f8ce8] bg-[#ececec]">
        <header className="flex h-[30px] items-center justify-between border-b border-[#99a4af] bg-[#f0f0f0] px-2">
          <div className="flex items-center gap-1">
            <span className="h-[12px] w-[12px] border border-[#8fa6cc] bg-white" />
            <h2 className="text-[12px] leading-none font-semibold text-[#1e293b]">UEPS/PEPS</h2>
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

        <div className="relative modal-scroll min-h-0 flex-1 overflow-auto border-b border-[#9ca3ab]">
          <table className="w-max min-w-full border-collapse bg-[#efefef] text-[11px] leading-none text-[#1d2836]">
            <thead className="sticky top-0 z-10 bg-[#dcdcdc]">
              <tr>
                <th className="w-[84px] border border-[#a6adb5] px-1 py-[5px] text-left font-normal">Inicial</th>
                <th className="w-[92px] border border-[#a6adb5] px-1 py-[5px] text-left font-normal">Cantidad</th>
                <th className="w-[84px] border border-[#a6adb5] px-1 py-[5px] text-left font-normal">Costo</th>
                <th className="w-[74px] border border-[#a6adb5] px-1 py-[5px] text-left font-normal">Adv.</th>
                <th className="w-[92px] border border-[#a6adb5] px-1 py-[5px] text-left font-normal">Fecha</th>
                <th className="w-[96px] border border-[#a6adb5] px-1 py-[5px] text-left font-normal">Doc.</th>
                <th className="w-[96px] border border-[#a6adb5] px-1 py-[5px] text-left font-normal">Lote</th>
                <th className="w-[96px] border border-[#a6adb5] px-1 py-[5px] text-left font-normal">Caducidad</th>
                <th className="w-[88px] border border-[#a6adb5] px-1 py-[5px] text-left font-normal">Llave</th>
                <th className="w-[62px] border border-[#a6adb5] px-1 py-[5px] text-left font-normal">&nbsp;</th>
                <th className="w-[44px] border border-[#a6adb5] px-1 py-[5px] text-left font-normal">Alm</th>
                <th className="w-[84px] border border-[#a6adb5] px-1 py-[5px] text-left font-normal">Proveedor</th>
                <th className="w-[76px] border border-[#a6adb5] px-1 py-[5px] text-left font-normal">T.C.</th>
                <th className="w-[88px] border border-[#a6adb5] px-1 py-[5px] text-left font-normal">Costo Dlls</th>
                <th className="w-[88px] border border-[#a6adb5] px-1 py-[5px] text-left font-normal">Adv. Dlls</th>
                <th className="w-[96px] border border-[#a6adb5] px-1 py-[5px] text-left font-normal">&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key} className="bg-[#efefef] odd:bg-[#f4f4f4]">
                  <td className="border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.initial, 4)}</td>
                  <td className="border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.quantity, 4)}</td>
                  <td className="border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.cost, 2)}</td>
                  <td className="border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.adValorem, 2)}</td>
                  <td className="border border-[#a6adb5] px-1 py-[5px]">{formatLegacyDate(row.date)}</td>
                  <td className="border border-[#a6adb5] px-1 py-[5px] text-[#144d84]">{row.document}</td>
                  <td className="border border-[#a6adb5] px-1 py-[5px]">{row.lot}</td>
                  <td className="border border-[#a6adb5] px-1 py-[5px]">{formatLegacyDate(row.expirationAt)}</td>
                  <td className="border border-[#a6adb5] px-1 py-[5px]">{row.itemKey}</td>
                  <td className="border border-[#a6adb5] px-1 py-[5px]">{row.itemGroup}</td>
                  <td className="border border-[#a6adb5] px-1 py-[5px]">{row.warehouse}</td>
                  <td className="border border-[#a6adb5] px-1 py-[5px]">{row.provider}</td>
                  <td className="border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.exchangeRate, 4)}</td>
                  <td className="border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.costDollars, 2)}</td>
                  <td className="border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.adValoremDollars, 2)}</td>
                  <td className="border border-[#a6adb5] px-1 py-[5px] text-right">{formatFixed(row.totalMxn, 2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {isLoading ? <LegacyModalLoader label="Cargando UEPS/PEPS..." /> : null}
          {error ? (
            <div className="sticky bottom-0 border-t border-[#a6adb5] bg-[#ffe7e7] px-2 py-1 text-[11px] text-[#8b1e1e]">
              {error}
            </div>
          ) : null}
        </div>

        <footer className="flex h-[44px] items-center gap-2 border-t border-[#a1a8af] bg-[#ececec] px-2">
          <span className="inline-flex h-[20px] w-[86px] items-center justify-end border border-[#a7adb3] bg-[#d8d9db] px-[4px] text-[11px]">
            {formatFixed(totalQuantity, 2)}
          </span>
          <span className="inline-flex h-[20px] w-[86px] items-center justify-end border border-[#a7adb3] bg-[#d8d9db] px-[4px] text-[11px]">
            {formatFixed(totalAverageCost, 2)}
          </span>
          <button type="button" className="h-[24px] min-w-[82px] border border-[#9da3aa] bg-[#d8d8d8] px-2 text-[11px]">
            Calidad
          </button>
          <button type="button" className="h-[24px] min-w-[94px] border border-[#9da3aa] bg-[#d8d8d8] px-2 text-[11px]">
            Transferencia
          </button>
        </footer>
      </section>
    </ManagedWindowLayer>
  );
}

export default InventoryUepsPepsModal;
