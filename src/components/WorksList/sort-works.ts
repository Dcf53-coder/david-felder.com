import { getSortYear } from "@/utils/format-date";
import type { Work } from "./types";

/**
 * Sort works for display: in-progress first, then by completion date (most recent first).
 * Works without dates appear after works with dates within their group.
 */
export function sortWorks(works: Work[]): Work[] {
  return [...works].sort((a, b) => {
    const aInProgress = !a.isCompleted;
    const bInProgress = !b.isCompleted;

    // In-progress works go first
    if (aInProgress && !bInProgress) return -1;
    if (!aInProgress && bInProgress) return 1;

    // Then sort by completion date (most recent first)
    const yearA = getSortYear(a.completionDate);
    const yearB = getSortYear(b.completionDate);
    return yearB - yearA;
  });
}
