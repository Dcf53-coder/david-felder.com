import { WORKS_LISTING_QUERYResult } from "@/sanity/sanity-types";
import { formatCompletionDate } from "@/utils/format-date";
import { formatInstrumentation } from "@/utils/format-instrumentation";
import { ListingQueryResultItem } from "@/utils/type-utils";
import Link from "next/link";
import { FC } from "react";

type Work = ListingQueryResultItem<WORKS_LISTING_QUERYResult>;

interface WorkCardProps {
  work: Work;
}

export const WorkCard: FC<WorkCardProps> = ({ work }) => {
  const hasChildren = work.children && work.children.length > 0;
  const isInProgress = !work.isCompleted;
  const completionDate = formatCompletionDate(
    work.completionDate,
    isInProgress ? "in progress" : ""
  );
  const instrumentation = formatInstrumentation(work);
  const href = work.slug?.current ? `/works/${work.slug.current}` : "#";

  if (hasChildren) {
    return <SeriesCard work={work} />;
  }

  return (
    <article className={`group ${isInProgress ? "opacity-70" : ""}`}>
      <Link
        href={isInProgress ? "#" : href}
        className={`block py-8 md:py-10 transition-colors duration-200 ${
          isInProgress ? "cursor-default" : "hover:bg-gray-50"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-2 md:gap-8 items-baseline">
          {/* Date column */}
          <time
            className={`text-base tracking-wider text-gray-500 md:text-right ${
              isInProgress ? "italic" : ""
            }`}
          >
            {completionDate}
          </time>

          {/* Content column */}
          <div className="space-y-2">
            {/* Title */}
            <h2 className="font-serif text-xl md:text-2xl tracking-wide text-gray-800 group-hover:text-gray-600 transition-colors uppercase">
              {work.title}
            </h2>

            {/* Duration and Instrumentation */}
            {(work.duration || instrumentation) && (
              <div className="text-base text-gray-500 tracking-wide">
                {work.duration && <span>{work.duration}&apos;</span>}
                {work.duration && instrumentation && (
                  <span className="mx-2">|</span>
                )}
                {instrumentation && (
                  <span className="uppercase">{instrumentation}</span>
                )}
              </div>
            )}

            {/* Commission info / inline notes */}
            {(work.commissionInfo || work.inlineNotes) && (
              <div className="text-base text-gray-600 mt-3">
                {work.commissionInfo && <p>{work.commissionInfo}</p>}
                {work.inlineNotes && !work.commissionInfo && (
                  <p>{work.inlineNotes}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
};

/**
 * Series card for works with children
 */
const SeriesCard: FC<WorkCardProps> = ({ work }) => {
  const isInProgress = !work.isCompleted;
  const completionDate = formatCompletionDate(
    work.completionDate,
    isInProgress ? "in progress" : ""
  );
  const href = work.slug?.current ? `/works/${work.slug.current}` : "#";

  return (
    <article className="py-8 md:py-10">
      {/* Series header */}
      <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-2 md:gap-8 items-baseline">
        <time className="text-base tracking-wider text-gray-500 md:text-right">
          {completionDate}
        </time>

        <div>
          <Link href={href} className="group inline-block">
            <h2 className="font-serif text-xl md:text-2xl tracking-wide text-gray-800 group-hover:text-gray-600 transition-colors uppercase">
              {work.title}
              <span className="ml-3 text-base font-sans font-light text-gray-500 normal-case tracking-normal">
                (series)
              </span>
            </h2>
          </Link>

          {work.inlineNotes && (
            <p className="text-base text-gray-600 mt-2">{work.inlineNotes}</p>
          )}
        </div>
      </div>

      {/* Children */}
      {work.children && work.children.length > 0 && (
        <div className="mt-6 md:ml-[calc(140px+2rem)] space-y-4">
          {work.children.map((child) => (
            <ChildWorkCard key={child._id} work={child} />
          ))}
        </div>
      )}
    </article>
  );
};

/**
 * Child work card (for series children)
 */
type ChildWork = Work["children"][number];

const ChildWorkCard: FC<{ work: ChildWork }> = ({ work }) => {
  const instrumentation = formatInstrumentation(work as Work);
  const href = work.slug?.current ? `/works/${work.slug.current}` : "#";

  return (
    <Link
      href={href}
      className="block p-4 -mx-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
    >
      <h3 className="font-serif text-lg md:text-xl tracking-wide text-gray-800 group-hover:text-gray-600 uppercase">
        {work.title}
      </h3>

      {(work.duration || instrumentation) && (
        <div className="text-base text-gray-500 tracking-wide mt-1">
          {work.duration && <span>{work.duration}&apos;</span>}
          {work.duration && instrumentation && (
            <span className="mx-2">|</span>
          )}
          {instrumentation && (
            <span className="uppercase">{instrumentation}</span>
          )}
        </div>
      )}

      {(work as Work).commissionInfo && (
        <p className="text-base text-gray-600 mt-2">
          {(work as Work).commissionInfo}
        </p>
      )}
    </Link>
  );
};
