import type { Review } from "./types";

/**
 * Sort reviews by review date (newest first).
 */
export function sortReviews(reviews: Review[]): Review[] {
  return [...reviews].sort((a, b) => {
    const dateA = a.reviewDate ? new Date(a.reviewDate).getTime() : 0;
    const dateB = b.reviewDate ? new Date(b.reviewDate).getTime() : 0;

    return dateB - dateA;
  });
}
