import { createClient } from '@sanity/client'

// Create Sanity client with environment variables
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-11-21',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

// Validate required environment variables
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.error('❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable')
  process.exit(1)
}

if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  console.error('❌ Missing NEXT_PUBLIC_SANITY_DATASET environment variable')
  process.exit(1)
}

if (!process.env.SANITY_TOKEN) {
  console.error('❌ Missing SANITY_TOKEN environment variable')
  console.error('   You can run this script with the token like this:')
  console.error('   SANITY_TOKEN="your_token_here" node scripts/update-review-work-references.mjs')
  process.exit(1)
}

// Function to normalize text for comparison (remove punctuation, convert to lowercase)
function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[.,;:!?()[\]{}""''—–-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// Function to check if a work title appears in review content
function findWorkReferences(reviewContent, workTitles) {
  const references = []

  for (const work of workTitles) {
    const normalizedTitle = normalizeText(work.title)
    const normalizedContent = normalizeText(reviewContent)

    // Skip very short titles to avoid false matches
    if (normalizedTitle.length < 3) continue

    // Check for exact title match or title within quotes
    if (normalizedContent.includes(normalizedTitle) ||
        normalizedContent.includes(`"${normalizedTitle}"`) ||
        normalizedContent.includes(`'${normalizedTitle}'`)) {
      references.push(work._id)
    }
  }

  return references
}

// Function to extract text content from portable text blocks
function extractTextFromBlocks(blocks) {
  if (!blocks || !Array.isArray(blocks)) return ''

  return blocks
    .filter(block => block._type === 'block' && block.children)
    .map(block =>
      block.children
        .filter(child => child._type === 'span' && child.text)
        .map(child => child.text)
        .join(' ')
    )
    .join(' ')
}

async function main() {
  try {
    console.log('🔍 Querying all reviews and works...')
    console.log(`📡 Connected to Sanity project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
    console.log(`📊 Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}`)

    // Query all reviews
    const reviews = await client.fetch(`
      *[_type == "review"] {
        _id,
        title,
        body,
        excerpt,
        relatedWorks[]-> {
          _id,
          title
        }
      }
    `)

    // Query all works
    const works = await client.fetch(`
      *[_type == "work"] {
        _id,
        title
      }
    `)

    console.log(`📚 Found ${reviews.length} reviews and ${works.length} works`)

    let updatedCount = 0

    // Process each review
    for (const review of reviews) {
      console.log(`\n🔍 Analyzing review: "${review.title}"`)

      // Extract text content from body and excerpt
      const bodyText = extractTextFromBlocks(review.body)
      const excerptText = extractTextFromBlocks(review.excerpt)
      const fullContent = `${bodyText} ${excerptText}`

      if (!fullContent.trim()) {
        console.log('  ⏭️  No content found, skipping...')
        continue
      }

      // Find work references in the content
      const foundReferences = findWorkReferences(fullContent, works)

      // Get currently related work IDs
      const currentRelatedWorkIds = (review.relatedWorks || []).map(work => work._id)

      // Find new references that aren't already linked
      const newReferences = foundReferences.filter(ref => !currentRelatedWorkIds.includes(ref))

      if (newReferences.length > 0) {
        console.log(`  ✨ Found ${newReferences.length} new work reference(s)`)

        // Get work titles for the new references
        const newWorkTitles = works
          .filter(work => newReferences.includes(work._id))
          .map(work => work.title)

        console.log(`     - ${newWorkTitles.join(', ')}`)

        // Update the review with new work references
        const allRelatedWorks = [...currentRelatedWorkIds, ...newReferences].map(id => ({
          _type: 'reference',
          _ref: id
        }))

        await client
          .patch(review._id)
          .set({ relatedWorks: allRelatedWorks })
          .commit()

        updatedCount++
        console.log('  ✅ Review updated successfully')
      } else {
        const existingCount = currentRelatedWorkIds.length
        if (existingCount > 0) {
          console.log(`  ℹ️  Already has ${existingCount} work reference(s), no new ones found`)
        } else {
          console.log('  ℹ️  No work references found in content')
        }
      }
    }

    console.log(`\n🎉 Process completed! Updated ${updatedCount} review(s) with new work references.`)

    // Summary of all reviews and their work references
    console.log('\n📊 Summary of all reviews and their work references:')
    const updatedReviews = await client.fetch(`
      *[_type == "review"] | order(title asc) {
        title,
        "workCount": count(relatedWorks),
        relatedWorks[]-> {
          title
        }
      }
    `)

    for (const review of updatedReviews) {
      const workTitles = (review.relatedWorks || []).map(work => work.title).join(', ')
      console.log(`  📝 "${review.title}" - ${review.workCount} work(s): ${workTitles || 'None'}`)
    }

  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

main()
