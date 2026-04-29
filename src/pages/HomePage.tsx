import {
  Calculator,
  Cog,
  Database,
  DollarSign,
  FileText,
  Printer,
  Scale,
  type LucideIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type Module = {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
  path?: string;
  x: number;
  y: number;
  toneClass: string;
  wide?: boolean;
};

const modules: Module[] = [
  {
    id: "compras",
    label: "COMPRAS",
    icon: Calculator,
    path: "/recepciones",
    x: 110,
    y: 180,
    toneClass: "bg-gradient-to-b from-[#f4c90f] to-[#b99600]",
  },
  {
    id: "inv-mr",
    label: "INVENTARIOS M.R",
    icon: FileText,
    badge: "MP",
    path: "/inventarios",
    x: 280,
    y: 125,
    toneClass: "bg-gradient-to-b from-[#ff9f43] to-[#c26514]",
  },
  {
    id: "produccion",
    label: "PRODUCCION",
    icon: Cog,
    x: 430,
    y: 90,
    toneClass: "bg-gradient-to-b from-[#7a6843] to-[#4f4323]",
  },
  {
    id: "inv-pt",
    label: "INVENTARIOS P.T",
    icon: FileText,
    badge: "PT",
    path: "/inventarios",
    x: 580,
    y: 125,
    toneClass: "bg-gradient-to-b from-[#58d3fa] to-[#2e95bc]",
  },
  {
    id: "ventas",
    label: "VENTAS",
    icon: Printer,
    path: "/ventas",
    x: 750,
    y: 180,
    toneClass: "bg-gradient-to-b from-[#4a67ce] to-[#2c3f8f]",
  },
  {
    id: "cxp",
    label: "CTAS. X PAGAR",
    icon: Database,
    path: "/proveedores",
    x: 280,
    y: 255,
    toneClass: "bg-gradient-to-b from-[#b22c5f] to-[#6f1a3b]",
  },
  {
    id: "conta",
    label: "CONTABILIDAD",
    icon: Scale,
    path: "/contabilidad",
    x: 430,
    y: 205,
    toneClass: "bg-gradient-to-b from-[#729b69] to-[#4c6f45]",
  },
  {
    id: "cxc",
    label: "CTAS. X COBRAR",
    icon: Database,
    path: "/clientes",
    x: 580,
    y: 255,
    toneClass: "bg-gradient-to-b from-[#3679d9] to-[#25509b]",
  },
  {
    id: "bancos",
    label: "BANCOS",
    icon: DollarSign,
    path: "/bancos",
    x: 430,
    y: 335,
    toneClass: "bg-gradient-to-b from-[#aa73bf] to-[#76488c]",
    wide: true,
  },
];

const cardBaseClass =
  "absolute grid translate-x-[-50%] translate-y-[-50%] grid-rows-[1fr_auto] border border-[rgba(0,0,0,0.5)] text-center [clip-path:polygon(12%_2%,88%_2%,100%_32%,87%_98%,13%_98%,0_32%)] [box-shadow:inset_0_8px_10px_rgba(255,255,255,0.28),inset_0_-8px_8px_rgba(0,0,0,0.26),0_2px_3px_rgba(0,0,0,0.28)]";

const moduleIconSprites: Partial<Record<Module["id"], string>> = {
  compras: "/legacy/home-icons/compras.png",
  "inv-mr": "/legacy/home-icons/inventarios-mp.png",
  produccion: "/legacy/home-icons/produccion.png",
  "inv-pt": "/legacy/home-icons/inventarios-pt.png",
  ventas: "/legacy/home-icons/ventas.png",
  cxp: "/legacy/home-icons/cuentas-x-pagar.png",
  conta: "/legacy/home-icons/contabilidad.png",
  cxc: "/legacy/home-icons/cuentas-x-cobrar.png",
  bancos: "/legacy/home-icons/bancos.png"
};

const moduleSpriteSizes: Partial<Record<Module["id"], string>> = {
  compras: "w-[150px] h-auto",
  "inv-mr": "w-[150px] h-auto",
  produccion: "w-[150px] h-auto",
  "inv-pt": "w-[150px] h-auto",
  ventas: "w-[150px] h-auto",
  cxp: "w-[150px] h-auto",
  conta: "w-[150px] h-auto",
  cxc: "w-[150px] h-auto",
  bancos:"w-[150px] h-auto"
};

function ModuleIconView({ module }: { module: Module }) {
  const spritePath = moduleIconSprites[module.id];
  if (spritePath) {
    const spriteSizeClass = moduleSpriteSizes[module.id] ?? "w-[10px] h-auto";
    return (
      <img
        src={spritePath}
        alt=""
        className={[
          "max-w-none select-none object-contain [filter:drop-shadow(0_1px_1px_rgba(0,0,0,0.45))]",
          spriteSizeClass,
        ].join(" ")}
      />
    );
  }

  return (
    <module.icon
      strokeWidth={2.35}
      className={[
        "text-[#f0f0f0] [filter:drop-shadow(0_1px_1px_rgba(0,0,0,0.45))]",
        module.wide ? "h-8 w-8" : "h-6 w-6",
      ].join(" ")}
    />
  );
}

function ModuleContent({ module }: { module: Module }) {
  const hasSprite = Boolean(moduleIconSprites[module.id]);

  if (hasSprite) {
    return (
      <>
        <div className="grid h-full w-full place-items-center self-center">
          <ModuleIconView module={module} />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="relative mt-px grid h-[26px] w-full place-items-center self-center">
        <ModuleIconView module={module} />
      </div>
      <div className="bg-[rgba(0,0,0,0.32)] text-[10px] leading-[1.45] font-bold tracking-[0.2px] text-[#f5f5f5]">
        {module.label}
      </div>
    </>
  );
}

function HomePage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#9a9a9a] text-[13px] text-[#202020] [font-family:Tahoma,'Segoe_UI',sans-serif]">
      <section className="min-h-[640px] w-[min(980px,calc(100vw-8px))] overflow-hidden border border-[#2f8ce8] bg-white shadow-[inset_0_0_0_1px_#dcecff]">
        <header className="flex items-center justify-between px-12 pt-[46px] max-[980px]:px-5 max-[980px]:pt-6">
          <img src="logo-tuvansa.png" alt="" />
        </header>

        <section
          aria-label="Mapa de modulos ERP"
          className="relative mx-auto mt-[12px] h-[430px] w-[860px] origin-top max-[980px]:mb-[-42px] max-[980px]:mt-2 max-[980px]:scale-[0.78]"
        >
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 860 430" aria-hidden="true">
            <g className="fill-none stroke-[#d7d7d7] [stroke-width:2]">
              <path d="M110 180 C175 132, 300 108, 430 90" />
              <path d="M430 90 C550 108, 670 130, 750 180" />
              <path d="M110 180 C175 230, 232 248, 280 255" />
              <path d="M750 180 C684 232, 634 248, 580 255" />
              <path d="M280 125 C340 165, 384 192, 430 205" />
              <path d="M580 125 C520 165, 478 192, 430 205" />
              <path d="M280 255 C334 292, 382 318, 430 335" />
              <path d="M580 255 C525 292, 476 318, 430 335" />
              <path d="M280 255 C340 236, 386 220, 430 205" />
              <path d="M580 255 C520 236, 474 220, 430 205" />
            </g>
          </svg>

          {modules.map((module) => {
            const hasSprite = Boolean(moduleIconSprites[module.id]);
            const style = {
              left: module.x,
              top: module.y,
              width: hasSprite ? 190 : module.wide ? 146 : 104,
              height: hasSprite ? 110 : module.wide ? 50 : 46,
            };
            const cardClass = hasSprite
              ? "absolute grid translate-x-[-50%] translate-y-[-50%] place-items-center bg-transparent p-0"
              : [cardBaseClass, module.wide ? "h-[50px] w-[146px]" : "h-[46px] w-[104px]", module.toneClass].join(" ");
            const interactiveClass = hasSprite
              ? `${cardClass} cursor-pointer hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d4ed8]`
              : `${cardClass} cursor-pointer hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d4ed8]`;

            if (module.path) {
              const modulePath = module.path;
              return (
                <button
                  key={module.id}
                  type="button"
                  style={style}
                  onClick={() => navigate(modulePath)}
                  className={interactiveClass}
                >
                  <ModuleContent module={module} />
                </button>
              );
            }

            return (
              <article key={module.id} style={style} className={cardClass}>
                <ModuleContent module={module} />
              </article>
            );
          })}
        </section>

        <footer className="">
          <section className="text-center text-[#2f2f2f]">
            <p className="m-0 font-bold">TUBERIA Y VALVULAS DEL NORTE, S.A. DE C.V</p>
            <p className="m-0 font-semibold">© Soporte Sistemas Mexico</p>
          </section>
        </footer>
      </section>
    </main>
  );
}

export default HomePage;
