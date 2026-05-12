import { X } from "lucide-react";
import { useInventoryOthersModal } from "../hooks/useInventoryOthersModal";
import { asText } from "../utils/asText";
import { formatFixed } from "../utils/formatFixed";
import { formatInteger } from "../utils/formatInteger";
import { formatLegacyDate } from "../utils/formatLegacyDate";
import { LegacyInput } from "../../shared/components/legacy-form/LegacyInput";
import { ManagedWindowLayer } from "../../ui/components/ManagedWindowLayer";
import { MODAL_IDS } from "../../ui/store/modal.store";

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="h-[18px] bg-[#1179ba] text-center text-[12px] leading-[18px] font-bold text-white">
      {title}
    </div>
  );
}

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

function InventoryOthersModal() {
  const { isOpen, close, detail, priceRows } = useInventoryOthersModal();

  if (!isOpen) {
    return null;
  }

  const dimensions = detail?.dimensions;
  const storage = detail?.storage;
  const imports = detail?.imports;
  const production = detail?.production;
  const purchases = detail?.purchases;
  const taxes = detail?.taxes;
  const providerShort = asText(purchases?.provider).trim().split(/\s+/)[0] ?? "";
  const others = detail?.others;
  const options = others?.options;
  const othersPrices = others?.prices;
  const exportData = others?.exportData;
  const ccp = others?.ccp;
  const vars = others?.vars.values ?? [];

  return (
    <ManagedWindowLayer windowId={MODAL_IDS.INVENTORY_OTHERS} isOpen={isOpen}>
      <section className="flex h-[min(560px,78vh)] w-[min(1400px,99vw)] flex-col border border-[#2f8ce8] bg-[#ececec]">
        <header className="flex h-[22px] items-center justify-between border-b border-[#a9b1b9] bg-[#f1f1f1] px-1">
          <div className="flex items-center gap-1">
            <span className="h-[12px] w-[12px] border border-[#8fa6cc] bg-white" />
            <h2 className="text-[12px] leading-none font-semibold text-[#1e293b]">Otros</h2>
          </div>
          <button
            type="button"
            onClick={close}
            className="grid h-[18px] w-[18px] place-items-center border border-[#6d747b] bg-[#ededed] text-[#2c3948]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </header>

        <div className="modal-scroll min-h-0 flex-1 overflow-auto bg-[#ececec] p-[6px] text-[11px] text-[#2f3a44]">
          <div className="min-h-[1120px] w-[1520px] max-w-full space-y-[7px]">
            <div className="grid grid-cols-[560px_1fr] gap-[10px]">
              <section className="border border-[#b0b5ba] bg-[#efefef]">
                <SectionTitle title="Dimensiones y empaque:" />
                <div className="p-[12px]">
                  <div className="grid grid-cols-[250px_238px] gap-x-[14px]">
                    <div className="grid grid-cols-[112px_116px] items-center gap-x-[8px] gap-y-[4px]">
                      <span className="text-right">Volumen</span>
                      <LegacyInput readOnly value={formatFixed(dimensions?.volume, 6)} w="w-[116px]" />
                      <span className="text-right">Peso</span>
                      <LegacyInput readOnly value={formatFixed(dimensions?.weight, 6)} w="w-[116px]" />
                      <span className="text-right">Caja genérica</span>
                      <LegacyInput readOnly value={formatFixed(dimensions?.genericBox, 2)} w="w-[116px]" />
                      <span className="text-right">Empaque</span>
                      <LegacyInput readOnly value={formatFixed(dimensions?.pack, 2)} w="w-[116px]" />
                      <span className="text-right">Largo</span>
                      <LegacyInput readOnly value={formatFixed(dimensions?.length, 2)} w="w-[116px]" />
                      <span className="text-right">Alto</span>
                      <LegacyInput readOnly value={formatFixed(dimensions?.height, 2)} w="w-[116px]" />
                    </div>

                    <div className="grid grid-cols-[136px_94px] items-center gap-x-[8px] gap-y-[4px]">
                      <span className="text-right">Empaque EDI</span>
                      <LegacyInput readOnly value={asText(dimensions?.ediPack)} w="w-[94px]" />
                      <span className="text-right">Cantidad EDI</span>
                      <LegacyInput readOnly value={formatInteger(dimensions?.ediQuantity)} w="w-[94px]" />
                      <span className="text-right">Densidad K/L</span>
                      <LegacyInput readOnly value={formatFixed(dimensions?.densityKl, 6)} w="w-[94px]" />
                      <span className="text-right">Peso K/M -</span>
                      <LegacyInput readOnly value={formatFixed(dimensions?.weightKmKpz, 6)} w="w-[94px]" />
                      <span className="text-right">Ancho</span>
                      <LegacyInput readOnly value={formatFixed(dimensions?.width, 2)} w="w-[94px]" />
                      <span className="text-right">P.P.P.</span>
                      <LegacyInput readOnly value={formatFixed(dimensions?.pointsPerInch, 2)} w="w-[94px]" />
                    </div>
                  </div>

                  <div className="mt-[4px] grid grid-cols-[148px_240px] items-center gap-x-[8px]">
                    <span className="text-right">Localización</span>
                    <LegacyInput readOnly value={asText(storage?.location)} w="w-[240px]" />
                  </div>
                </div>
              </section>

              <section className="border border-[#b0b5ba] bg-[#efefef]">
                <SectionTitle title="Opciones Varias:" />
                <div className="p-[12px]">
                  <div className="mb-[4px]">
                    <div className="mb-[2px]">Composición</div>
                    <LegacyInput readOnly value={asText(options?.composition)} w="w-[400px]" />
                  </div>

                  <div className="grid grid-cols-[430px_200px_200px] gap-x-[12px]">
                    <div>
                      <div className="grid gap-y-[4px] text-[#6f7780]">
                        <label className="inline-flex items-center gap-[4px]">
                          <LegacyCheckbox checked={Boolean(options?.virtualStore)} />
                          <span>Tienda Virtual</span>
                        </label>
                        <label className="inline-flex items-center gap-[4px]">
                          <LegacyCheckbox checked={Boolean(options?.inactiveForPurchases)} />
                          <span>Inactivo para compras</span>
                        </label>
                        <label className="inline-flex items-center gap-[4px]">
                          <LegacyCheckbox checked={Boolean(options?.controlByPieces)} />
                          <span>Control por piezas</span>
                        </label>
                        <label className="inline-flex items-center gap-[4px]">
                          <LegacyCheckbox checked={Boolean(options?.fractionable)} />
                          <span>Fraccionable</span>
                        </label>
                      </div>

                      <div className="mt-[8px] grid grid-cols-[160px_86px] items-center gap-x-[6px]">
                        <span className="text-right">Usuario último cambio</span>
                        <LegacyInput readOnly value={formatInteger(options?.lastChangedBy)} w="w-[86px]" />
                      </div>
                    </div>

                    <div className="grid content-start grid-cols-[74px_126px] items-center gap-x-[6px] gap-y-[4px]">
                      <span className="text-right font-semibold">Bodega</span>
                      <LegacyInput readOnly value={formatInteger(options?.warehouse)} w="w-[126px]" />
                      <span className="text-right font-semibold leading-[11px]">Próxima recep.</span>
                      <LegacyInput readOnly value={formatLegacyDate(options?.nextReceptionAt ?? null)} w="w-[126px]" />
                      <span className="text-right">Tránsit</span>
                      <LegacyInput readOnly value={formatFixed(options?.transit, 2)} w="w-[126px]" />
                      <span className="text-right font-semibold leading-[11px]">Físico Inc.</span>
                      <LegacyInput readOnly value={formatFixed(options?.physicalInitial, 4)} w="w-[126px]" />
                    </div>

                    <div className="grid content-start grid-cols-[74px_126px] items-center gap-x-[6px] gap-y-[4px]">
                      <span className="text-right leading-[11px]">Último cambio</span>
                      <LegacyInput readOnly value={formatLegacyDate(options?.lastChangedAt ?? null)} w="w-[126px]" />
                      <span className="text-right leading-[11px]">Cambio l.1,2,3</span>
                      <LegacyInput readOnly value={formatLegacyDate(options?.list123ChangedAt ?? null)} w="w-[126px]" />
                      <span className="text-right leading-[11px]">No surtidos</span>
                      <LegacyInput readOnly value={formatFixed(options?.unsupplied, 2)} w="w-[126px]" align="right" />
                      <span className="text-right leading-[11px]">Primer vta pos</span>
                      <LegacyInput readOnly value={formatLegacyDate(options?.firstPosSaleAt ?? null)} w="w-[126px]" />
                      <span className="text-right">Conteo</span>
                      <LegacyInput readOnly value={formatFixed(options?.countInventory, 4)} w="w-[126px]" align="right" />
                    </div>
                  </div>

                  <div className="mt-[10px] grid grid-cols-[78px_40px_58px_140px_60px_376px] items-center gap-x-[8px]">
                    <span className="text-right">renglon</span>
                    <LegacyInput readOnly value={asText(options?.row)} w="w-[40px]" align="center" />
                    <span className="text-right">Raíz</span>
                    <LegacyInput readOnly value={asText(options?.rootCode)} w="w-[140px]" />
                    <span className="text-right">Color</span>
                    <LegacyInput readOnly value={asText(options?.color)} w="w-[376px]" />
                  </div>
                </div>
              </section>
            </div>

            <div className="grid grid-cols-[306px_446px] gap-[8px]">
              <section className="border border-[#b0b5ba] bg-[#efefef]">
                <SectionTitle title="Precios" />
                <div className="p-[6px]">
                  <div className="mb-[3px] flex items-center gap-[5px]">
                    <span className="mr-[6px]">Grupo</span>
                    {Array.from({ length: 8 }).map((_, index) => (
                      <label key={index} className="inline-flex items-center gap-[2px] text-[#848a90]">
                        <LegacyRadio selected={index === 0} />
                        <span>{index + 1}</span>
                      </label>
                    ))}
                    <span className="text-[#848a90]">(vol)</span>
                  </div>

                  <div className="mb-[2px] grid grid-cols-[52px_74px_40px_30px] items-center gap-x-[4px]">
                    <span />
                    <span className="text-right">Precios.</span>
                    <span className="text-right">Moneda</span>
                    <span className="text-right">Porc.</span>
                  </div>

                  <div className="grid grid-cols-[52px_74px_40px_30px] items-center gap-x-[4px] gap-y-[2px]">
                    {priceRows.map((row) => (
                      <div key={row.list} className="contents">
                        <span className="text-right">Lista {row.list}</span>
                        <LegacyInput readOnly value={formatFixed(row.price, 4)} w="w-[74px]" align="right" />
                        <LegacyInput readOnly value={formatInteger(row.currency)} w="w-[40px]" align="right" />
                        <LegacyInput readOnly value={formatFixed(row.percent, 2)} w="w-[30px]" align="right" />
                      </div>
                    ))}
                  </div>

                  <div className="mt-[4px] grid grid-cols-[58px_66px_14px_66px_30px_64px] items-center gap-x-[3px]">
                    <span className="text-right">Oferta del</span>
                    <LegacyInput readOnly value={formatLegacyDate(othersPrices?.offerFrom ?? null)} w="w-[66px]" />
                    <span>Al</span>
                    <LegacyInput readOnly value={formatLegacyDate(othersPrices?.offerTo ?? null)} w="w-[66px]" />
                    <LegacyInput readOnly value={formatFixed(othersPrices?.walletPercent, 2)} w="w-[30px]" />
                    <span>%(6 lista 10)</span>
                  </div>

                  <div className="mt-[2px] grid grid-cols-[58px_66px] items-center gap-x-[3px]">
                    <span className="text-right">Mínimo Hasta</span>
                    <LegacyInput readOnly value={formatLegacyDate(othersPrices?.minUntil ?? null)} w="w-[66px]" />
                  </div>

                  <div className="mt-[2px] grid grid-cols-[58px_66px] items-center gap-x-[3px]">
                    <span className="text-right">% Monedero</span>
                    <LegacyInput readOnly value={formatFixed(othersPrices?.walletPercent, 2)} w="w-[66px]" />
                  </div>

                  <div className="mt-[4px] grid grid-cols-[58px_66px] items-center gap-x-[3px]">
                    <span className="text-right">% Comisión</span>
                    <LegacyInput readOnly value={formatFixed(othersPrices?.commissionPercent, 2)} w="w-[66px]" />
                  </div>

                  <div className="mt-[2px] grid grid-cols-[58px_66px] items-center gap-x-[3px]">
                    <span className="text-right">% IEPS</span>
                    <LegacyInput readOnly value={formatFixed(othersPrices?.iepsPercent, 6)} w="w-[66px]" />
                  </div>

                  <div className="mt-[2px] grid grid-cols-[58px_66px] items-center gap-x-[3px]">
                    <span className="text-right">% IEPS FIJO</span>
                    <LegacyInput readOnly value={formatFixed(othersPrices?.fixedIepsPercent, 2)} w="w-[66px]" />
                  </div>

                  <div className="mt-[6px] flex items-center justify-center gap-[10px] text-[#848a90]">
                    <span className="text-[#2f3a44]">IVA</span>
                    <label className="inline-flex items-center gap-[3px]">
                      <LegacyRadio selected={taxes?.ivaType === "general"} />
                      <span>Gral</span>
                    </label>
                    <label className="inline-flex items-center gap-[3px]">
                      <LegacyRadio selected={taxes?.ivaType === "exempt"} />
                      <span>Exento</span>
                    </label>
                    <label className="inline-flex items-center gap-[3px]">
                      <LegacyRadio selected={taxes?.ivaType === "zero"} />
                      <span>Tasa 0%</span>
                    </label>
                  </div>
                </div>
              </section>

              <div className="space-y-[8px]">
                <div className="grid grid-cols-[212px_196px] gap-[8px]">
                  <section className="border border-[#b0b5ba] bg-[#efefef]">
                    <SectionTitle title="Datos de importación" />
                    <div className="p-[6px]">
                      <label className="mb-[3px] ml-[68px] inline-flex items-center gap-[4px] text-[#7b8188]">
                        <LegacyCheckbox checked={Boolean(imports?.dontHandleLayers)} />
                        <span>No manejar capas</span>
                      </label>
                      <div className="grid grid-cols-[68px_102px] items-center gap-x-[6px] gap-y-[2px]">
                        <span className="text-right">Pedimento</span>
                        <LegacyInput readOnly value={asText(imports?.pedimento)} w="w-[102px]" />
                        <span className="text-right">Fecha</span>
                        <LegacyInput readOnly value={formatLegacyDate(imports?.importDate ?? null)} w="w-[102px]" />
                        <span className="text-right">Aduana</span>
                        <LegacyInput readOnly value={asText(imports?.customsOffice)} w="w-[102px]" />
                        <span className="text-right">Arancel</span>
                        <LegacyInput readOnly value={asText(imports?.tariff)} w="w-[102px]" />
                      </div>
                      <div className="mt-[3px] ml-[74px] inline-flex h-[18px] w-[110px] items-center justify-between border border-[#a7adb3] bg-[#f6f6f6] px-[4px] text-[11px]">
                        <span>{asText(imports?.tariffOption)}</span>
                        <span>▾</span>
                      </div>
                      <div className="mt-[3px] grid grid-cols-[68px_44px_42px] items-center gap-x-[6px]">
                        <span className="text-right">% Arancel</span>
                        <LegacyInput readOnly value={formatFixed(imports?.tariffPercent, 2)} w="w-[44px]" />
                        <LegacyInput readOnly value={formatFixed(imports?.tariffAmount, 0)} w="w-[42px]" />
                      </div>
                    </div>
                  </section>

                  <section className="border border-[#b0b5ba] bg-[#efefef]">
                    <SectionTitle title="Datos de exportación" />
                    <div className="p-[6px]">
                      <div className="grid grid-cols-[56px_78px] items-center gap-x-[6px] gap-y-[2px]">
                        <span className="text-right">Arancel</span>
                        <LegacyInput readOnly value={asText(exportData?.tariff)} w="w-[78px]" />
                        <span className="text-right">Factor</span>
                        <LegacyInput readOnly value={formatFixed(exportData?.factor, 6)} w="w-[78px]" />
                      </div>
                      <button
                        type="button"
                        className="mt-[36px] ml-[46px] h-[20px] w-[84px] border border-[#a7adb3] bg-[#d7d7d7] text-[11px]"
                      >
                        Cambio
                      </button>
                      <div className="mt-[8px] ml-[110px] grid gap-[2px]">
                        <button
                          type="button"
                          className="h-[24px] w-[60px] border border-[#a7adb3] bg-[#d8d8d8] text-[#7aa57f]"
                        >
                          ✓ OK
                        </button>
                        <button
                          type="button"
                          className="h-[24px] w-[60px] border border-[#a7adb3] bg-[#d8d8d8] text-[#b88181]"
                        >
                          ✕ Cancelar
                        </button>
                      </div>
                    </div>
                  </section>
                </div>

                <div className="grid grid-cols-[212px_196px] gap-[8px]">
                  <section className="border border-[#8d8d8d] bg-[#efefef]">
                    <SectionTitle title="Datos de producción" />
                    <div className="p-[6px]">
                      <label className="mb-[2px] ml-[80px] inline-flex items-center gap-[4px] text-[#7b8188]">
                        <LegacyCheckbox checked={Boolean(production?.variableTime)} />
                        <span>Tiempo variable</span>
                      </label>
                      <div className="grid grid-cols-[80px_46px_16px] items-center gap-x-[6px] gap-y-[2px]">
                        <span className="text-right">Lote</span>
                        <LegacyInput readOnly value={formatFixed(production?.lot, 4)} w="w-[46px]" align="right" />
                        <span />
                        <span className="text-right">Tiempo</span>
                        <LegacyInput readOnly value={formatFixed(production?.timeDays, 6)} w="w-[46px]" align="right" />
                        <span>día</span>
                        <span className="text-right">Capacidad</span>
                        <LegacyInput readOnly value={formatInteger(production?.capacity)} w="w-[46px]" align="right" />
                        <span />
                      </div>
                      <div className="mt-[2px] grid grid-cols-[80px_46px_28px] items-center gap-x-[6px]">
                        <span className="text-right">Ensamble</span>
                        <LegacyInput readOnly value={formatLegacyDate(production?.assemblyAt ?? null)} w="w-[46px]" />
                        <LegacyInput readOnly value={formatInteger(production?.assemblyMode)} w="w-[28px]" />
                      </div>
                      <div className="mt-[3px] grid grid-cols-[80px_66px] items-center gap-x-[6px] gap-y-[2px]">
                        <span className="text-right">Código segundas</span>
                        <LegacyInput readOnly value={asText(production?.secondCode)} w="w-[66px]" />
                        <span className="text-right">Código terceras</span>
                        <LegacyInput readOnly value={asText(production?.thirdCode)} w="w-[66px]" />
                      </div>
                      <div className="mt-[3px] ml-[46px] grid gap-y-[2px] text-[#7b8188]">
                        <label className="inline-flex items-center gap-[4px]">
                          <LegacyCheckbox checked={Boolean(production?.reduceMinimumsWithOrders)} />
                          <span>Rebajar mínimos con pedidos</span>
                        </label>
                        <label className="inline-flex items-center gap-[4px]">
                          <LegacyCheckbox checked={Boolean(production?.unproductiveTimeSams)} />
                          <span>Tiempo improductivo(SAMS)</span>
                        </label>
                      </div>
                    </div>
                  </section>

                  <section className="self-start border border-[#8d8d8d] bg-[#efefef]">
                    <SectionTitle title="CCP - Material Peligroso" />
                    <div className="p-[6px]">
                      <div className="mb-[4px] flex items-center gap-[5px]">
                        <span>Material peligroso:</span>
                        <label className="inline-flex items-center gap-[3px] text-[#7b8188]">
                          <LegacyRadio selected={ccp?.materialDangerousType === 0} />
                          <span>N/A</span>
                        </label>
                        <label className="inline-flex items-center gap-[3px] text-[#7b8188]">
                          <LegacyRadio selected={ccp?.materialDangerousType === 1} />
                          <span>No</span>
                        </label>
                        <label className="inline-flex items-center gap-[3px] text-[#7b8188]">
                          <LegacyRadio selected={ccp?.materialDangerousType === 2} />
                          <span>Sí</span>
                        </label>
                      </div>
                      <div className="grid grid-cols-[120px_48px] items-center gap-x-[5px] gap-y-[2px]">
                        <span className="text-right">Clave de material peligroso:</span>
                        <LegacyInput readOnly value={asText(ccp?.hazardousKey)} w="w-[48px]" />
                        <span className="text-right">Clave de embalaje:</span>
                        <LegacyInput readOnly value={asText(ccp?.packagingKey)} w="w-[48px]" />
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>

            <section className="min-w-[1140px] border border-[#8d8d8d] bg-[#efefef]">
              <SectionTitle title="Información de compras" />
              <div className="space-y-[6px] p-[6px]">
                <div className="flex items-end gap-[10px]">
                  <div className="w-[102px]">
                    <span className="mb-[1px] block whitespace-nowrap">Moneda de origen</span>
                    <LegacyInput readOnly value={formatInteger(purchases?.originCurrency)} w="w-[40px]" align="right" />
                  </div>
                  <div className="w-[72px]">
                    <span className="mb-[1px] block leading-[11px]">Lugar de<br />Origen</span>
                    <LegacyInput readOnly value={asText(purchases?.originPlace)} w="w-[66px]" />
                  </div>
                  <div className="w-[66px]">
                    <span className="mb-[1px] block whitespace-nowrap">Proveedor</span>
                    <LegacyInput readOnly value={providerShort} w="w-[66px]" />
                  </div>
                  <div className="w-[60px]">
                    <span className="mb-[1px] block whitespace-nowrap">% Regalías</span>
                    <LegacyInput readOnly value={formatFixed(0, 2)} w="w-[60px]" />
                  </div>
                  <div className="w-[124px]">
                    <span className="mb-[1px] block whitespace-nowrap">Código proveedor</span>
                    <LegacyInput readOnly value={asText(purchases?.code)} w="w-[124px]" />
                  </div>
                  <div className="w-[44px]">
                    <span className="mb-[1px] block whitespace-nowrap">Tipo</span>
                    <LegacyInput readOnly value={formatInteger(purchases?.type)} w="w-[44px]" />
                  </div>
                  <div className="w-[102px]">
                    <span className="mb-[1px] block whitespace-nowrap">Climas</span>
                    <LegacyInput readOnly value={asText(purchases?.climates)} w="w-[102px]" />
                  </div>
                </div>

                <div className="flex items-end gap-[10px]">
                  <div className="w-[102px]">
                    <span className="mb-[1px] block whitespace-nowrap">M. cúbicos</span>
                    <LegacyInput readOnly value={formatFixed(purchases?.originCubicMeters, 3)} w="w-[102px]" />
                  </div>
                  <div className="w-[132px]">
                    <span className="mb-[1px] block whitespace-nowrap">Caja genérica de origen</span>
                    <LegacyInput readOnly value={formatInteger(purchases?.originBox)} w="w-[92px]" />
                  </div>
                  <div className="w-[44px]">
                    <span className="mb-[1px] block whitespace-nowrap">Unidad</span>
                    <LegacyInput readOnly value={asText(purchases?.unit)} w="w-[44px]" />
                  </div>
                  <div className="w-[56px]">
                    <span className="mb-[1px] block whitespace-nowrap">Equivale</span>
                    <LegacyInput readOnly value={formatInteger(purchases?.equivalentTo)} w="w-[56px]" />
                  </div>
                  <div className="w-[30px]">
                    <span className="mb-[1px] block whitespace-nowrap">M</span>
                    <LegacyInput readOnly value={asText(purchases?.equivalentUnit)} w="w-[30px]" align="center" />
                  </div>
                  <div className="w-[82px]">
                    <span className="mb-[1px] block whitespace-nowrap">Precio compra</span>
                    <LegacyInput readOnly value={formatFixed(purchases?.price, 4)} w="w-[82px]" />
                  </div>
                  <label className="inline-flex items-center gap-[4px] pb-[2px] text-[#7b8188]">
                    <LegacyCheckbox checked={Boolean(purchases?.inactive)} />
                    <span className="whitespace-nowrap">No consumo Fast Food</span>
                  </label>
                  <label className="inline-flex items-center gap-[4px] pb-[2px] text-[#7b8188]">
                    <LegacyCheckbox checked={Boolean(purchases?.exportRedi)} />
                    <span className="whitespace-nowrap">Exporta REDI</span>
                  </label>
                  <label className="inline-flex items-center gap-[4px] pb-[2px] text-[#7b8188]">
                    <LegacyCheckbox />
                    <span className="whitespace-nowrap">Compra por prepack</span>
                  </label>
                </div>

                <div className="flex items-end gap-[10px]">
                  <div className="w-[102px]">
                    <span className="mb-[1px] block whitespace-nowrap">Fin de temporada</span>
                    <LegacyInput readOnly value={formatLegacyDate(purchases?.endSeasonAt ?? null)} w="w-[102px]" />
                  </div>
                  <div className="w-[94px]">
                    <span className="mb-[1px] block whitespace-nowrap">Compra mínima</span>
                    <LegacyInput readOnly value={formatInteger(purchases?.minimumPurchase)} w="w-[94px]" />
                  </div>
                  <div className="w-[78px]">
                    <span className="mb-[1px] block leading-[11px]">Curva de<br />temporada</span>
                    <LegacyInput readOnly value={formatInteger(purchases?.seasonCurve)} w="w-[58px]" />
                  </div>
                  <div className="w-[94px]">
                    <span className="mb-[1px] block leading-[11px]">Factor semanas en<br />tienda</span>
                    <LegacyInput readOnly value={formatFixed(purchases?.storeWeeksFactor, 2)} w="w-[70px]" />
                  </div>
                  <div className="w-[94px]">
                    <span className="mb-[1px] block leading-[11px]">Factor semanas en<br />bodega</span>
                    <LegacyInput readOnly value={formatFixed(purchases?.warehouseWeeksFactor, 2)} w="w-[70px]" />
                  </div>
                  <div className="w-[94px]">
                    <span className="mb-[1px] block leading-[11px]">Porcent sem<br />Inv=0</span>
                    <LegacyInput readOnly value={formatFixed(0, 2)} w="w-[64px]" />
                  </div>
                  <div className="w-[86px]">
                    <span className="mb-[1px] block leading-[11px]">Cant. en 1<br />prepack</span>
                    <LegacyInput readOnly value={formatInteger(purchases?.quantityInPrepack)} w="w-[66px]" align="right" />
                  </div>
                  <div className="w-[86px]">
                    <span className="mb-[1px] block leading-[11px]">Cant. de<br />prepacks</span>
                    <LegacyInput readOnly value={formatInteger(purchases?.prepackCount)} w="w-[66px]" align="right" />
                  </div>
                  <div className="w-[64px]">
                    <span className="mb-[1px] block leading-[11px]">Formato<br />tda</span>
                    <LegacyInput readOnly value="" w="w-[64px]" />
                  </div>
                </div>

                <div className="flex items-center gap-[12px] text-[#7b8188]">
                  <span className="w-[58px] text-right text-[#2f3a44]">STATUS</span>
                  <label className="inline-flex items-center gap-[3px]">
                    <LegacyRadio selected={Boolean(purchases?.statusOtb)} />
                    <span>OTB</span>
                  </label>
                  <label className="inline-flex items-center gap-[3px]">
                    <LegacyRadio selected={!purchases?.statusOtb && !purchases?.inactive} />
                    <span>Vigente</span>
                  </label>
                  <label className="inline-flex items-center gap-[3px]">
                    <LegacyRadio />
                    <span>Forecast</span>
                  </label>
                  <label className="inline-flex items-center gap-[3px]">
                    <LegacyRadio selected={Boolean(purchases?.inactive)} />
                    <span>Inactivo</span>
                  </label>
                  <label className="ml-[40px] inline-flex items-center gap-[3px]">
                    <LegacyCheckbox checked={Boolean(purchases?.onlyDistributesCd)} />
                    <span className="whitespace-nowrap">Solo reparte su CD</span>
                  </label>
                </div>
              </div>
            </section>

            <section className="min-w-[1140px] border border-[#8d8d8d] bg-[#efefef]">
              <SectionTitle title="Varios" />
              <div className="p-[6px]">
                <div className="inline-grid grid-cols-[64px_64px_64px_64px_64px_64px_64px_64px_64px_64px_64px_64px_64px_64px_64px_64px_64px] gap-[1px]">
                  {Array.from({ length: 17 }, (_, index) => vars[index] ?? null).map((value, index) => (
                    <LegacyInput readOnly key={index} value={formatFixed(value, 4)} w="w-[64px]" align="center" />
                  ))}
                </div>
                <div className="mt-[18px] ml-[1px] w-fit">
                  <div className="grid grid-cols-[64px_64px_64px_64px_64px] items-center">
                    {[18, 19, 20, 21, 22].map((label) => (
                      <span key={label} className="text-center text-[11px] leading-[14px] text-[#2f3a44]">
                        {label}
                      </span>
                    ))}
                  </div>
                  <div className="mt-[4px] grid grid-cols-[64px_64px_64px_64px_64px] gap-[1px]">
                    {Array.from({ length: 5 }, (_, index) => vars[index + 17] ?? null).map((value, index) => (
                      <LegacyInput readOnly key={index} value={formatFixed(value, 4)} w="w-[64px]" align="center" />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </ManagedWindowLayer>
  );
}

export default InventoryOthersModal;
