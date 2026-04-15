const actionButtons = [
  "Movimientos",
  "Depósitos",
  "Pagos",
  "Conciliar",
  "Concilia Automático",
  "Auxiliar",
  "Mayor",
  "Mayor CC",
  "Revisar",
  "Clasificar",
  "Traspasos Cuentas Propias",
  "Aux. no aplicados",
  "Pre registro depósitos",
  "Aplica Prerregistro",
  "Concilia Omnicanal",
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
    <div className={`h-[24px] bg-[#1f7fbb] px-2 text-left text-[11px] leading-[24px] font-bold text-white ${className}`}>
      {children}
    </div>
  );
}

function SideButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="min-h-[22px] border border-[#ababab] bg-[#dbdbdb] px-2 py-[1px] text-center text-[11px] leading-[18px] text-[#1b1f23]"
    >
      {label}
    </button>
  );
}

function CheckLabel({ label }: { label: string }) {
  return (
    <label className="inline-flex items-center gap-[4px] text-[11px] text-[#666]">
      <span className="h-[12px] w-[12px] border border-[#b6bcc2] bg-[#ececec]" />
      {label}
    </label>
  );
}

function RadioLabel({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <label className="inline-flex items-center gap-[4px] text-[11px] text-[#666]">
      <span className="grid h-[12px] w-[12px] place-items-center rounded-full border border-[#b6bcc2] bg-[#ececec]">
        {active ? <span className="h-[5px] w-[5px] rounded-full bg-[#c8c8c8]" /> : null}
      </span>
      {label}
    </label>
  );
}

function BanksPage() {
  return (
    <main className="p-1 text-[11px] text-[#23303d] [font-family:Tahoma,'Segoe_UI',sans-serif]">
      <div className="overflow-x-auto">
        <section className="min-h-[700px] w-[calc(100vw-16px)] min-w-[1180px] border border-[#2f8ce8] border-t-0 bg-[#f4f4f4] shadow-[inset_0_0_0_1px_#c6dcf6]">
          <div className="border border-[#aeb8c2] bg-white">
            <div className="flex h-[26px] items-center px-[6px] text-[11px] font-semibold tracking-[0.45em] text-[#3b4148]">Bancos</div>

            <div className="grid grid-cols-[150px_1fr_238px] gap-[12px] px-[12px] pb-[14px]">
              <aside className="pt-[2px]">
                <BlueTitle className="text-center">Acciones</BlueTitle>
                <div className="mt-[12px] grid gap-[3px]">
                  {actionButtons.map((label) => (
                    <SideButton key={label} label={label} />
                  ))}
                </div>
              </aside>

              <section className="pt-[2px]">
                <BlueTitle>Datos de la cuenta</BlueTitle>

                <div className="grid gap-y-[4px] pt-[8px] text-[11px] text-[#13181c]">
                  <div className="grid grid-cols-[78px_190px_64px_160px] items-center gap-x-[8px]">
                    <span className="text-right">Código</span>
                    <Field value="11" />
                    <span className="text-right">Familia</span>
                    <Field />
                  </div>

                  <div className="grid grid-cols-[78px_190px_64px_160px] items-center gap-x-[8px]">
                    <span className="text-right">Número</span>
                    <Field />
                    <span className="text-right">Sucursal</span>
                    <Field />
                  </div>

                  <div className="grid grid-cols-[78px_1fr] items-center gap-x-[8px]">
                    <span className="text-right">Nombre</span>
                    <Field value="ACTIVO CIRCULANTE" />
                  </div>
                </div>

                <div className="mt-[8px] flex flex-wrap gap-x-[18px] gap-y-[4px] px-[84px]">
                  <RadioLabel label="Deudora" />
                  <RadioLabel label="Acreedora" />
                </div>

                <div className="mt-[4px] flex flex-wrap gap-x-[20px] gap-y-[4px] px-[84px]">
                  <RadioLabel label="Banco" />
                  <RadioLabel label="Gasto" />
                  <RadioLabel label="Otro" active />
                </div>

                <div className="mt-[12px]">
                  <BlueTitle>Control</BlueTitle>

                  <div className="grid grid-cols-[78px_1fr] items-center gap-x-[8px] gap-y-[4px] pt-[8px] text-[11px] text-[#13181c]">
                    <span className="text-right">Gerente</span>
                    <Field />
                    <span className="text-right">Teléfono</span>
                    <Field />
                    <span className="text-right"># Cliente</span>
                    <Field value="0" />
                  </div>

                  <div className="mt-[6px] grid grid-cols-[72px_76px_72px_76px_28px_76px_1fr] items-center gap-x-[8px] gap-y-[6px] text-[11px] text-[#13181c]">
                    <span className="text-right">N° Cheque</span>
                    <Field value="0" />
                    <span className="text-right">N° Depósito</span>
                    <Field value="0" />
                    <span className="text-right">N°</span>
                    <Field value="0" />
                    <span />

                    <span className="text-right">Moneda</span>
                    <Field value="0" />
                    <span />
                    <span />
                    <span />
                    <span />
                    <div className="grid grid-cols-2 gap-x-[20px] gap-y-[8px]">
                      <CheckLabel label="Sub ctas" />
                      <CheckLabel label="No poder utilizar en pólizas" />
                      <CheckLabel label="Movs" />
                      <CheckLabel label="Presupuestable" />
                      <CheckLabel label="Depósitos" />
                      <CheckLabel label="Pagos" />
                      <CheckLabel label="Control" />
                    </div>

                    <span className="text-right">Formato</span>
                    <Field />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />

                    <span className="text-right">Cía</span>
                    <Field value="0" />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />

                    <span className="text-right">Multicía</span>
                    <Field value="0" />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                </div>

                <div className="mt-[14px]">
                  <BlueTitle>Datos Fiscales</BlueTitle>

                  <div className="grid grid-cols-[154px_1fr_1fr] items-center gap-x-[10px] gap-y-[8px] pt-[8px] text-[11px] text-[#13181c]">
                    <span>Ajuste anual por inflación</span>
                    <div className="flex gap-[14px]">
                      <RadioLabel label="No" active />
                      <RadioLabel label="Créditos" />
                      <RadioLabel label="Débitos" />
                    </div>
                    <div className="flex gap-[18px] justify-self-end">
                      <CheckLabel label="Deducible IETU" />
                      <CheckLabel label="No Deducible IVA" />
                    </div>

                    <span className="justify-self-end">Agrupa. SAT</span>
                    <div className="flex items-center gap-[8px]">
                      <Field value="100.01" className="w-[60px]" />
                      <span>Banco SAT</span>
                      <Field className="w-[60px]" />
                      <button
                        type="button"
                        className="h-[18px] border border-[#b9b9b9] bg-[#dbdbdb] px-[6px] text-[10px] leading-[16px] text-[#5a5a5a]"
                      >
                        Buscar
                      </button>
                    </div>
                    <div className="flex items-center justify-end gap-[8px]">
                      <span>Método de pago</span>
                      <Field className="w-[62px]" />
                      <span>Moneda</span>
                      <Field className="w-[62px]" />
                    </div>

                    <span className="justify-self-end">RFC</span>
                    <Field className="w-[265px]" />
                    <div className="flex items-center justify-end gap-[8px]">
                      <span>Banco Extranjero</span>
                      <Field className="w-[190px]" />
                    </div>
                  </div>
                </div>
              </section>

              <aside className="pt-[2px]">
                <BlueTitle>Saldos</BlueTitle>
                <div className="grid grid-cols-[96px_1fr] items-center gap-x-[8px] gap-y-[6px] px-[14px] pt-[10px] text-[11px] text-[#13181c]">
                  <span className="text-right">Actual</span>
                  <GrayField value="600,481,223.96" align="right" />
                  <span className="text-right">Banco</span>
                  <GrayField />
                  <span className="text-right">Anterior</span>
                  <GrayField value="524,546,731.82" align="right" />
                  <span className="text-right">Tránsito</span>
                  <GrayField />
                </div>

                <div className="mt-[18px]">
                  <BlueTitle>Moneda PESOS.</BlueTitle>
                  <div className="grid grid-cols-[96px_1fr] items-center gap-x-[8px] gap-y-[6px] px-[14px] pt-[10px] text-[11px] text-[#13181c]">
                    <span className="text-right">Saldo actual</span>
                    <GrayField />
                    <span className="text-right">Saldo Mes 12</span>
                    <GrayField />
                    <span className="text-right">Saldo anterior</span>
                    <GrayField />
                    <span className="text-right">Alta</span>
                    <GrayField value="31/12/1900" />
                  </div>
                </div>

                <div className="mt-[18px]">
                  <BlueTitle>Prorratear CC</BlueTitle>
                  <div className="grid grid-cols-[96px_76px_1fr] items-center gap-x-[8px] gap-y-[6px] px-[14px] pt-[10px] text-[11px] text-[#13181c]">
                    <span className="text-right">% Vta.</span>
                    <Field value="0" className="w-[76px]" />
                    <span />
                    <span className="text-right">% Inv.</span>
                    <Field value="0" className="w-[76px]" />
                    <span />
                    <span className="text-right">% Dist.</span>
                    <Field value="0" className="w-[76px]" />
                    <span />
                    <span className="text-right">% Antig.</span>
                    <Field value="0" className="w-[76px]" />
                    <span>= 100%.</span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default BanksPage;
