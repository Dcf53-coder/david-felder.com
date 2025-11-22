import { FC } from "react";
import { WorkCard } from "./components/WorkCard";
import { sortWorks } from "./sort-works";
import { WorksListing } from "./types";

interface WorksListProps {
  works: WorksListing;
}

export const WorksList: FC<WorksListProps> = ({ works }) => {
  if (!works.length) {
    return <p className="text-gray-600">No works found.</p>;
  }

  const sortedWorks = sortWorks(works);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="container mx-auto px-6 py-16 md:py-24 max-w-6xl">
        <header className="mb-20 flex flex-col items-center md:items-start">
          <h1 className="text-6xl md:text-8xl font-black tracking-tight">
            Works
          </h1>
          <div className="mt-4 h-2 w-32 bg-gray-900" />
        </header>

        <div className="space-y-0">
          {sortedWorks.map((work) => (
            <WorkCard key={work._id} work={work} />
          ))}
        </div>
      </div>
    </div>
  );
};
