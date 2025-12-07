import { notFound } from "next/navigation";
import { defineQuery } from "next-sanity";
import { ReviewsList } from "@/components/ReviewsList";
import { sanityFetch } from "@/sanity/lib/live";

const REVIEWS_LISTING_QUERY = defineQuery(`*[_type == "review"]{
  _id,
  title,
  slug,
  reviewType,
  excerpt,
  reviewDate,
  source,
  author
}`);

export default async function ReviewsListingPage() {
  const { data: reviews } = await sanityFetch({
    query: REVIEWS_LISTING_QUERY,
  });

  if (!reviews) {
    return notFound();
  }

  return <ReviewsList reviews={reviews} />;
}
