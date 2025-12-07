import Link from "next/link";
import type { FC } from "react";
import { RichText } from "@/components/RichText";
import { formatCompletionDate } from "@/utils/format-date";
import { formatInstrumentation } from "@/utils/format-instrumentation";
import { CollapsibleProgramNote } from "./CollapsibleProgramNote";
import { InfoBlock } from "./InfoBlock";
import { Section } from "./Section";
import { ChildWorksSection } from "./sections/ChildWorksSection";
import { DownloadsSection } from "./sections/DownloadsSection";
import { ImagesSection } from "./sections/ImagesSection";
import { MediaSection } from "./sections/MediaSection";
import { PublicationSection } from "./sections/PublicationSection";
import type { WorkDetailData } from "./types";

interface WorkDetailProps {
  work: WorkDetailData;
}

export const WorkDetail: FC<WorkDetailProps> = ({ work }) => {
  const completionDate = formatCompletionDate(work.completionDate);
  const instrumentation = formatInstrumentation(work);
  const isInProgress = !work.isCompleted;

  // Check for content sections
  const hasChildren = work.children && work.children.length > 0;
  const hasDownloads =
    work.score?.url ||
    (work.publicDownloads && work.publicDownloads.length > 0) ||
    (work.downloads && work.downloads.length > 0);
  const hasRelatedReviews =
    work.relatedReviews && work.relatedReviews.length > 0;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="container mx-auto px-6 py-16 md:py-24 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            href="/works"
            className="text-sm font-mono uppercase tracking-wider text-accent hover:text-accent/80 transition-colors"
          >
            &larr; All Works
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-16">
          <div className="flex flex-col gap-4 md:mt-24 md:mb-8">
            <time
              className={`text-lg font-mono uppercase tracking-wider ${isInProgress ? "italic" : ""}`}
            >
              {completionDate}
            </time>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
              {work.title}
            </h1>
            {/* Parent badge if this is a child work */}
            {work.parent && (
              <Link
                href={`/works/${work.parent.slug?.current}`}
                className="inline-flex items-center gap-2 w-fit px-3 py-1.5 bg-gray-100 rounded-full text-sm font-mono uppercase tracking-wider text-gray-600 hover:bg-accent hover:text-white transition-colors"
              >
                <span className="text-xs">Part of</span>
                <span className="font-medium">{work.parent.title}</span>
              </Link>
            )}

            <div className="h-2 w-32 bg-gray-900 mt-2" />
          </div>

          {/* Commission */}
          {work.commissionInfo && (
            <div className="text-2xl text-balance">{work.commissionInfo}</div>
          )}

          {/* Quick facts */}
          <div className="mt-10 flex flex-col md:flex-row gap-6">
            {work.duration && (
              <InfoBlock
                label="Duration"
                value={`${work.duration}'`}
                className="text-4xl!"
              />
            )}
            {instrumentation && (
              <InfoBlock label="Instrumentation" value={instrumentation} />
            )}
            {work.dedication && (
              <InfoBlock label="Dedication" value={work.dedication} />
            )}
            {work.hasElectronics && work.electronicsDescription && (
              <InfoBlock
                label="Electronics"
                note={<RichText value={work.electronicsDescription} />}
              />
            )}
          </div>
        </header>

        {/* Main content grid */}
        <div className="space-y-16">
          {/* Program Note */}
          {work.programNote && (
            <Section title="Program Note">
              <CollapsibleProgramNote programNote={work.programNote} />
            </Section>
          )}

          {/* Inline Notes */}
          {work.inlineNotes && !work.programNote && (
            <Section title="Notes">
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {work.inlineNotes}
              </p>
            </Section>
          )}

          {/* Miscellaneous Notes */}
          {work.miscellaneousNotes && (
            <Section title="Additional Notes">
              <RichText
                value={work.miscellaneousNotes}
                className="prose-lg prose-gray max-w-none"
              />
            </Section>
          )}

          {/* Child works (if this is a series) */}
          {hasChildren && <ChildWorksSection childWorks={work.children} />}

          {/* Media section (streaming: SoundCloud, audio, videos) */}
          <MediaSection
            soundCloudEmbedUrl={work.soundCloudEmbedUrl}
            audio={work.audio}
            videos={work.videos}
          />

          {/* Publication info (two columns: score + recordings) */}
          <PublicationSection
            publisher={work.publisher}
            publisherLink={work.publisherLink}
            scoreSampleLink={work.scoreSampleLink}
            recordings={work.recordings}
          />

          {/* Downloads */}
          {hasDownloads && (
            <DownloadsSection
              workId={work._id}
              score={work.score}
              publicDownloads={work.publicDownloads}
              downloads={work.downloads}
              isPasswordProtected={work.isPasswordProtected}
            />
          )}

          {/* Related Reviews */}
          {hasRelatedReviews && (
            <Section title="Reviews">
              <ul className="space-y-6">
                {work.relatedReviews?.map((review) => {
                  const reviewYear = review.reviewDate
                    ? new Date(review.reviewDate).getFullYear()
                    : null;
                  const attribution = [review.source, review.author, reviewYear]
                    .filter(Boolean)
                    .join(" | ");

                  return (
                    <li key={review._id}>
                      {review.slug?.current ? (
                        <Link
                          href={`/reviews/${review.slug.current}`}
                          className="block group"
                        >
                          <span className="text-lg font-semibold group-hover:text-accent transition-colors">
                            {review.title}
                          </span>
                          {attribution && (
                            <span className="block text-sm text-gray-500 mt-1">
                              {attribution}
                            </span>
                          )}
                        </Link>
                      ) : (
                        <div>
                          <span className="block text-lg font-semibold text-gray-400">
                            {review.title}
                          </span>
                          {attribution && (
                            <span className="block text-sm text-gray-400 mt-1">
                              {attribution}
                            </span>
                          )}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Section>
          )}

          {/* Image Gallery at the bottom */}
          {work.images && work.images.length > 0 && (
            <ImagesSection images={work.images} />
          )}
        </div>
      </div>
    </div>
  );
};
