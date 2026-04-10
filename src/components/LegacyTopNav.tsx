import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  CircleHelp,
  FilePenLine,
  Files,
  Package,
  Printer,
  TableProperties,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

type NavButtonProps = {
  label: string;
  color: string;
  textColor?: string;
  path?: string;
};

function NavButton({ label, color, textColor = "text-white", path }: NavButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => path && navigate(path)}
      className={[
        "w-full select-none rounded-[7px] border border-[rgba(0,0,0,0.35)] border-b-[2px] px-2.5 py-1.5 text-center text-[10.5px] leading-none font-bold shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] transition-all duration-150 [box-shadow:0_6px_0_0_rgba(0,0,0,0.24),0_10px_0_0_rgba(0,0,0,0.14)] active:translate-y-[3px] active:border-b-0 active:[box-shadow:0_0px_0_0_rgba(0,0,0,0.24),0_0px_0_0_rgba(0,0,0,0.14)]",
        color,
        textColor,
        path ? "cursor-pointer hover:brightness-110" : "cursor-default",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function LegacyTopNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const moduleTitle = pathname.startsWith("/recepciones")
    ? "Recepciones"
    : pathname.startsWith("/inventarios")
      ? "Inventarios"
      : pathname.startsWith("/ventas") || pathname.startsWith("/sales")
        ? "Facturación"
        : "Módulo";
  const ModuleIcon = pathname.startsWith("/inventarios") || pathname.startsWith("/recepciones") ? Package : Printer;

  return (
    <div className="overflow-x-auto p-1 pb-0 text-[11px] text-[#23303d] [font-family:Tahoma,'Segoe_UI',sans-serif]">
      <header className="grid w-[calc(100vw-16px)] min-w-[1180px] grid-cols-[200px_1fr_300px] gap-2 border border-[#2f8ce8] border-b-[#bed5ef] bg-[#f4f4f4] px-2 pt-[2px] pb-[1px] shadow-[inset_0_0_0_1px_#c6dcf6]">
        <div onClick={() => navigate("/")} className="flex cursor-pointer items-center justify-center">
          <img src="logo-tuvansa.png" className="h-15" alt="" />
        </div>

        <div className="flex  items-center justify-center gap-3 px-3 py-3">
          <div className="mt-4 flex w-30 flex-col gap-4">
            <NavButton  label="Recep. | Ordenes" color="bg-[#E8C000]"   path="/recepciones"  />
          </div>

          <div className="mt-[10px] flex w-[120px]  flex-col gap-4">
            <NavButton label="Inventarios M.P." color="bg-[#5A9A20]" />
            <NavButton label="Cuentas x Pagar" color="bg-[#A06020]" />
          </div>

          <div className="mt-0 flex w-[120px] flex-col gap-4">
            <NavButton label="Produccion" color="bg-[#6B8E23]" />
            <NavButton label="Contabilidad" color="bg-[#2E8B57]" />
            <NavButton label="Bancos" color="bg-[#7040A0]" />
          </div>

          <div className="mt-[10px] flex w-[120px] flex-col gap-4">
            <NavButton label="Inventarios P.T." color="bg-[#20A090]" path="/inventarios"/>
            <NavButton label="Cuentas x Cobrar" color="bg-[#C03080]" />
          </div>

          <div className="mt-4 flex w-30 flex-col gap-4">
            <NavButton label="Pedidos | Factura" color="bg-[#204080]" path="/ventas" />
          </div>
        </div>

        <div className="items-end">
          <div className="flex h-20 items-center justify-between rounded-lg border border-[#2a3f8d] bg-gradient-to-b from-[#2944ad] to-[#1f2f77] px-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]">
            <h1 className="text-lg leading-none font-bold tracking-[-0.4px] text-[#f2f3ff]">{moduleTitle}</h1>
            <ModuleIcon className="h-10 w-10 text-[#d3d7ed]" />
          </div>
          <div className="mt-[2px] flex items-center justify-end gap-[2px]">
            <button className="grid h-10 w-10 place-items-center border border-[#4a5963] bg-gradient-to-b from-[#87a8b8] to-[#5f7783] text-white">
              <CircleHelp className="h-5 w-5" />
            </button>
            <button className="grid h-10 w-10 place-items-center border border-[#4a5963] bg-gradient-to-b from-[#87a8b8] to-[#5f7783] text-white">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button className="grid h-10 w-10 place-items-center border border-[#4a5963] bg-gradient-to-b from-[#87a8b8] to-[#5f7783] text-white">
              <ArrowUp className="h-5 w-5" />
            </button>
            <button className="grid h-10 w-10 place-items-center border border-[#4a5963] bg-gradient-to-b from-[#87a8b8] to-[#5f7783] text-white">
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="grid h-10 w-10 place-items-center border border-[#4a5963] bg-gradient-to-b from-[#87a8b8] to-[#5f7783] text-white">
              <TableProperties className="h-5 w-5" />
            </button>
            <button className="grid h-10 w-10 place-items-center border border-[#4a5963] bg-gradient-to-b from-[#87a8b8] to-[#5f7783] text-white">
              <FilePenLine className="h-5 w-5" />
            </button>
            <button className="grid h-10 w-10 place-items-center border border-[#4a5963] bg-gradient-to-b from-[#87a8b8] to-[#5f7783] text-white">
              <Files className="h-5 w-5" />
            </button>
            <button
              onClick={() => navigate("/")}
              className="grid h-10 w-10 place-items-center border border-[#4a5963] bg-gradient-to-b from-[#87a8b8] to-[#5f7783] text-white"
              title="Regresar"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default LegacyTopNav;
