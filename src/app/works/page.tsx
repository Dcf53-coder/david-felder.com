import { WorksList } from "@/components/WorksList"
import { sanityFetch } from "@/sanity/lib/live"
import { defineQuery } from "next-sanity"
import { notFound } from "next/navigation"

export default async function WorksListingPage() {
  const { data: works } = await sanityFetch({
    query: WORKS_LISTING_QUERY
  })

  if (!works) {
    return notFound()
  }

  return <WorksList works={works} />
}

// QUERY
// For the sake of simplicity, this only supports a single level of nesting
const worksListingFields = `
  _id,
  title,
  slug,
  completionDate,
  duration,
  instrumentation[] {
    _key,
    instrument -> { name }
  }
`
const WORKS_LISTING_QUERY = defineQuery(`*[_type == "work" && !defined(parent)]{
  ${worksListingFields},
  "children": *[_type == "work" && parent._ref == ^._id]{
    ${worksListingFields}
  }
}`)
