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
    x: 72,
    y: 130,
    toneClass: "bg-gradient-to-b from-[#f4c90f] to-[#b99600]",
  },
  {
    id: "inv-mr",
    label: "INVENTARIOS M.R",
    icon: FileText,
    badge: "MP",
    path: "/inventarios",
    x: 190,
    y: 95,
    toneClass: "bg-gradient-to-b from-[#ff9f43] to-[#c26514]",
  },
  {
    id: "produccion",
    label: "PRODUCCION",
    icon: Cog,
    x: 320,
    y: 60,
    toneClass: "bg-gradient-to-b from-[#7a6843] to-[#4f4323]",
  },
  {
    id: "inv-pt",
    label: "INVENTARIOS P.T",
    icon: FileText,
    badge: "PT",
    path: "/inventarios",
    x: 450,
    y: 95,
    toneClass: "bg-gradient-to-b from-[#58d3fa] to-[#2e95bc]",
  },
  {
    id: "ventas",
    label: "VENTAS",
    icon: Printer,
    path: "/ventas",
    x: 565,
    y: 130,
    toneClass: "bg-gradient-to-b from-[#4a67ce] to-[#2c3f8f]",
  },
  {
    id: "cxp",
    label: "CTAS. X PAGAR",
    icon: Database,
    x: 190,
    y: 182,
    toneClass: "bg-gradient-to-b from-[#b22c5f] to-[#6f1a3b]",
  },
  {
    id: "conta",
    label: "CONTABILIDAD",
    icon: Scale,
    x: 320,
    y: 147,
    toneClass: "bg-gradient-to-b from-[#729b69] to-[#4c6f45]",
  },
  {
    id: "cxc",
    label: "CTAS. X COBRAR",
    icon: Database,
    x: 450,
    y: 182,
    toneClass: "bg-gradient-to-b from-[#3679d9] to-[#25509b]",
  },
  {
    id: "bancos",
    label: "BANCOS",
    icon: DollarSign,
    x: 320,
    y: 245,
    toneClass: "bg-gradient-to-b from-[#aa73bf] to-[#76488c]",
    wide: true,
  },
];

const cardBaseClass =
  "absolute grid translate-x-[-50%] translate-y-[-50%] grid-rows-[1fr_auto] border border-[rgba(0,0,0,0.5)] text-center [clip-path:polygon(12%_2%,88%_2%,100%_32%,87%_98%,13%_98%,0_32%)] [box-shadow:inset_0_8px_10px_rgba(255,255,255,0.28),inset_0_-8px_8px_rgba(0,0,0,0.26),0_2px_3px_rgba(0,0,0,0.28)]";

function ModuleContent({ module }: { module: Module }) {
  return (
    <>
      <div className="relative mt-px grid h-[26px] w-full place-items-center self-center">
        <module.icon
          strokeWidth={2.35}
          className={[
            "text-[#f0f0f0] [filter:drop-shadow(0_1px_1px_rgba(0,0,0,0.45))]",
            module.wide ? "h-8 w-8" : "h-6 w-6",
          ].join(" ")}
        />
        {module.badge && (
          <span
            className={[
              "absolute top-[2px] text-[9px] leading-none font-extrabold tracking-[0.2px] text-[#e8e8e8] [text-shadow:0_1px_1px_rgba(0,0,0,0.45)]",
              module.wide ? "right-12" : "right-[30px]",
            ].join(" ")}
          >
            {module.badge}
          </span>
        )}
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


      <section className="min-h-[530px] w-[min(760px,calc(100vw-8px))] overflow-hidden border border-[#2f8ce8] bg-white shadow-[inset_0_0_0_1px_#dcecff]">
        <header className="flex items-center justify-between px-12 pt-[46px] max-[980px]:px-5 max-[980px]:pt-6">

            <img src="logo-tuvansa.png" alt="" />

        </header>

        <section
          aria-label="Mapa de modulos ERP"
          className="relative mx-auto mt-[26px] h-[290px] w-[640px] origin-top max-[980px]:mb-[-42px] max-[980px]:mt-2 max-[980px]:scale-[0.78]"
        >
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 640 290" aria-hidden="true">
            <g className="fill-none stroke-[#d7d7d7] [stroke-width:2]">
              <path d="M72 130 C125 85, 250 75, 320 60" />
              <path d="M320 60 C385 70, 500 90, 565 130" />
              <path d="M72 130 C125 170, 170 178, 190 182" />
              <path d="M565 130 C530 165, 485 178, 450 182" />
              <path d="M190 95 C240 130, 280 145, 320 147" />
              <path d="M450 95 C405 130, 365 145, 320 147" />
              <path d="M190 182 C230 210, 275 228, 320 245" />
              <path d="M450 182 C410 210, 365 228, 320 245" />
              <path d="M190 182 C245 168, 280 160, 320 147" />
              <path d="M450 182 C395 168, 360 160, 320 147" />
            </g>
          </svg>

          {modules.map((module) => {
            const style = { left: module.x, top: module.y };
            const cardClass = [
              cardBaseClass,
              module.wide ? "h-[50px] w-[146px]" : "h-[46px] w-[104px]",
              module.toneClass,
            ].join(" ");

            if (module.path) {
              const modulePath = module.path;
              return (
                <button
                  key={module.id}
                  type="button"
                  style={style}
                  onClick={() => navigate(modulePath)}
                  className={`${cardClass} cursor-pointer hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d4ed8]`}
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
          {/* <section className="grid gap-2">
            <div className="flex gap-[10px]">
              <button
                type="button"
                className="min-w-[70px] border border-[#44601b] bg-gradient-to-b from-[#8ab457] to-[#5f812b] px-[9px] py-[2px] text-xs text-[#f4f7ee] shadow-[inset_0_1px_0_#ffffff]"
              >
                S.I.G
              </button>
            </div>
            <div className="text-4xl leading-none font-extrabold tracking-[-1px] text-[#818181] lowercase">
              redi merchandizing
            </div>
            <button
              type="button"
              className="w-full border border-[#6f6f6f] bg-gradient-to-b from-[#f3f3f3] to-[#cdcdcd] px-[9px] py-[2px] text-xs text-[#1f1f1f] shadow-[inset_0_1px_0_#ffffff]"
            >
              Datos Generales
            </button>
          </section> */}

          <section className="text-center text-[#2f2f2f]">
            <p className="m-0 font-bold">TUBERIA Y VALVULAS DEL NORTE, S.A. DE C.V</p>
           
            <p className="m-0 font-semibold">© Soporte Sistemas Mexico</p>
          </section>

          {/* <section className="grid gap-2">
            <div className="flex gap-[10px] max-[980px]:justify-start">
              <button
                type="button"
                className="min-w-[70px] border border-[#44601b] bg-gradient-to-b from-[#8ab457] to-[#5f812b] px-[9px] py-[2px] text-xs text-[#f4f7ee] shadow-[inset_0_1px_0_#ffffff]"
              >
                POS
              </button>
              <button
                type="button"
                className="min-w-[70px] border border-[#44601b] bg-gradient-to-b from-[#8ab457] to-[#5f812b] px-[9px] py-[2px] text-xs text-[#f4f7ee] shadow-[inset_0_1px_0_#ffffff]"
              >
                Back office
              </button>
              <button
                type="button"
                className="min-w-[70px] border border-[#44601b] bg-gradient-to-b from-[#8ab457] to-[#5f812b] px-[9px] py-[2px] text-xs text-[#f4f7ee] shadow-[inset_0_1px_0_#ffffff]"
              >
                Sig POS
              </button>
            </div>
            <button
              type="button"
              className="w-full border border-[#6f6f6f] bg-gradient-to-b from-[#f3f3f3] to-[#cdcdcd] px-[9px] py-[2px] text-xs text-[#1f1f1f] shadow-[inset_0_1px_0_#ffffff]"
            >
              Salir
            </button>
          </section> */}
        </footer>
      </section>
    </main>
  );
}

export default HomePage;
