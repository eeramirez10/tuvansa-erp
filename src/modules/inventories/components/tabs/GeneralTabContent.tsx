import { formatFixed } from "../../utils/formatFixed";
import { formatInteger } from "../../utils/formatInteger";
import { formatLegacyDate } from "../../utils/formatLegacyDate";
import { Field } from "../ui/Field";
import { InventoryAccounts, InventoryAccumulators, InventoryIdentity, InventoryIndicators, InventoryPricing, InventoryStorage } from "../../types/inventory.types";



type Props = {
  identity: InventoryIdentity | undefined
  pricing: InventoryPricing | undefined
  accumulators: InventoryAccumulators | undefined
  storage: InventoryStorage | undefined
  accounts: InventoryAccounts | undefined
  indicators: InventoryIndicators | undefined
}


export const GeneralTabContent: React.FC<Props> = ({
  identity,
  pricing,
  accumulators,
  storage,
  accounts,
  indicators,

}) => {




  return (

    <div className="mt-[4px] grid grid-cols-[300px_120px_1fr] gap-x-[2px] gap-y-[2px] text-[11px] font-bold text-[#2f3a44]">
      <div className="h-[22px] bg-[#1579ba] text-center text-[12px] leading-[22px] font-bold text-white">Precios de venta</div>
      <div className="h-[22px] bg-[#1579ba] text-center text-[12px] leading-[22px] font-bold text-white">Moneda</div>
      <div className="h-[22px] bg-[#1579ba] text-center text-[12px] leading-[22px] font-bold text-white">Acumulados</div>

      <div className="grid grid-cols-[86px_96px] gap-x-[8px] gap-y-[4px] bg-[#ededee] px-[2px] py-[2px]">
        <span className="text-right">Precio 1</span>
        <Field value={formatFixed(pricing?.price1 ?? null, 4)} align="right" />
        <span className="text-right">Precio 2</span>
        <Field value={formatFixed(pricing?.price2 ?? null, 4)} align="right" />
        <span className="text-right">Precio 3</span>
        <Field value={formatFixed(pricing?.price3 ?? null, 4)} align="right" />
      </div>

      <div className="grid gap-[4px] bg-[#ededee] px-[2px] py-[2px]">
        <Field value={formatInteger(pricing?.currency1 ?? null)} align="right" />
        <Field value={formatInteger(pricing?.currency2 ?? null)} align="right" />
        <Field value={formatInteger(pricing?.currency3 ?? null)} align="right" />
      </div>

      <div className="row-span-5 grid grid-cols-[1fr_56px_90px] gap-y-2 gap-x-1 bg-[#ededee] px-[2px] py-[2px]">
        <span className="text-right ">Última Compra</span>
        <Field value={formatLegacyDate(accumulators?.lastPurchase ?? null)} align="right" className="col-span-2" />
        <span className="text-right">Venta</span>
        <Field value={formatLegacyDate(accumulators?.lastSale ?? null)} align="right" className="col-span-2" />
        <span className="text-right">Asignado/WMS</span>
        <Field value={formatFixed(accumulators?.assigned ?? null, 2)} align="right" />
        <Field value={formatFixed(accumulators?.assigned ?? null, 2)} align="right" />
        <span className="text-right">Confirmado</span>
        <Field value={formatFixed(accumulators?.confirmed ?? null, 3)} align="right" className="col-span-2" />
        <span className="text-right">Pedido/Cot</span>
        <Field value={formatFixed(accumulators?.customerOrders ?? null, 2)} align="right" />
        <Field value={formatInteger(accumulators?.customerQuotes ?? null)} align="right" />
        <span className="text-right">Ordenado/Cot</span>
        <Field value={formatFixed(accumulators?.supplierOrders ?? null, 2)} align="right" />
        <Field value={formatInteger(accumulators?.supplierQuotes ?? null)} align="right" />
        <span className="text-right">Stock actual</span>
        <Field value={formatFixed(accumulators?.stockCurrent ?? null, 2)} align="right" className="col-span-2" />
        <span className="text-right">Anterior</span>
        <Field value={formatFixed(accumulators?.stockPrevious ?? null, 3)} align="right" className="col-span-2" />
        <span className="text-right">Acumulado</span>
        <Field value={formatFixed(accumulators?.stockAccumulated ?? null, 3)} align="right" className="col-span-2" />
        <span className="text-right">Anterior</span>
        <Field value={formatFixed(accumulators?.quantityPrevious ?? null, 2)} align="right" className="col-span-2" />
        <span className="text-right">Acumulado</span>
        <Field value={formatFixed(accumulators?.quantityAccumulated ?? null, 2)} align="right" className="col-span-2" />
        <span className="text-right">Stk. pzas</span>
        <Field value={formatInteger(accumulators?.stockPieces ?? null)} align="right" className="col-span-2" />
        <span className="text-right">Alta</span>
        <Field value={formatLegacyDate(identity?.createdAt ?? null)} align="right" className="col-span-2" />
        <span className="text-right">Baja</span>
        <Field value={formatLegacyDate(identity?.inactiveAt ?? null)} align="right" className="col-span-2" />
        <span />
        <span className="text-center">Vta 6s</span>
        <span className="text-center">Días Inv.</span>
        <span />
        <Field value={formatInteger(indicators?.sales6Months ?? null)} align="right" />
        <Field value={formatInteger(indicators?.inventoryDays ?? null)} align="right" />
        <span />
        <span className="text-center">VEOL</span>
        <span className="text-center">INV</span>
        <span />
        <Field value={formatInteger(indicators?.salesEol ?? null)} align="right" />
        <Field value={formatFixed(storage?.maxStock ?? null, 2)} align="right" />
      </div>

      <div className="h-[22px] bg-[#1579ba] text-center text-[12px] leading-[22px] font-bold text-white">Costos</div>
      <div className="h-[22px] bg-[#1579ba] text-center text-[12px] leading-[22px] font-bold text-white">Moneda</div>

      <div className="grid grid-cols-[86px_96px_1fr] gap-x-[8px] gap-y-[4px] bg-[#ededee] px-[2px] py-[2px]">
        <span className="text-right">Promedio</span>
        <Field value={formatFixed(pricing?.price4 ?? null, 4)} align="right" />
        <span className="text-right">Prv + Adv.</span>
        <span className="text-right">Último 5</span>
        <Field value={formatFixed(pricing?.price5 ?? null, 4)} align="right" />
        <span />
        <span className="text-right">Anterior 6</span>
        <Field value={formatFixed(pricing?.price6 ?? null, 4)} align="right" />
        <span />
        <span className="text-right">Advalorem</span>
        <Field value={formatFixed(pricing?.adValorem ?? null, 2)} align="right" />
        <span />
      </div>

      <div className="grid gap-[4px] bg-[#ededee] px-[2px] py-[2px]">
        <Field value={formatFixed(pricing?.adValorem ?? null, 4)} align="right" />
        <Field className="opacity-0" value="." />
        <Field value={formatInteger(pricing?.currency1 ?? null)} align="right" />
        <Field className="opacity-0" value="." />
      </div>

      <div className="col-span-2 h-[22px] bg-[#1579ba] text-center text-[12px] leading-[22px] font-bold text-white">
        Cuentas / Info. Almacen
      </div>

      <div className="col-span-2 bg-[#ededee] px-[6px] py-[8px] text-[11px] font-bold text-[#2f3a44]">
        <div className="w-[408px]">
          <div className="grid grid-cols-[54px_62px_58px_62px_62px_62px] items-center gap-x-[4px]">
            <span className="text-right">Mínimo</span>
            <Field
              value={formatInteger(storage?.minStock ?? null)}
              align="right"
              w="w-[62px]"
              className="h-[17px]"
            />
            <span className="text-right">Máximo</span>
            <Field
              value={formatInteger(storage?.maxStock ?? null)}
              align="right"
              w="w-[62px]"
              className="h-[17px]"
            />
            <span className="text-right">Max. ini.</span>
            <Field
              value={formatInteger(storage?.maxInitial ?? null)}
              align="right"
              w="w-[62px]"
              className="h-[17px]"
            />
          </div>

          <div className="mt-[6px] grid grid-cols-[70px_1fr] items-center gap-x-[4px]">
            <span className="text-right">Localización</span>
            <Field value={storage?.location ?? ""} w="w-full" />
          </div>

          <div className="mt-[4px] grid grid-cols-[70px_1fr] items-center gap-x-[4px]">
            <span className="text-right">EAN</span>
            <Field value={storage?.ean ?? ""} w="w-full" />
          </div>

          <div className="mt-[6px] grid grid-cols-[70px_124px_68px_124px] items-center gap-x-[2px] gap-y-[4px]">
            <span className="text-right">UPC</span>
            <Field value={storage?.upc ?? ""} w="w-[124px]" />
            <span className="text-right leading-[10px]">Clave<br />CFDI</span>
            <Field value="40171600" w="w-[124px]" />

            <span className="text-right leading-[10px]">Cta.<br />Primaria</span>
            <Field value={accounts?.primary ?? ""} w="w-[124px]" />
            <span className="text-right leading-[10px]">Cta.<br />Sec.</span>
            <Field value={accounts?.secondary ?? ""} w="w-[124px]" />

            <span className="text-right leading-[10px]">Cta.<br />Costo</span>
            <Field value={accounts?.costSales ?? ""} w="w-[124px]" />
            <span className="text-right leading-[10px]">Desv<br />Std.</span>
            <Field value={accounts?.deviation ?? ""} w="w-[124px]" />
          </div>
        </div>
      </div>
    </div>

  )
}

