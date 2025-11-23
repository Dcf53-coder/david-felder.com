import { RECORDINGS_LISTING_QUERYResult } from "@/sanity/sanity-types";

/** The full recordings listing array */
export type RecordingsListing = NonNullable<RECORDINGS_LISTING_QUERYResult>;

/** A single recording item */
export type Recording = RecordingsListing[number];
