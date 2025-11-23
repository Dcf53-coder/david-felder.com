import { Recording } from "./types";

/**
 * Sort recordings by featured status first, then by release date (newest first).
 */
export function sortRecordings(recordings: Recording[]): Recording[] {
  return [...recordings].sort((a, b) => {
    // Featured recordings first
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;

    // Then by release date (newest first)
    const dateA = a.releaseDate ? new Date(a.releaseDate).getTime() : 0;
    const dateB = b.releaseDate ? new Date(b.releaseDate).getTime() : 0;

    return dateB - dateA;
  });
}
