import { WorksList } from "@/components/WorksList";
import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";
import { notFound } from "next/navigation";

// GROQ Query
// Note: Only supports a single level of nesting (parent -> children)
const worksListingFields = `
  _id,
  title,
  slug,
  completionDate,
  isCompleted,
  duration,
  instrumentation[] {
    _key,
    quantity,
    instrument -> { name }
  },
  useAbbreviatedInstrumentation,
  abbreviatedInstrumentation,
  inlineNotes,
  commissionInfo
`;

const WORKS_LISTING_QUERY = defineQuery(`*[_type == "work" && !defined(parent)]{
  ${worksListingFields},
  "children": *[_type == "work" && parent._ref == ^._id]{
    ${worksListingFields}
  }
}`);

export default async function WorksListingPage() {
  const { data: works } = await sanityFetch({
    query: WORKS_LISTING_QUERY,
  });

  if (!works) {
    return notFound();
  }

  return <WorksList works={works} />;
}
