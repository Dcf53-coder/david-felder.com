import { WORKS_LISTING_QUERYResult } from "@/sanity/sanity-types";
import { FC } from "react";
import { WorkCard } from "./components/WorkCard";

interface WorksListProps {
  works: NonNullable<WORKS_LISTING_QUERYResult>;
}

export const WorksList: FC<WorksListProps> = ({ works }) => {
  if (!works.length) {
    return <p className="text-gray-600">No works found.</p>;
  }

  // Extract a sortable year from completion date string
  // Handles formats like "2021", "2016 – 2017", "2019-12-31"
  const getSortYear = (dateStr: string | null): number => {
    if (!dateStr) return 0;

    // For date ranges like "2016 – 2017", use the end year
    const rangeMatch = dateStr.match(/(\d{4})\s*[-–]\s*(\d{4})/);
    if (rangeMatch) {
      return parseInt(rangeMatch[2], 10);
    }

    // For single years or ISO dates, extract the first 4-digit year
    const yearMatch = dateStr.match(/(\d{4})/);
    if (yearMatch) {
      return parseInt(yearMatch[1], 10);
    }

    return 0;
  };

  // Sort works: in-progress first, then by completion date (most recent first)
  const sortedWorks = [...works].sort((a, b) => {
    const aInProgress = !a.isCompleted;
    const bInProgress = !b.isCompleted;

    // In-progress works go first
    if (aInProgress && !bInProgress) return -1;
    if (!aInProgress && bInProgress) return 1;

    // Then sort by completion date (most recent first)
    // Works without dates go after works with dates (within their completed/in-progress group)
    const yearA = getSortYear(a.completionDate);
    const yearB = getSortYear(b.completionDate);
    return yearB - yearA;
  });

  return (
    <div className="container mx-auto px-6 py-12 md:py-20 max-w-5xl">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-light tracking-[0.2em] uppercase text-gray-700">
          Works
        </h1>
      </header>

      <div className="divide-y divide-gray-300">
        {sortedWorks.map((work) => (
          <WorkCard key={work._id} work={work} />
        ))}
      </div>
    </div>
  );
};
