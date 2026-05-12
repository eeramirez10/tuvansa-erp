export const formatInteger = (value: number | null): string => {
  const formatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
    useGrouping: true,
  });

  if (value === null || Number.isNaN(value)) {
    return formatter.format(0);
  }

  return formatter.format(Math.trunc(value));
};
