export const formatInteger = (value: number | null): string => {
  if (value === null || Number.isNaN(value)) {
    return "0";
  }

  return String(Math.trunc(value));
};
