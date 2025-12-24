"use client";

import { useState } from "react";
import { PortableText } from "@portabletext/react";

export function ReviewItem({ review }: { review: any }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group py-12">
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-2xl font-serif font-bold text-[#1a1a1a] leading-tight mb-2">
            {review.title}
          </h3>
          <p className="text-sm font-bold text-[#c2410c] uppercase tracking-[0.1em] mb-4">
            {[review.source, review.author].filter(Boolean).join(" — ")}
          </p>
        </div>

        <div className="text-[#333] font-serif leading-relaxed text-lg max-w-3xl">
          {!isExpanded ? (
            <div className="italic line-clamp-3">
              <PortableText value={review.excerpt} />
            </div>
          ) : (
            <div className="not-italic prose prose-serif animate-in fade-in slide-in-from-top-1 duration-500">
              {/* This is the full text bypass for paywalls */}
              <PortableText value={review.body || review.excerpt} />
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-fit text-xs font-black border-b-2 border-[#1a1a1a] pb-0.5 hover:border-[#c2410c] hover:text-[#c2410c] transition-all uppercase tracking-widest"
          >
            {isExpanded ? "↑ Show Less" : "↓ Read More..."}
          </button>

          {isExpanded && review.reviewLink && (
            <a
              href={review.reviewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-serif italic text-gray-400 hover:text-[#c2410c] underline decoration-gray-200"
            >
              Original Source (Verification Link) &rarr;
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
