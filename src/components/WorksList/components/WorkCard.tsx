import { WORKS_LISTING_QUERYResult } from "@/sanity/sanity-types";
import { ListingQueryResultItem } from "@/utils/type-utils";
import { FC } from "react";

interface WorkCardProps {
  work: ListingQueryResultItem<WORKS_LISTING_QUERYResult>
}

export const WorkCard: FC<WorkCardProps> = ({ work }) => {
  return (
    <div>
      A work...
    </div>
  );
};
