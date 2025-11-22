import { formatInstrumentation } from "@/utils/format-instrumentation";
import Link from "next/link";
import { FC } from "react";
import { ChildWorkItem } from "../types";

interface ChildWorksSectionProps {
  children: ChildWorkItem[];
}

export const ChildWorksSection: FC<ChildWorksSectionProps> = ({ children }) => {
  return (
    <section>
      <h2 className="text-3xl font-black tracking-tight mb-6">
        Works in this Series
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children.map((child) => (
          <ChildWorkCard key={child._id} work={child} />
        ))}
      </div>
    </section>
  );
};

const ChildWorkCard: FC<{ work: ChildWorkItem }> = ({ work }) => {
  const instrumentation = formatInstrumentation(work);
  const href = work.slug?.current ? `/works/${work.slug.current}` : "#";

  return (
    <Link
      href={href}
      className="block p-6 rounded-lg border border-gray-200 hover:border-accent/30 hover:bg-accent/3 transition-all group"
    >
      <h3 className="text-xl font-bold tracking-tight group-hover:text-accent transition-colors">
        {work.title}
      </h3>
      {(work.duration || instrumentation) && (
        <p className="text-gray-600 mt-2">
          {work.duration && (
            <span className="font-mono">{work.duration}&apos;</span>
          )}
          {work.duration && instrumentation && (
            <span className="mx-2 text-gray-300">|</span>
          )}
          {instrumentation}
        </p>
      )}
    </Link>
  );
};
