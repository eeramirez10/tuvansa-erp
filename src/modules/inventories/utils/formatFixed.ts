
export const formatFixed = (value: number | null | undefined, decimals: number): string => {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: true,
  });

  if (value === null || value === undefined || Number.isNaN(value)) {
    return formatter.format(0);
  }

  return formatter.format(value);
};
