import { InventoryPurchases } from "../../types/inventory.types";
import { asText } from "../../utils/asText";
import { formatFixed } from "../../utils/formatFixed";
import { formatInteger } from "../../utils/formatInteger";
import { formatLegacyDate } from "../../utils/formatLegacyDate";
import { Field } from "../ui/Field";

function LegacyCheckbox({ checked = false }: { checked?: boolean }) {
  return (
    <span className="inline-flex h-[13px] w-[13px] items-center justify-center border border-[#a7adb3] bg-[#ececec]">
      {checked ? <span className="h-[7px] w-[7px] bg-[#7f848a]" /> : null}
    </span>
  );
}

function LegacyRadio({ selected = false }: { selected?: boolean }) {
  return (
    <span className="inline-flex h-[12px] w-[12px] items-center justify-center rounded-full border border-[#a7adb3] bg-[#ececec]">
      {selected ? <span className="h-[5px] w-[5px] rounded-full bg-[#8f9499]" /> : null}
    </span>
  );
}


type Props = {
  purchases?: InventoryPurchases
}

export function PurchasesTabContent({ purchases }: Props) {

    const isOtb = Boolean(purchases?.statusOtb);
  const isInactive = Boolean(purchases?.inactive);
  const isVigente = !isOtb && !isInactive;
  const isForecast = false;
  
  return (
    <section className="mt-[4px] min-h-[518px] border border-[#b8c0c8] bg-[#efefef] text-[11px] font-bold text-[#2f3a44]">
      <div className="h-[23px] bg-[#1579ba] text-center text-[12px] leading-[21px] font-bold text-white">
        Compras
      </div>

      <div className="w-[980px] px-[16px] pt-[6px]">
        <div className="grid grid-cols-[66px_96px] items-center gap-x-[8px]">
          <span className="text-right">Último 5</span>
          <Field value={formatFixed(purchases?.lastFiveCost, 4)} w="w-[96px]" align="right" />
        </div>

        <div className="mt-[7px] flex items-end gap-[66px]">
          <div className="flex items-center gap-[8px]">
            <span className="w-[106px] text-right">Moneda de origen</span>
            <Field value={formatInteger(purchases?.originCurrency)} w="w-[34px]" align="center" />
          </div>
          <div>
            <span className="mb-[1px] block leading-[11px]">
              Lugar de
              <br />
              Origen
            </span>
            <Field value={asText(purchases?.originPlace)} w="w-[64px]" />
          </div>
        </div>

        <div className="mt-[2px] grid grid-cols-[236px_416px] items-end gap-x-[22px]">
          <div className="w-[236px]">
            <div className="mb-[1px] flex items-center gap-[12px]">
              <span className="w-[86px] text-left">M. cúbicos</span>
              <span>Origen</span>
              <span>Caja</span>
            </div>
            <div className="flex items-center gap-[2px]">
              <Field value={formatFixed(purchases?.originCubicMeters, 3)} w="w-[90px]" />
              <Field value={formatInteger(purchases?.originBox)} w="w-[94px]" />
              <Field value={asText(purchases?.ediPack)} w="w-[42px]" />
            </div>
          </div>

          <div className="grid grid-cols-[220px_42px_102px_22px] gap-x-[10px]">
            <div>
              <span className="mb-[1px] block">Proveedor</span>
              <Field
                value={asText(purchases?.provider)}
                title={asText(purchases?.provider)}
                w="w-[220px]"
                className="overflow-hidden text-ellipsis whitespace-nowrap"
              />
            </div>
            <div>
              <span className="mb-[1px] block">%</span>
              <Field value={formatFixed(purchases?.providerPercent, 2)} w="w-[42px]" />
            </div>
            <div>
              <span className="mb-[1px] block">Código</span>
              <Field value={asText(purchases?.code)} w="w-[92px]" />
            </div>
            <div>
              <span className="mb-[1px] block">Tipo</span>
              <Field value={formatInteger(purchases?.type)} w="w-[22px]" />
            </div>
          </div>
        </div>

        <div className="mt-[3px] grid grid-cols-[236px_96px] items-end gap-x-[112px]">
          <div className="w-[236px]">
            <div className="mb-[1px] flex items-center gap-[16px]">
              <span className="w-[44px] text-left">Unidad</span>
              <span>Equivale a:</span>
              <Field value={asText(purchases?.equivalentUnit)} w="w-[34px]" />
            </div>
            <div className="flex items-center gap-[6px]">
              <Field value={asText(purchases?.unit)} w="w-[48px]" />
              <Field value={formatFixed(purchases?.equivalentTo, 2)} w="w-[76px]" />
            </div>
          </div>

          <div>
            <span className="mb-[1px] block">Precio</span>
            <Field value={formatFixed(purchases?.price, 4)} w="w-[96px]" />
          </div>
        </div>

        <div className="mt-[8px] grid grid-cols-[100px_92px_70px_98px_98px_92px] gap-x-[10px]">
          <div>
            <span className="mb-[1px] block">Fin de temporada</span>
            <Field value={formatLegacyDate(purchases?.endSeasonAt ?? null)} w="w-[90px]" />
          </div>
          <div>
            <span className="mb-[1px] block">Compra mínima</span>
            <Field value={formatInteger(purchases?.minimumPurchase)} w="w-[90px]" />
          </div>
          <div>
            <span className="mb-[1px] block leading-[11px]">
              Curva de
              <br />
              temporada
            </span>
            <Field value={formatInteger(purchases?.seasonCurve)} w="w-[70px]" />
          </div>
          <div>
            <span className="mb-[1px] block leading-[11px]">
              Factor semanas en
              <br />
              tienda
            </span>
            <Field value={formatFixed(purchases?.storeWeeksFactor, 2)} w="w-[98px]" />
          </div>
          <div>
            <span className="mb-[1px] block leading-[11px]">
              Factor semanas en
              <br />
              bodega
            </span>
            <Field value={formatFixed(purchases?.warehouseWeeksFactor, 2)} w="w-[98px]" />
          </div>
          <div>
            <span className="mb-[1px] block leading-[11px]">
              Tiempo proveedor
              <br />
              (días)
            </span>
            <Field value={formatFixed(purchases?.supplierLeadTimeDays, 6)} w="w-[92px]" />
          </div>
        </div>

        <div className="mt-[6px] flex items-start gap-[28px]">
          <div>
            <div className="flex items-center gap-[6px]">
              <span className="w-[104px] text-right">Cant. en 1 prepack</span>
              <Field value={formatInteger(purchases?.quantityInPrepack)} w="w-[38px]" align="right" />
            </div>

            <div className="mt-[4px] ml-[112px] grid gap-[2px] text-[#7f848a]">
              <label className="inline-flex items-center gap-[5px]">
                <LegacyCheckbox checked={Boolean(purchases?.exportRedi)} />
                <span>Exporta REDI</span>
              </label>
              <label className="inline-flex items-center gap-[5px]">
                <LegacyCheckbox checked={Boolean(purchases?.onlyDistributesCd)} />
                <span>Solo reparte su CD</span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-[4px] grid grid-cols-[366px_132px_68px] items-end gap-x-[18px]">
          <div className="flex items-center gap-[10px]">
            <span className="w-[66px] text-right">STATUS</span>
            <label className="inline-flex items-center gap-[4px] text-[#7f848a]">
              <LegacyRadio selected={isOtb} />
              <span>OTB</span>
            </label>
            <label className="inline-flex items-center gap-[4px] text-[#7f848a]">
              <LegacyRadio selected={isVigente} />
              <span>Vigente</span>
            </label>
            <label className="inline-flex items-center gap-[4px] text-[#7f848a]">
              <LegacyRadio selected={isForecast} />
              <span>Forecast</span>
            </label>
            <label className="inline-flex items-center gap-[4px] text-[#7f848a]">
              <LegacyRadio selected={isInactive} />
              <span>Inactivo</span>
            </label>
          </div>

          <div>
            <span className="mb-[1px] block">Climas</span>
            <Field value={asText(purchases?.climates)} w="w-[130px]" />
          </div>

          <div>
            <span className="mb-[1px] block text-center leading-[11px]">
              Cant. de
              <br />
              prepacks
            </span>
            <Field value={formatInteger(purchases?.prepackCount)} w="w-[68px]" align="right" />
          </div>
        </div>
      </div>
    </section>
  );
}
