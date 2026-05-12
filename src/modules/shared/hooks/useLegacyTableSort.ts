import { useMemo, useState } from "react";

export type LegacySortDirection = "asc" | "desc";

export type LegacySortState<K extends string> = {
  key: K;
  direction: LegacySortDirection;
} | null;

const toSortableValue = (value: unknown): number | string => {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value === "number") {
    return Number.isNaN(value) ? 0 : value;
  }

  if (typeof value === "boolean") {
    return value ? 1 : 0;
  }

  if (value instanceof Date) {
    return value.getTime();
  }

  const asString = String(value).trim();
  if (!asString) {
    return "";
  }

  const asNumber = Number(asString);
  if (Number.isFinite(asNumber) && /^-?\d+(\.\d+)?$/.test(asString)) {
    return asNumber;
  }

  const dateTime = Date.parse(asString);
  if (!Number.isNaN(dateTime)) {
    return dateTime;
  }

  return asString.toLocaleLowerCase("es");
};

const compareSortableValues = (left: number | string, right: number | string): number => {
  if (typeof left === "number" && typeof right === "number") {
    return left - right;
  }

  return String(left).localeCompare(String(right), "es", {
    numeric: true,
    sensitivity: "base",
  });
};

export const useLegacyTableSort = <TRow, TKey extends string>(
  rows: TRow[],
  getValue: (row: TRow, key: TKey) => unknown,
) => {
  const [sortState, setSortState] = useState<LegacySortState<TKey>>(null);

  const sortedRows = useMemo(() => {
    if (!sortState) {
      return rows;
    }

    const clonedRows = [...rows];
    clonedRows.sort((leftRow, rightRow) => {
      const leftValue = toSortableValue(getValue(leftRow, sortState.key));
      const rightValue = toSortableValue(getValue(rightRow, sortState.key));
      const compared = compareSortableValues(leftValue, rightValue);

      return sortState.direction === "asc" ? compared : -compared;
    });

    return clonedRows;
  }, [getValue, rows, sortState]);

  const handleSort = (key: TKey) => {
    setSortState((currentSortState) => {
      if (!currentSortState || currentSortState.key !== key) {
        return { key, direction: "asc" };
      }

      return {
        key,
        direction: currentSortState.direction === "asc" ? "desc" : "asc",
      };
    });
  };

  return {
    sortState,
    sortedRows,
    handleSort,
  };
};

