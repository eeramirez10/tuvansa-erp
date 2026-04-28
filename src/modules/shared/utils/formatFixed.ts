export const formatFixed = (value: number | null, decimals: number): string => {
  if (value === null || Number.isNaN(value)) {
    return (0).toFixed(decimals);
  }

  return value.toFixed(decimals);
};
