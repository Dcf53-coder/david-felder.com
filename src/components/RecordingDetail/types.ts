import { RECORDING_DETAIL_QUERYResult } from "@/sanity/sanity-types";

/** The full recording detail data */
export type RecordingDetailData = NonNullable<RECORDING_DETAIL_QUERYResult>;

/** A piece/work on the recording */
export type RecordingPiece = NonNullable<RecordingDetailData["pieces"]>[number];
