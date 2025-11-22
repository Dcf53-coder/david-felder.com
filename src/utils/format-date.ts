/**
 * Extract a sortable year from a completion date string.
 * Handles formats like "2021", "2016 – 2017", "2019-12-31".
 * For ranges, returns the end year.
 *
 * @param dateString - Date string in various formats
 * @returns Year as number, or 0 if unparseable
 */
export function getSortYear(dateString: string | null): number {
  if (!dateString) return 0;

  // For date ranges like "2016 – 2017", use the end year
  const rangeMatch = dateString.match(/(\d{4})\s*[-–]\s*(\d{4})/);
  if (rangeMatch) {
    return parseInt(rangeMatch[2], 10);
  }

  // For single years or ISO dates, extract the first 4-digit year
  const yearMatch = dateString.match(/(\d{4})/);
  if (yearMatch) {
    return parseInt(yearMatch[1], 10);
  }

  return 0;
}

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
