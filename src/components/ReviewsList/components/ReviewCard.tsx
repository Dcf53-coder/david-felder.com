import Link from "next/link";
import type { FC } from "react";
import { useState } from "react";
import { RichText } from "@/components/RichText";
import type { Review } from "../types";

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: FC<ReviewCardProps> = ({ review }) => {
  const [expanded, setExpanded] = useState(false);
  const href = review.slug?.current ? `/reviews/${review.slug.current}` : "#";
  const reviewYear = review.reviewDate
    ? new Date(review.reviewDate).getFullYear()
    : null;

  // Check if we have more content than just the excerpt
  const hasMoreContent = review.body && review.body.length > 0;
  
  // Get attribution line
  const attribution = [review.source, review.author, reviewYear]
    .filter(Boolean)
    .join(" • ");

  return (
    <article className="group">
      {/* Beautiful Rounded Card Container */}
      <div className="bg-white rounded-xl shadow-lg border border-gold/10 hover:shadow-xl transition-all duration-300 p-8 mb-6">
        {/* Review Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              {/* Title */}
              <h2 className="text-2xl font-serif font-semibold text-navy mb-3">
                {review.title}
              </h2>
              
              {/* Attribution - Beautifully styled */}
              {attribution && (
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-gold/50"></div>
                  <p className="text-sm text-gray-600 font-mono tracking-wide">
                    {attribution}
                  </p>
                </div>
              )}
            </div>
            
            {/* Review Type Badge */}
            {review.reviewType && (
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                review.reviewType === "recording" 
                  ? "bg-blue-50 text-blue-700 border border-blue-100" 
                  : "bg-purple-50 text-purple-700 border border-purple-100"
              }`}>
                {review.reviewType === "recording" ? "📀 Recording" : "🎭 Performance"}
              </span>
            )}
          </div>
        </div>

        {/* Excerpt - In a nice box */}
        {review.excerpt && (
          <div className="mb-8">
            <div className="bg-cream/50 rounded-lg p-6 border-l-4 border-gold">
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <RichText value={review.excerpt} />
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          <div className="flex items-center gap-4">
            {/* Read More Button */}
            {hasMoreContent ? (
              <button
                onClick={() => setExpanded(!expanded)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy text-white font-medium rounded-full hover:bg-gold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                {expanded ? "Show Less" : "Read Full Review"}
                <svg 
                  className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d={expanded ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                </svg>
              </button>
            ) : review.slug?.current ? (
              <Link
                href={href}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy text-white font-medium rounded-full hover:bg-gold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                Read Full Review
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            ) : null}

            {/* Original Source Link (smaller button) */}
            {review.reviewLink && (
              <a
                href={review.reviewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 text-gray-600 rounded-full hover:border-gold hover:text-gold transition-all duration-300"
                aria-label="Open original review"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Original Source
              </a>
            )}
          </div>

          {/* Related Works Count (if any) */}
          {review.relatedWorks && review.relatedWorks.length > 0 && (
            <div className="text-sm text-gray-500">
              Mentions {review.relatedWorks.length} work{review.relatedWorks.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>

        {/* Expanded Full Content */}
        {expanded && hasMoreContent && (
          <div className="mt-8 pt-8 border-t border-gray-100 animate-fadeIn">
            <div className="prose prose-lg max-w-none text-gray-700">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-navy mb-4">Full Review</h3>
              </div>
              <RichText value={review.body} />
            </div>
          </div>
        )}
      </div>
    </article>
  );
};