// app/reviews/page.tsx
import Link from "next/link";
import { Metadata } from "next";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { PortableText } from "@portabletext/react";

export const metadata: Metadata = {
  title: "Reviews | David Felder",
  description: "Recording and Performance reviews for David Felder.",
};

const REVIEWS_QUERY = defineQuery(`{
  "recording": *[_type == "review" && reviewType == "recording"] | order(reviewDate desc)[0...10] {
    _id,
    title,
    "slug": slug.current,
    reviewType,
    source,
    author,
    reviewLink,
    excerpt
  },
  "performance": *[_type == "review" && reviewType == "performance"] | order(reviewDate desc)[0...10] {
    _id,
    title,
    "slug": slug.current,
    reviewType,
    source,
    author,
    reviewLink,
    excerpt
  }
}`);

interface Review {
  _id: string;
  title: string;
  slug?: string;
  reviewType?: "recording" | "performance";
  source?: string;
  author?: string;
  reviewLink?: string;
  excerpt?: any;
}

function ReviewItem({ review }: { review: Review }) {
  const isValidLink = review.reviewLink && review.reviewLink.startsWith("http");

  return (
    <div className="group border-b border-gray-300 py-12 last:border-0">
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-2xl font-serif font-bold text-[#1a1a1a] leading-tight mb-2 group-hover:text-[#c2410c] transition-colors">
            {review.title}
          </h3>
          <p className="text-sm font-bold text-[#c2410c] uppercase tracking-[0.1em] mb-4">
            {[review.source, review.author].filter(Boolean).join(" — ")}
          </p>
        </div>

        {review.excerpt && (
          <div className="text-[#333] font-serif leading-relaxed text-lg max-w-3xl italic">
            <PortableText value={review.excerpt} />
          </div>
        )}

        {isValidLink && (
          <div className="mt-2">
            <Link
              href={review.reviewLink!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs font-black border-b-2 border-[#1a1a1a] pb-0.5 hover:border-[#c2410c] hover:text-[#c2410c] transition-all uppercase tracking-widest"
            >
              Read More
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default async function ReviewsPage() {
  const { data } = await sanityFetch({ query: REVIEWS_QUERY });
  const { recording = [], performance = [] } = data;

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <header className="mb-20 flex flex-col items-center md:items-start">
        <h1 className="text-6xl md:text-8xl font-black tracking-tight text-[#1a1a1a]">
          Reviews
        </h1>
        <div className="mt-4 h-2 w-32 bg-[#8b0000]" />
      </header>

      <section className="mb-24">
        <div className="flex items-center mb-10">
          <h2 className="text-sm font-black tracking-[0.3em] text-white bg-[#1a1a1a] px-4 py-2 uppercase">
            Recording Reviews
          </h2>
          <div className="flex-1 h-[1px] bg-[#1a1a1a] ml-4"></div>
        </div>
        {recording.length > 0 ? (
          <div className="divide-y divide-gray-300">
            {recording.map((review: Review) => (
              <ReviewItem key={review._id} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 font-serif italic">
            No recording reviews currently listed.
          </p>
        )}
      </section>

      <section className="mb-20">
        <div className="flex items-center mb-10">
          <h2 className="text-sm font-black tracking-[0.3em] text-white bg-[#8b0000] px-4 py-2 uppercase">
            Performance Reviews
          </h2>
          <div className="flex-1 h-[1px] bg-[#8b0000] ml-4"></div>
        </div>
        {performance.length > 0 ? (
          <div className="divide-y divide-gray-300">
            {performance.map((review: Review) => (
              <ReviewItem key={review._id} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 font-serif italic">
            No performance reviews currently listed.
          </p>
        )}
      </section>
    </main>
  );
}
