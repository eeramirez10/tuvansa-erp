import "./App.css";

type Module = {
  id: string;
  label: string;
  tag: string;
  x: number;
  y: number;
  tone: string;
  size?: "normal" | "wide";
};

const modules: Module[] = [
  { id: "compras", label: "COMPRAS", tag: "CP", x: 72, y: 130, tone: "gold" },
  {
    id: "inv-mr",
    label: "INVENTARIOS M.R",
    tag: "MP",
    x: 190,
    y: 95,
    tone: "orange",
  },
  {
    id: "produccion",
    label: "PRODUCCION",
    tag: "PR",
    x: 320,
    y: 60,
    tone: "olive",
  },
  {
    id: "inv-pt",
    label: "INVENTARIOS P.T",
    tag: "PT",
    x: 450,
    y: 95,
    tone: "cyan",
  },
  { id: "ventas", label: "VENTAS", tag: "VT", x: 565, y: 130, tone: "indigo" },
  {
    id: "cxp",
    label: "CTAS. X PAGAR",
    tag: "XP",
    x: 190,
    y: 182,
    tone: "wine",
  },
  {
    id: "conta",
    label: "CONTABILIDAD",
    tag: "CT",
    x: 320,
    y: 147,
    tone: "green",
  },
  {
    id: "cxc",
    label: "CTAS. X COBRAR",
    tag: "XC",
    x: 450,
    y: 182,
    tone: "blue",
  },
  {
    id: "bancos",
    label: "BANCOS",
    tag: "$",
    x: 320,
    y: 245,
    tone: "purple",
    size: "wide",
  },
];

function App() {
  return (
    <main className="desktop-shell">
      <div className="window-chrome">
        <div className="title-row">
          Tienda 0.0&nbsp;&nbsp; Cajero SISTEMAS&nbsp;&nbsp; SES: 8522&nbsp;&nbsp;
          UBI: 0&nbsp;&nbsp; 09/04/2026 12:08:35
        </div>
        <div className="menu-row">Archivo&nbsp;&nbsp; Edit&nbsp;&nbsp; Proscai&nbsp;&nbsp; Help</div>
      </div>

      <section className="erp-window">
        <header className="brand-row">
          <div className="proscai-brand">
            <span className="proscai-icon" />
            <span className="proscai-name">Proscai</span>
          </div>
          <div className="tuvansa-badge">
            <span className="tuvansa-tag">desde 1956</span>
            <span className="tuvansa-name">tuvansa</span>
          </div>
        </header>

        <section className="module-stage" aria-label="Mapa de modulos ERP">
          <svg className="module-lines" viewBox="0 0 640 290" aria-hidden="true">
            <g>
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

          {modules.map((module) => (
            <article
              key={module.id}
              className={`module-card tone-${module.tone} size-${module.size ?? "normal"}`}
              style={{ left: module.x, top: module.y }}
            >
              <div className="module-tag">{module.tag}</div>
              <div className="module-label">{module.label}</div>
            </article>
          ))}
        </section>

        <footer className="bottom-row">
          <section className="bottom-left">
            <div className="mini-buttons">
              <button type="button" className="green-btn">
                S.I.G
              </button>
            </div>
            <div className="legacy-brand">redi merchandizing</div>
            <button type="button" className="gray-btn">
              Datos Generales
            </button>
          </section>

          <section className="bottom-center">
            <p>TUBERIA Y VALVULAS DEL NORTE, S.A. DE C.V</p>
            <p>SISTEMAS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5</p>
            <p className="support-copy">© Soporte Proscai, SC</p>
          </section>

          <section className="bottom-right">
            <div className="mini-buttons">
              <button type="button" className="green-btn">
                POS
              </button>
              <button type="button" className="green-btn">
                Back office
              </button>
              <button type="button" className="green-btn">
                Sig POS
              </button>
            </div>
            <button type="button" className="gray-btn">
              Salir
            </button>
          </section>
        </footer>
      </section>
    </main>
  );
}

export default App;
