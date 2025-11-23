import Link from "next/link";
import { FC } from "react";

interface CdData {
  _id: string;
  title: string | null;
  slug: { current?: string } | null;
  recordLabel: string | null;
  albumArt: {
    asset: {
      _id: string;
      url: string | null;
      metadata: {
        lqip: string | null;
      } | null;
    } | null;
  } | null;
}

interface PublicationSectionProps {
  publisher: {
    name: string | null;
    website: string | null;
  } | null;
  publisherLink: string | null;
  scoreSampleLink: string | null;
  isOnCd?: boolean | null;
  cd?: CdData | null;
}

export const PublicationSection: FC<PublicationSectionProps> = ({
  publisher,
  publisherLink,
  scoreSampleLink,
  isOnCd,
  cd,
}) => {
  const hasPublisher = publisher?.name || publisherLink || scoreSampleLink;
  const hasRecording = isOnCd && cd;

  if (!hasPublisher && !hasRecording) return null;

  return (
    <section>
      <h2 className="text-3xl font-black tracking-tight mb-8">
        Publication
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Score Publisher Column */}
        {hasPublisher && (
          <div className="bg-gray-50 rounded-xl p-6">
            <span className="block text-sm font-mono uppercase tracking-wider text-accent mb-3">
              Score
            </span>
            {publisher?.name && (
              <div className="mb-4">
                {publisher.website ? (
                  <a
                    href={publisher.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-semibold text-gray-900 hover:text-accent transition-colors"
                  >
                    {publisher.name}
                  </a>
                ) : (
                  <p className="text-xl font-semibold text-gray-900">
                    {publisher.name}
                  </p>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {publisherLink && (
                <a
                  href={publisherLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors text-sm font-medium"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  View at Publisher
                </a>
              )}
              {scoreSampleLink && (
                <a
                  href={scoreSampleLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-accent hover:text-accent transition-colors text-sm font-medium"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Score Sample
                </a>
              )}
            </div>
          </div>
        )}

        {/* Recording Column */}
        {hasRecording && (
          <div className="bg-gray-50 rounded-xl p-6">
            <span className="block text-sm font-mono uppercase tracking-wider text-accent mb-3">
              Recording
            </span>
            <Link
              href={cd.slug?.current ? `/recordings/${cd.slug.current}` : "#"}
              className="flex items-center gap-4 group"
            >
              {cd.albumArt?.asset?.url && (
                <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden shadow">
                  <img
                    src={cd.albumArt.asset.url}
                    alt={cd.title || "Album art"}
                    className="w-full h-full object-cover"
                    style={{
                      backgroundImage: cd.albumArt.asset.metadata?.lqip
                        ? `url(${cd.albumArt.asset.metadata.lqip})`
                        : undefined,
                      backgroundSize: "cover",
                    }}
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="text-xl font-semibold text-gray-900 group-hover:text-accent transition-colors truncate">
                  {cd.title}
                </h4>
                {cd.recordLabel && (
                  <p className="text-sm text-gray-600 truncate">{cd.recordLabel}</p>
                )}
                <span className="inline-block mt-2 text-sm font-mono uppercase tracking-wider text-accent">
                  View Recording &rarr;
                </span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
