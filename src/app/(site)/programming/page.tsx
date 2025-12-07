import { notFound } from "next/navigation";
import { defineQuery } from "next-sanity";
import { ProgrammingTable } from "@/components/ProgrammingTable";
import { sanityFetch } from "@/sanity/lib/live";

// GROQ Query for programming data
const PROGRAMMING_QUERY =
  defineQuery(`*[_type == "performance"] | order(programDate desc) {
  _id,
  programTitle,
  composer,
  context,
  ensemble,
  instrumentation,
  personnel,
  programWork,
  programDate
}`);

export default async function ProgrammingPage() {
  const { data: programs } = await sanityFetch({
    query: PROGRAMMING_QUERY,
  });

  if (!programs) {
    return notFound();
  }

  return <ProgrammingTable programs={programs} />;
}
