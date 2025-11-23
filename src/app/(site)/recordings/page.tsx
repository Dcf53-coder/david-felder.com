import { RecordingsList } from "@/components/RecordingsList";
import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";
import { notFound } from "next/navigation";

const RECORDINGS_LISTING_QUERY = defineQuery(`*[_type == "recording"]{
  _id,
  title,
  slug,
  recordLabel,
  releaseDate,
  isFeatured,
  albumArt {
    asset -> {
      _id,
      url,
      metadata {
        lqip
      }
    }
  }
}`);

export default async function RecordingsListingPage() {
  const { data: recordings } = await sanityFetch({
    query: RECORDINGS_LISTING_QUERY,
  });

  if (!recordings) {
    return notFound();
  }

  return <RecordingsList recordings={recordings} />;
}
