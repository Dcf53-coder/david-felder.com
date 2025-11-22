// function to join strings with a separator
export const join = (...strings: string[]): string => {
  return strings.filter(Boolean).join(" ");
}
