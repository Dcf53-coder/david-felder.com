import { formatCompletionDate } from "@/utils/format-date";
import { formatInstrumentation } from "@/utils/format-instrumentation";
import Link from "next/link";
import { FC } from "react";
import { ChildWork, Work } from "../types";

interface WorkCardProps {
  work: Work;
}

export const WorkCard: FC<WorkCardProps> = ({ work }) => {
  const hasChildren = work.children && work.children.length > 0;

  if (hasChildren) {
    return <SeriesCard work={work} />;
  }

  return <SingleWorkCard work={work} />;
};

/**
 * Card for a standalone work (no children)
 * Two-column asymmetric layout: title left, details right
 */
const SingleWorkCard: FC<WorkCardProps> = ({ work }) => {
  const isInProgress = !work.isCompleted;
  const completionDate = formatCompletionDate(work.completionDate);
  const instrumentation = formatInstrumentation(work);
  const href = work.slug?.current ? `/works/${work.slug.current}` : "#";

  return (
    <article
      className={`group border-t border-gray-200 ${isInProgress ? "opacity-50" : ""}`}
    >
      <Link
        href={isInProgress ? "#" : href}
        className={`block py-10 md:py-14 ${
          isInProgress ? "cursor-default" : "hover:bg-accent/3 transition-all duration-normal ease-default border-y border-transparent hover:border-accent/90"
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Left column: Title */}
          <div className="space-y-2 group-hover:pl-4 transition-all">
            <time
              className={`block text-base font-mono uppercase tracking-wider text-accent ${isInProgress ? "italic" : ""}`}
            >
              {completionDate}
            </time>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight group-hover:text-accent transition-colors leading-tight">
              {work.title}
            </h2>
          </div>

          {/* Right column: Details stacked */}
          <div className="flex flex-col justify-center space-y-4">
            {instrumentation && (
              <div>
                <span className="block text-sm font-mono uppercase tracking-wider text-accent mb-1">
                  Instrumentation
                </span>
                <p className="text-xl md:text-2xl font-light text-gray-700">
                  {instrumentation}
                </p>
              </div>
            )}

            {work.duration && (
              <div>
                <span className="block text-sm font-mono uppercase tracking-wider text-accent mb-1">
                  Duration
                </span>
                <p className="text-xl md:text-2xl font-light text-gray-700">
                  {work.duration}&apos;
                </p>
              </div>
            )}

            {(work.commissionInfo || work.inlineNotes) && (
              <div>
                <span className="block text-sm font-mono uppercase tracking-wider text-accent mb-1">
                  Notes
                </span>
                <p className="text-lg text-foreground leading-relaxed">
                  {work.commissionInfo || work.inlineNotes}
                </p>
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
};

/**
 * Card for a series (work with children)
 * Two-column asymmetric layout with nested children
 */
const SeriesCard: FC<WorkCardProps> = ({ work }) => {
  const completionDate = formatCompletionDate(work.completionDate);
  const href = work.slug?.current ? `/works/${work.slug.current}` : "#";

  return (
    <article className="border-t border-gray-200">
      <div className="py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Left column: Series title */}
          <div className="space-y-2">
            <time className="block text-base font-mono uppercase tracking-wider text-accent">
              {completionDate}
            </time>
            <Link href={href} className="group inline-block">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight group-hover:text-accent transition-colors leading-tight">
                {work.title}
              </h2>
              <span className="inline-block mt-2 text-sm font-mono uppercase tracking-wider text-white bg-accent px-3 py-1 rounded">
                Series
              </span>
            </Link>
          </div>

          {/* Right column: Series info */}
          <div className="flex flex-col justify-center space-y-4">
            {work.duration && (
              <div>
                <span className="block text-sm font-mono uppercase tracking-wider text-accent mb-1">
                  Duration
                </span>
                <p className="text-xl md:text-2xl font-light text-gray-700">
                  {work.duration}&apos;
                </p>
              </div>
            )}

            {work.inlineNotes && (
              <div>
                <span className="block text-sm font-mono uppercase tracking-wider text-accent mb-1">
                  Notes
                </span>
                <p className="text-lg text-foreground leading-relaxed">
                  {work.inlineNotes}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Child works */}
        {work.children && work.children.length > 0 && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {work.children.map((child) => (
              <ChildWorkCard key={child._id} work={child} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

/**
 * Card for a child work (nested under a series)
 * Compact card with prominent instrumentation
 */
const ChildWorkCard: FC<{ work: ChildWork }> = ({ work }) => {
  const instrumentation = formatInstrumentation(work);
  const href = work.slug?.current ? `/works/${work.slug.current}` : "#";

  return (
    <Link
      href={href}
      className="block p-5 rounded-lg border border-gray-200 hover:border-accent/20 hover:bg-accent/3 transition-all duration-normal ease group bg-white"
    >
      <h3 className="text-xl font-bold tracking-tight group-hover:text-accent transition-colors">
        {work.title}
      </h3>

      {(work.duration || instrumentation) && (
        <p className="text-base text-gray-700 mt-2">
          {work.duration && <span className="font-mono">{work.duration}&apos;</span>}
          {work.duration && instrumentation && <span className="mx-2 text-gray-300">|</span>}
          {instrumentation}
        </p>
      )}
    </Link>
  );
};
