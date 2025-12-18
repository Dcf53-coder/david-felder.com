"use client";

import { useState, type FC } from "react";
import { PortableText } from "@portabletext/react";

interface InlineReviewProps {
  review: {
    source?: string;
    author?: string; // Added to match your data
    excerpt?: string;
    body?: any; // Changed from fullReview to body
    url?: string;
    reviewDate?: string; // Added to match your data
  };
}

export const InlineReview: FC<InlineReviewProps> = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Logic to show Author if source is missing, or combine them
  const attribution = [review.source, review.author]
    .filter(Boolean)
    .join(" — ");

  return (
    <article className="border border-gray-200 rounded-lg p-8 bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <div className="mb-6">
        <h3 className="text-lg font-mono font-bold text-accent uppercase tracking-widest">
          {attribution || "Review"}
        </h3>
        <div className="h-px w-12 bg-gray-900 mt-2" />
      </div>

      <div className="text-gray-800 leading-relaxed text-lg font-light italic">
        {!isExpanded ? (
          <p>"{review.excerpt}"</p>
        ) : (
          <div className="not-italic prose prose-gray max-w-none">
            {/* Changed from fullReview to body */}
            {review.body ? (
              <PortableText value={review.body} />
            ) : (
              <p>"{review.excerpt}"</p>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs font-mono font-bold uppercase tracking-widest text-gray-900 hover:text-accent transition-colors flex items-center gap-2"
        >
          {isExpanded ? "↑ Show Less" : "↓ Read Full Review"}
        </button>

        {/* review.url should match your Sanity field (often called reviewLink) */}
        {review.url && (
          <a
            href={review.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono uppercase tracking-tighter text-gray-400 hover:text-accent underline transition-colors"
          >
            Original Source &rarr;
          </a>
        )}
      </div>
    </article>
  );
};
