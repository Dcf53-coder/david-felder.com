import Link from "next/link";
import type { FC } from "react";
import Img from "@/components/ui/Img";
import { Section } from "@/components/WorkDetail";
import type { RecordingDetailData } from "./types";

interface RecordingDetailProps {
  recording: RecordingDetailData;
}

export const RecordingDetail: FC<RecordingDetailProps> = ({ recording }) => {
  const releaseYear = recording.releaseDate
    ? new Date(recording.releaseDate).getFullYear()
    : null;

  const hasLinks = recording.albumLink || recording.purchaseLink;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="container mx-auto px-6 py-16 md:py-24 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            href="/recordings"
            className="text-sm font-mono uppercase tracking-wider text-accent hover:text-accent/80 transition-colors"
          >
            &larr; All Recordings
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            {/* Album Art */}
            <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
              {recording.albumArt ? (
                <Img
                  image={recording.albumArt}
                  imageOptions={{ width: 800, height: 800 }}
                  alt={recording.title || "Album art"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <svg
                    className="w-24 h-24"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">
                {recording.title}
              </h1>
              <div className="h-2 w-24 bg-gray-900 mb-6" />

              <dl className="space-y-4">
                {recording.recordLabel && (
                  <div>
                    <dt className="text-sm font-mono uppercase tracking-wider text-accent mb-1">
                      Label
                    </dt>
                    <dd className="text-xl font-light text-gray-800">
                      {recording.recordLabel}
                    </dd>
                  </div>
                )}
                {recording.catalogNumber && (
                  <div>
                    <dt className="text-sm font-mono uppercase tracking-wider text-accent mb-1">
                      Catalog #
                    </dt>
                    <dd className="text-xl font-light text-gray-800">
                      {recording.catalogNumber}
                    </dd>
                  </div>
                )}
                {releaseYear && (
                  <div>
                    <dt className="text-sm font-mono uppercase tracking-wider text-accent mb-1">
                      Released
                    </dt>
                    <dd className="text-xl font-light text-gray-800">
                      {releaseYear}
                    </dd>
                  </div>
                )}
              </dl>

              {/* Links */}
              {hasLinks && (
                <div className="mt-8 flex flex-wrap gap-4">
                  {recording.albumLink && (
                    <a
                      href={recording.albumLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white font-medium rounded-lg hover:bg-accent/90 transition-colors"
                    >
                      View Album
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="false"
                        role="img"
                      >
                        <title>External link to album</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  )}
                  {recording.purchaseLink && (
                    <a
                      href={recording.purchaseLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-accent hover:text-accent transition-colors"
                      aria-label="Purchase"
                    >
                      Purchase
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="false"
                        role="img"
                      >
                        <title>External link to purchase</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="space-y-16">
          {/* Pieces on this recording */}
          {recording.pieces && recording.pieces.length > 0 && (
            <Section title="Featured Works">
              <div className="space-y-0">
                {recording.pieces.map((piece, index) => (
                  <PieceItem key={piece._key || index} piece={piece} />
                ))}
              </div>
            </Section>
          )}

          {/* Related Reviews */}
          {recording.relatedReviews && recording.relatedReviews.length > 0 && (
            <Section title="Related Reviews">
              <ul className="space-y-6">
                {recording.relatedReviews.map((review) => {
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
        </div>
      </div>
    </div>
  );
};

interface PieceItemProps {
  piece: NonNullable<RecordingDetailData["pieces"]>[number];
}

const PieceItem: FC<PieceItemProps> = ({ piece }) => {
  const work = piece.piece;
  const href = work?.slug?.current ? `/works/${work.slug.current}` : null;

  const content = (
    <div className="py-6 border-t border-gray-200 group">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h3
          className={`text-xl font-bold tracking-tight ${href ? "group-hover:text-accent transition-colors" : ""}`}
        >
          {work?.title || "Untitled"}
        </h3>
        {piece.performers && (
          <p className="text-base text-gray-600">{piece.performers}</p>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
};
