import { Metadata } from "next";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { ReviewItem } from "./ReviewItem";

export const metadata: Metadata = {
  title: "Reviews | David Felder",
  description: "Recording and Performance reviews for David Felder.",
};

// Removed [0...10] limit so ALL reviews show
const REVIEWS_QUERY = defineQuery(`{
  "recording": *[_type == "review" && reviewType == "recording"] | order(reviewDate desc) {
    _id,
    title,
    "slug": slug.current,
    reviewType,
    source,
    author,
    reviewLink,
    excerpt,
    body
  },
  "performance": *[_type == "review" && reviewType == "performance"] | order(reviewDate desc) {
    _id,
    title,
    "slug": slug.current,
    reviewType,
    source,
    author,
    reviewLink,
    excerpt,
    body
  }
}`);

export default async function ReviewsPage() {
  const { data } = await sanityFetch({ query: REVIEWS_QUERY });
  const { recording = [], performance = [] } = data;

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <header className="mb-20 flex flex-col items-center md:items-start">
        <h1 className="text-6xl md:text-8xl font-black tracking-tight text-[#1a1a1a]">
          Reviews
        </h1>
        {/* Updated to David's Brand Red */}
        <div className="mt-4 h-2 w-32 bg-[#c2410c]" />
      </header>

      {/* Recording Section */}
      <section className="mb-24">
        <div className="flex items-center mb-10">
          <h2 className="text-sm font-black tracking-[0.3em] text-white bg-[#1a1a1a] px-4 py-2 uppercase">
            Recording Reviews
          </h2>
          <div className="flex-1 h-[1px] bg-[#1a1a1a] ml-4"></div>
        </div>
        <div className="divide-y divide-gray-300">
          {recording.map((review: any) => (
            <ReviewItem key={review._id} review={review} />
          ))}
        </div>
      </section>

      {/* Performance Section */}
      <section className="mb-20">
        <div className="flex items-center mb-10">
          <h2 className="text-sm font-black tracking-[0.3em] text-white bg-[#c2410c] px-4 py-2 uppercase">
            Performance Reviews
          </h2>
          <div className="flex-1 h-[1px] bg-[#c2410c] ml-4"></div>
        </div>
        <div className="divide-y divide-gray-300">
          {performance.map((review: any) => (
            <ReviewItem key={review._id} review={review} />
          ))}
        </div>
      </section>
    </main>
  );
}
