import { WORKS_LISTING_QUERYResult } from "@/sanity/sanity-types";

/** The full works listing array */
export type WorksListing = NonNullable<WORKS_LISTING_QUERYResult>;

/** A single work item (parent-level) */
export type Work = WorksListing[number];

/** A child work item (nested under a parent/series) */
export type ChildWork = NonNullable<Work["children"]>[number];
