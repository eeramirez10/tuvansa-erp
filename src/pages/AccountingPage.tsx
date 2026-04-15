const topActions = ["Clasificar", "Comentarios", "Duplicar", "Imprimir"];
const bottomActions = ["Aplicar", "Des - Aplicar", "Liga recepción"];

const rows = [
  ["", "1105001", "CLIENTES NACIONALES", "3,755.89", "", "1", "", "1.0000000", "FE0064039"],
  ["", "4001001", "VENTAS GRAVADAS A LA TASA 16%", "", "3,237.84", "1", "VENTAS", "1.0000000", ""],
  ["", "2007001", "IVA TRASLADADO", "", "518.05", "1", "IVA", "1.0000000", ""],
  ["", "1115001", "ALMACEN MÉXICO", "", "2,892.67", "1", "INV", "1.0000000", ""],
  ["", "5001001", "COSTO DE VENTA", "2,892.67", "", "1", "COSTO VTS", "1.0000000", ""],
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
      className={`inline-flex h-[18px] items-center border border-[#d7d7d7] bg-[#dedede] px-[4px] text-[11px] text-[#1f2933] ${alignClass} ${className}`}
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

function AccountingPage() {
  return (
    <main className="p-1 text-[11px] text-[#23303d] [font-family:Tahoma,'Segoe_UI',sans-serif]">
      <div className="overflow-x-auto">
        <section className="min-h-[700px] w-[calc(100vw-16px)] min-w-[1180px] border border-[#2f8ce8] border-t-0 bg-[#f4f4f4] shadow-[inset_0_0_0_1px_#c6dcf6]">
          <div className="border border-[#aeb8c2] bg-white">
            <div className="flex h-[24px] items-center justify-between px-[4px] text-[11px] font-semibold text-[#4a5057]">
              <div className="flex items-center gap-[4px]">
                <span className="h-[12px] w-[12px] border border-[#96a6bd] bg-[#f8f8f8]" />
                <span>Pólizas</span>
              </div>
              <span>□</span>
            </div>

            <div className="grid grid-cols-[118px_1fr] gap-[8px] px-[8px] pb-[10px]">
              <aside className="pt-[2px]">
                <BlueTitle className="text-center">Acciones</BlueTitle>
                <div className="mt-[12px] grid gap-[8px]">
                  <div className="grid gap-[3px]">
                    {topActions.map((label) => (
                      <ActionButton key={label} label={label} />
                    ))}
                  </div>

                  <div className="grid gap-[3px]">
                    <BlueTitle className="text-center">Acciones</BlueTitle>
                    {bottomActions.map((label) => (
                      <ActionButton key={label} label={label} />
                    ))}
                  </div>
                </div>
              </aside>

              <section className="pt-[2px]">
                <BlueTitle>Póliza</BlueTitle>

                <div className="grid gap-y-[4px] pt-[6px] text-[11px] text-[#13181c]">
                  <div className="grid grid-cols-[78px_98px_56px_82px_62px_126px_42px_46px_48px_110px_78px_42px_20px_90px_30px] items-center gap-x-[4px]">
                    <span>Documento</span>
                    <Field value="512603-0051" />
                    <span>Fecha</span>
                    <Field value="13/03/2026" />
                    <span>Cheque</span>
                    <Field value="FE0064039" />
                    <span>MCía</span>
                    <Field value="1" className="w-[46px]" />
                    <span>Origen</span>
                    <Field />
                    <span />
                    <span className="h-[14px] w-[14px] border border-[#bbb] bg-[#f3f3f3]" />
                    <span>Aplicada</span>
                    <Field />
                    <span />
                  </div>

                  <div className="grid grid-cols-[78px_1fr_42px_110px_20px_110px] items-center gap-x-[4px]">
                    <span>Beneficiario</span>
                    <Field value="JOSE OSCAR ZAPATA GONZALEZ" />
                    <span>Familia</span>
                    <Field value="VENTAS" />
                    <span />
                    <Field />
                  </div>

                  <div className="grid grid-cols-[78px_1fr] items-center gap-x-[4px]">
                    <span>Concepto</span>
                    <Field value="CFDI FE-0064039 emitido 13/03/2026 09:08:51" />
                  </div>
                </div>

                <div className="mt-[16px] border border-[#b8bcc1]">
                  <div className="grid h-[24px] grid-cols-[26px_96px_1fr_88px_82px_44px_108px_80px_82px] border-b border-[#b8bcc1] bg-[#f8f8f8] px-[2px] text-[11px] leading-[22px] text-[#1f2933]">
                    <span>C</span>
                    <span>Código</span>
                    <span>Cuenta</span>
                    <span className="text-right">Cargos</span>
                    <span className="text-right">Abonos</span>
                    <span className="text-right">CC</span>
                    <span>Refer.</span>
                    <span className="text-right">T.C.</span>
                    <span>Documento</span>
                  </div>

                  <div className="relative h-[255px] bg-white">
                    <div className="grid grid-cols-[26px_96px_1fr_88px_82px_44px_108px_80px_82px] px-[2px] text-[11px] text-[#1f2933]">
                      {rows.map((row, index) => (
                        <div key={`${row[1]}-${index}`} className="contents">
                          {row.map((cell, cellIndex) => (
                            <span
                              key={`${cell}-${cellIndex}`}
                              className={[
                                "border-r border-[#e3e3e3] py-[1px]",
                                [3, 4, 5, 7].includes(cellIndex) ? "pr-[4px] text-right" : "pr-[2px]",
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

                <div className="mt-[14px]">
                  <BlueTitle className="w-[70%]">Totales</BlueTitle>
                  <div className="grid grid-cols-[1fr_90px_98px_98px] items-center gap-x-[8px] px-[360px] pt-[10px] text-[11px] text-[#1f2933]">
                    <span className="justify-self-end">Totales</span>
                    <Field value="6,648.56" align="right" className="h-[18px]" />
                    <Field value="6,648.56" align="right" className="h-[18px]" />
                    <span />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AccountingPage;
