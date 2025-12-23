"use client";

import { useState, type FC } from "react";
import { PortableText } from "@portabletext/react";

interface InlineReviewProps {
  review: {
    source?: string;
    author?: string;
    excerpt?: any; // Changed to any because it's Portable Text
    body?: any; // Portable Text from Sanity
    url?: string;
  };
}

export const InlineReview: FC<InlineReviewProps> = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
          /* FIX: Use PortableText even for the excerpt to avoid [object Object] */
          <div className="line-clamp-3">
            {review.excerpt ? (
              <PortableText value={review.excerpt} />
            ) : (
              <p>Click to read review details</p>
            )}
          </div>
        ) : (
          /* Show full Portable Text body when expanded */
          <div className="not-italic prose prose-gray max-w-none">
            {review.body ? (
              <PortableText value={review.body} />
            ) : (
              <PortableText value={review.excerpt} />
            )}
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-gray-50 pt-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs font-mono font-bold uppercase tracking-widest text-gray-900 hover:text-accent transition-colors flex items-center gap-2"
        >
          {isExpanded ? "↑ Show Less" : "↓ Read More"}
        </button>

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
