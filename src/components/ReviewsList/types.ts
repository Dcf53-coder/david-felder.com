import type { REVIEWS_LISTING_QUERYResult } from "@/sanity/sanity-types";

/** The full reviews listing array */
export type ReviewsListing = NonNullable<REVIEWS_LISTING_QUERYResult>;

/** A single review item */
export type Review = ReviewsListing[number];
