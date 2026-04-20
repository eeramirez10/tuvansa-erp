

export const formatFixed = (value: number | null | undefined, decimals: number): string => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return (0).toFixed(decimals);
  }

  return value.toFixed(decimals);
};