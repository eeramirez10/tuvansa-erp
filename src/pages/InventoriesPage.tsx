import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { useInventoriesStore } from "../modules/inventories/store/inventories.store";

const leftActionsTop = [
  "Almacenes",
  "Alta CT",
  "Bloquear",
  "Clasificar",
  "Descr. ext.",
  "% Descuentos clis",
  "% Descuentos prvs",
  "Otros",
  "Especificaciones",
  "Inv. CT",
  "SKUs",
  "Prepacks",
  "Canales",
  "Precios",
];

const leftActionsBottom = [
  "Alternos",
  "Componentes",
  "Especific. Cal",
  "Implosion",
  "Lotes",
  "UEPS / PEPS",
  "Caracteristicas",
];

const rightConsultas = [
  "Auxiliar",
  "Pedidos por cliente   *   CT",
  "Cotizaciones por cliente",
  "Ventas por cliente    *   CT",
  "Ventas desglosadas",
  "Ventas por sucursal",
  "Ventas anuales",
  "Ventas anuales resumen",
  "Ordenado a proveedores  CT",
  "Cotizado a proveedores  CT",
  "Compras por proveedor  DT",
  "Compras desglosadas",
  "Compras anuales",
  "Compras anuales resumen",
  "Piezas",
  "Piezas surtidas",
  "WIP                   CT",
  "Habilitaciones pendientes",
  "Documentos",
  "Bonificaciones",
  "Curva Tmp.      Curva 2",
  "Historial pos",
];

const formatLegacyDate = (value: string | null): string => {
  if (!value) {
    return "31/12/1900";
  }

  const [year, month, day] = value.slice(0, 10).split("-");

  if (!year || !month || !day) {
    return "31/12/1900";
  }

  return `${day}/${month}/${year}`;
};

const formatFixed = (value: number | null, decimals: number): string => {
  if (value === null || Number.isNaN(value)) {
    return (0).toFixed(decimals);
  }

  return value.toFixed(decimals);
};

const formatInteger = (value: number | null): string => {
  if (value === null || Number.isNaN(value)) {
    return "0";
  }

  return String(Math.trunc(value));
};

function Field({
  value = "",
  className = "",
  align = "left",
  w = ""
}: {
  value?: string;
  className?: string;
  align?: "left" | "right" | "center";
  w?:string
}) {
  const alignClass =
    align === "right" ? "justify-end text-right" : align === "center" ? "justify-center text-center" : "";

  return (
    <span
      className={`inline-flex h-[19px]   items-center border border-[#a7adb3] bg-[#d8d9db] px-[4px] text-[11px] leading-none text-[#2f3943] ${w} ${alignClass} ${className}`}
    >
      {value}
    </span>
  );
}

function LeftButton({ label, emphasize = false }: { label: string; emphasize?: boolean }) {
  return (
    <button
      type="button"
      className={[
        "h-[24px] border border-[#9da3a8] bg-[#d4d4d4] px-1 text-center text-[11px] leading-[22px]",
        emphasize ? "font-bold text-[#1a4f88]" : "font-semibold text-[#3f4852]",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function BlueTitle({ children }: { children: string }) {
  return (
    <div className="h-[24px] border-b border-[#a9c3db] bg-[#1179ba] px-2 text-center text-[20px] leading-[22px] font-bold text-white">
      {children}
    </div>
  );
}

function InventoriesPage() {
  const {
    detail,
    initialize,
  } = useInventoriesStore(
    useShallow((state) => ({
      detail: state.detail,
      initialize: state.initialize,
    })),
  );

  useEffect(() => {
    void initialize();
  }, [initialize]);

  const identity = detail?.identity;
  const pricing = detail?.pricing;
  const accumulators = detail?.accumulators;
  const storage = detail?.storage;
  const accounts = detail?.accounts;
  const indicators = detail?.indicators;

  return (
    <main className="min-h-screen bg-[#979797] p-[4px] text-[11px] text-[#23303d] [font-family:Tahoma,'Segoe_UI',sans-serif]">
      <div className="overflow-x-auto">
        <section className="min-h-[700px] w-[calc(100vw-16px)] min-w-[1180px] border border-[#2f8ce8] bg-[#f2f2f2] shadow-[inset_0_0_0_1px_#c6dcf6]">
          <div className="grid grid-cols-[1fr_216px] gap-[6px] p-[4px]">
            <section className="border border-[#b4bcc5] bg-white">
              <BlueTitle>Catálogo de productos</BlueTitle>

              <div className="grid grid-cols-[136px_1fr]">
                <Actions />

                <section className="p-[5px]">
                  <div className="grid gap-y-[4px] text-[11px] font-bold text-[#2f3a44]">
                    <div className="grid grid-cols-[86px_124px_52px_1fr] items-center gap-x-[6px]">
                      <span className="text-right">Código</span>
                      <Field value={identity?.code ?? ""} />
                      <span />
                      
                    </div>

                    <div className="grid grid-cols-[86px_1fr] items-center gap-x-[6px]">
                      <span className="text-right">Descripción</span>
                      <Field value={identity?.description ?? ""} />
                    </div>

                    <div className="grid grid-cols-[86px_38px_130px_1fr] items-center gap-x-[6px]">
                      <span className="text-right">Unidad</span>
                      <Field value={identity?.unitCode ?? ""} />
                      <Field
                        value={`${identity?.unitCode ?? ""}   ${identity?.unitDescription ?? ""}        ▾`}
                      />
                      <div className="flex items-center gap-[12px] text-[11px] font-semibold text-[#5a646f]">
                        <label className="inline-flex items-center gap-[4px]">
                          <span className="inline-block h-[14px] w-[14px] border border-[#aeb3b8] bg-[#ececec]" />
                          Color y talla
                        </label>
                        <label className="inline-flex items-center gap-[4px]">
                          <span className="inline-block h-[14px] w-[14px] border border-[#aeb3b8] bg-[#ececec]" />
                          Foto
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-[3px] flex flex-wrap gap-x-[16px] text-[11px] font-semibold text-[#636d78]">
                    <span>○ M.P.</span>
                    <span>○ P.T.</span>
                    <span>○ Juego</span>
                    <span>○ Ensamble</span>
                    <span>○ Servicio</span>
                    <span>○ Gastos POS</span>
                    <span>○ Prepack</span>
                  </div>

                  <div className="mt-[4px] flex flex-wrap gap-[1px]">
                    {[
                      "General",
                      "Dimensiones",
                      "Compras",
                      "Importación",
                      "Producción",
                      "Impuestos",
                      "POS y Web",
                      "Varios",
                      "Foto",
                      "Precios",
                    ].map((tab, idx) => (
                      <button
                        key={tab}
                        type="button"
                        className={[
                          "h-[24px] border border-[#a2aab2] px-[10px] text-[11px] leading-[22px] font-semibold",
                          idx === 0 ? "bg-[#1579ba] text-white" : "bg-[#dedede] text-[#3f464f]",
                        ].join(" ")}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

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
                </section>
              </div>
            </section>

            <aside className="border border-[#9ca4ac] bg-[#d7d7d7]">
              <div className="flex h-[26px] items-center justify-between border-b border-[#9ca4ac] px-[6px] text-[11px] font-semibold text-[#4a5158]">
                <span>Consultas</span>
                <span className="text-[15px] leading-none">×</span>
              </div>
              <div className="grid gap-[2px] p-[4px]">
                {rightConsultas.map((item, idx) => (
                  <button
                    key={`${item}-${idx}`}
                    type="button"
                    className="h-[24px] border border-[#a0a6ad] bg-[#dcdcdc] px-2 text-center text-[11px] leading-[22px] font-semibold text-[#3f464f]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}

export default InventoriesPage;

function Actions() {
  return (
    <aside className="border-r border-[#c8ccd1] bg-[#ececec] p-[3px]">
      <div className="mb-[3px] h-[24px] bg-[#1676b8] text-center text-[12px] leading-[24px] font-bold text-white">
        Acciones
      </div>
      <div className="grid gap-[2px]">
        {leftActionsTop.map((item) => (
          <LeftButton key={item} label={item} />
        ))}
      </div>

      <div className="mt-[4px] h-[24px] bg-[#1676b8] text-center text-[12px] leading-[24px] font-bold text-white">
        Compras/Prod
      </div>
      <div className="mt-[2px] grid gap-[2px]">
        {leftActionsBottom.map((item) => (
          <LeftButton key={item} label={item} />
        ))}
      </div>
    </aside>
  );
}
