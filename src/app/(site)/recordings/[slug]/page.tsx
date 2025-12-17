import { notFound } from "next/navigation";
import { defineQuery } from "next-sanity";
import { RecordingDetail } from "@/components/RecordingDetail";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";

// Query for fetching all recording slugs for static generation
const ALL_RECORDING_SLUGS_QUERY =
  defineQuery(`*[_type == "recording" && defined(slug.current)]{
  "slug": slug.current
}`);

// GROQ Query for fetching a single recording with all details
const RECORDING_DETAIL_QUERY =
  defineQuery(`*[_type == "recording" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  recordLabel,
  catalogNumber,
  releaseDate,
  albumLink,
  purchaseLink,
  isFeatured,
  albumArt {
    asset -> {
      _id,
      url,
      metadata {
        dimensions {
          width,
          height,
          aspectRatio
        },
        lqip
      }
    }
  },
  pieces[] {
    _key,
    performers,
    piece -> {
      _id,
      title,
      slug
    }
  },
  "relatedReviews": *[_type == "review" && references(^._id)]{
    _id,
    title,
    slug,
    source,
    author,
    reviewDate,
    reviewType,
    body,
    reviewLink,
    excerpt
  }
}`);

interface RecordingDetailPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all recordings at build time
export async function generateStaticParams() {
  const recordings = await client.fetch(ALL_RECORDING_SLUGS_QUERY);

  return recordings
    .filter(
      (recording): recording is { slug: string } => recording.slug !== null,
    )
    .map((recording) => ({
      slug: recording.slug,
    }));
}

export default async function RecordingDetailPage({
  params,
}: RecordingDetailPageProps) {
  const { slug } = await params;

  const { data: recording } = await sanityFetch({
    query: RECORDING_DETAIL_QUERY,
    params: { slug },
  });

  if (!recording) {
    return notFound();
  }

  return <RecordingDetail recording={recording} />;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: RecordingDetailPageProps) {
  const { slug } = await params;

  const { data: recording } = await sanityFetch({
    query: RECORDING_DETAIL_QUERY,
    params: { slug },
  });

  if (!recording) {
    return {
      title: "Recording Not Found",
    };
  }

  const title = recording.title
    ? `${recording.title} | David Felder`
    : "David Felder";
  const description = recording.recordLabel
    ? `${recording.title} on ${recording.recordLabel}`
    : `${recording.title} by David Felder`;

  return {
    title,
    description,
  };
}
