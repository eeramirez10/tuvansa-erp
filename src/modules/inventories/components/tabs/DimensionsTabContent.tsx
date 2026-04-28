import { InventoryDimensions } from "../../types/inventory.types";
import { asText } from "../../utils/asText";
import { formatFixed } from "../../utils/formatFixed";
import { formatInteger } from "../../utils/formatInteger";
import { LegacyInput } from "../../../shared/components/legacy-form/LegacyInput";


type Props = {
  dimensions?:InventoryDimensions,
  location:string
}

export const DimensionsTabContent:React.FC<Props> = ({ location, dimensions }) => {
  return (
    <section className="mt-[4px] min-h-[518px] border border-[#b8c0c8] text-[11px] text-[#2f3a44]">
      <div className="h-[23px] bg-[#1579ba] text-center text-[12px] leading-[21px]  text-white">
        Dimensiones
      </div>

      <div className="grid grid-cols-[210px_254px_194px] gap-x-[18px] px-[16px] pt-[10px]">
        <div className="grid grid-cols-[94px_96px] items-center gap-x-[8px] gap-y-[4px]">
          <span className="text-right">Volumen</span>
          <LegacyInput readOnly value={formatFixed(dimensions?.volume, 6)} align="left" w="w-[96px]" />

          <span className="text-right">Peso</span>
          <LegacyInput readOnly value={formatFixed(dimensions?.weight, 2)} align="left" w="w-[96px]" />

          <span className="text-right">Caja genérica</span>
          <LegacyInput readOnly value={formatFixed(dimensions?.genericBox, 2)} align="left" w="w-[96px]" />

          <span className="text-right">Empaque</span>
          <LegacyInput readOnly value={formatFixed(dimensions?.pack, 2)} align="left" w="w-[96px]" />

          <span className="text-right">Largo</span>
          <LegacyInput readOnly value={formatFixed(dimensions?.length, 2)} align="left" w="w-[96px]" />

          <span className="text-right">Alto</span>
          <LegacyInput readOnly value={formatFixed(dimensions?.height, 2)} align="left" w="w-[96px]" />
        </div>

        <div className="grid grid-cols-[132px_88px] items-center gap-x-[8px] gap-y-[4px]">
          <span className="text-right">Empaque EDI</span>
          <LegacyInput readOnly value={asText(dimensions?.ediPack)} w="w-[88px]" />

          <span className="text-right">Cantidad EDI</span>
          <LegacyInput readOnly value={formatInteger(dimensions?.ediQuantity)} w="w-[88px]" />

          <span className="text-right">Densidad K/L</span>
          <LegacyInput readOnly value={formatFixed(dimensions?.densityKl, 4)} w="w-[88px]" />

          <span className="text-right">Peso K/M - K/PZ</span>
          <LegacyInput readOnly value={formatFixed(dimensions?.weightKmKpz, 2)} w="w-[88px]" />

          <span className="text-right">Ancho</span>
          <LegacyInput readOnly value={formatFixed(dimensions?.width, 2)} w="w-[88px]" />

          <span className="text-right">Puntos por pulg</span>
          <LegacyInput readOnly value={formatFixed(dimensions?.pointsPerInch, 2)} w="w-[88px]" />

          <span className="text-right">Zona</span>
          <LegacyInput readOnly value={asText(dimensions?.zone)} w="w-[88px]" />
        </div>

        <div className="grid grid-cols-[56px_98px_46px] items-start gap-x-[6px] gap-y-[4px]">
          <span className="text-right">Picking</span>
          <LegacyInput readOnly value={formatInteger(dimensions?.picking)} w="w-[98px]" />
          <span className="text-left">{asText(dimensions?.innerUom)}</span>

          <span className="text-right">Caja</span>
          <LegacyInput readOnly value={formatInteger(dimensions?.box)} w="w-[98px]" />
          <span className="text-left">{asText(dimensions?.outerUom)}</span>

          <span className="text-right">Pallet</span>
          <LegacyInput readOnly value={formatInteger(dimensions?.pallet)} w="w-[98px]" />
          <span className="text-left">{asText(dimensions?.palletUom)}</span>

          <span />
          <span className="text-right">Volumen</span>
          <LegacyInput readOnly value={formatFixed(dimensions?.volumeSecondary, 0)} w="w-[98px]" />
          <span />
        </div>
      </div>

      <div className="mt-[4px] grid w-[364px] grid-cols-[98px_154px] items-center gap-x-[8px] gap-y-[4px] px-[16px]">
        <span className="text-right">Localización</span>
        <LegacyInput readOnly value={location} w="w-[154px]" />

        <span className="text-right">Localización Pp</span>
        <LegacyInput readOnly value={asText(dimensions?.locationSecondary)} w="w-[154px]" />
      </div>
    </section>
  );
};
