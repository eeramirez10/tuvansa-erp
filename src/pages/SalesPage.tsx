const actionButtons = [
  "Auxiliar",
  "Cajas",
  "Clasificar",
  "Comentarios",
  "CT",
  "Imprimir",
  "Lotes",
  "Piezas",
  "",
  "Sellar",
  "",
  "Sumario",
  "Ticket > Factura",
  "Traspaso",
  "",
  "Edita piezas",
  "Liquidacion camion",
  "Validar Cajas",
  "Prv. Factoraje",
];

function InputGhost({ w = "w-full", value = "" }: { w?: string; value?: string }) {
  return (
    <span className={`inline-flex h-4 items-center bg-[#dadbdd] px-1 text-[10px] font-semibold text-[#4f5961] ${w}`}>
      {value}
    </span>
  );
}

function SalesPage() {
  return (
    <main className="p-1 text-[11px] text-[#23303d] [font-family:Tahoma,'Segoe_UI',sans-serif]">
      <div className="overflow-x-auto">
        <section className="min-h-[700px] w-[calc(100vw-16px)] min-w-[1180px] border border-[#2f8ce8] border-t-0 bg-[#f4f4f4] shadow-[inset_0_0_0_1px_#c6dcf6]">
          <section className="p-1">
            <div className="min-h-[630px] border border-[#b2bcc6] bg-white">
              <div className="flex h-[20px] items-center justify-between border-b border-[#b2bcc6] px-1 text-[11px] font-semibold">
                <span>Facturas</span>
                <span className="text-[10px]">□</span>
              </div>

              <div className="grid grid-cols-[106px_1fr]">
                <aside className="border-r border-[#c8ccd1] bg-[#ececec] p-1">
                  <div className="mb-1 h-[18px] bg-[#1f6fb2] text-center text-[11px] leading-[18px] font-bold text-white">
                    Acciones
                  </div>

                  <div className="grid gap-[2px]">
                    {actionButtons.map((label, idx) =>
                      label ? (
                        <button
                          key={`${label}-${idx}`}
                          className={[
                            "h-[18px] border text-[11px] leading-[16px] font-semibold",
                            label === "Validar Cajas"
                              ? "border-[#888] bg-[#dcdcdc] text-[#1f4b83]"
                              : "border-[#a5a5a5] bg-[#d6d6d6] text-[#6f7680]",
                          ].join(" ")}
                        >
                          {label}
                        </button>
                      ) : (
                        <div key={`spacer-${idx}`} className="h-[10px]" />
                      ),
                    )}
                  </div>
                </aside>

                <div className="p-1">
                  <div className="mb-1 h-[18px] bg-[#1f6fb2] px-2 text-[11px] leading-[18px] font-bold text-white">Factura</div>

                  <div className="space-y-[2px] text-[10px] font-bold text-[#3a4856]">
                    <div className="grid grid-cols-[34px_76px_35px_78px_64px_82px_67px_64px_46px_74px_52px_62px_38px_63px] items-center gap-x-[3px]">
                      <span>Docto.</span>
                      <InputGhost />
                      <span>Pedido</span>
                      <InputGhost />
                      <span>Pedido cliente</span>
                      <InputGhost />
                      <span>Ref. Omnicanal</span>
                      <InputGhost />
                      <span>Ref. SAT</span>
                      <InputGhost />
                      <span>Sucursal</span>
                      <InputGhost />
                      <span>Moneda</span>
                      <InputGhost value="PESOS." />
                    </div>

                    <div className="grid grid-cols-[34px_56px_32px_74px_53px_125px_51px_69px_49px_95px_36px_64px] items-center gap-x-[3px]">
                      <span>Cliente</span>
                      <InputGhost />
                      <InputGhost w="w-[30px]" />
                      <InputGhost w="w-[74px]" />
                      <InputGhost w="w-[53px]" />
                      <InputGhost w="w-[125px]" />
                      <span>Sucursal.</span>
                      <InputGhost />
                      <span>Deto.</span>
                      <InputGhost />
                      <span>Ruta.</span>
                      <InputGhost />
                    </div>

                    <div className="grid grid-cols-[32px_50px_30px_50px_38px_40px_24px_142px_24px_31px_24px_33px_24px_46px_34px_17px_24px_68px_63px] items-center gap-x-[3px]">
                      <span>Fecha</span>
                      <InputGhost />
                      <span>Vence</span>
                      <InputGhost />
                      <span>Retraso</span>
                      <InputGhost w="w-[32px]" value="0" />
                      <span>At.</span>
                      <InputGhost />
                      <span>Pas.</span>
                      <InputGhost w="w-[31px]" />
                      <span>Alm.</span>
                      <InputGhost w="w-[33px]" />
                      <span>Inicial</span>
                      <span className="h-3 w-3 border border-[#adb3bb] bg-[#f2f2f2]" />
                      <span>CFD.</span>
                      <InputGhost w="w-[17px]" />
                      <span>Fecha de pago</span>
                      <InputGhost />
                      <InputGhost />
                    </div>
                  </div>

                  <div className="mt-[3px] border border-[#b8bcc1]">
                    <div className="grid h-[18px] grid-cols-[70px_1fr_53px_30px_52px_32px_52px_26px_42px_52px_52px] border-b border-[#b8bcc1] bg-[#f3f3f3] px-[2px] text-[10px] leading-[17px] font-bold text-[#314050]">
                      <span>Producto</span>
                      <span>Descripción</span>
                      <span className="text-right">Cantidad</span>
                      <span className="text-right">UM</span>
                      <span className="text-right">Precio</span>
                      <span className="text-right">Dto</span>
                      <span className="text-right">Importe</span>
                      <span className="text-right">Suc.</span>
                      <span className="text-right">Agt Pzas.</span>
                      <span className="text-right">Cod SAT</span>
                      <span />
                    </div>
                    <div className="relative h-[260px] bg-white">
                      <div className="absolute right-0 top-0 h-full w-[8px] border-l border-[#d2d2d2] bg-[#f0f0f0]" />
                      <div className="absolute bottom-0 left-0 h-[11px] w-full border-t border-[#d2d2d2] bg-[#ededed]">
                        <div className="absolute left-[7px] top-[1px] text-[9px] text-[#6b7480]">◀</div>
                        <div className="absolute right-[7px] top-[1px] text-[9px] text-[#6b7480]">▶</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-[18px] border border-[#b8bcc1]">
                    <div className="h-[18px] bg-[#1f6fb2] px-2 text-[11px] leading-[18px] font-bold text-white">Totales</div>
                    <div className="grid grid-cols-[86px_50px_37px_40px_52px_40px_42px_53px_42px_1fr] items-center gap-x-[7px] px-2 py-[3px] text-[10px] font-bold text-[#314050]">
                      <span className="text-right">% Descuentos</span>
                      <InputGhost w="w-[50px]" value="0" />
                      <InputGhost w="w-[37px]" value="0" />
                      <span className="text-right">Cantidad</span>
                      <InputGhost w="w-[52px]" value="0" />
                      <span className="text-right">Pzas.</span>
                      <InputGhost w="w-[42px]" value="0" />
                      <span className="text-right">% IVA</span>
                      <InputGhost w="w-[42px]" value="0" />
                      <span />
                    </div>
                    <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] gap-x-[7px] px-2 pb-[5px] text-[10px] font-bold text-[#314050]">
                      <div className="text-right">
                        Subtotal
                        <InputGhost w="ml-1 w-[58px]" value="0.00" />
                      </div>
                      <div className="text-right">
                        Descuentos
                        <InputGhost w="ml-1 w-[58px]" value="0.00" />
                      </div>
                      <div className="text-right">
                        IEPS
                        <InputGhost w="ml-1 w-[56px]" value="0.00" />
                      </div>
                      <div className="text-right">
                        IVA
                        <InputGhost w="ml-1 w-[56px]" value="0.00" />
                      </div>
                      <div className="text-right">
                        Gran total
                        <InputGhost w="ml-1 w-[64px]" value="0.00" />
                      </div>
                      <div className="text-right">
                        Saldo
                        <InputGhost w="ml-1 w-[64px]" value="0.00" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

export default SalesPage;
