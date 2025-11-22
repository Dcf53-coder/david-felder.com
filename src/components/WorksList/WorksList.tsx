import { WORKS_LISTING_QUERYResult } from "@/sanity/sanity-types";
import { FC } from "react";

interface WorksListProps {
  works: NonNullable<WORKS_LISTING_QUERYResult>;
}

export const WorksList: FC<WorksListProps> = ({ works }) => {
  if (!works.length) {
    return <p className="text-gray-600">No works found.</p>;
  }

  return <div className="container mx-auto py-4 md:py-12 ">
    <h1 className="text-6xl font-bold mb-12">Works</h1>
    {works.map((work) => (
      <div key={work._id} className="mb-4">
        <h2 className="text-xl font-bold">{work.title}</h2>
        <p className="text-gray-600">{work.description}</p>
      </div>
    ))}
  </div>
}
