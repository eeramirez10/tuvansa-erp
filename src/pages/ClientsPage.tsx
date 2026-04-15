const actionButtons = [
  "Clasificar",
  "Enviar a:",
  "Bloquear",
  "% Descuentos",
  "Eventos",
  "Sucursales",
  "Foto",
  "Contactos",
  "Datos crédito",
  "Copiar e-mail",
  "Verifica fiscal",
];

const consultButtons = [
  "Saldo",
  "Movimientos",
  "Facturas",
  "Relación de pedidos",
  "Productos pedidos      CT",
  "Productos cotizados",
  "Productos vendidos    CT",
  "Productos vendidos desg.",
  "Ventas anuales",
  "Ventas anuales resumen",
  "Ventas por sucursal",
  "WIP                   CT",
  "Monederos",
];

const tabs = ["General", "Ventas", "Crédito", "Lealtad", "Impuestos", "Complementos", "Varios"];

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

function ClientsPage() {
  return (
    <main className="p-1 text-[11px] text-[#23303d] [font-family:Tahoma,'Segoe_UI',sans-serif]">
      <div className="overflow-x-auto">
        <section className="min-h-[700px] w-[calc(100vw-16px)] min-w-[1180px] border border-[#2f8ce8] border-t-0 bg-[#f4f4f4] shadow-[inset_0_0_0_1px_#c6dcf6]">
          <div className="grid grid-cols-[110px_1fr_200px] gap-[6px] p-[2px]">
            <aside className="pt-[30px]">
              <BlueTitle>Acciones</BlueTitle>
              <div className="mt-[10px] grid gap-[3px] px-[8px]">
                {actionButtons.map((label) => (
                  <SideButton key={label} label={label} />
                ))}
              </div>
            </aside>

            <section className="border border-[#aeb8c2] bg-white">
              <div className="flex h-[26px] items-center px-[6px] text-[11px] font-semibold text-[#1b1f23]">Catálogo de clientes</div>

              <div className="px-[10px] pb-[8px]">
                <BlueTitle>Catálogo de clientes</BlueTitle>

                <div className="grid gap-y-[4px] pt-[4px] text-[11px] text-[#13181c]">
                  <div className="grid grid-cols-[72px_64px_70px_1fr] items-center gap-x-[4px]">
                    <span className="text-right">Cliente</span>
                    <Field value="000001" className="w-[64px]" />
                    <span className="text-right">Razón social</span>
                    <Field value="GUNDERSON-GIMSA, SA DE CV" />
                  </div>

                  <div className="grid grid-cols-[72px_324px_64px_52px_52px_80px] items-center gap-x-[4px]">
                    <span className="text-right">Dirección</span>
                    <Field value="AV. PRESIDENTE CARRANZA" />
                    <span className="text-right">Num Ext.</span>
                    <Field value="150" className="w-[52px]" />
                    <span className="text-right">Num Int.</span>
                    <Field value="B" className="w-[80px]" />
                  </div>

                  <div className="grid grid-cols-[72px_324px_64px_210px] items-center gap-x-[4px]">
                    <span className="text-right">Colonia</span>
                    <Field value="ZONA INDUSTRIAL" />
                    <span className="text-right">Contacto</span>
                    <Field />
                  </div>

                  <div className="grid grid-cols-[72px_234px_86px_1fr] items-center gap-x-[4px]">
                    <span className="text-right">Delegación</span>
                    <Field value="FRONTERA" />
                    <span className="text-right">Teléfonos</span>
                    <Field />
                  </div>

                  <div className="grid grid-cols-[72px_120px_64px_120px_40px_88px_28px_78px_58px_1fr] items-center gap-x-[4px]">
                    <span className="text-right">Ciudad</span>
                    <Field value="COAHUILA" />
                    <span className="text-right">Estado</span>
                    <Field value="COAHUILA" />
                    <span className="text-right">CP</span>
                    <Field value="25680" />
                    <span className="text-right">País</span>
                    <Field value="MEX" />
                    <span className="text-right">Tel 2</span>
                    <Field value="COA" />
                  </div>

                  <div className="grid grid-cols-[72px_120px_54px_48px_84px_42px_48px_40px_1fr] items-center gap-x-[4px]">
                    <span className="text-right">RFC</span>
                    <Field value="GUN061103UVO" />
                    <GrayField value="Gen" className="w-[36px]" align="center" />
                    <span className="text-right">Régimen fiscal</span>
                    <Field value="601" className="w-[42px]" />
                    <span className="text-right">Web</span>
                    <Field value="COAHUILA" className="col-span-3" />
                  </div>

                  <div className="grid grid-cols-[72px_200px_58px_42px_52px_1fr] items-center gap-x-[4px]">
                    <span className="text-right">CURP</span>
                    <Field value="G01" />
                    <span className="text-right">País cel</span>
                    <Field />
                    <span className="text-right">Celular</span>
                    <Field />
                  </div>

                  <div className="grid grid-cols-[72px_120px_80px_1fr_44px_1fr] items-center gap-x-[4px]">
                    <span className="text-right">Sucursal</span>
                    <Field value="11042017192" />
                    <span className="text-right">e-mail</span>
                    <Field />
                    <span />
                    <span />
                  </div>
                </div>

                <div className="mt-[2px] flex border-b border-[#b4bcc5] text-[11px]">
                  {tabs.map((tab, index) => (
                    <button
                      key={tab}
                      type="button"
                      className={[
                        "h-[22px] border border-b-0 border-[#b4bcc5] px-8 text-[#20252a]",
                        index === 0 ? "bg-[#1f7fbb] font-bold text-white" : "bg-[#ececec]",
                      ].join(" ")}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-[1.1fr_0.9fr] gap-[8px] border border-t-0 border-[#b4bcc5] px-[6px] pb-[8px]">
                  <section>
                    <BlueTitle className="text-left">Condiciones</BlueTitle>

                    <div className="grid grid-cols-[76px_92px_50px_52px_52px_18px_1fr] items-center gap-x-[4px] gap-y-[5px] pt-[8px] text-[11px] text-[#1a1f24]">
                      <span className="text-right">Lista</span>
                      <GrayField value="1" align="right" />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />

                      <span className="text-right">Descuentos</span>
                      <GrayField value="0.00" align="right" />
                      <GrayField value="0.00" align="right" className="w-[52px]" />
                      <GrayField value="0.00" align="right" className="w-[52px]" />
                      <span>%</span>
                      <span />
                      <span />

                      <span className="text-right">Plazo</span>
                      <GrayField value="30" align="right" />
                      <span>Desde</span>
                      <span />
                      <span />
                      <span />
                      <span />

                      <span className="text-right">Crédito</span>
                      <GrayField value="4,000,000.00" align="right" className="col-span-2" />
                      <span className="justify-self-end">Cad</span>
                      <GrayField value="31/12/1900" className="col-span-2" />
                      <span />

                      <span className="text-right">Revisión</span>
                      <Field />
                      <span />
                      <Field />
                      <span />
                      <span />
                      <span />

                      <span className="text-right">Pagos</span>
                      <Field />
                      <span />
                      <Field />
                      <span />
                      <span />
                      <span />

                      <span className="text-right">Aplicar a</span>
                      <Field />
                      <span className="justify-self-end">Cta. cont.</span>
                      <Field value="1105001" className="col-span-2" />
                      <span />

                      <span className="text-right">Alta</span>
                      <Field value="21/06/2021" />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  </section>

                  <section>
                    <BlueTitle className="text-left">Acumulados</BlueTitle>

                    <div className="grid grid-cols-[108px_116px_1fr] items-center gap-x-[6px] gap-y-[6px] pt-[8px] text-[11px] text-[#1a1f24]">
                      <span className="text-right">Plazo real</span>
                      <Field />
                      <GrayField />

                      <span className="text-right">Última compra</span>
                      <Field value="03/03/2026" />
                      <GrayField />

                      <span className="text-right">Último pago</span>
                      <Field value="27/02/2026" />
                      <GrayField />

                      <span className="text-right">Último pedido</span>
                      <Field value="18/03/2026" />
                      <GrayField />

                      <span className="text-right">Baja</span>
                      <Field value="31/12/1900" />
                      <GrayField />

                      <span className="text-right">Saldo anterior/Actual</span>
                      <Field />
                      <GrayField />

                      <span className="text-right">C.Disponible</span>
                      <GrayField value="4,000,000.00" align="right" />
                      <GrayField />

                      <span className="text-right">Acumulado</span>
                      <GrayField value="5,611,567.00" align="right" />
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
                  <SideButton key={label} label={label} active={index === 0} />
                ))}
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ClientsPage;
