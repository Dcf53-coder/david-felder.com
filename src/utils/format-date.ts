/**
 * Format a completion date string into a display format.
 * Handles ranges like "2017-2019" or single years like "2021".
 *
 * @param dateString - ISO date string, year range, or null
 * @param fallback - Text to show when date is null (default: "in progress")
 * @returns Formatted date string
 */
export function formatCompletionDate(
  dateString: string | null,
  fallback: string = "in progress"
): string {
  if (!dateString) return fallback;

  // If it's already a year range format like "2017-2019", return as-is
  if (/^\d{4}\s*[-–]\s*\d{4}$/.test(dateString)) {
    return dateString;
  }

  // If it's a full ISO date, extract the year
  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    return date.getFullYear().toString();
  }

  // Otherwise return the original string
  return dateString;
}
