

export const formatInteger = (value: number | null | undefined): string => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "0";
  }

  return String(Math.trunc(value));
};