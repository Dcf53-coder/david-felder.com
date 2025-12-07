// function to join strings with a separator, filtering out falsy values
export const join = (
  ...strings: (string | null | undefined | false)[]
): string => {
  return strings.filter(Boolean).join(" ");
};
