import { InventoryImports } from "../../types/inventory.types";
import { asText } from "../../utils/asText";
import { formatFixed } from "../../utils/formatFixed";
import { formatLegacyDate } from "../../utils/formatLegacyDate";
import { LegacyInput } from "../../../shared/components/legacy-form/LegacyInput";

function LegacyCheckbox({ checked = false }: { checked?: boolean }) {
  return (
    <span className="inline-flex h-[13px] w-[13px] items-center justify-center border border-[#a7adb3] bg-[#ececec]">
      {checked ? <span className="h-[7px] w-[7px] bg-[#7f848a]" /> : null}
    </span>
  );
}

type Props = {
  imports?: InventoryImports;
};

export const ImportTabContent = ({ imports }: Props) => {
  return (
    <section className="mt-[4px] min-h-[518px] border border-[#b8c0c8] text-[11px] font-normal text-[#2f3a44]">
      <div className="h-[23px] bg-[#1579ba] text-center text-[12px] leading-[21px] text-white">
        Datos de importación
      </div>

      <div className="px-[42px] pt-[18px]">
        <label className="mb-[8px] ml-[70px] inline-flex items-center gap-[4px] text-[#7c8188]">
          <LegacyCheckbox checked={Boolean(imports?.dontHandleLayers)} />
          <span>No manejar capas</span>
        </label>

        <div className="grid w-[248px] grid-cols-[70px_176px] items-center gap-x-[8px] gap-y-[12px]">
          <span className="text-right">Pedimento</span>
          <LegacyInput readOnly value={asText(imports?.pedimento)} w="w-[176px]" />

          <span className="text-right">Fecha</span>
          <LegacyInput readOnly value={formatLegacyDate(imports?.importDate ?? null)} w="w-[176px]" />

          <span className="text-right">Aduana</span>
          <LegacyInput readOnly value={asText(imports?.customsOffice)} w="w-[176px]" />

          <span className="text-right">Arancel</span>
          <LegacyInput readOnly value={asText(imports?.tariff)} w="w-[176px]" />
        </div>

        <div className="ml-[70px] mt-[12px] inline-flex h-[21px] w-[176px] items-center justify-between border border-[#2f3943] bg-[#f6f6f6] px-[6px] text-[11px] leading-none">
          <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[#6f757c]">
            {asText(imports?.tariffOption) || ". . ."}
          </span>
          <span className="text-[10px]">▾</span>
        </div>

        <div className="mt-[10px] grid w-[248px] grid-cols-[70px_56px_114px] items-center gap-x-[8px]">
          <span className="text-right">%</span>
          <LegacyInput readOnly value={formatFixed(imports?.tariffPercent, 2)} w="w-[56px]" />
          <span className="inline-flex h-[19px] w-[114px] items-center bg-[#d8d9db] px-[4px] text-[11px] leading-none text-[#2f3943]">
            {formatFixed(imports?.tariffAmount, 0)}
          </span>
        </div>
      </div>
    </section>
  );
};
