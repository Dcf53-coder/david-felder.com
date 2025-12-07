import Link from "next/link";
import type { FC } from "react";
import { RichText } from "@/components/RichText";
import type { ReviewDetailData } from "./types";

interface ReviewDetailProps {
  review: ReviewDetailData;
}

export const ReviewDetail: FC<ReviewDetailProps> = ({ review }) => {
  const reviewYear = review.reviewDate
    ? new Date(review.reviewDate).getFullYear()
    : null;

  const attribution = [review.source, review.author, reviewYear]
    .filter(Boolean)
    .join(" | ");

  const hasRelatedWorks = review.relatedWorks && review.relatedWorks.length > 0;
  const hasRelatedRecordings =
    review.relatedRecordings && review.relatedRecordings.length > 0;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="container mx-auto px-6 py-16 md:py-24 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            href="/reviews"
            className="text-sm font-mono uppercase tracking-wider text-accent hover:text-accent/80 transition-colors"
          >
            &larr; All Reviews
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">
            {review.title}
          </h1>
          <div className="h-2 w-24 bg-gray-900 mb-6" />

          {attribution && (
            <p className="text-lg text-gray-600">{attribution}</p>
          )}

          {review.reviewLink && (
            <a
              href={review.reviewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-accent hover:text-accent/80 transition-colors"
            >
              View original source
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="false"
                role="img"
              >
                <title>External link to review source</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}
        </header>

        {/* Body */}
        {review.body && (
          <div className="mb-16">
            <RichText value={review.body} className="prose-lg max-w-none" />
          </div>
        )}

        {/* Related Content */}
        {(hasRelatedWorks || hasRelatedRecordings) && (
          <aside className="mt-16 pt-12 border-t border-gray-200">
            <div className="grid md:grid-cols-2 gap-12">
              {hasRelatedWorks && (
                <section>
                  <h2 className="text-sm font-mono uppercase tracking-wider text-gray-500 mb-6">
                    Related Works
                  </h2>
                  <ul className="space-y-4">
                    {review.relatedWorks?.map((work) => (
                      <li key={work._id}>
                        {work.slug?.current ? (
                          <Link
                            href={`/works/${work.slug.current}`}
                            className="block group"
                          >
                            <span className="text-xl font-semibold group-hover:text-accent transition-colors">
                              {work.title}
                            </span>
                          </Link>
                        ) : (
                          <span className="block text-xl font-semibold text-gray-400">
                            {work.title}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {hasRelatedRecordings && (
                <section>
                  <h2 className="text-sm font-mono uppercase tracking-wider text-gray-500 mb-6">
                    Related Recordings
                  </h2>
                  <ul className="space-y-4">
                    {review.relatedRecordings?.map((recording) => (
                      <li key={recording._id}>
                        {recording.slug?.current ? (
                          <Link
                            href={`/recordings/${recording.slug.current}`}
                            className="block group"
                          >
                            <span className="text-xl font-semibold group-hover:text-accent transition-colors">
                              {recording.title}
                            </span>
                            {recording.recordLabel && (
                              <span className="block text-sm text-gray-500 mt-1">
                                {recording.recordLabel}
                              </span>
                            )}
                          </Link>
                        ) : (
                          <div>
                            <span className="block text-xl font-semibold text-gray-400">
                              {recording.title}
                            </span>
                            {recording.recordLabel && (
                              <span className="block text-sm text-gray-400 mt-1">
                                {recording.recordLabel}
                              </span>
                            )}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
