#!/usr/bin/env node

/**
 * Delete all work and instrument documents from Sanity
 *
 * Usage:
 *   node scripts/delete-works-instruments.mjs
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || '6sddclyk',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

async function deleteDocuments(type) {
  console.log(`Deleting all ${type} documents...`);

  const query = `*[_type == "${type}"]._id`;
  const ids = await client.fetch(query);

  if (ids.length === 0) {
    console.log(`No ${type} documents found.`);
    return 0;
  }

  console.log(`Found ${ids.length} ${type} documents to delete.`);

  // Delete in batches of 100
  const batchSize = 100;
  for (let i = 0; i < ids.length; i += batchSize) {
    const batch = ids.slice(i, i + batchSize);
    const transaction = client.transaction();
    batch.forEach(id => transaction.delete(id));
    await transaction.commit();
    console.log(`Deleted ${Math.min(i + batchSize, ids.length)} / ${ids.length}`);
  }

  return ids.length;
}

async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error('Error: SANITY_TOKEN environment variable is required');
    console.error('Get a token from: https://www.sanity.io/manage');
    process.exit(1);
  }

  // const worksDeleted = await deleteDocuments('work');
  // const instrumentsDeleted = await deleteDocuments('instrument');
  const performancesDeleted = await deleteDocuments('performance');

  console.log(`\nDone. Deleted ${performancesDeleted} performances.`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
