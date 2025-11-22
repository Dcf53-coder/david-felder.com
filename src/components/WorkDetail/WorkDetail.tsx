import { formatCompletionDate } from "@/utils/format-date";
import { formatInstrumentation } from "@/utils/format-instrumentation";
import { RichText } from "@/components/RichText";
import Link from "next/link";
import { FC } from "react";
import { AudioSection } from "./sections/AudioSection";
import { ChildWorksSection } from "./sections/ChildWorksSection";
import { DownloadsSection } from "./sections/DownloadsSection";
import { ImagesSection } from "./sections/ImagesSection";
import { PublicationSection } from "./sections/PublicationSection";
import { RecordingSection } from "./sections/RecordingSection";
import { VideosSection } from "./sections/VideosSection";
import { WorkDetailData } from "./types";
import { InfoBlock } from "./InfoBlock";
import { CollapsibleProgramNote } from "./CollapsibleProgramNote";
import { Section } from "./Section";
import { SoundCloudEmbed } from "./SoundCloudEmbed";

interface WorkDetailProps {
  work: WorkDetailData;
}

export const WorkDetail: FC<WorkDetailProps> = ({ work }) => {
  const completionDate = formatCompletionDate(work.completionDate);
  const instrumentation = formatInstrumentation(work);
  const isInProgress = !work.isCompleted;

  // Check for content sections
  const hasMedia =
    work.soundCloudEmbedUrl ||
    (work.audio && work.audio.length > 0) ||
    (work.videos && work.videos.length > 0) ||
    (work.images && work.images.length > 0);
  const hasChildren = work.children && work.children.length > 0;
  const hasDownloads =
    work.score?.url ||
    (work.publicDownloads && work.publicDownloads.length > 0) ||
    (work.downloads && work.downloads.length > 0);

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
          <div className="flex flex-col gap-4 md:my-24">
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

          {/* Quick facts */}
          <div className="mt-10 flex flex-col md:flex-row gap-6">
            {work.duration && (
              <InfoBlock label="Duration" value={`${work.duration}'`} className="text-4xl!" />
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
          {/* Commission Info */}
          {work.commissionInfo && (
            <Section title="Commission">
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {work.commissionInfo}
              </p>
            </Section>
          )}

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
              <RichText value={work.miscellaneousNotes} className="prose-lg prose-gray max-w-none" />
            </Section>
          )}

          {/* Child works (if this is a series) */}
          {hasChildren && (
            <ChildWorksSection children={work.children} />
          )}

          {/* Media sections */}
          {hasMedia && (
            <div className="space-y-12">
              <h2 className="text-3xl font-black tracking-tight border-b border-gray-200 pb-4">
                Media
              </h2>

              {/* SoundCloud embed */}
              {work.soundCloudEmbedUrl && (
                <SoundCloudEmbed url={work.soundCloudEmbedUrl} />
              )}

              {/* Audio files */}
              {work.audio && work.audio.length > 0 && (
                <AudioSection audio={work.audio} />
              )}

              {/* Videos */}
              {work.videos && work.videos.length > 0 && (
                <VideosSection videos={work.videos} />
              )}

              {/* Images */}
              {work.images && work.images.length > 0 && (
                <ImagesSection images={work.images} />
              )}
            </div>
          )}

          {/* Recording (CD) */}
          {work.isOnCd && work.cd && <RecordingSection cd={work.cd} />}

          {/* Publication info */}
          {work.isPublished && (
            <PublicationSection
              publisher={work.publisher}
              publisherLink={work.publisherLink}
              scoreSampleLink={work.scoreSampleLink}
            />
          )}

          {/* Downloads */}
          {hasDownloads && (
            <DownloadsSection
              score={work.score}
              publicDownloads={work.publicDownloads}
              downloads={work.downloads}
              isPasswordProtected={work.isPasswordProtected}
            />
          )}
        </div>
      </div>
    </div>
  );
};
