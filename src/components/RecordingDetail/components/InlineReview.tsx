"use client";

import { useState, type FC } from "react";
import { PortableText } from "@portabletext/react";

interface InlineReviewProps {
  review: {
    source?: string;
    author?: string;
    excerpt?: any;
    body?: any; // Full text from Sanity
    url?: string; // The "Proof" link
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
        <h3 className="text-lg font-mono font-bold text-[#8b0000] uppercase tracking-widest">
          {attribution || "Review"}
        </h3>
        <div className="h-px w-12 bg-gray-900 mt-2" />
      </div>

      <div className="text-gray-800 leading-relaxed text-lg font-serif">
        {!isExpanded ? (
          /* COLLAPSED VIEW: Show Excerpt with italic styling */
          <div className="relative">
            <div className="line-clamp-4 italic">
              {review.excerpt ? (
                <PortableText value={review.excerpt} />
              ) : (
                <p>Click to read review details</p>
              )}
            </div>
            <button
              onClick={() => setIsExpanded(true)}
              className="mt-4 text-xs font-mono font-bold uppercase tracking-widest text-gray-900 hover:text-[#8b0000] transition-colors flex items-center gap-2"
            >
              ↓ Read Full Review Text
            </button>
          </div>
        ) : (
          /* EXPANDED VIEW: Show Full Body (Paywall Solution) */
          <div className="animate-in fade-in slide-in-from-top-2 duration-500">
            <div className="not-italic prose prose-serif max-w-none text-gray-700 mb-8">
              {review.body ? (
                <PortableText value={review.body} />
              ) : (
                <PortableText value={review.excerpt} />
              )}
            </div>

            <div className="flex flex-col gap-4 border-t border-gray-100 pt-6">
              <button
                onClick={() => setIsExpanded(false)}
                className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors self-start"
              >
                ↑ Show Less
              </button>

              {review.url && (
                <div className="pt-2">
                  <a
                    href={review.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-serif italic text-gray-400 hover:text-[#8b0000] underline decoration-gray-200 underline-offset-4 transition-all"
                  >
                    Original Source (Verification Link) &rarr;
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
