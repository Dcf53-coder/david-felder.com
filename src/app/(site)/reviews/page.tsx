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
    <div className="border-b border-gray-200 py-8 last:border-0">
      <h3 className="text-xl font-bold mb-1">{review.title}</h3>
      <p className="text-sm text-gray-500 mb-4 uppercase tracking-wide">
        {[review.source, review.author].filter(Boolean).join(" — ")}
      </p>
      {isValidLink && (
        <Link
          href={review.reviewLink!}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium underline underline-offset-4 hover:text-gray-600 transition-colors"
        >
          READ FULL REVIEW
        </Link>
      )}
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
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-light mb-16 tracking-tight">Reviews</h1>

      <section className="mb-20">
        <h2 className="text-xs font-black tracking-[0.2em] uppercase border-b border-black pb-2 mb-8">
          RECORDING REVIEWS
        </h2>
        {recordingReviews.length > 0 ? (
          recordingReviews.map((review: Review) => (
            <ReviewItem key={review._id} review={review} />
          ))
        ) : (
          <p className="text-gray-400 italic">No recording reviews found.</p>
        )}
      </section>

      <section>
        <h2 className="text-xs font-black tracking-[0.2em] uppercase border-b border-black pb-2 mb-8">
          PERFORMANCE REVIEWS
        </h2>
        {performanceReviews.length > 0 ? (
          performanceReviews.map((review: Review) => (
            <ReviewItem key={review._id} review={review} />
          ))
        ) : (
          <p className="text-gray-400 italic">No performance reviews found.</p>
        )}
      </section>
    </main>
  );
}
