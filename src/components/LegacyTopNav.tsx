import { useCallback } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CircleHelp,
  FilePenLine,
  Files,
  Package,
  Printer,
  Search,
  TableProperties,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { MODAL_IDS, useModalStore } from "../modules/ui/store/modal.store";
import { useInventoryRecordNavigation } from "../modules/inventories/hooks/useInventoryRecordNavigation";

type NavButtonProps = {
  label: string;
  gradient: string;
  borderColor: string;
  shadowColor: string;
  textColor?: string;
  path?: string;
  className?: string;
};

function NavButton({
  label,
  gradient,
  borderColor,
  shadowColor,
  textColor = "text-white",
  path,
  className = "",
}: NavButtonProps) {
  const navigate = useNavigate();

  return (
    <div className={["relative pb-[7px]", className].join(" ")}>
      <button
        type="button"
        onClick={() => path && navigate(path)}
        className={[
          "relative h-[22px] w-full select-none rounded-full border px-[9px] text-center text-[10px] leading-none font-bold tracking-[0.18px] uppercase",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.26),inset_0_-1px_0_rgba(0,0,0,0.2),0_1px_0_0_rgba(0,0,0,0.24)]",
          "transition-all duration-150 active:translate-y-[1px] active:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(0,0,0,0.14)]",
          "bg-gradient-to-b",
          gradient,
          borderColor,
          shadowColor,
          textColor,
          path ? "cursor-pointer hover:brightness-[1.02]" : "cursor-default",
        ].join(" ")}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute top-[2px] left-[9%] h-[2px] w-[82%] rounded-full bg-white/14"
        />
        {label}
      </button>
      <span
        aria-hidden
        className={[
          "pointer-events-none absolute top-[22px] left-0 w-full text-center text-[8px] font-bold uppercase tracking-[0.25px]",
          "opacity-16 blur-[0.35px] [transform:scaleY(-1)] [mask-image:linear-gradient(to_bottom,rgba(255,255,255,0.55),transparent)]",
          textColor,
        ].join(" ")}
      >
        {label}
      </span>
    </div>
  );
}

type SplitNavButtonProps = {
  leftLabel: string;
  rightLabel: string;
  path: string;
  className?: string;
  variant?: "gold" | "blue";
};

function SplitNavButton({
  leftLabel,
  rightLabel,
  path,
  className = "",
  variant = "gold",
}: SplitNavButtonProps) {
  const navigate = useNavigate();
  const isBlue = variant === "blue";
  const containerTone = isBlue
    ? "border-[#203271] bg-gradient-to-b from-[#4f67d0] via-[#374fae] to-[#263f98]"
    : "border-[#9f7c06] bg-gradient-to-b from-[#f4d93c] via-[#e3c117] to-[#c89f03]";
  const dividerTone = isBlue ? "bg-[#23346f]/90" : "bg-[#8a6f12]/85";
  const textTone = isBlue ? "text-[#eef2ff]" : "text-[#fef9e8]";

  return (
    <div className={["relative w-[112px] pb-[7px]", className].join(" ")}>
      <div
        className={[
          "relative flex h-[22px] w-full overflow-hidden rounded-full border border-[#9f7c06]",
          containerTone,
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-1px_0_rgba(0,0,0,0.2),0_1px_0_0_rgba(0,0,0,0.22)]",
        ].join(" ")}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute top-[2px] left-[8%] h-[2px] w-[84%] rounded-full bg-white/12"
        />
        <span
          aria-hidden
          className={[
            "pointer-events-none absolute top-[2px] bottom-[2px] left-1/2 w-px -translate-x-1/2",
            dividerTone,
          ].join(" ")}
        />
        <button
          type="button"
          onClick={() => navigate(path)}
          className={[
            "h-full basis-1/2 cursor-pointer pr-[1px] text-center text-[10px] leading-none font-bold tracking-[0.18px] uppercase hover:brightness-[1.02]",
            textTone,
          ].join(" ")}
        >
          {leftLabel}
        </button>
        <button
          type="button"
          onClick={() => navigate(path)}
          className={[
            "h-full basis-1/2 cursor-pointer pl-[1px] text-center text-[10px] leading-none font-bold tracking-[0.18px] uppercase hover:brightness-[1.02]",
            textTone,
          ].join(" ")}
        >
          {rightLabel}
        </button>
      </div>
      <div className="pointer-events-none absolute top-[22px] left-0 flex w-full">
        <span
          className={[
            "w-1/2 text-center text-[8px] font-bold uppercase tracking-[0.25px] opacity-16 blur-[0.35px] [transform:scaleY(-1)] [mask-image:linear-gradient(to_bottom,rgba(255,255,255,0.55),transparent)]",
            textTone,
          ].join(" ")}
        >
          {leftLabel}
        </span>
        <span
          className={[
            "w-1/2 text-center text-[8px] font-bold uppercase tracking-[0.25px] opacity-16 blur-[0.35px] [transform:scaleY(-1)] [mask-image:linear-gradient(to_bottom,rgba(255,255,255,0.55),transparent)]",
            textTone,
          ].join(" ")}
        >
          {rightLabel}
        </span>
      </div>
    </div>
  );
}

function LegacyTopNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isEnabled: isInventoryNavigationEnabled, isLoading: isInventoryNavigationLoading, goToPrevious, goToNext } =
    useInventoryRecordNavigation();
  const openModal = useModalStore((state) => state.openModal);
  const handleOpenSearchModal = useCallback(() => {
    openModal(MODAL_IDS.INVENTORY_SEARCH);
  }, [openModal]);

  const moduleTitle = pathname.startsWith("/clientes")
    ? "Clientes"
    : pathname.startsWith("/contabilidad")
      ? "Contabilidad"
    : pathname.startsWith("/bancos")
      ? "Bancos"
    : pathname.startsWith("/pedidos")
      ? "Pedidos"
    : pathname.startsWith("/ordenes-compra")
      ? "Ordenes de compra"
    : pathname.startsWith("/proveedores")
      ? "Cuentas x Pagar"
      : pathname.startsWith("/recepciones")
        ? "Recepciones"
        : pathname.startsWith("/inventarios")
          ? "Inventarios"
          : pathname.startsWith("/ventas") || pathname.startsWith("/sales")
            ? "Facturación"
            : "Módulo";
  const ModuleIcon =
    pathname.startsWith("/inventarios") ||
    pathname.startsWith("/recepciones") ||
    pathname.startsWith("/proveedores") ||
    pathname.startsWith("/ordenes-compra") ||
    pathname.startsWith("/pedidos") ||
    pathname.startsWith("/contabilidad") ||
    pathname.startsWith("/bancos")
      ? Package
      : Printer;

  return (
    <div className="overflow-x-auto p-1 pb-0 text-[11px] text-[#23303d] [font-family:Tahoma,'Segoe_UI',sans-serif]">
      <header className="grid w-[calc(100vw-16px)] min-w-[1180px] grid-cols-[200px_1fr_300px] gap-2 border border-[#2f8ce8] border-b-[#bed5ef] bg-[#f4f4f4] px-2 pt-[2px] pb-[1px] shadow-[inset_0_0_0_1px_#c6dcf6]">
        <div onClick={() => navigate("/")} className="flex cursor-pointer items-center justify-center">
          <img src="logo-tuvansa.png" className="h-15" alt="" />
        </div>

        <div className="flex items-center justify-center gap-[6px] px-3 py-3">
          <div className="mt-4 flex w-30 flex-col gap-1">
            <SplitNavButton leftLabel="Recep." rightLabel="Ordenes" path="/recepciones" />
          </div>

          <div className="mt-[10px] flex w-[120px] flex-col gap-1">
            <NavButton
              label="Inventarios M.P."
              gradient="from-[#f39c41] to-[#d5671b]"
              borderColor="border-[#a14a0c]"
              shadowColor="shadow-[#91460c]"
            />
            <NavButton
              label="Cuentas x Pagar"
              gradient="from-[#e75595] to-[#b73167]"
              borderColor="border-[#8e2b54]"
              shadowColor="shadow-[#7c2849]"
              path="/proveedores"
            />
          </div>

          <div className="mt-0 flex w-[120px] flex-col gap-1">
            <NavButton
              label="Producción"
              gradient="from-[#c8a14a] to-[#9c7321]"
              borderColor="border-[#7f5d1b]"
              shadowColor="shadow-[#6c4e16]"
            />
            <NavButton
              label="Contabilidad"
              gradient="from-[#6ea84f] to-[#4b7d2e]"
              borderColor="border-[#3c6624]"
              shadowColor="shadow-[#32541e]"
              path="/contabilidad"
            />
            <NavButton
              label="Bancos"
              gradient="from-[#c465cd] to-[#9947a2]"
              borderColor="border-[#75367f]"
              shadowColor="shadow-[#6c2e75]"
              path="/bancos"
            />
          </div>

          <div className="mt-[10px] flex w-[120px] flex-col gap-1">
            <NavButton
              label="Inventarios P.T."
              gradient="from-[#70d9ea] to-[#2e9db8]"
              borderColor="border-[#2b7587]"
              shadowColor="shadow-[#286b7b]"
              path="/inventarios"
            />
            <NavButton
              label="Cuentas x Cobrar"
              gradient="from-[#4f9cf1] to-[#286bc7]"
              borderColor="border-[#22549a]"
              shadowColor="shadow-[#1f4a8a]"
              path="/clientes"
            />
          </div>

          <div className="mt-4 flex w-30 flex-col gap-1">
            <SplitNavButton leftLabel="Pedidos" rightLabel="Factura" path="/ventas" className="w-[120px]" variant="blue" />
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
            <button
              onClick={goToPrevious}
              disabled={!isInventoryNavigationEnabled || isInventoryNavigationLoading}
              className="grid h-10 w-10 place-items-center border border-[#4a5963] bg-gradient-to-b from-[#87a8b8] to-[#5f7783] text-white disabled:cursor-not-allowed disabled:opacity-50"
              title="Producto anterior"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleOpenSearchModal}
              className="grid h-10 w-10 place-items-center border border-[#4a5963] bg-gradient-to-b from-[#87a8b8] to-[#5f7783] text-white"
              title="Buscar producto"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={goToNext}
              disabled={!isInventoryNavigationEnabled || isInventoryNavigationLoading}
              className="grid h-10 w-10 place-items-center border border-[#4a5963] bg-gradient-to-b from-[#87a8b8] to-[#5f7783] text-white disabled:cursor-not-allowed disabled:opacity-50"
              title="Producto siguiente"
            >
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
