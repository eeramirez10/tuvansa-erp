const primaryActions = [
  "Asignar todo",
  "Autorizar",
  "Auxiliar",
  "Cajas",
  "Clasificar",
  "Comentarios",
  "Cotiz",
  "Duplicar",
  "Enviar e-mail",
  "Etiquetas",
  "Imprimir",
  "Monarch",
  "Piezas",
  "Traspaso",
  "Evento",
];

const secondaryActions = ["Asignar CT", "CT", "Split", "Generar OC", "Sucursal", "WIP"];

const rows = [
  ["01208910", "TEE DE ACERO P/SOLDAR ESTANDAR", "2.000", "2.00", "", "PZ", "", "0", "18.230", "", "DOLARE", "", "0.00"],
  ["01401845", "VALV. MARIPOSA TIPO WAFER 10.5 K.", "2.000", "2.00", "", "PZ", "", "0", "70.620", "", "DOLARE", "", "0.00"],
  ["01202287", "CODO DE ACERO P/SOLDAR ESTANDA", "6.000", "6.00", "", "PZ", "", "0", "6.470", "", "DOLARE", "", "0.00"],
  ["01202281", "CODO DE ACERO P/SOLDAR ESTANDA", "4.000", "4.00", "", "PZ", "", "0", "4.350", "", "DOLARE", "", "0.00"],
  ["01206449", "RED. CONCENTRICA ACERO P/SOLDA", "2.000", "2.00", "", "PZ", "", "0", "6.330", "", "DOLARE", "", "0.00"],
  ["01206437", "RED. CONCENTRICA ACERO P/SOLDA", "8.000", "8.00", "", "PZ", "", "0", "6.140", "", "DOLARE", "", "0.00"],
  ["01201365", "BRIDA DE ACERO SIN CUELLO CARA F", "4.000", "4.00", "", "PZ", "", "0", "17.450", "", "DOLARE", "", "0.00"],
  ["01212584", "BRIDA DE ACERO SIN CUELLO CARA F", "14.000", "14.00", "", "PZ", "", "0", "16.400", "", "DOLARE", "", "0.00"],
];

function Field({
  value = "",
  className = "",
  align = "left",
}: {
  value?: string;
  className?: string;
  align?: "left" | "right" | "center";
}) {
  const alignClass =
    align === "right" ? "justify-end text-right" : align === "center" ? "justify-center text-center" : "justify-start";

  return (
    <span
      className={`inline-flex h-[18px] items-center border border-[#d8d8d8] bg-[#dedede] px-[4px] text-[11px] text-[#1f2933] ${alignClass} ${className}`}
    >
      {value}
    </span>
  );
}

function BlueTitle({ children, className = "" }: { children: string; className?: string }) {
  return (
    <div className={`h-[24px] bg-[#1f7fbb] px-2 text-[11px] leading-[24px] font-bold text-white ${className}`}>{children}</div>
  );
}

function ActionButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="min-h-[22px] border border-[#ababab] bg-[#dbdbdb] px-2 py-[1px] text-center text-[11px] leading-[18px] text-[#1b1f23]"
    >
      {label}
    </button>
  );
}

function OrdersPage() {
  return (
    <main className="p-1 text-[11px] text-[#23303d] [font-family:Tahoma,'Segoe_UI',sans-serif]">
      <div className="overflow-x-auto">
        <section className="min-h-[700px] w-[calc(100vw-16px)] min-w-[1180px] border border-[#2f8ce8] border-t-0 bg-[#f4f4f4] shadow-[inset_0_0_0_1px_#c6dcf6]">
          <div className="border border-[#aeb8c2] bg-white">
            <div className="flex h-[24px] items-center justify-between px-[4px] text-[11px] font-semibold text-[#4a5057]">
              <div className="flex items-center gap-[4px]">
                <span className="h-[12px] w-[12px] border border-[#96a6bd] bg-[#f8f8f8]" />
                <span>Pedidos</span>
              </div>
              <span>□</span>
            </div>

            <div className="grid grid-cols-[132px_1fr] gap-[8px] px-[8px] pb-[8px]">
              <aside className="pt-[2px]">
                <BlueTitle className="text-center">Acciones</BlueTitle>
                <div className="mt-[6px] grid gap-[3px]">
                  {primaryActions.map((label) => (
                    <ActionButton key={label} label={label} />
                  ))}
                </div>

                <div className="mt-[6px]">
                  <BlueTitle className="text-center">Acciones sec</BlueTitle>
                  <div className="mt-[6px] grid gap-[3px]">
                    {secondaryActions.map((label) => (
                      <ActionButton key={label} label={label} />
                    ))}
                  </div>
                </div>
              </aside>

              <section className="pt-[2px]">
                <BlueTitle>Pedido (1)</BlueTitle>

                <div className="grid gap-y-[4px] pt-[4px] text-[11px] text-[#13181c]">
                  <div className="grid grid-cols-[86px_86px_108px_142px_80px_68px_72px_68px_72px_114px] items-center gap-x-[4px]">
                    <span>Pedido</span>
                    <Field value="PO21170" />
                    <span>Pedido cliente</span>
                    <Field value="5 SAN GERONIMO" />
                    <span>Carrito</span>
                    <Field />
                    <span>Status.</span>
                    <Field value="SURT" />
                    <span>Surtido</span>
                    <Field value="595.10" align="right" />
                  </div>

                  <div className="grid grid-cols-[86px_86px_72px_1fr_72px_60px_62px_56px_76px_140px] items-center gap-x-[4px]">
                    <span>Cliente</span>
                    <Field value="000046" />
                    <span>Nombre</span>
                    <Field value="DE BUEN Y ASOCIADOS, SA DE CV" />
                    <span>Sucursal</span>
                    <Field />
                    <span>Depto</span>
                    <Field />
                    <span />
                    <div className="flex items-center gap-[6px]">
                      <span className="h-[14px] w-[14px] border border-[#bbb] bg-[#f3f3f3]" />
                      <span>Inicial</span>
                      <Field value="0" align="right" className="w-[64px]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-[86px_86px_72px_86px_64px_86px_48px_1fr_46px_46px_62px_76px_76px_64px] items-center gap-x-[4px]">
                    <span>Fecha</span>
                    <Field value="12/03/2026" />
                    <span>Desde</span>
                    <Field value="12/03/2026" />
                    <span>Vence</span>
                    <Field value="17/03/2026" />
                    <span>Agt.</span>
                    <Field value="DANIEL - ARTURO" />
                    <span>Plazo</span>
                    <Field value="30" align="right" />
                    <Field value="O.K." />
                    <Field />
                    <span>Almacén</span>
                    <Field value="01" />
                  </div>
                </div>

                <div className="mt-[8px] border border-[#b8bcc1]">
                  <div className="grid h-[24px] grid-cols-[98px_1fr_62px_62px_52px_34px_58px_28px_58px_28px_62px_46px_52px_22px] border-b border-[#b8bcc1] bg-[#f8f8f8] px-[2px] text-[11px] leading-[22px] text-[#1f2933]">
                    <span>Producto</span>
                    <span>Descripción</span>
                    <span className="text-right">Pedido</span>
                    <span className="text-right">Surtido</span>
                    <span className="text-right">Resta</span>
                    <span>UM</span>
                    <span className="text-right">Asignado</span>
                    <span className="text-right">Suc.</span>
                    <span className="text-right">Precio</span>
                    <span>Cls</span>
                    <span>Moneda</span>
                    <span>Pzas.</span>
                    <span className="text-right">Descto</span>
                    <span>P</span>
                  </div>

                  <div className="relative h-[220px] bg-white">
                    <div className="grid grid-cols-[98px_1fr_62px_62px_52px_34px_58px_28px_58px_28px_62px_46px_52px_22px] px-[2px] text-[11px] text-[#1f2933]">
                      {rows.map((row, index) => (
                        <div key={`${row[0]}-${index}`} className="contents">
                          {row.map((cell, cellIndex) => (
                            <span
                              key={`${cell}-${cellIndex}`}
                              className={[
                                "border-r border-[#e3e3e3] py-[1px]",
                                [2, 3, 4, 6, 7, 8, 12].includes(cellIndex) ? "pr-[4px] text-right" : "pr-[2px]",
                              ].join(" ")}
                            >
                              {cell}
                            </span>
                          ))}
                        </div>
                      ))}
                    </div>

                    <div className="absolute right-0 top-0 h-full w-[18px] border-l border-[#d2d2d2] bg-[#f0f0f0]">
                      <div className="absolute top-[14px] right-[4px] h-[176px] w-[8px] rounded-[6px] bg-[#d0d0d0]" />
                    </div>

                    <div className="absolute bottom-0 left-0 h-[22px] w-full border-t border-[#d2d2d2] bg-[#ededed]">
                      <div className="absolute left-[6px] top-[2px] text-[14px] text-[#6b7480]">‹</div>
                      <div className="absolute left-[24px] right-[28px] top-[3px] h-[14px] bg-[#cdcdcd]" />
                      <div className="absolute right-[8px] top-[2px] text-[14px] text-[#6b7480]">›</div>
                    </div>
                  </div>
                </div>

                <div className="mt-[6px] grid grid-cols-[0.55fr 1fr] gap-[10px]">
                  <section>
                    <div className="grid grid-cols-[1fr_54px] gap-[10px]">
                      <BlueTitle>Totales</BlueTitle>
                      <span />
                    </div>
                    <div className="grid grid-cols-[92px_58px_74px_58px_74px] items-center gap-x-[6px] gap-y-[4px] px-[8px] pt-[4px] text-[11px] text-[#1f2933]">
                      <span>Asignado Cnt.</span>
                      <span>%</span>
                      <span>Asignado $</span>
                      <span />
                      <span />

                      <Field value="0.00" align="right" className="h-[18px]" />
                      <Field value="0" align="right" className="h-[18px]" />
                      <Field value="0.00" align="right" className="h-[18px]" />
                      <span />
                      <span />

                      <span>Pedido</span>
                      <span>Surtido</span>
                      <span>Resta</span>
                      <span />
                      <span />

                      <Field value="42.00" align="right" className="h-[18px]" />
                      <Field value="42.00" align="right" className="h-[18px]" />
                      <Field value="0.00" align="right" className="h-[18px]" />
                      <span />
                      <span />
                    </div>
                  </section>

                  <section>
                    <BlueTitle>Importes</BlueTitle>
                    <div className="grid grid-cols-[54px_52px_52px_52px_78px_68px_56px_90px_62px_52px_90px] items-center gap-x-[8px] gap-y-[4px] px-[8px] pt-[4px] text-[11px] text-[#1f2933]">
                      <span />
                      <span>Dto.%</span>
                      <Field value="0.00" align="right" className="h-[18px]" />
                      <Field value="0.00" align="right" className="h-[18px]" />
                      <Field value="0.00" align="right" className="h-[18px]" />
                      <span />
                      <span>IVA</span>
                      <Field value="16" align="right" className="h-[18px]" />
                      <span />
                      <span />
                      <span />

                      <span>Importe</span>
                      <span>Descuento</span>
                      <span>IEPS</span>
                      <span />
                      <Field className="h-[18px]" />
                      <span />
                      <span>IVA</span>
                      <span>Total</span>
                      <span />
                      <span />
                      <span />

                      <Field value="595.10" align="right" className="h-[18px]" />
                      <Field value="0.00" align="right" className="h-[18px]" />
                      <Field value="0.00" align="right" className="h-[18px]" />
                      <span />
                      <Field value="0.00" align="right" className="h-[18px]" />
                      <span />
                      <Field value="95.22" align="right" className="h-[18px]" />
                      <Field value="690.32" align="right" className="h-[18px]" />
                      <span />
                      <span />
                      <span />
                    </div>
                  </section>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default OrdersPage;
