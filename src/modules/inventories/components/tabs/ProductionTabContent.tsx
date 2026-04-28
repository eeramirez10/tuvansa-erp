import { InventoryProduction } from "../../types/inventory.types";
import { asText } from "../../utils/asText";
import { formatFixed } from "../../utils/formatFixed";
import { formatInteger } from "../../utils/formatInteger";
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
  production?: InventoryProduction;
};

export const ProductionTabContent = ({ production }: Props) => {
  return (
    <section className="mt-[4px] min-h-[518px] border border-[#b8c0c8] text-[11px] font-normal text-[#2f3a44]">
      <div className="h-[23px] bg-[#1579ba] text-center text-[12px] leading-[21px] text-white">
        Datos de producción
      </div>

      <div className="px-[32px] pt-[10px]">
        <label className="mb-[8px] ml-[80px] inline-flex items-center gap-[5px] text-[#7c8188]">
          <LegacyCheckbox checked={Boolean(production?.variableTime)} />
          <span>Tiempo variable</span>
        </label>

        <div className="grid w-[236px] grid-cols-[72px_96px_60px] items-center gap-x-[8px] gap-y-[6px]">
          <span className="text-right">Lote</span>
          <LegacyInput readOnly value={formatFixed(production?.lot, 4)} w="w-[76px]" align="right" />
          <span />

          <span className="text-right">Tiempo</span>
          <LegacyInput readOnly value={formatFixed(production?.timeDays, 6)} w="w-[76px]" align="right" />
          <span>días</span>

          <span className="text-right">Capacidad</span>
          <LegacyInput readOnly value={formatInteger(production?.capacity)} w="w-[76px]" align="right" />
          <span />
        </div>

        <div className="mt-[8px] grid w-[236px] grid-cols-[72px_96px_40px] items-center gap-x-[8px]">
          <span className="text-right">Ensamble</span>
          <span className="inline-flex h-[19px] w-[96px] items-center justify-end bg-[#d8d9db] px-[4px] text-[11px] leading-none text-[#2f3943]">
            {formatLegacyDate(production?.assemblyAt ?? null)}
          </span>
          <span className="inline-flex h-[19px] w-[28px] items-center justify-end bg-[#d8d9db] px-[4px] text-[11px] leading-none text-[#2f3943]">
            {formatInteger(production?.assemblyMode)}
          </span>
        </div>

        <div className="mt-[12px] grid w-[236px] grid-cols-[104px_96px] items-center gap-x-[8px] gap-y-[4px]">
          <span className="text-right">Código segundas</span>
          <LegacyInput readOnly value={asText(production?.secondCode)} w="w-[96px]" />
          <span className="text-right">Código terceras</span>
          <LegacyInput readOnly value={asText(production?.thirdCode)} w="w-[96px]" />
        </div>

        <div className="mt-[10px] ml-[104px] grid gap-y-[4px] text-[#7c8188]">
          <label className="inline-flex items-center gap-[5px]">
            <LegacyCheckbox checked={Boolean(production?.reduceMinimumsWithOrders)} />
            <span>Rebajar mínimos con pedidos</span>
          </label>
          <label className="inline-flex items-center gap-[5px]">
            <LegacyCheckbox checked={Boolean(production?.unproductiveTimeSams)} />
            <span>Tiempo improductivo (SAMS)</span>
          </label>
        </div>
      </div>
    </section>
  );
};
