import { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { getInventoryClassificationByCode } from "../api/inventories.api";
import type { InventoryClassificationOption, InventoryClassificationSelected } from "../types/inventory.types";
import { useModal } from "../../ui/hooks/useModal";
import { MODAL_IDS } from "../../ui/store/modal.store";
import { useInventoriesStore } from "../store/inventories.store";

export type InventoryClasificarSelectedRow = {
  row: string;
  family: string;
  code: string;
  description: string;
};

export type InventoryClasificarAvailableRow = {
  family: string;
  description: string;
};

type ClassificationSlotKey = keyof InventoryClassificationSelected;

type SelectedTemplate = {
  row: string;
  family: string;
  slot: ClassificationSlotKey;
  famt: string;
};

const SELECTED_TEMPLATES: SelectedTemplate[] = [
  { row: "1", family: "PROVEEDOR", slot: "supplier", famt: "1" },
  { row: "2", family: "PRODUCTO", slot: "product", famt: "2" },
  { row: "3", family: "TIPO", slot: "type", famt: "3" },
  { row: "4", family: "MATERIAL", slot: "material", famt: "4" },
  { row: "5", family: "EXTREMOS", slot: "ends", famt: "5" },
  { row: "6", family: "LIBRAJE", slot: "pressureClass", famt: "6" },
  { row: "7", family: "CEDULA", slot: "cedula", famt: "7" },
  { row: "8", family: "MEDIDA", slot: "measure", famt: "8" },
  { row: "9", family: "OTROS", slot: "others", famt: "9" },
  { row: "A", family: "PROCEDENCIA", slot: "origin", famt: "A" },
  { row: "B", family: "SATUV", slot: "sativ", famt: "B" },
  { row: "C", family: "RECUBRIMIENTO", slot: "coating", famt: "C" },
  { row: "D", family: "SUCURSAL", slot: "branch", famt: "D" },
  { row: "", family: "MARCA", slot: "brand", famt: "E" },
  { row: "0", family: "INV", slot: "inv", famt: "N" },
  { row: "/", family: "FAMILIA", slot: "family", famt: "O" },
];

const normalizeText = (value: string | null | undefined): string =>
  value === null || value === undefined ? "" : String(value).trim();

const groupOptionsByFamt = (
  options: InventoryClassificationOption[],
): Map<string, InventoryClasificarAvailableRow[]> => {
  const grouped = new Map<string, InventoryClasificarAvailableRow[]>();

  for (const option of options) {
    const slot = normalizeText(option.slot).toUpperCase();
    const rows = grouped.get(slot) ?? [];
    rows.push({
      family: normalizeText(option.family),
      description: normalizeText(option.description),
    });
    grouped.set(slot, rows);
  }

  return grouped;
};

const findDescription = (
  groupedOptions: Map<string, InventoryClasificarAvailableRow[]>,
  famt: string,
  code: string,
): string => {
  const rows = groupedOptions.get(famt) ?? [];
  const exact = rows.find((row) => row.family === code);
  if (exact) {
    return exact.description;
  }

  return "";
};

const resolveSelectedCode = (
  groupedOptions: Map<string, InventoryClasificarAvailableRow[]>,
  famt: string,
  rawCode: string,
): string => {
  const code = normalizeText(rawCode);
  if (!code) {
    return "";
  }

  const rows = groupedOptions.get(famt) ?? [];
  if (rows.some((row) => row.family === code)) {
    return code;
  }

  const candidates = [
    code.startsWith(famt) ? code.slice(famt.length) : "",
    code.length > 1 ? code.slice(1) : "",
  ]
    .map((value) => normalizeText(value))
    .filter((value) => value.length > 0);

  for (const candidate of candidates) {
    if (rows.some((row) => row.family === candidate)) {
      return candidate;
    }
  }

  return code;
};

export const useInventoryClasificarModal = () => {
  const { isOpen, close } = useModal(MODAL_IDS.INVENTORY_CLASIFICAR);
  const { selectedCode, detail } = useInventoriesStore(
    useShallow((state) => ({
      selectedCode: state.selectedCode,
      detail: state.detail,
    })),
  );

  const currentCode = (selectedCode ?? detail?.identity.code ?? "").trim();

  const [selected, setSelected] = useState<InventoryClassificationSelected | null>(null);
  const [options, setOptions] = useState<InventoryClassificationOption[]>([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setSelected(null);
      setOptions([]);
      return;
    }

    if (!currentCode) {
      setSelected(null);
      setOptions([]);
      return;
    }

    let isCancelled = false;
    const abortController = new AbortController();

    const load = async () => {
      try {
        const response = await getInventoryClassificationByCode(currentCode, {
          signal: abortController.signal,
        });

        if (!isCancelled) {
          setSelected(response.data.selected);
          setOptions(response.data.options);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        if (!isCancelled) {
          setSelected(null);
          setOptions([]);
        }
      }
    };

    void load();

    return () => {
      isCancelled = true;
      abortController.abort();
    };
  }, [isOpen, currentCode]);

  const optionsByFamt = useMemo(() => groupOptionsByFamt(options), [options]);

  const selectedRows = useMemo<InventoryClasificarSelectedRow[]>(() => {
    return SELECTED_TEMPLATES.map((template) => {
      const slotData = selected?.[template.slot];
      const code = resolveSelectedCode(optionsByFamt, template.famt, slotData?.code ?? "");
      const descriptionFromSelected = normalizeText(slotData?.description);
      const descriptionFromOptions = findDescription(optionsByFamt, template.famt, code);

      return {
        row: template.row,
        family: template.family,
        code,
        description: descriptionFromSelected || descriptionFromOptions,
      };
    });
  }, [selected, optionsByFamt]);

  const selectedFamilyTitle = selectedRows[selectedRowIndex]?.family ?? "";

  const availableRows = useMemo(() => {
    const famt = SELECTED_TEMPLATES[selectedRowIndex]?.famt;
    if (!famt) {
      return [] as InventoryClasificarAvailableRow[];
    }

    return optionsByFamt.get(famt) ?? ([] as InventoryClasificarAvailableRow[]);
  }, [optionsByFamt, selectedRowIndex]);

  return {
    isOpen,
    close,
    selectedRows,
    selectedRowIndex,
    setSelectedRowIndex,
    selectedFamilyTitle,
    availableRows,
  };
};
