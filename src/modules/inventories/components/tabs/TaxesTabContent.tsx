import { InventoryTaxes } from "../../types/inventory.types";
import { asText } from "../../utils/asText";
import { formatFixed } from "../../utils/formatFixed";
import { LegacyInput } from "../../../shared/components/legacy-form/LegacyInput";

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
  taxes?: InventoryTaxes;
};

export const TaxesTabContent = ({ taxes }: Props) => {
  const ivaType = taxes?.ivaType ?? "unknown";
  const retentionType = taxes?.retentionType ?? "unknown";

  return (
    <section className="mt-[4px] min-h-[518px] border border-[#b8c0c8] text-[11px] font-normal text-[#2f3a44]">
      <div className="h-[23px] bg-[#1579ba] text-center text-[12px] leading-[21px] text-white">
        Impuestos
      </div>

      <div className="px-[48px] pt-[18px]">
        <div className="grid w-[150px] grid-cols-[86px_56px] items-center gap-x-[8px] gap-y-[4px]">
          <span className="text-right">Perfil Ventas</span>
          <LegacyInput readOnly value={asText(taxes?.salesProfile)} w="w-[56px]" />
          <span className="text-right">Perfil Compras</span>
          <LegacyInput readOnly value={asText(taxes?.purchasesProfile)} w="w-[56px]" />
        </div>

        <div className="mt-[14px] grid w-[152px] grid-cols-[88px_56px] items-center gap-x-[8px] gap-y-[4px]">
          <span className="text-right">% IEPS</span>
          <LegacyInput readOnly value={formatFixed(taxes?.iepsPercent, 6)} w="w-[56px]" align="right" />
          <span className="text-right">% Retención IVA</span>
          <LegacyInput readOnly value={formatFixed(taxes?.retentionIvaPercent, 4)} w="w-[56px]" align="right" />
          <span className="text-right">% Retención ISR</span>
          <LegacyInput readOnly value={formatFixed(taxes?.retentionIsrPercent, 4)} w="w-[56px]" align="right" />
        </div>

        <div className="mt-[8px] ml-[67px] flex items-center gap-[14px] text-[#7c8188]">
          <span className="text-[#2f3a44]">IVA</span>
          <label className="inline-flex items-center gap-[4px]">
            <LegacyRadio selected={ivaType === "general"} />
            <span>Gral</span>
          </label>
          <label className="inline-flex items-center gap-[4px]">
            <LegacyRadio selected={ivaType === "exempt"} />
            <span>Exento</span>
          </label>
          <label className="inline-flex items-center gap-[4px]">
            <LegacyRadio selected={ivaType === "zero"} />
            <span>Tasa 0%</span>
          </label>
        </div>

        <div className="mt-[6px] flex items-center gap-[12px] text-[#7c8188]">
          <span className="italic text-[#1f2732]">Retención IVA e ISR</span>
          <label className="inline-flex items-center gap-[4px]">
            <LegacyRadio selected={retentionType === "none"} />
            <span>No</span>
          </label>
          <label className="inline-flex items-center gap-[4px]">
            <LegacyRadio selected={retentionType === "freight"} />
            <span>Fletes</span>
          </label>
          <label className="inline-flex items-center gap-[4px]">
            <LegacyRadio selected={retentionType === "rent"} />
            <span>Rentas</span>
          </label>
          <label className="inline-flex items-center gap-[4px]">
            <LegacyRadio selected={retentionType === "fee"} />
            <span>Honorario</span>
          </label>
        </div>

        <div className="mt-[6px] ml-[98px] grid gap-y-[4px] text-[#7c8188]">
          <label className="inline-flex items-center gap-[5px]">
            <LegacyCheckbox checked={Boolean(taxes?.dontChargeIvaOnIeps)} />
            <span>No cargar IVA en IEPS</span>
          </label>
          <label className="inline-flex items-center gap-[5px]">
            <LegacyCheckbox checked={Boolean(taxes?.donative)} />
            <span>Donativo</span>
          </label>
        </div>
      </div>
    </section>
  );
};
