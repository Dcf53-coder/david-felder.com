// function to join strings with a separator
export const join = (...strings: (string | null | undefined)[]): string => {
  return strings.filter(Boolean).join(" ");
}
