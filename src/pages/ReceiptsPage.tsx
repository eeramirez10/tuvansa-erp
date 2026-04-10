const actionButtons = [
  "Alta Piezas",
  "Alta Piezas L.",
  "Auxiliar",
  "Clasificar",
  "Comentarios",
  "Etiquetas",
  "Documenta",
  "Imprimir",
  "Piezas",
  "Ticket > Factura",
  "Traspaso",
  "",
  "Reporte pedimento",
  "Pedimento",
  "Edita pzas",
];

const tableHeaders = [
  { label: "Producto", width: "180px", align: "left" },
  { label: "Descripción", width: "1fr", align: "left" },
  { label: "Cantidad", width: "150px", align: "right" },
  { label: "UM", width: "68px", align: "center" },
  { label: "Precio", width: "150px", align: "right" },
  { label: "Dto", width: "78px", align: "right" },
  { label: "Importe Pzas.", width: "176px", align: "right" },
  { label: "CC", width: "58px", align: "center" },
  { label: "Costo", width: "118px", align: "right" },
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
      className={`inline-flex h-[22px] items-center border border-[#e5e5e5] bg-[#dedede] px-[6px] text-[11px] font-normal text-[#1c2731] ${alignClass} ${className}`}
    >
      {value}
    </span>
  );
}

function SectionTitle({ children, className = "" }: { children: string; className?: string }) {
  return (
    <div className={`h-[32px] bg-[#177fb8] px-3 text-[14px] leading-[32px] font-bold text-white ${className}`}>{children}</div>
  );
}

function ActionButton({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <button
      type="button"
      className={[
        "h-[40px] border bg-[#dbdbdb] px-2 text-center text-[11px] leading-none text-[#111]",
        active
          ? "border-[#b9894e] font-semibold shadow-[inset_0_0_0_2px_#2a8fd2]"
          : "border-[#a8a8a8] font-normal",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function ScrollArea() {
  return (
    <div className="relative h-[410px] bg-white">
      <div className="absolute right-0 top-0 h-full w-[20px] border-l border-[#cdcdcd] bg-[#f3f3f3]">
        <div className="absolute right-[5px] top-[10px] h-[382px] w-[8px] bg-[#f7f7f7]" />
        <div className="absolute right-[4px] top-[8px] text-[16px] leading-none text-[#a0a0a0]">˄</div>
        <div className="absolute right-[4px] top-[40px] h-[150px] w-[10px] rounded-[6px] bg-[#cfcfcf]" />
        <div className="absolute bottom-[8px] right-[4px] text-[16px] leading-none text-[#a0a0a0]">˅</div>
      </div>

      <div className="absolute bottom-0 left-0 h-[30px] w-full border-t border-[#d3d3d3] bg-[#efefef]">
        <div className="absolute left-[6px] top-[5px] text-[18px] leading-none text-[#6f7680]">‹</div>
        <div className="absolute left-[28px] right-[28px] top-[5px] h-[18px] bg-[#d2d2d2]" />
        <div className="absolute right-[8px] top-[5px] text-[18px] leading-none text-[#6f7680]">›</div>
      </div>
    </div>
  );
}

function ReceiptsPage() {
  return (
    <main className="p-1 text-[11px] text-[#23303d] [font-family:Tahoma,'Segoe_UI',sans-serif]">
      <div className="overflow-x-auto">
        <section className="min-h-[760px] w-[calc(100vw-16px)] min-w-[1440px] border border-[#2f8ce8] border-t-0 bg-[#f4f4f4] shadow-[inset_0_0_0_1px_#c6dcf6]">
          <div className="p-[8px]">
            <div className="border border-[#b7bfc8] bg-white">
              <div className="flex h-[34px] items-center justify-between px-[8px] text-[15px] font-semibold text-black">
                <span>Recepciones</span>
                <span className="text-[13px]">□</span>
              </div>

              <div className="grid grid-cols-[220px_1fr] gap-[14px] px-[12px] pb-[10px]">
                <aside className="pt-[32px]">
                  <SectionTitle className="text-center">Acciones</SectionTitle>
                  <div className="mt-[22px] grid gap-[4px]">
                    {actionButtons.map((label, index) =>
                      label ? (
                        <ActionButton key={`${label}-${index}`} label={label} active={index === 0} />
                      ) : (
                        <div key={`space-${index}`} className="h-[36px]" />
                      ),
                    )}
                  </div>
                </aside>

                <section className="pt-[32px]">
                  <SectionTitle>Recepción</SectionTitle>

                  <div className="pt-[4px] text-black">
                    <div className="grid grid-cols-[156px_184px_244px_1fr] items-end gap-x-[40px]">
                      <label className="grid gap-y-[2px]">
                        <span className="text-[15px]">Documento</span>
                        <Field />
                      </label>
                      <label className="grid gap-y-[2px]">
                        <span className="text-[15px]">Pedido</span>
                        <Field />
                      </label>
                      <label className="grid gap-y-[2px]">
                        <span className="text-[15px]">Referencia</span>
                        <Field />
                      </label>
                    </div>

                    <div className="mt-[4px] grid grid-cols-[156px_1fr_150px] items-end gap-x-[40px]">
                      <label className="grid gap-y-[2px]">
                        <span className="text-[15px]">Proveedor</span>
                        <Field />
                      </label>
                      <label className="grid gap-y-[2px]">
                        <span className="text-[15px]">Nombre</span>
                        <Field />
                      </label>
                      <label className="grid gap-y-[2px]">
                        <span className="text-[15px]">Departamento</span>
                        <Field />
                      </label>
                    </div>

                    <div className="mt-[4px] grid grid-cols-[156px_178px_100px_110px_1fr_178px_178px_68px] items-end gap-x-[40px]">
                      <label className="grid gap-y-[2px]">
                        <span className="text-[15px]">Fecha</span>
                        <Field />
                      </label>
                      <label className="grid gap-y-[2px]">
                        <span className="text-[15px]">Vence</span>
                        <Field />
                      </label>
                      <label className="grid gap-y-[2px]">
                        <span className="text-[15px]">Retraso</span>
                        <Field value="0" />
                      </label>
                      <label className="grid gap-y-[2px]">
                        <span className="text-[15px]">Retraso V.</span>
                        <Field value="0" />
                      </label>
                      <div />
                      <label className="grid gap-y-[2px]">
                        <span className="text-[15px]">Almacén</span>
                        <Field />
                      </label>
                      <label className="grid gap-y-[2px]">
                        <span className="text-[15px]">Ruta</span>
                        <Field />
                      </label>
                      <label className="grid gap-y-[2px]">
                        <span className="text-[15px]">CFD.</span>
                        <Field />
                      </label>
                    </div>
                  </div>

                  <div className="mt-[18px] border border-[#babec4]">
                    <div
                      className="grid h-[48px] border-b border-[#babec4] bg-[#f8f8f8] px-[4px] text-[14px] leading-[46px] font-normal text-[#0f1b26]"
                      style={{ gridTemplateColumns: tableHeaders.map((header) => header.width).join(" ") }}
                    >
                      {tableHeaders.map((header) => (
                        <span
                          key={header.label}
                          className={
                            header.align === "right"
                              ? "text-right"
                              : header.align === "center"
                                ? "text-center"
                                : "text-left"
                          }
                        >
                          {header.label}
                        </span>
                      ))}
                    </div>

                    <ScrollArea />
                  </div>

                  <div className="mt-[12px] grid grid-cols-[250px_1fr] gap-[16px]">
                    <section>
                      <div className="grid grid-cols-[1fr_120px] gap-[16px]">
                        <SectionTitle>Totales</SectionTitle>
                        <SectionTitle className="opacity-0">.</SectionTitle>
                      </div>
                      <div className="mt-[10px] grid grid-cols-[98px_118px] items-center gap-x-[12px] gap-y-[14px] px-[28px] text-[14px] text-black">
                        <span>Unidades</span>
                        <Field value="0" align="right" className="h-[36px]" />
                        <span className="justify-self-center text-[18px]">%</span>
                        <div className="grid grid-cols-3 gap-[8px]">
                          <Field value="0" align="right" className="h-[36px]" />
                          <Field value="0" align="right" className="h-[36px]" />
                          <Field value="0" align="right" className="h-[36px]" />
                        </div>
                      </div>
                    </section>

                    <section>
                      <SectionTitle>Importes</SectionTitle>
                      <div className="pt-[8px] text-[14px] text-black">
                        <div className="grid grid-cols-[120px_92px_92px_92px_1fr_90px_92px] items-end gap-x-[10px]">
                          <span className="text-right">% Descuentos:</span>
                          <Field value="0" align="right" className="h-[36px]" />
                          <Field value="0" align="right" className="h-[36px]" />
                          <Field value="0" align="right" className="h-[36px]" />
                          <span />
                          <span className="text-right">% IVA</span>
                          <Field value="0" align="right" className="h-[36px]" />
                        </div>

                        <div className="mt-[8px] grid grid-cols-[92px_120px_108px_120px_74px_120px_88px_120px_90px_120px] items-end gap-x-[10px] gap-y-[8px]">
                          <span className="text-right">Subtotal</span>
                          <Field value="0.00" align="right" className="h-[36px]" />
                          <span className="text-right">Descuentos</span>
                          <Field value="0" align="right" className="h-[36px]" />
                          <span className="text-right">Fletes:</span>
                          <Field className="h-[36px]" />
                          <span className="text-right">Seguros:</span>
                          <Field className="h-[36px]" />
                          <span />
                          <span />

                          <span />
                          <span />
                          <span />
                          <span />
                          <span />
                          <Field className="h-[36px]" />
                          <span className="text-right">IEPS</span>
                          <Field className="h-[36px]" />
                          <span className="text-right">IVA</span>
                          <Field value="0.00" align="right" className="h-[36px]" />

                          <span />
                          <span />
                          <span />
                          <span />
                          <span className="text-right">Ret IVA</span>
                          <Field className="h-[36px]" />
                          <span className="text-right">Ret ISR</span>
                          <Field className="h-[36px]" />
                          <span className="text-right">Total</span>
                          <Field value="0.00" align="right" className="h-[36px]" />

                          <span />
                          <span />
                          <span />
                          <span />
                          <span />
                          <span />
                          <span />
                          <span />
                          <span className="text-right">Saldo</span>
                          <Field value="0" align="right" className="h-[36px]" />
                        </div>
                      </div>
                    </section>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ReceiptsPage;
