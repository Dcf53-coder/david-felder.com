import { WORK_DETAIL_QUERYResult } from "@/sanity/sanity-types";

/** The full work detail data */
export type WorkDetailData = NonNullable<WORK_DETAIL_QUERYResult>;

/** Audio item from work */
export type AudioItem = NonNullable<WorkDetailData["audio"]>[number];

/** Video item from work */
export type VideoItem = NonNullable<WorkDetailData["videos"]>[number];

/** Image item from work */
export type ImageItem = NonNullable<WorkDetailData["images"]>[number];

/** Download item from work */
export type DownloadItem = NonNullable<WorkDetailData["downloads"]>[number];

/** Child work item */
export type ChildWorkItem = NonNullable<WorkDetailData["children"]>[number];
