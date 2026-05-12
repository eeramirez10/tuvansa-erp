import { useEffect, useState, type ReactNode } from "react";
import { Info, X } from "lucide-react";
import { MODAL_IDS, type ModalId } from "../../ui/store/modal.store";
import { useModal } from "../../ui/hooks/useModal";
import { ManagedWindowFrame } from "../../ui/components/ManagedWindowFrame";
import { ManagedWindowLayer } from "../../ui/components/ManagedWindowLayer";
import {
  getInventoryDocumentDetailByDseq,
  searchInventoryDocuments
} from "../api/inventories.api";
import type {
  InventoryDocumentDetailLine,
  InventoryDocumentSearchRow
} from "../types/inventory.types";
import { LegacyModalLoader } from "../../shared/components/legacy-form/LegacyModalLoader";

type Column = {
  label: string;
  width: string;
  align?: "left" | "right" | "center";
};

type LegacyWindowProps = {
  modalId: ModalId;
  title: string;
  className: string;
  children: ReactNode;
};

const legacyInputClass = "inline-flex h-[18px] items-center border border-[#b8c1cb] bg-[#e1e1e1] px-[4px] text-[11px] text-[#1f2933]";
const legacyButtonClass = "h-[23px] border border-[#a5abb1] bg-[#dedede] px-3 text-[11px] leading-[20px] text-[#111827]";

function LegacyWindow({ modalId, title, className, children }: LegacyWindowProps) {
  const { isOpen, close } = useModal(modalId);

  return (
    <ManagedWindowFrame
      windowId={modalId}
      isOpen={isOpen}
      title={title}
      className={className}
      onClose={close}
    >
      {children}
    </ManagedWindowFrame>
  );
}

function LegacyTable({ columns, minRows = 12 }: { columns: readonly Column[]; minRows?: number }) {
  return (
    <div className="modal-scroll min-h-0 flex-1 overflow-auto bg-white">
      <table className="w-max min-w-full border-collapse text-[11px] leading-none text-black">
        <thead className="sticky top-0 z-10 bg-white">
          <tr>
            {columns.map((column) => (
              <th
                key={column.label}
                className={`${column.width} border border-[#a8a8a8] px-[3px] py-[5px] font-normal ${column.align === "right" ? "text-right" : column.align === "center" ? "text-center" : "text-left"}`}
              >
                {column.label}
              </th>
            ))}
            <th className="w-[28px] border border-[#b7b7b7] bg-[#c5c5c5]" />
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: minRows }, (_, rowIndex) => (
            <tr key={rowIndex} className="h-[18px]">
              {columns.map((column) => (
                <td key={`${rowIndex}-${column.label}`} className={`${column.width} border border-[#b7b7b7] px-[3px]`} />
              ))}
              <td className="w-[28px] border border-[#b7b7b7] bg-[#f1f1f1]" />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ReadonlyBox({ className = "", children = "" }: { className?: string; children?: ReactNode }) {
  return <span className={`${legacyInputClass} justify-end ${className}`}>{children}</span>;
}

function ReadonlyButton({
  className = "",
  children = "",
  onClick
}: {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${legacyInputClass} justify-start text-left ${className}`}
    >
      {children}
    </button>
  );
}

function ModalFooter({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <footer className={`shrink-0 border-t border-[#a7a7a7] bg-[#ececec] px-[6px] py-[5px] ${className}`}>{children}</footer>;
}

const formatLegacyDate = (value: string | null): string => {
  if (!value) {
    return "";
  }

  const [year, month, day] = value.slice(0, 10).split("-");
  if (!year || !month || !day) {
    return "";
  }

  return `${day}/${month}/${year}`;
};

const formatNumeric = (value: number | null, decimals: number): string => {
  if (value === null || Number.isNaN(value)) {
    return "";
  }

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: true,
  }).format(value);
};

const bonificacionesColumns = [
  { label: "Proveedor", width: "w-[86px]" },
  { label: "Refer.", width: "w-[92px]" },
  { label: "Fecha", width: "w-[96px]" },
  { label: "Cant.", width: "w-[68px]", align: "right" },
  { label: "Costo Ant.", width: "w-[78px]", align: "right" },
  { label: "Costo nvo.", width: "w-[84px]", align: "right" },
  { label: "$ Vta. ant", width: "w-[74px]", align: "right" },
  { label: "$ Vta nvo.", width: "w-[76px]", align: "right" },
  { label: "Gr. desc.", width: "w-[72px]" },
  { label: "Obs", width: "w-[270px]" },
] as const;

const wipColumns = [
  { label: "OP", width: "w-[84px]" },
  { label: "Operación", width: "w-[120px]" },
  { label: "Ord", width: "w-[42px]" },
  { label: "Solicitado", width: "w-[90px]", align: "right" },
  { label: "Recibido", width: "w-[90px]", align: "right" },
  { label: "Resta", width: "w-[80px]", align: "right" },
  { label: "Tiempo", width: "w-[78px]" },
  { label: "Inicio", width: "w-[84px]" },
  { label: "Máquina", width: "w-[110px]" },
] as const;

const piezasSurtidasColumns = [
  { label: "Código", width: "w-[126px]" },
  { label: "Pzs.", width: "w-[34px]", align: "right" },
  { label: "Cant", width: "w-[92px]", align: "right" },
  { label: "Alm", width: "w-[40px]" },
  { label: "Pedido", width: "w-[78px]" },
  { label: "Refer.", width: "w-[106px]" },
  { label: "Alta", width: "w-[132px]" },
  { label: "Recep", width: "w-[70px]" },
  { label: "Factura", width: "w-[126px]" },
] as const;

const habilitacionesColumns = [
  { label: "Docto", width: "w-[150px]" },
  { label: "Nec.", width: "w-[78px]", align: "right" },
  { label: "Surt.", width: "w-[78px]", align: "right" },
  { label: "Resta", width: "w-[78px]", align: "right" },
] as const;

const documentosColumns = [
  { label: "Producto", width: "w-[94px]" },
  { label: "Descripción", width: "w-[272px]" },
  { label: "Entradas", width: "w-[76px]", align: "right" },
  { label: "Salidas", width: "w-[76px]", align: "right" },
  { label: "UM", width: "w-[34px]" },
  { label: "Costo", width: "w-[84px]", align: "right" },
  { label: "Pzas.", width: "w-[52px]", align: "right" },
  { label: "Alm.", width: "w-[46px]" },
  { label: "Usr.", width: "w-[42px]" },
  { label: "TM", width: "w-[40px]" },
] as const;

const documentosSearchColumns = [
  { label: "Documento", width: "w-[112px]" },
  { label: "Fecha", width: "w-[88px]" },
  { label: "Ref.", width: "w-[92px]" },
  { label: "Ref. 2", width: "w-[92px]" },
  { label: "Alm", width: "w-[70px]" },
  { label: "Proveedor", width: "w-[96px]" },
  { label: "Cliente", width: "w-[96px]" },
] as const;

const cotizadoColumns = [
  { label: "Código", width: "w-[84px]" },
  { label: "Descripción", width: "w-[210px]" },
  { label: "OC", width: "w-[60px]" },
  { label: "UM", width: "w-[40px]" },
  { label: "Pedido", width: "w-[70px]", align: "right" },
  { label: "Surtido", width: "w-[70px]", align: "right" },
  { label: "Resta", width: "w-[70px]", align: "right" },
  { label: "Fecha", width: "w-[70px]" },
  { label: "Fecha E.", width: "w-[78px]" },
  { label: "Obs....", width: "w-[250px]" },
  { label: "Fecha 2", width: "w-[68px]" },
] as const;

const curvaColumns = [
  { label: "PRODUCTO", width: "w-[104px]" },
  { label: "TIPO", width: "w-[104px]" },
  { label: "MATERIAL", width: "w-[104px]" },
  { label: "EXTREMOS", width: "w-[104px]" },
  { label: "PRODUCTO", width: "w-[82px]" },
  { label: "PRODUCTO", width: "w-[82px]" },
  { label: "PARA", width: "w-[58px]" },
  { label: "Total", width: "w-[82px]", align: "right" },
  { label: "Bien v.", width: "w-[82px]", align: "right" },
  { label: "Ofertado", width: "w-[82px]", align: "right" },
  { label: "%", width: "w-[46px]", align: "right" },
  { label: "Presupuesto", width: "w-[92px]", align: "right" },
  { label: "%", width: "w-[46px]", align: "right" },
  { label: "Curva", width: "w-[54px]" },
  { label: "Facto", width: "w-[58px]" },
] as const;

export function InventoryBonificacionesModal() {
  return (
    <LegacyWindow modalId={MODAL_IDS.INVENTORY_BONIFICACIONES} title="Relación de bonificaciones" className="h-[min(480px,74vh)] w-[min(1016px,94vw)]">
      <LegacyTable columns={bonificacionesColumns} minRows={20} />
    </LegacyWindow>
  );
}

export function InventoryWipModal() {
  return (
    <LegacyWindow modalId={MODAL_IDS.INVENTORY_WIP} title="W.I.P." className="h-[min(292px,64vh)] w-[min(682px,92vw)]">
      <LegacyTable columns={wipColumns} minRows={12} />
      <ModalFooter className="flex items-center gap-[98px]">
        <button type="button" className={`${legacyButtonClass} w-[132px]`}>
          Filtrar surtidos
        </button>
        <div className="flex gap-[10px]">
          <ReadonlyBox className="w-[72px]">0.00</ReadonlyBox>
          <ReadonlyBox className="w-[76px]">0.00</ReadonlyBox>
        </div>
      </ModalFooter>
    </LegacyWindow>
  );
}

export function InventoryPiezasSurtidasModal() {
  return (
    <LegacyWindow modalId={MODAL_IDS.INVENTORY_PIEZAS_SURTIDAS} title="Piezas (Surtidas)" className="h-[min(326px,68vh)] w-[min(736px,92vw)]">
      <LegacyTable columns={piezasSurtidasColumns} minRows={13} />
      <ModalFooter className="flex items-center gap-[4px]">
        <ReadonlyBox className="ml-[44px] w-[84px]">0</ReadonlyBox>
        <ReadonlyBox className="ml-[14px] w-[86px]">0.000</ReadonlyBox>
        <button type="button" className={`${legacyButtonClass} w-[76px]`}>
          Etiqueta
        </button>
        <button type="button" className={`${legacyButtonClass} w-[76px]`}>
          Devolución
        </button>
        <button type="button" className={`${legacyButtonClass} w-[84px]`}>
          Baja
        </button>
        <button type="button" className={`${legacyButtonClass} w-[92px]`}>
          Filtrar almacén
        </button>
      </ModalFooter>
    </LegacyWindow>
  );
}

export function InventoryPiezasModal() {
  const { isOpen, close } = useModal(MODAL_IDS.INVENTORY_PIEZAS);

  return (
    <ManagedWindowLayer windowId={MODAL_IDS.INVENTORY_PIEZAS} isOpen={isOpen}>
      <section className="w-[350px] border border-[#9da3a8] bg-[#f2f2f2] text-[11px] text-black shadow">
        <div className="flex items-center gap-[12px] px-[10px] py-[36px]">
          <span className="grid h-[30px] w-[30px] place-items-center rounded-full bg-[#0878cc] text-white">
            <Info className="h-[18px] w-[18px]" />
          </span>
          <span>Esta versión no contiene el módulo de PIEZAS</span>
        </div>
        <div className="flex justify-end border-t border-[#d3d3d3] px-[12px] py-[9px]">
          <button type="button" onClick={close} className="h-[22px] w-[66px] border border-[#0078d7] bg-[#f5f5f5] text-[11px]">
            OK
          </button>
        </div>
      </section>
    </ManagedWindowLayer>
  );
}

export function InventoryHabilitacionesPendientesModal() {
  return (
    <LegacyWindow modalId={MODAL_IDS.INVENTORY_HABILITACIONES_PENDIENTES} title="Habilitaciones pendientes" className="h-[min(230px,58vh)] w-[min(344px,86vw)]">
      <LegacyTable columns={habilitacionesColumns} minRows={8} />
      <ModalFooter className="flex justify-end gap-[8px]">
        <ReadonlyBox className="w-[64px]">0</ReadonlyBox>
        <ReadonlyBox className="w-[64px]">0</ReadonlyBox>
        <ReadonlyBox className="w-[64px]">0</ReadonlyBox>
      </ModalFooter>
    </LegacyWindow>
  );
}

export function InventoryDocumentosModal() {
  const { isOpen: isDocumentosOpen } = useModal(MODAL_IDS.INVENTORY_DOCUMENTOS);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchRows, setSearchRows] = useState<InventoryDocumentSearchRow[]>([]);
  const [selectedSearchIndex, setSelectedSearchIndex] = useState<number>(-1);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [selectedDseq, setSelectedDseq] = useState<number | null>(null);
  const [selectedDocumentTm, setSelectedDocumentTm] = useState("");
  const [documentLines, setDocumentLines] = useState<InventoryDocumentDetailLine[]>([]);
  const [isDocumentLoading, setIsDocumentLoading] = useState(false);
  const [documentError, setDocumentError] = useState<string | null>(null);
  const [documentData, setDocumentData] = useState({
    document: "",
    reference: "",
    clientCode: "",
    clientName: "",
    date: "",
    warehouse: "",
    tipmv: "",
    desfact: "",
    desinv: "",
    dalmacen: "",
    diuseq: "",
  });
  const emptySearchFilters = {
    documento: "",
    fecha: "",
    ref: "",
    ref2: "",
    alm: "",
    proveedor: "",
    cliente: ""
  };
  const [searchFilters, setSearchFilters] = useState({
    ...emptySearchFilters
  });
  const [submittedSearchFilters, setSubmittedSearchFilters] = useState({
    ...emptySearchFilters
  });
  const totalEntries = documentLines.reduce((total, row) => total + (row.entries ?? 0), 0);
  const totalEntriesCost = documentLines.reduce(
    (total, row) => total + ((row.entries ?? 0) * (row.cost ?? 0)),
    0
  );

  const submitSearchFilters = (): void => {
    setSubmittedSearchFilters({ ...searchFilters });
  };

  const [searchRequestKey, setSearchRequestKey] = useState(0);

  const haveSearchFiltersChanged = (): boolean => {
    return (Object.keys(emptySearchFilters) as Array<keyof typeof emptySearchFilters>).some((key) => {
      return searchFilters[key].trim() !== submittedSearchFilters[key].trim();
    });
  };

  const runSearch = (): void => {
    if (!haveSearchFiltersChanged()) {
      return;
    }

    submitSearchFilters();
    setSearchRequestKey((previous) => previous + 1);
  };

  const resetSearchModalState = (): void => {
    setSearchRows([]);
    setSelectedSearchIndex(-1);
    setSearchError(null);
    setIsSearchLoading(false);
    setSearchFilters({
      ...emptySearchFilters
    });
    setSubmittedSearchFilters({
      ...emptySearchFilters
    });
    setSearchRequestKey(0);
  };

  const closeSearchModal = (): void => {
    setIsSearchOpen(false);
    resetSearchModalState();
  };

  useEffect(() => {
    if (!isDocumentosOpen) {
      setIsSearchOpen(false);
      resetSearchModalState();
      setSelectedDseq(null);
      setSelectedDocumentTm("");
      setDocumentLines([]);
      setIsDocumentLoading(false);
      setDocumentError(null);
      setDocumentData({
        document: "",
        reference: "",
        clientCode: "",
        clientName: "",
        date: "",
        warehouse: "",
        tipmv: "",
        desfact: "",
        desinv: "",
        dalmacen: "",
        diuseq: "",
      });
    }
  }, [isDocumentosOpen]);

  useEffect(() => {
    if (!isSearchOpen) {
      setSearchRows([]);
      setSelectedSearchIndex(-1);
      setSearchError(null);
      setIsSearchLoading(false);
      return;
    }

    const hasSearchInput = Object.values(submittedSearchFilters).some((value) => value.trim().length > 0);

    if (!hasSearchInput) {
      setSearchRows([]);
      setSelectedSearchIndex(-1);
      setSearchError(null);
      setIsSearchLoading(false);
      return;
    }

    let isCancelled = false;
    const abortController = new AbortController();

    const timeoutId = window.setTimeout(() => {
      setIsSearchLoading(true);
      setSearchError(null);

      void searchInventoryDocuments({
        document: submittedSearchFilters.documento || undefined,
        date: submittedSearchFilters.fecha || undefined,
        ref: submittedSearchFilters.ref || undefined,
        ref2: submittedSearchFilters.ref2 || undefined,
        warehouse: submittedSearchFilters.alm || undefined,
        provider: submittedSearchFilters.proveedor || undefined,
        client: submittedSearchFilters.cliente || undefined,
        limit: 10,
        signal: abortController.signal
      })
        .then((response) => {
          if (!isCancelled) {
            setSearchRows(response.data);
            setSelectedSearchIndex(response.data.length > 0 ? 0 : -1);
          }
        })
        .catch((error: unknown) => {
          if (error instanceof DOMException && error.name === "AbortError") {
            return;
          }
          if (!isCancelled) {
            setSearchRows([]);
            setSelectedSearchIndex(-1);
            setSearchError(
              error instanceof Error ? error.message : "Error cargando búsqueda de documentos."
            );
          }
        })
        .finally(() => {
          if (!isCancelled) {
            setIsSearchLoading(false);
          }
        });
    }, 180);

    return () => {
      isCancelled = true;
      window.clearTimeout(timeoutId);
      abortController.abort();
    };
  }, [isSearchOpen, submittedSearchFilters, searchRequestKey]);

  useEffect(() => {
    if (selectedDseq === null) {
      setDocumentLines([]);
      setIsDocumentLoading(false);
      setDocumentError(null);
      return;
    }

    const abortController = new AbortController();
    setIsDocumentLoading(true);
    setDocumentError(null);

    void getInventoryDocumentDetailByDseq(selectedDseq, {
      tm: selectedDocumentTm || undefined,
      signal: abortController.signal
    })
      .then((response) => {
        const header = response.data.header;
        if (header) {
          setDocumentData({
            document: header.document ?? "",
            reference: header.reference ?? "",
            clientCode: header.clientCode ?? "",
            clientName: header.clientName ?? "",
            date: formatLegacyDate(header.date),
            warehouse: header.warehouse ?? ""
            ,
            tipmv: selectedDocumentTm || header.tipmv || "",
            desfact: header.desfact ?? "",
            desinv: header.desinv ?? "",
            dalmacen: header.dalmacen ?? "",
            diuseq: header.diuseq ?? "",
          });
        }

        setDocumentLines(response.data.lines);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setDocumentLines([]);
        setDocumentError(error instanceof Error ? error.message : "Error cargando documento.");
      })
      .finally(() => {
        if (!abortController.signal.aborted) {
          setIsDocumentLoading(false);
        }
      });

    return () => {
      abortController.abort();
    };
  }, [selectedDseq, selectedDocumentTm]);

  const applySelectedDocument = (row: InventoryDocumentSearchRow | null): void => {
    if (!row) {
      return;
    }

    const normalizedDseq =
      typeof row.dseq === "number" && Number.isFinite(row.dseq) && row.dseq > 0
        ? Math.trunc(row.dseq)
        : null;

    if (normalizedDseq === null) {
      setSearchError("El documento seleccionado no tiene DSEQ para cargar el detalle.");
      return;
    }

    setDocumentLines([]);
    setDocumentError(null);
    setSelectedDocumentTm(row.tm ?? "");
    setDocumentData({
      document: "",
      reference: "",
      clientCode: "",
      clientName: "",
      date: "",
      warehouse: "",
      tipmv: row.tm ?? "",
      desfact: "",
      desinv: "",
      dalmacen: "",
      diuseq: "",
    });
    setSelectedDseq(null);
    window.setTimeout(() => {
      setSelectedDseq(normalizedDseq);
    }, 0);
    closeSearchModal();
  };

  const selectedSearchRow =
    selectedSearchIndex >= 0 && selectedSearchIndex < searchRows.length
      ? searchRows[selectedSearchIndex]
      : null;

  return (
    <LegacyWindow modalId={MODAL_IDS.INVENTORY_DOCUMENTOS} title="Documentos de inventario" className="h-[500px] w-[862px] max-h-[78vh] max-w-[94vw]">
      <div className="relative flex min-h-0 flex-1 flex-col">
        <div className="flex shrink-0 justify-between gap-[8px] border-b border-[#a7a7a7] bg-[#ececec] px-[6px] py-[8px]">
          <div className="grid w-[548px] grid-cols-[72px_84px_64px_58px_1fr] gap-x-[6px] gap-y-[3px]">
            <label className="text-right leading-[18px]">Documento</label>
            <ReadonlyButton className="w-[84px]" onClick={() => setIsSearchOpen(true)}>
              {documentData.document}
            </ReadonlyButton>
            <button type="button" onClick={() => setIsSearchOpen(true)} className={`${legacyButtonClass} h-[18px] w-[60px] leading-[16px]`}>
              Buscar
            </button>
            <label className="text-right leading-[18px]">Referencia</label>
            <ReadonlyBox className="w-[278px] justify-start text-left">{documentData.reference}</ReadonlyBox>

            <label className="text-right leading-[18px]">Cliente</label>
            <ReadonlyBox className="w-[84px] justify-start text-left">{documentData.clientCode}</ReadonlyBox>
            <span />
            <span />
            <ReadonlyBox className="w-[360px] justify-start text-left">{documentData.clientName}</ReadonlyBox>

            <label className="text-right leading-[18px]">Fecha</label>
            <ReadonlyBox className="w-[84px] justify-start text-left">{documentData.date}</ReadonlyBox>
            <span />
            <span />
            <span />
          </div>

          <div className="grid w-[166px] grid-cols-2 gap-x-[2px] gap-y-[3px]">
            <ReadonlyBox className="w-[80px] justify-start text-left" />
            <ReadonlyBox className="w-[80px] justify-start text-left">{documentData.tipmv}</ReadonlyBox>
            <ReadonlyBox className="w-[80px] justify-start text-left">{documentData.desfact}</ReadonlyBox>
            <ReadonlyBox className="w-[80px] justify-start text-left">{documentData.desinv}</ReadonlyBox>
            <label className="col-span-2 text-center leading-[18px]">Almacén</label>
            <ReadonlyBox className="w-[80px] justify-start text-left">{documentData.dalmacen || documentData.warehouse}</ReadonlyBox>
            <ReadonlyBox className="w-[80px] justify-start text-left">{documentData.diuseq}</ReadonlyBox>
          </div>
        </div>
        <div className="relative min-h-0 flex-1">
          <div className="modal-scroll min-h-0 h-full overflow-auto bg-white">
            <table className="w-max min-w-full border-collapse text-[11px] leading-none text-black">
              <thead className="sticky top-0 z-10 bg-white">
                <tr>
                  {documentosColumns.map((column) => (
                    <th
                      key={column.label}
                      className={`${column.width} border border-[#a8a8a8] px-[3px] py-[5px] font-normal ${(column as Column).align === "right" ? "text-right" : (column as Column).align === "center" ? "text-center" : "text-left"}`}
                    >
                      {column.label}
                    </th>
                  ))}
                  <th className="w-[28px] border border-[#b7b7b7] bg-[#c5c5c5]" />
                </tr>
              </thead>
              <tbody>
                {documentLines.map((row, rowIndex) => (
                  <tr key={`${row.product}-${rowIndex}`} className="h-[18px]">
                    <td className="w-[94px] border border-[#b7b7b7] px-[3px]">{row.product}</td>
                    <td className="w-[272px] border border-[#b7b7b7] px-[3px]">{row.description}</td>
                    <td className="w-[76px] border border-[#b7b7b7] px-[3px] text-right">{formatNumeric(row.entries, 3)}</td>
                    <td className="w-[76px] border border-[#b7b7b7] px-[3px] text-right">{formatNumeric(row.exits, 3)}</td>
                    <td className="w-[34px] border border-[#b7b7b7] px-[3px]">{row.unit}</td>
                    <td className="w-[84px] border border-[#b7b7b7] px-[3px] text-right">{formatNumeric(row.cost, 4)}</td>
                    <td className="w-[52px] border border-[#b7b7b7] px-[3px] text-right">{formatNumeric(row.pieces, 0)}</td>
                    <td className="w-[46px] border border-[#b7b7b7] px-[3px]">{row.warehouse}</td>
                    <td className="w-[42px] border border-[#b7b7b7] px-[3px]">{row.user ?? ""}</td>
                    <td className="w-[40px] border border-[#b7b7b7] px-[3px]">{row.tm}</td>
                    <td className="w-[28px] border border-[#b7b7b7] bg-[#f1f1f1]" />
                  </tr>
                ))}
                {Array.from({ length: Math.max(0, 16 - documentLines.length) }, (_, rowIndex) => (
                  <tr key={`doc-empty-${rowIndex}`} className="h-[18px]">
                    {documentosColumns.map((column) => (
                      <td key={`doc-empty-${rowIndex}-${column.label}`} className={`${column.width} border border-[#b7b7b7] px-[3px]`} />
                    ))}
                    <td className="w-[28px] border border-[#b7b7b7] bg-[#f1f1f1]" />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isDocumentLoading ? <LegacyModalLoader label="Cargando documento..." /> : null}
        </div>
        {documentError ? (
          <div className="border-t border-[#a7a7a7] bg-[#ffe7e7] px-2 py-1 text-[11px] text-[#8b1e1e]">
            {documentError}
          </div>
        ) : null}
        <ModalFooter className="px-[6px] py-[6px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[6px]">
              <button type="button" className={`${legacyButtonClass} text-[#7f858c]`}>
                Imprimir
              </button>
              <button type="button" className={`${legacyButtonClass} text-[#7f858c]`}>
                Comentarios
              </button>
              <button type="button" className={`${legacyButtonClass} text-[#7f858c]`}>
                Piezas
              </button>
              <button type="button" className={`${legacyButtonClass} text-[#7f858c]`}>
                Etiquetas
              </button>
              <ReadonlyBox className="w-[60px]">{formatNumeric(totalEntries, 3)}</ReadonlyBox>
              <ReadonlyBox className="w-[60px]" />
            </div>
            <div className="flex items-center gap-[18px] pr-[150px]">
              <button type="button" className={`${legacyButtonClass} w-[84px] text-[#7f858c]`}>
                Cancelar
              </button>
              <button type="button" className={`${legacyButtonClass} w-[58px] text-[#7f858c] italic`}>
                CT
              </button>
            </div>
          </div>
          <div className="mt-[2px] flex justify-center pr-[250px]">
            <ReadonlyBox className="w-[64px] justify-center">{formatNumeric(totalEntriesCost, 2)}</ReadonlyBox>
          </div>
        </ModalFooter>

        {isSearchOpen ? (
          <ManagedWindowLayer windowId="inventoryDocumentosSearchWindow" isOpen={isSearchOpen}>
            <section className="flex h-[min(446px,78vh)] w-[min(640px,94vw)] flex-col border border-[#2f8ce8] bg-[#ececec] shadow-[0_8px_18px_rgba(0,0,0,0.22)]">
              <header className="flex h-[24px] shrink-0 items-center justify-between border-b border-[#9aa2aa] bg-[#f6f6f6] px-[4px]">
                <div className="flex items-center gap-[3px]">
                  <span className="h-[12px] w-[12px] border border-[#8fa6cc] bg-white" />
                  <h3 className="text-[12px] leading-none font-normal">Búsqueda</h3>
                </div>
                <button
                  type="button"
                  onClick={closeSearchModal}
                  className="grid h-[16px] w-[16px] place-items-center bg-transparent"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </header>

              <div className="relative min-h-0 flex-1">
                <div className="modal-scroll min-h-0 h-full overflow-auto bg-white">
                  <table className="w-max min-w-full border-collapse text-[11px] leading-none text-black">
                    <thead className="sticky top-0 z-10 bg-white">
                      <tr>
                        {documentosSearchColumns.map((column) => (
                          <th
                            key={column.label}
                            className={`${column.width} border border-[#a8a8a8] px-[3px] py-[5px] text-left font-normal`}
                          >
                            {column.label}
                          </th>
                        ))}
                        <th className="w-[22px] border border-[#b7b7b7] bg-[#c5c5c5]" />
                      </tr>
                      <tr>
                        {documentosSearchColumns.map((column) => {
                          const key = column.label === "Documento"
                            ? "documento"
                            : column.label === "Fecha"
                              ? "fecha"
                              : column.label === "Ref."
                                ? "ref"
                                : column.label === "Ref. 2"
                                  ? "ref2"
                                  : column.label === "Alm"
                                    ? "alm"
                                    : column.label === "Proveedor"
                                      ? "proveedor"
                                      : "cliente";

                          return (
                            <th key={`${column.label}-filter`} className={`${column.width} border border-[#b7b7b7] bg-white p-[2px]`}>
                              <input
                                type="text"
                                value={searchFilters[key]}
                              onChange={(event) =>
                                setSearchFilters((previous) => ({
                                  ...previous,
                                  [key]: event.target.value
                                }))
                              }
                              onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                  event.preventDefault();
                                  runSearch();
                                }
                              }}
                              onBlur={runSearch}
                              className="h-[18px] w-full border border-[#b8c1cb] bg-white px-[4px] text-[11px] text-[#1f2933] outline-none"
                            />
                            </th>
                          );
                        })}
                        <th className="w-[22px] border border-[#b7b7b7] bg-white" />
                      </tr>
                    </thead>
                    <tbody>
                      {searchRows.map((row, rowIndex) => (
                        <tr
                          key={`${row.dseq ?? row.document}-${rowIndex}`}
                          className={`h-[18px] ${rowIndex === selectedSearchIndex ? "bg-[#cbe2f7]" : ""}`}
                          onClick={() => setSelectedSearchIndex(rowIndex)}
                          onDoubleClick={() => applySelectedDocument(row)}
                        >
                          <td className="w-[112px] border border-[#b7b7b7] px-[4px]">{row.document}</td>
                          <td className="w-[88px] border border-[#b7b7b7] px-[4px]">{formatLegacyDate(row.date)}</td>
                          <td className="w-[92px] border border-[#b7b7b7] px-[4px]">{row.ref}</td>
                          <td className="w-[92px] border border-[#b7b7b7] px-[4px]">{row.ref2}</td>
                          <td className="w-[70px] border border-[#b7b7b7] px-[4px]">{row.warehouse}</td>
                          <td className="w-[96px] border border-[#b7b7b7] px-[4px]">{row.provider}</td>
                          <td className="w-[96px] border border-[#b7b7b7] px-[4px]">{row.client}</td>
                          <td className="w-[22px] border border-[#b7b7b7] bg-[#f1f1f1]" />
                        </tr>
                      ))}
                      {Array.from({ length: Math.max(0, 14 - searchRows.length) }, (_, rowIndex) => (
                        <tr key={`empty-${rowIndex}`} className="h-[18px]">
                          {documentosSearchColumns.map((column) => (
                            <td key={`empty-${rowIndex}-${column.label}`} className={`${column.width} border border-[#b7b7b7] px-[3px]`} />
                          ))}
                          <td className="w-[22px] border border-[#b7b7b7] bg-[#f1f1f1]" />
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {isSearchLoading ? <LegacyModalLoader label="Cargando búsqueda..." /> : null}
              </div>
              {searchError ? (
                <div className="border-t border-[#a7a7a7] bg-[#ffe7e7] px-2 py-1 text-[11px] text-[#8b1e1e]">
                  {searchError}
                </div>
              ) : null}

              <footer className="flex shrink-0 items-center justify-center gap-[12px] border-t border-[#a7a7a7] bg-[#ececec] px-[6px] py-[8px]">
                <button
                  type="button"
                  onClick={() => applySelectedDocument(selectedSearchRow)}
                  className={`${legacyButtonClass} w-[78px]`}
                >
                  OK
                </button>
                <button
                  type="button"
                  onClick={closeSearchModal}
                  className={`${legacyButtonClass} w-[78px]`}
                >
                  Cancelar
                </button>
              </footer>
            </section>
          </ManagedWindowLayer>
        ) : null}
      </div>
    </LegacyWindow>
  );
}

export function InventoryCurvaTmpModal() {
  return (
    <LegacyWindow modalId={MODAL_IDS.INVENTORY_CURVA_TMP} title="Analisis de curvas" className="h-[min(660px,88vh)] w-[min(1136px,96vw)]">
      <div className="grid min-h-0 flex-1 grid-cols-[96px_1fr]">
        <aside className="flex flex-col border-r border-[#9fa4aa] bg-[#ececec]">
          <div className="border-b border-[#a8a8a8] bg-white px-[4px] py-[5px]">Curva</div>
          <div className="modal-scroll flex-1 overflow-auto bg-white" />
          <div className="grid gap-[3px] p-[4px]">
            <button type="button" className={legacyButtonClass}>
              Cambiar curva
            </button>
            <button type="button" className={legacyButtonClass}>
              Factor curva
            </button>
          </div>
        </aside>
        <main className="flex min-w-0 flex-col">
          <div className="modal-scroll h-[294px] overflow-auto border-b border-[#a7a7a7]">
            <LegacyTable columns={curvaColumns} minRows={11} />
          </div>
          <div className="flex flex-1 flex-col border border-[#a7a7a7] bg-white p-[8px]">
            <div className="text-center text-[20px] font-semibold italic [font-family:'Times_New_Roman',serif]">CURVA</div>
            <svg className="h-full min-h-[270px] w-full" viewBox="0 0 930 270">
              <rect x="42" y="12" width="850" height="200" fill="white" stroke="black" />
              <line x1="42" y1="212" x2="892" y2="212" stroke="black" />
              <line x1="42" y1="12" x2="42" y2="212" stroke="black" />
              {[0, 20, 40, 60, 80, 100, 120].map((tick) => {
                const y = 212 - (tick / 120) * 200;
                return (
                  <g key={tick}>
                    <text x="18" y={y + 4} fontSize="11">
                      {tick}
                    </text>
                    <line x1="38" y1={y} x2="42" y2={y} stroke="black" />
                  </g>
                );
              })}
              {Array.from({ length: 52 }, (_, idx) => (
                <text key={idx} x={47 + idx * 16} y="226" fontSize="9">
                  {idx + 1}
                </text>
              ))}
              <text x="21" y="120" fontSize="11" fontWeight="bold" transform="rotate(-90 21 120)">
                % SEM
              </text>
              <text x="452" y="248" fontSize="11" fontWeight="bold">
                SEMANAS
              </text>
              <rect x="414" y="255" width="10" height="10" fill="#ff2020" stroke="black" />
              <text x="430" y="264" fontSize="12">
                VENTA SEMANAL
              </text>
            </svg>
          </div>
        </main>
      </div>
    </LegacyWindow>
  );
}

export function InventoryCurva2Modal() {
  return (
    <LegacyWindow modalId={MODAL_IDS.INVENTORY_CURVA_2} title="Merctrend" className="h-[min(438px,72vh)] w-[min(638px,90vw)]">
      <div className="relative min-h-0 flex-1 bg-white">
        <button type="button" className="absolute right-[8px] bottom-[88px] h-[18px] border border-[#0078d7] bg-white px-[3px] text-[11px]">
          copy graf
        </button>
      </div>
      <div className="modal-scroll h-[17px] shrink-0 overflow-x-auto border-t border-[#b7b7b7] bg-white">
        <div className="h-[1px] w-[900px]" />
      </div>
    </LegacyWindow>
  );
}

export function InventoryCotizadoProveedoresModal() {
  return (
    <LegacyWindow modalId={MODAL_IDS.INVENTORY_COTIZADO_PROVEEDORES} title="Cotizado a proveedores" className="h-[min(368px,70vh)] w-[min(1002px,95vw)]">
      <LegacyTable columns={cotizadoColumns} minRows={14} />
      <ModalFooter className="grid grid-cols-[auto_1fr_auto_auto_auto] items-end gap-[28px]">
        <button type="button" className={`${legacyButtonClass} w-[132px]`}>
          Filtrar pedidos surtidos
        </button>
        <span />
        <div className="grid text-center">
          <span>Stock</span>
          <ReadonlyBox className="w-[92px]">2208.690</ReadonlyBox>
        </div>
        <div className="grid text-center">
          <span>Por llegar</span>
          <ReadonlyBox className="w-[92px]">0.000</ReadonlyBox>
        </div>
        <div className="grid text-center">
          <span>Total</span>
          <ReadonlyBox className="w-[92px]">2208.690</ReadonlyBox>
        </div>
      </ModalFooter>
    </LegacyWindow>
  );
}
