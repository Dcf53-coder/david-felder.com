// app/reviews/page.tsx
import Link from "next/link";
import { Metadata } from "next";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";

export const metadata: Metadata = {
  title: "Reviews | David Felder",
  description: "Recording and Performance reviews for David Felder.",
};

const REVIEWS_QUERY =
  defineQuery(`*[_type == "review"] | order(reviewDate desc) {
  _id,
  title,
  "slug": slug.current,
  reviewType,
  source,
  author,
  reviewLink,
  excerpt
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
    <div className="group border-b border-gray-300 py-10 last:border-0">
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-2xl font-serif font-bold text-[#1a1a1a] leading-tight mb-2 group-hover:text-[#8b0000] transition-colors">
            {review.title}
          </h3>
          <p className="text-sm font-bold text-[#8b0000] uppercase tracking-[0.1em] mb-4">
            {[review.source, review.author].filter(Boolean).join(" — ")}
          </p>
          {isValidLink && (
            <Link
              href={review.reviewLink!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs font-black border-b-2 border-[#1a1a1a] pb-0.5 hover:border-[#8b0000] hover:text-[#8b0000] transition-all uppercase tracking-widest"
            >
              Read Full Article
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function ReviewsPage() {
  const { data: reviews } = await sanityFetch({ query: REVIEWS_QUERY });

  const recordingReviews = reviews.filter(
    (r: Review) => r.reviewType === "recording"
  );
  const performanceReviews = reviews.filter(
    (r: Review) => r.reviewType === "performance"
  );

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <header className="mb-20 border-l-8 border-[#8b0000] pl-8">
        <h1 className="text-6xl font-serif font-bold text-[#1a1a1a] tracking-tight mb-4">
          Reviews
        </h1>
        <p className="text-gray-600 italic font-serif text-lg">
          Critical reception and press commentary.
        </p>
      </header>

      <section className="mb-24">
        <div className="flex items-center mb-10">
          <h2 className="text-sm font-black tracking-[0.3em] text-white bg-[#1a1a1a] px-4 py-2 uppercase">
            Recording Reviews
          </h2>
          <div className="flex-1 h-[1px] bg-[#1a1a1a] ml-4"></div>
        </div>
        {recordingReviews.length > 0 ? (
          <div className="space-y-2">
            {recordingReviews.map((review: Review) => (
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
        {performanceReviews.length > 0 ? (
          <div className="space-y-2">
            {performanceReviews.map((review: Review) => (
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
