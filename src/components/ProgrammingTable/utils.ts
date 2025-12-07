// Date formatting utility
export const formatDate = (dateString?: string): string => {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
};

// Date sorting function
export const dateSortingFn = (
  a: { original: { programDate?: string | null } },
  b: { original: { programDate?: string | null } },
) => {
  const dateA = a.original.programDate
    ? new Date(a.original.programDate).getTime()
    : 0;
  const dateB = b.original.programDate
    ? new Date(b.original.programDate).getTime()
    : 0;
  return dateA - dateB;
};
