export const formatLegacyDate = (value: string | null): string => {
  if (!value) {
    return "31/12/1900";
  }

  const [year, month, day] = value.slice(0, 10).split("-");

  if (!year || !month || !day) {
    return "31/12/1900";
  }

  return `${day}/${month}/${year}`;
};