import { Check, Square, X } from "lucide-react";
import { useInventorySearchModal } from "../hooks/useInventorySearchModal";

const MODAL_GRID_COLUMNS = "grid-cols-[170px_1fr_110px_100px_110px]";

const formatInactiveDate = (value: string | null): string => {
  if (!value || value.startsWith("1900-12-31")) {
    return "";
  }

  const [year, month, day] = value.slice(0, 10).split("-");

  if (!year || !month || !day) {
    return "";
  }

  return `${day}/${month}/${year}`;
};

const formatStockActual = (value: number | null): string => {
  if (value === null || Number.isNaN(value)) {
    return "0.000";
  }

  return value.toFixed(3);
};

function InventorySearchModal() {
  const {
    isOpen,
    searchCode,
    searchDescription,
    activeCode,
    list,
    isListLoading,
    listError,
    setSearchCode,
    setSearchDescription,
    closeModal,
    selectRow,
    selectProduct,
    confirmSelect,
    handleSearchSubmit,
    handleCodeInputTab,
    handleDescriptionInputTab
  } = useInventorySearchModal();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <section className="flex h-[min(560px,78vh)] w-[min(980px,92vw)] flex-col border border-[#8f8f8f] bg-[#ececec] shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
        <header className="flex h-[46px] items-center justify-between border-b border-[#9f9f9f] bg-[#e7e7e7] px-3">
          <div className="flex items-center gap-2">
            <span className="h-[14px] w-[14px] border border-[#9baad0] bg-[#f4f4f4]" />
            <h2 className="text-[13px] leading-none font-semibold text-[#1f2e43]">Encuentra producto</h2>
          </div>
          <div className="flex items-center gap-[6px]">
            <button
              type="button"
              className="grid h-[24px] w-[24px] place-items-center border border-[#7f7f7f] bg-[#ededed] text-[#334155]"
            >
              <Square className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="grid h-[24px] w-[24px] place-items-center border border-[#7f7f7f] bg-[#ededed] text-[#334155]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </header>

        <section className="flex min-h-0 flex-1 flex-col px-[6px] pt-[4px]">
          <div
            className={`grid h-[46px] ${MODAL_GRID_COLUMNS} border border-[#8f8f8f] bg-[#e5e5e5] text-[11px] leading-none font-semibold text-[#1e293b]`}
          >
            <span className="flex items-center justify-center border-r border-[#8f8f8f]">Código</span>
            <span className="flex items-center justify-center border-r border-[#8f8f8f]">Descripción</span>
            <span className="flex items-center justify-center border-r border-[#8f8f8f]">Stock</span>
            <span className="flex items-center justify-center border-r border-[#8f8f8f]">Alms</span>
            <span className="flex items-center justify-center">Baja</span>
          </div>

          <form
            onSubmit={handleSearchSubmit}
            className={`grid h-[36px] ${MODAL_GRID_COLUMNS} border border-t-0 border-[#8f8f8f] bg-[#efefef] px-[1px] py-[2px]`}
          >
            <input
              value={searchCode}
              onChange={(event) => setSearchCode(event.target.value)}
              onKeyDown={handleCodeInputTab}
              className="mx-[1px] h-[30px] border border-[#b5b5b5] bg-[#f9f9f9] px-2 text-[11px] text-[#1f2937] outline-none"
              placeholder="Código"
              autoFocus
            />
            <input
              value={searchDescription}
              onChange={(event) => setSearchDescription(event.target.value)}
              onKeyDown={handleDescriptionInputTab}
              className="mx-[1px] h-[30px] border border-[#b5b5b5] bg-[#f9f9f9] px-2 text-[11px] text-[#1f2937] outline-none"
              placeholder="Descripción"
            />
            <span />
            <span />
          </form>

          <div className="min-h-0 flex-1 overflow-y-auto border border-t-0 border-[#8f8f8f] bg-[#f5f5f5]">
            {listError ? <div className="px-2 py-2 text-[11px] font-semibold text-[#8f2b2b]">{listError}</div> : null}

            {isListLoading ? <div className="px-2 py-2 text-[11px] font-semibold text-[#4b5561]">Buscando...</div> : null}

            {!isListLoading && list.length === 0 ? (
              <div className="px-2 py-2 text-[11px] font-semibold text-[#4b5561]">Sin resultados</div>
            ) : null}

            {list.map((item) => {
              const isActive = activeCode === item.code;

              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => selectRow(item.code)}
                  onDoubleClick={() => {
                    void selectProduct(item.code);
                  }}
                  className={[
                    `grid h-[34px] w-full ${MODAL_GRID_COLUMNS} border-b border-[#b4b4b4] text-left text-[11px] leading-none`,
                    isActive ? "bg-[#dbe8f6]" : "bg-[#f4f4f4]",
                  ].join(" ")}
                >
                  <span className="truncate border-r border-[#8f8f8f] px-2 py-[6px] font-semibold text-[#1f2e43]">
                    {item.code}
                  </span>
                  <span className="truncate border-r border-[#8f8f8f] px-2 py-[6px] text-[#1f2e43]">{item.description}</span>
                  <span className="border-r border-[#8f8f8f] px-2 py-[6px] text-right text-[#1f2e43]">
                    {formatStockActual(item.stockActual)}
                  </span>
                  <span className="border-r border-[#8f8f8f] px-2 py-[6px] text-right text-[#1f2e43]">0.00</span>
                  <span className="px-2 py-[6px] text-right text-[#1f2e43]">{formatInactiveDate(item.inactiveAt)}</span>
                </button>
              );
            })}
          </div>
        </section>

        <footer className="border-t border-[#9f9f9f] px-[6px] pt-[4px] pb-[6px]">
          <input
            value={String(list.length)}
            readOnly
            className="h-[30px] w-[280px] border border-[#9f9f9f] bg-[#f8f8f8] px-2 text-[11px] text-[#1f2e43]"
          />

          <div className="mt-[6px] flex items-center justify-end gap-3">
            <button
              type="button"
              className="h-[44px] min-w-[170px] border border-[#969696] bg-[#dedede] px-4 text-[11px] leading-none font-semibold text-[#1f2e43]"
            >
              Familias
            </button>
            <button
              type="button"
              className="h-[44px] min-w-[210px] border border-[#969696] bg-[#dedede] px-4 text-[11px] leading-none font-semibold text-[#1f2e43]"
            >
              Matriz de fotos
            </button>
            <button
              type="button"
              onClick={() => {
                void confirmSelect();
              }}
              disabled={!activeCode || isListLoading}
              className="flex h-[44px] min-w-[120px] items-center justify-center gap-2 border border-[#969696] bg-[#dedede] px-4 text-[11px] leading-none font-semibold text-[#1f2e43] disabled:opacity-50"
            >
              <Check className="h-5 w-5 text-[#1f8b39]" />
              OK
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="flex h-[44px] min-w-[150px] items-center justify-center gap-2 border border-[#969696] bg-[#dedede] px-4 text-[11px] leading-none font-semibold text-[#1f2e43]"
            >
              <X className="h-5 w-5 text-[#d63636]" />
              Cancelar
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}

export default InventorySearchModal;
