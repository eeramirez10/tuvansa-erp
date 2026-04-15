const actionButtons = [
  "Alta Piezas",
  "Autorizar",
  "Auxiliar",
  "Cambia Prv",
  "Clasificar",
  "Comentarios",
  "Confirmar todo",
  "Cotiz",
  "CT",
  "Div. Sucursal",
  "Duplicar",
  "Etiquetas    Imprimir",
  "Imprimir Conf.",
  "Enviar e-mail",
  "Piezas",
  "Sucursal    Split",
  "Genera OC de req.",
  "Fecha rec.",
  "Actualiza precio",
  "Elimina producto",
  "Evento    Chat",
];

const rows = [
  ["01201358", "BRIDA DE ACERO SIN CUELLO CARA", "100.00", "100.00", "0.00", "PZ", "0", "4.27310", "", "DOLARES", "", "6727"],
  ["01201361", "BRIDA DE ACERO SIN CUELLO CARA", "100.00", "100.00", "0.00", "PZ", "0", "6.05280", "", "DOLARES", "", "6727"],
  ["01201365", "BRIDA DE ACERO SIN CUELLO CARA", "100.00", "100.00", "0.00", "PZ", "0", "6.72570", "", "DOLARES", "", "6727"],
  ["01201329", "BRIDA DE ACERO SIN CUELLO CARA", "20.00", "20.00", "0.00", "PZ", "0", "11.25000", "", "DOLARES", "", "6727"],
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
      className={`inline-flex h-[18px] items-center border border-[#d7d7d7] bg-[#dedede] px-[4px] text-[11px] text-[#1d2731] ${alignClass} ${className}`}
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

function PurchaseOrdersPage() {
  return (
    <main className="p-1 text-[11px] text-[#23303d] [font-family:Tahoma,'Segoe_UI',sans-serif]">
      <div className="overflow-x-auto">
        <section className="min-h-[700px] w-[calc(100vw-16px)] min-w-[1180px] border border-[#2f8ce8] border-t-0 bg-[#f4f4f4] shadow-[inset_0_0_0_1px_#c6dcf6]">
          <div className="border border-[#aeb8c2] bg-white">
            <div className="flex h-[24px] items-center justify-between px-[4px] text-[11px] font-semibold text-[#4a5057]">
              <div className="flex items-center gap-[4px]">
                <span className="h-[12px] w-[12px] border border-[#96a6bd] bg-[#f8f8f8]" />
                <span>Ordenes de compra</span>
              </div>
              <span>□</span>
            </div>

            <div className="grid grid-cols-[142px_1fr] gap-[8px] px-[8px] pb-[10px]">
              <aside className="pt-[2px]">
                <BlueTitle className="text-center">Acciones</BlueTitle>
                <div className="mt-[6px] grid gap-[3px]">
                  {actionButtons.map((label) => (
                    <ActionButton key={label} label={label} />
                  ))}
                </div>
              </aside>

              <section className="pt-[2px]">
                <BlueTitle>Orden de compra</BlueTitle>

                <div className="grid gap-y-[4px] pt-[4px] text-[11px] text-[#13181c]">
                  <div className="grid grid-cols-[78px_80px_86px_90px_1fr_120px_1fr] items-center gap-x-[4px]">
                    <span>Pedido</span>
                    <Field value="OA000095" />
                    <span>Pedido prv.</span>
                    <Field value="3298-STOCK" />
                    <span />
                    <Field />
                    <span />
                  </div>

                  <div className="grid grid-cols-[78px_80px_86px_1fr_84px_74px_86px_110px] items-center gap-x-[4px]">
                    <span>Proveedor</span>
                    <Field value="30297" />
                    <span>Nombre</span>
                    <Field value="VACONSA PRODUCTOS INDUSTRIALES, SA DE CV" />
                    <span>Sucursal</span>
                    <Field value="0" />
                    <span />
                    <Field value="No confirmado" />
                  </div>

                  <div className="grid grid-cols-[78px_80px_70px_80px_64px_80px_86px_74px_78px_60px_56px_54px_20px_48px_20px_28px] items-center gap-x-[4px]">
                    <span>Fecha</span>
                    <Field value="19/02/2018" />
                    <span>Desde</span>
                    <Field value="19/02/2018" />
                    <span>Vence</span>
                    <Field value="19/03/2018" />
                    <span>Almacén</span>
                    <Field value="01" />
                    <span>Status</span>
                    <Field value="1" />
                    <Field value="995.94" align="right" />
                    <Field value="20.000" align="right" />
                    <span className="h-[14px] w-[14px] border border-[#bbb] bg-[#f3f3f3]" />
                    <span>Inicial</span>
                    <span />
                    <Field value="1" align="right" />
                  </div>
                </div>

                <div className="mt-[10px] border border-[#b8bcc1]">
                  <div className="grid h-[24px] grid-cols-[102px_1fr_78px_62px_62px_36px_34px_54px_56px_54px_46px_56px] border-b border-[#b8bcc1] bg-[#f8f8f8] px-[2px] text-[11px] leading-[22px] text-[#1f2933]">
                    <span>Producto</span>
                    <span>Descripción</span>
                    <span className="text-right">Pedido</span>
                    <span className="text-right">Surtido</span>
                    <span className="text-right">Resta</span>
                    <span>UM</span>
                    <span className="text-right">Cls</span>
                    <span className="text-right">Suc.</span>
                    <span className="text-right">Precio</span>
                    <span className="text-right">Descto</span>
                    <span>Moneda</span>
                    <span className="text-right">Conf. Obs.</span>
                  </div>

                  <div className="relative h-[250px] bg-white">
                    <div className="grid grid-cols-[102px_1fr_78px_62px_62px_36px_34px_54px_56px_54px_46px_56px] px-[2px] text-[11px] text-[#1f2933]">
                      {rows.map((row, index) => (
                        <div key={`${row[0]}-${index}`} className="contents">
                          {row.map((cell, cellIndex) => (
                            <span
                              key={`${cell}-${cellIndex}`}
                              className={[
                                "border-r border-[#e3e3e3] py-[1px]",
                                cellIndex >= 2 && cellIndex !== 5 && cellIndex !== 10 ? "text-right pr-[4px]" : "pr-[2px]",
                              ].join(" ")}
                            >
                              {cell}
                            </span>
                          ))}
                        </div>
                      ))}
                    </div>

                    <div className="absolute right-0 top-0 h-full w-[18px] border-l border-[#d2d2d2] bg-[#f0f0f0]">
                      <div className="absolute top-[16px] right-[4px] h-[168px] w-[8px] rounded-[6px] bg-[#d0d0d0]" />
                    </div>

                    <div className="absolute bottom-0 left-0 h-[22px] w-full border-t border-[#d2d2d2] bg-[#ededed]">
                      <div className="absolute left-[6px] top-[2px] text-[14px] text-[#6b7480]">‹</div>
                      <div className="absolute left-[24px] top-[3px] h-[14px] w-[510px] bg-[#cdcdcd]" />
                      <div className="absolute right-[8px] top-[2px] text-[14px] text-[#6b7480]">›</div>
                    </div>
                  </div>
                </div>

                <div className="mt-[6px] grid grid-cols-[0.58fr_1fr] gap-[8px]">
                  <section>
                    <BlueTitle>Totales</BlueTitle>
                    <div className="grid grid-cols-[78px_78px_78px_78px] items-center gap-x-[8px] gap-y-[4px] px-[8px] pt-[4px] text-[11px] text-[#1f2933]">
                      <span>Volumen Ori</span>
                      <span>Cajas Ori</span>
                      <span>Caja</span>
                      <span>Peso</span>

                      <Field value="0" align="right" className="h-[18px]" />
                      <Field value="4e100" align="right" className="h-[18px]" />
                      <Field value="4e100" align="right" className="h-[18px]" />
                      <Field value="1080" align="right" className="h-[18px]" />

                      <span>Asignado</span>
                      <span>Pedido</span>
                      <span>Surtido</span>
                      <span>Resta</span>

                      <Field value="0.000" align="right" className="h-[18px]" />
                      <Field value="320.000" align="right" className="h-[18px]" />
                      <Field value="320.000" align="right" className="h-[18px]" />
                      <Field value="0.000" align="right" className="h-[18px]" />
                    </div>
                  </section>

                  <section>
                    <BlueTitle>Totales</BlueTitle>
                    <div className="grid grid-cols-[86px_62px_62px_62px_86px_96px_86px_86px] items-center gap-x-[8px] gap-y-[4px] px-[8px] pt-[4px] text-[11px] text-[#1f2933]">
                      <span />
                      <span />
                      <span>Descuentos.</span>
                      <span />
                      <span>Otros</span>
                      <span />
                      <span>% IVA</span>
                      <span />

                      <span />
                      <Field value="0.00" align="right" className="h-[18px]" />
                      <Field value="0.00" align="right" className="h-[18px]" />
                      <Field value="0.00" align="right" className="h-[18px]" />
                      <Field className="h-[18px]" />
                      <Field className="h-[18px]" />
                      <Field value="16" align="right" className="h-[18px]" />
                      <span />

                      <span>Subtotal</span>
                      <Field value="1,930.16" align="right" className="h-[18px]" />
                      <span>Descuent</span>
                      <Field value="0.00" align="right" className="h-[18px]" />
                      <span>IEPS</span>
                      <Field value="0.00" align="right" className="h-[18px]" />
                      <span />
                      <span>Total</span>

                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <Field value="308.82" align="right" className="h-[18px]" />
                      <Field value="2,238.98" align="right" className="h-[18px]" />
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

export default PurchaseOrdersPage;
