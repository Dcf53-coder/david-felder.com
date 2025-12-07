import { notFound } from "next/navigation";
import { defineQuery } from "next-sanity";
import { WorkDetail } from "@/components/WorkDetail";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";

// Query for fetching all work slugs for static generation
const ALL_WORK_SLUGS_QUERY =
  defineQuery(`*[_type == "work" && defined(slug.current)]{
  "slug": slug.current
}`);

// GROQ Query for fetching a single work with all details
const WORK_DETAIL_QUERY =
  defineQuery(`*[_type == "work" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  completionDate,
  isCompleted,
  duration,

  // Instrumentation
  instrumentation[] {
    _key,
    quantity,
    instrument -> { name, abbreviation }
  },
  useAbbreviatedInstrumentation,
  abbreviatedInstrumentation,
  hasAlternativeInstrumentation,
  alternativeInstrumentation[] {
    _key,
    quantity,
    instrument -> { name, abbreviation }
  },

  // Notes and descriptions
  inlineNotes,
  programNote,
  miscellaneousNotes,

  // Commission info
  commissionInfo,
  dedication,

  // Electronics
  hasElectronics,
  electronicsDescription,

  // Media
  soundCloudEmbedUrl,
  audio[] {
    _key,
    url,
    title,
    date,
    performers,
    location,
    credits
  },
  videos[] {
    _key,
    url,
    title,
    date,
    performers,
    location,
    credits
  },
  images[] {
    _key,
    date,
    performers,
    location,
    credits,
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
  // Recordings that feature this work (reverse lookup)
  // Includes: direct references, references to children (for series), or references to parent
  "recordings": *[_type == "recording" && (
    references(^._id) ||
    count((pieces[].piece._ref)[@ in *[_type == "work" && parent._ref == ^.^._id]._id]) > 0 ||
    references(^.parent._ref)
  )] | order(releaseDate desc) {
    _id,
    title,
    slug,
    recordLabel,
    releaseDate,
    albumArt {
      asset -> {
        _id,
        url,
        metadata {
          lqip
        }
      }
    }
  },

  // Publication info
  isPublished,
  publisher -> {
    name,
    website
  },
  publisherLink,
  scoreSampleLink,

  // Downloads
  score {
    "url": asset->url,
    "filename": asset->originalFilename
  },
  downloads[] {
    _key,
    "url": asset->url,
    "filename": asset->originalFilename
  },
  isPasswordProtected,
  publicDownloads[] {
    _key,
    "url": asset->url,
    "filename": asset->originalFilename
  },

  // Parent/children relationships
  parent -> {
    _id,
    title,
    slug
  },
  "children": *[_type == "work" && parent._ref == ^._id] | order(title asc) {
    _id,
    title,
    slug,
    duration,
    instrumentation[] {
      _key,
      quantity,
      instrument -> { name }
    },
    useAbbreviatedInstrumentation,
    abbreviatedInstrumentation
  },

  // Related reviews
  "relatedReviews": *[_type == "review" && references(^._id)]{
    _id,
    title,
    slug,
    source,
    author,
    reviewDate
  }
}`);

interface WorkDetailPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all works at build time
export async function generateStaticParams() {
  const works = await client.fetch(ALL_WORK_SLUGS_QUERY);

  return works
    .filter((work): work is { slug: string } => work.slug !== null)
    .map((work) => ({
      slug: work.slug,
    }));
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;

  const { data: work } = await sanityFetch({
    query: WORK_DETAIL_QUERY,
    params: { slug },
  });

  if (!work) {
    return notFound();
  }

  return <WorkDetail work={work} />;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: WorkDetailPageProps) {
  const { slug } = await params;

  const { data: work } = await sanityFetch({
    query: WORK_DETAIL_QUERY,
    params: { slug },
  });

  if (!work) {
    return {
      title: "Work Not Found",
    };
  }

  const title = work.title ? `${work.title} | David Felder` : "David Felder";
  const description =
    work.commissionInfo || work.inlineNotes || `${work.title} by David Felder`;

  return {
    title,
    description,
  };
}
