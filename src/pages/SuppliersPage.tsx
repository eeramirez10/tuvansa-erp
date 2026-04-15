const actionButtons = [
  "Bloquear",
  "Clasificar",
  "% Descuentos",
  "Eventos *",
  "Foto",
  "Varios",
  "Datos Bancarios",
  "Contactos",
];

const consultButtons = [
  "Saldo",
  "Movimientos",
  "Facturas",
  "Productos ordenados    CT",
  "Fill - Rate",
  "Productos cotizados",
  "Productos comprados    CT",
  "Productos comprados desg.",
  "Historial de precios",
  "Compras anuales",
  "Compras anuales resumen",
  "WIP                   CT",
  "Bonificaciones",
];

const tabs = ["General", "Compras", "Impuestos", "Datos bancarios", "Varios", "Producción"];

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
      className={`inline-flex h-[18px] items-center border border-[#b8c1cb] bg-white px-[4px] text-[11px] text-[#1f2933] ${alignClass} ${className}`}
    >
      {value}
    </span>
  );
}

function GrayField({
  value = "",
  className = "",
  align = "left",
}: {
  value?: string;
  className?: string;
  align?: "left" | "right" | "center";
}) {
  return <Field value={value} className={`border-[#e1e1e1] bg-[#dddddd] ${className}`} align={align} />;
}

function BlueTitle({ children, className = "" }: { children: string; className?: string }) {
  return (
    <div className={`h-[24px] bg-[#1f7fbb] px-2 text-center text-[11px] leading-[24px] font-bold text-white ${className}`}>
      {children}
    </div>
  );
}

function SideButton({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <button
      type="button"
      className={[
        "h-[22px] border px-2 text-center text-[11px] leading-[20px] text-[#1b1f23]",
        active ? "border-[#2c8bd8] bg-[#e7edf5] font-semibold" : "border-[#ababab] bg-[#dbdbdb]",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function SuppliersPage() {
  return (
    <main className="p-1 text-[11px] text-[#23303d] [font-family:Tahoma,'Segoe_UI',sans-serif]">
      <div className="overflow-x-auto">
        <section className="min-h-[700px] w-[calc(100vw-16px)] min-w-[1180px] border border-[#2f8ce8] border-t-0 bg-[#f4f4f4] shadow-[inset_0_0_0_1px_#c6dcf6]">
          <div className="grid grid-cols-[120px_1fr_205px] gap-[6px] p-[2px]">
            <aside className="pt-[34px]">
              <BlueTitle>Acciones</BlueTitle>
              <div className="mt-[10px] grid gap-[3px] px-[8px]">
                {actionButtons.map((label) => (
                  <SideButton key={label} label={label} />
                ))}
              </div>
            </aside>

            <section className="border border-[#aeb8c2] bg-white">
              <div className="flex h-[26px] items-center px-[6px] text-[11px] font-semibold text-[#1b1f23]">Catálogo de proveedores</div>

              <div className="px-[10px] pb-[8px]">
                <BlueTitle>Catálogo de proveedores</BlueTitle>

                <div className="grid gap-y-[4px] pt-[6px] text-[11px] text-[#13181c]">
                  <div className="grid grid-cols-[82px_70px_74px_1fr] items-center gap-x-[4px]">
                    <span className="text-right">Proveedor</span>
                    <Field value="30000" className="w-[70px]" />
                    <span className="text-right">Razón social</span>
                    <Field value="TUBOS DE ACERO DE MEXICO, S.A." />
                  </div>

                  <div className="grid grid-cols-[82px_1fr] items-center gap-x-[4px]">
                    <span className="text-right">Dirección</span>
                    <Field value="CARRETERA MEXICO-VERACRUZ KM. 433.7 S/N." />
                  </div>

                  <div className="grid grid-cols-[82px_350px_48px_1fr] items-center gap-x-[4px]">
                    <span className="text-right">Colonia</span>
                    <Field value="COL. DELFIO VALENZUELA" />
                    <span className="text-right">Ciudad</span>
                    <Field value="TEJERIA VERACRUZ" />
                  </div>

                  <div className="grid grid-cols-[82px_254px_26px_70px_56px_1fr] items-center gap-x-[4px]">
                    <span className="text-right">Estado</span>
                    <Field value="VERACRUZ" />
                    <span className="text-right">CP</span>
                    <Field value="91697" />
                    <span className="text-right">Teléfono</span>
                    <Field value="8359605" />
                  </div>

                  <div className="grid grid-cols-[82px_250px_38px_1fr] items-center gap-x-[4px]">
                    <span className="text-right">Contacto</span>
                    <Field value="ASSEF ABI" />
                    <span className="text-right">Fax</span>
                    <Field />
                  </div>

                  <div className="grid grid-cols-[82px_250px_38px_1fr] items-center gap-x-[4px]">
                    <span className="text-right">Obs.</span>
                    <Field value="ahuerta@tuvansa.com.mx, alopez@tuvansa.c" />
                    <span className="text-right">Tel. 2</span>
                    <Field />
                  </div>

                  <div className="grid grid-cols-[82px_140px_44px_1fr_40px_1fr] items-center gap-x-[4px]">
                    <span className="text-right">RFC</span>
                    <Field value="TAM520130D49" />
                    <span className="text-right">e-mail</span>
                    <Field value="tamaam@tamsa.com.mx" />
                    <span className="text-right">CURP</span>
                    <Field />
                  </div>
                </div>

                <div className="mt-[10px] flex border-b border-[#b4bcc5] text-[11px]">
                  {tabs.map((tab, index) => (
                    <button
                      key={tab}
                      type="button"
                      className={[
                        "h-[22px] border border-b-0 border-[#b4bcc5] px-7 text-[#20252a]",
                        index === 0 ? "bg-[#1f7fbb] font-bold text-white" : "bg-[#ececec]",
                      ].join(" ")}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-[1.15fr_0.9fr] gap-[10px] border border-t-0 border-[#b4bcc5] px-[6px] pb-[8px]">
                  <section>
                    <BlueTitle className="text-left">Condiciones</BlueTitle>

                    <div className="grid grid-cols-[82px_70px_42px_68px_18px_1fr] items-center gap-x-[4px] gap-y-[5px] pt-[8px] text-[11px] text-[#1a1f24]">
                      <span className="text-right">Lista</span>
                      <GrayField value="1" align="right" />
                      <span />
                      <span />
                      <span />
                      <span />

                      <span className="text-right">Descuentos</span>
                      <GrayField value="0.00" align="right" />
                      <GrayField value="0.00" align="right" className="w-[68px]" />
                      <span>%</span>
                      <span />
                      <span />

                      <span className="text-right">Plazo</span>
                      <GrayField value="75" align="right" />
                      <span />
                      <span />
                      <span />
                      <span />

                      <span className="text-right">Aplicar a:</span>
                      <Field className="col-span-2" />
                      <span />
                      <span />
                      <span />

                      <span className="text-right">Crédito</span>
                      <Field value="0" />
                      <span />
                      <span />
                      <span />
                      <span />

                      <span className="text-right">Cta. cont.</span>
                      <Field value="2001001" className="col-span-2" />
                      <span />
                      <span />
                      <span />

                      <span className="text-right">Moneda</span>
                      <Field value="2" />
                      <span />
                      <span />
                      <span />
                      <span />

                      <span className="text-right">Alta</span>
                      <Field value="31/12/1900" className="col-span-2" />
                      <span />
                      <span />
                      <span />
                    </div>

                    <div className="mt-[8px] flex gap-[12px] px-[94px] text-[11px] text-[#4d5358]">
                      <label className="inline-flex items-center gap-[4px]">
                        <span className="h-[12px] w-[12px] rounded-full border border-[#b6bcc2] bg-[#ececec]" />
                        Proveedor
                      </label>
                      <label className="inline-flex items-center gap-[4px]">
                        <span className="h-[12px] w-[12px] rounded-full border border-[#b6bcc2] bg-[#ececec]" />
                        Acreedor
                      </label>
                      <label className="inline-flex items-center gap-[4px]">
                        <span className="h-[12px] w-[12px] rounded-full border border-[#b6bcc2] bg-[#ececec]" />
                        Deudor
                      </label>
                    </div>
                  </section>

                  <section>
                    <BlueTitle className="text-left">Acumulados</BlueTitle>

                    <div className="grid grid-cols-[118px_92px_1fr] items-center gap-x-[6px] gap-y-[6px] pt-[8px] text-[11px] text-[#1a1f24]">
                      <span className="text-right">Plazo real</span>
                      <GrayField value="0" align="right" />
                      <span />

                      <span className="text-right">Última compra</span>
                      <GrayField value="14/04/2026" />
                      <GrayField />

                      <span className="text-right">Pago</span>
                      <GrayField value="06/04/2026" />
                      <GrayField />

                      <span className="text-right">Saldo anterior</span>
                      <GrayField />
                      <GrayField />

                      <span className="text-right">Baja</span>
                      <GrayField value="31/12/1900" />
                      <GrayField />

                      <span className="text-right">Actual</span>
                      <GrayField value="29,565,067.18" align="right" />
                      <GrayField />

                      <span className="text-right">Acumulado</span>
                      <GrayField value="81302888.19" align="right" />
                      <GrayField />
                    </div>
                  </section>
                </div>
              </div>
            </section>

            <aside className="border-l border-[#9ca4ac] bg-[#f4f4f4]">
              <div className="flex h-[28px] items-center justify-between px-[6px] text-[11px] text-[#49515a]">
                <span>Consultas</span>
                <span className="text-[18px] leading-none">×</span>
              </div>
              <div className="grid gap-[3px] px-[10px] pt-[14px]">
                {consultButtons.map((label, index) => (
                  <SideButton key={label} label={label} active={index === 2} />
                ))}
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}

export default SuppliersPage;
