import { ReviewDetail } from "@/components/ReviewDetail";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";
import { notFound } from "next/navigation";

// Query for fetching all review slugs for static generation
const ALL_REVIEW_SLUGS_QUERY = defineQuery(`*[_type == "review" && defined(slug.current)]{
  "slug": slug.current
}`);

// GROQ Query for fetching a single review with all details
const REVIEW_DETAIL_QUERY = defineQuery(`*[_type == "review" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  body,
  excerpt,
  reviewDate,
  source,
  author,
  reviewLink,
  relatedWorks[] -> {
    _id,
    title,
    slug
  },
  relatedRecordings[] -> {
    _id,
    title,
    slug,
    recordLabel
  }
}`);

interface ReviewDetailPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all reviews at build time
export async function generateStaticParams() {
  const reviews = await client.fetch(ALL_REVIEW_SLUGS_QUERY);

  return reviews
    .filter((review): review is { slug: string } => review.slug !== null)
    .map((review) => ({
      slug: review.slug,
    }));
}

export default async function ReviewDetailPage({
  params,
}: ReviewDetailPageProps) {
  const { slug } = await params;

  const { data: review } = await sanityFetch({
    query: REVIEW_DETAIL_QUERY,
    params: { slug },
  });

  if (!review) {
    return notFound();
  }

  return <ReviewDetail review={review} />;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ReviewDetailPageProps) {
  const { slug } = await params;

  const { data: review } = await sanityFetch({
    query: REVIEW_DETAIL_QUERY,
    params: { slug },
  });

  if (!review) {
    return {
      title: "Review Not Found",
    };
  }

  const title = review.title
    ? `${review.title} | David Felder`
    : "David Felder";

  const descriptionParts = [];
  if (review.source) descriptionParts.push(review.source);
  if (review.author) descriptionParts.push(`by ${review.author}`);

  const description = descriptionParts.length > 0
    ? descriptionParts.join(" ")
    : `Review: ${review.title}`;

  return {
    title,
    description,
  };
}
