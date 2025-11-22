#!/usr/bin/env node

/**
 * Export Craft CMS data to Sanity NDJSON format
 *
 * Usage:
 *   node scripts/export-to-sanity.mjs
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';
import { htmlToBlocks } from '@portabletext/block-tools';
import { Schema } from '@sanity/schema';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base path for Craft assets
const CRAFT_ASSETS_PATH = path.resolve(__dirname, '..', '..', 'www', 'public_html', 'public');

// Volume path mapping (from Craft volumes settings)
const VOLUME_PATHS = {
  electronics: 'assets/electronics',
  scoreSamples: 'assets/scoresamples',
  audio: 'assets/audio',
  video: 'assets/video',
  images: 'assets/images',
  liveStream: 'assets/livestream',
};

// Define and compile the schema using @sanity/schema
const defaultSchema = Schema.compile({
  name: 'default',
  types: [
    {
      name: 'blockContent',
      type: 'array',
      title: 'Block Content',
      of: [
        {
          type: 'block',
          title: 'Block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  ],
});

// Get the compiled block content type
const blockContentType = defaultSchema.get('blockContent');

// Convert HTML to Portable Text blocks
function htmlToPortableText(html) {
  if (!html) return undefined;

  // Clean up literal \n strings (escaped newlines that appear in the data)
  let cleanedHtml = html.replace(/\\n/g, '\n');

  // Wrap in a root element if needed
  const wrappedHtml = cleanedHtml.trim().startsWith('<') ? cleanedHtml : `<p>${cleanedHtml}</p>`;

  try {
    const blocks = htmlToBlocks(wrappedHtml, blockContentType, {
      parseHtml: (html) => new JSDOM(html).window.document,
    });

    // Add _key to each block if missing and filter out empty/newline-only blocks
    return blocks
      .map(block => ({
        ...block,
        _key: block._key || crypto.randomBytes(6).toString('hex'),
      }))
      .filter(block => {
        // Filter out blocks that only contain newlines or whitespace
        if (block.children && block.children.length === 1) {
          const text = block.children[0].text || '';
          if (text.trim() === '' || text === '\\n' || /^[\s\\n]*$/.test(text)) {
            return false;
          }
        }
        return true;
      });
  } catch (err) {
    console.error('Error converting HTML:', err.message);
    // Fallback to plain text block
    return [{
      _type: 'block',
      _key: crypto.randomBytes(6).toString('hex'),
      style: 'normal',
      markDefs: [],
      children: [{
        _type: 'span',
        _key: crypto.randomBytes(6).toString('hex'),
        text: html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(),
        marks: [],
      }],
    }];
  }
}

// Deterministic ID generation based on Craft UID
function craftIdToSanityId(type, craftUid) {
  return `${type}-${craftUid.replace(/-/g, '').substring(0, 12)}`;
}

// Build _sanityAsset URL for a file
function buildSanityAssetUrl(volume, filename, isImage = false) {
  const volumePath = VOLUME_PATHS[volume];
  if (!volumePath) {
    console.error(`Unknown volume: ${volume}`);
    return null;
  }
  const fullPath = path.join(CRAFT_ASSETS_PATH, volumePath, filename);
  const prefix = isImage ? 'image' : 'file';
  return `${prefix}@file://${fullPath}`;
}

// Format date to yyyy-mm-dd for Sanity date fields
function formatDate(dateStr) {
  if (!dateStr) return undefined;

  // Try to parse the date
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    // If parsing fails, try to extract yyyy-mm-dd pattern
    const match = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    // Try mm/dd/yyyy format
    const usMatch = dateStr.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (usMatch) {
      return `${usMatch[3]}-${usMatch[1].padStart(2, '0')}-${usMatch[2].padStart(2, '0')}`;
    }
    return undefined;
  }

  // Format as yyyy-mm-dd
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Check if file is an image based on extension
function isImageFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext);
}

// Generate slug from title
function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// Run MySQL query via ddev
function runQuery(sql) {
  const craftDir = path.join(__dirname, '..', '..', 'www', 'public_html');
  const result = execSync(`ddev mysql -N -e "${sql.replace(/"/g, '\\"')}"`, {
    cwd: craftDir,
    encoding: 'utf-8',
    maxBuffer: 50 * 1024 * 1024,
  });
  return result.trim().split('\n').filter(line => line.length > 0);
}

// Parse TSV row
function parseTsvRow(row, columns) {
  const values = row.split('\t');
  const obj = {};
  columns.forEach((col, i) => {
    obj[col] = values[i] === 'NULL' || values[i] === '\\N' ? null : values[i];
  });
  return obj;
}

// Remove undefined values from an object
function cleanDoc(doc) {
  Object.keys(doc).forEach(key => {
    if (doc[key] === undefined) {
      delete doc[key];
    }
  });
  return doc;
}

// Get asset relations map for all entries
function getAssetsMap() {
  console.error('Fetching asset relations...');
  const assetsSql = `
    SELECT
      r.sourceId,
      f.handle as fieldHandle,
      a.filename,
      v.handle as volume,
      con.title as assetTitle
    FROM craft_relations r
    JOIN craft_fields f ON r.fieldId = f.id
    JOIN craft_assets a ON r.targetId = a.id
    JOIN craft_elements ae ON a.id = ae.id
    JOIN craft_volumes v ON a.volumeId = v.id
    JOIN craft_elements se ON r.sourceId = se.id
    JOIN craft_content con ON a.id = con.elementId
    WHERE f.type LIKE '%Assets%'
      AND ae.dateDeleted IS NULL
      AND se.dateDeleted IS NULL
      AND se.draftId IS NULL
      AND se.revisionId IS NULL
    ORDER BY r.sourceId, r.sortOrder
  `;
  const assetsRows = runQuery(assetsSql);

  const assetsMap = {};
  for (const row of assetsRows) {
    const [sourceId, fieldHandle, filename, volume, assetTitle] = row.split('\t');
    if (!assetsMap[sourceId]) {
      assetsMap[sourceId] = {};
    }
    if (!assetsMap[sourceId][fieldHandle]) {
      assetsMap[sourceId][fieldHandle] = [];
    }
    assetsMap[sourceId][fieldHandle].push({ filename, volume, title: assetTitle });
  }
  return assetsMap;
}

// Publisher slug to ID mapping
const PUBLISHER_MAP = {
  'theodorepresserinc': 'publisher-theodore-presser',
  'projectschottnewyork': 'publisher-schott',
  'seesawMusic': 'publisher-seesaw',
};

// Export Publishers
function exportPublishers() {
  console.error('Exporting publishers...');

  const publishers = [
    {
      _id: 'publisher-theodore-presser',
      _type: 'publisher',
      name: 'Theodore Presser',
      website: 'https://www.presser.com/',
    },
    {
      _id: 'publisher-schott',
      _type: 'publisher',
      name: 'Project Schott New York',
      website: 'https://en.schott-music.com/',
    },
    {
      _id: 'publisher-seesaw',
      _type: 'publisher',
      name: 'Seesaw Music',
      website: 'https://www.seesawmusic.com/',
    },
  ];

  console.error(`Exported ${publishers.length} publishers`);
  return publishers;
}

// Export Instruments (Categories)
function exportInstruments() {
  console.error('Exporting instruments...');

  const sql = `
    SELECT c.id, e.uid, con.title
    FROM craft_categories c
    JOIN craft_elements e ON c.id = e.id
    JOIN craft_content con ON e.id = con.elementId
    WHERE c.groupId = 1 AND e.dateDeleted IS NULL
    ORDER BY c.id
  `;

  const rows = runQuery(sql);
  const instruments = [];

  for (const row of rows) {
    const [id, uid, name] = row.split('\t');
    if (!name || name === 'NULL') continue;

    instruments.push({
      _id: craftIdToSanityId('instrument', uid),
      _type: 'instrument',
      name: name,
    });
  }

  console.error(`Exported ${instruments.length} instruments`);
  return instruments;
}

// Export Works
function exportWorks(assetsMap) {
  console.error('Exporting works...');

  const sql = `
    SELECT
      e.id,
      el.uid,
      con.title,
      els.slug as craft_slug,
      con.field_duration,
      con.field_completedQ,
      con.field_completionDates,
      con.field_abbreviatedInstrumentationQ,
      con.field_abbreviatedInstrumentation,
      con.field_alternativeInstrumentationQ,
      con.field_inlineNotes,
      con.field_programNote,
      con.field_miscellaneousNotes,
      con.field_soundCloudEmbedLink,
      con.field_publishedOnCdQ,
      con.field_electronicsQ,
      con.field_electronicsDescription,
      con.field_commissionInfo,
      con.field_dedication,
      con.field_publishedQ,
      con.field_publisher,
      con.field_publisherLink,
      con.field_scoreSampleLink,
      con.field_passwordProtectQ,
      con.field_passwordOverride
    FROM craft_entries e
    JOIN craft_elements el ON e.id = el.id
    JOIN craft_elements_sites els ON e.id = els.elementId
    JOIN craft_content con ON e.id = con.elementId
    JOIN craft_sections s ON e.sectionId = s.id
    WHERE s.handle = 'works' AND el.dateDeleted IS NULL
      AND el.draftId IS NULL AND el.revisionId IS NULL
    ORDER BY e.id
  `;

  const rows = runQuery(sql);
  const columns = [
    'id', 'uid', 'title', 'craft_slug',
    'duration', 'completedQ', 'completionDates',
    'abbreviatedInstrumentationQ', 'abbreviatedInstrumentation',
    'alternativeInstrumentationQ', 'inlineNotes', 'programNote',
    'miscellaneousNotes', 'soundCloudEmbedLink', 'publishedOnCdQ',
    'electronicsQ', 'electronicsDescription', 'commissionInfo',
    'dedication', 'publishedQ', 'publisher', 'publisherLink',
    'scoreSampleLink', 'passwordProtectQ', 'passwordOverride'
  ];

  // Get instrumentation relations
  console.error('  Fetching instrumentation...');
  const instrumentationSql = `
    SELECT st.ownerId, cat_el.uid as instrument_uid, st.sortOrder
    FROM craft_supertableblocks st
    JOIN craft_relations r ON st.id = r.sourceId
    JOIN craft_elements cat_el ON r.targetId = cat_el.id
    WHERE st.fieldId = 25 AND r.fieldId = 26
    ORDER BY st.ownerId, st.sortOrder
  `;
  const instrumentationRows = runQuery(instrumentationSql);

  const instrumentationMap = {};
  for (const row of instrumentationRows) {
    const [ownerId, instrumentUid, sortOrder] = row.split('\t');
    if (!instrumentationMap[ownerId]) {
      instrumentationMap[ownerId] = [];
    }
    instrumentationMap[ownerId].push({ instrumentUid, sortOrder: parseInt(sortOrder) });
  }

  // Get alternative instrumentation
  console.error('  Fetching alternative instrumentation...');
  const altInstrumentationSql = `
    SELECT st.ownerId, cat_el.uid as instrument_uid, st.sortOrder
    FROM craft_supertableblocks st
    JOIN craft_relations r ON st.id = r.sourceId
    JOIN craft_elements cat_el ON r.targetId = cat_el.id
    WHERE st.fieldId = 40 AND r.fieldId = 41
    ORDER BY st.ownerId, st.sortOrder
  `;
  const altInstrumentationRows = runQuery(altInstrumentationSql);

  const altInstrumentationMap = {};
  for (const row of altInstrumentationRows) {
    const [ownerId, instrumentUid, sortOrder] = row.split('\t');
    if (!altInstrumentationMap[ownerId]) {
      altInstrumentationMap[ownerId] = [];
    }
    altInstrumentationMap[ownerId].push({ instrumentUid, sortOrder: parseInt(sortOrder) });
  }

  // Get parent relationships via structure
  console.error('  Fetching work hierarchy...');
  const hierarchySql = `
    SELECT
      child_el.id as child_id,
      parent_el.uid as parent_uid
    FROM craft_structureelements child_se
    JOIN craft_elements child_el ON child_se.elementId = child_el.id
    JOIN craft_structureelements parent_se ON child_se.structureId = parent_se.structureId
      AND child_se.lft > parent_se.lft
      AND child_se.rgt < parent_se.rgt
      AND parent_se.level = child_se.level - 1
    JOIN craft_elements parent_el ON parent_se.elementId = parent_el.id
    WHERE child_el.dateDeleted IS NULL AND parent_el.dateDeleted IS NULL
  `;
  const hierarchyRows = runQuery(hierarchySql);

  const parentMap = {};
  for (const row of hierarchyRows) {
    const [childId, parentUid] = row.split('\t');
    if (parentUid && parentUid !== 'NULL') {
      parentMap[childId] = parentUid;
    }
  }

  const works = [];

  for (const row of rows) {
    const data = parseTsvRow(row, columns);
    if (!data.title) continue;

    const doc = {
      _id: craftIdToSanityId('work', data.uid),
      _type: 'work',
      title: data.title,
      slug: {
        _type: 'slug',
        current: data.craft_slug || slugify(data.title),
      },
      duration: data.duration || undefined,
      isCompleted: data.completedQ === '1',
      completionDate: formatDate(data.completionDates),
      useAbbreviatedInstrumentation: data.abbreviatedInstrumentationQ === '1',
      abbreviatedInstrumentation: data.abbreviatedInstrumentation || undefined,
      hasAlternativeInstrumentation: data.alternativeInstrumentationQ === '1',
      inlineNotes: data.inlineNotes || undefined,
      soundCloudEmbedUrl: data.soundCloudEmbedLink || undefined,
      isOnCd: data.publishedOnCdQ === '1',
      hasElectronics: data.electronicsQ === '1',
      commissionInfo: data.commissionInfo || undefined,
      dedication: data.dedication || undefined,
      isPublished: data.publishedQ === '1',
      publisherLink: data.publisherLink || undefined,
      scoreSampleLink: data.scoreSampleLink || undefined,
      isPasswordProtected: data.passwordProtectQ === '1',
      passwordOverride: data.passwordOverride || undefined,
    };

    // Convert HTML fields to Portable Text
    if (data.programNote) {
      doc.programNote = htmlToPortableText(data.programNote);
    }
    if (data.miscellaneousNotes) {
      doc.miscellaneousNotes = htmlToPortableText(data.miscellaneousNotes);
    }
    if (data.electronicsDescription) {
      doc.electronicsDescription = htmlToPortableText(data.electronicsDescription);
    }

    // Add publisher reference
    if (data.publisher && PUBLISHER_MAP[data.publisher]) {
      doc.publisher = {
        _type: 'reference',
        _ref: PUBLISHER_MAP[data.publisher],
      };
    }

    // Add parent reference
    const parentUid = parentMap[data.id];
    if (parentUid) {
      doc.parent = {
        _type: 'reference',
        _ref: craftIdToSanityId('work', parentUid),
      };
    }

    // Add instrumentation
    const instrumentation = instrumentationMap[data.id];
    if (instrumentation && instrumentation.length > 0) {
      doc.instrumentation = instrumentation.map(inst => ({
        _type: 'object',
        _key: crypto.randomBytes(6).toString('hex'),
        instrument: {
          _type: 'reference',
          _ref: craftIdToSanityId('instrument', inst.instrumentUid),
        },
        quantity: 1,
      }));
    }

    // Add alternative instrumentation
    const altInstrumentation = altInstrumentationMap[data.id];
    if (altInstrumentation && altInstrumentation.length > 0) {
      doc.alternativeInstrumentation = altInstrumentation.map(inst => ({
        _type: 'object',
        _key: crypto.randomBytes(6).toString('hex'),
        instrument: {
          _type: 'reference',
          _ref: craftIdToSanityId('instrument', inst.instrumentUid),
        },
        quantity: 1,
      }));
    }

    // Add assets
    const workAssets = assetsMap[data.id];
    if (workAssets) {
      if (workAssets.downloads && workAssets.downloads.length > 0) {
        doc.downloads = workAssets.downloads.map(asset => ({
          _type: 'file',
          _key: crypto.randomBytes(6).toString('hex'),
          _sanityAsset: buildSanityAssetUrl(asset.volume, asset.filename, false),
        }));
      }
      if (workAssets.publicDownloads && workAssets.publicDownloads.length > 0) {
        doc.publicDownloads = workAssets.publicDownloads.map(asset => ({
          _type: 'file',
          _key: crypto.randomBytes(6).toString('hex'),
          _sanityAsset: buildSanityAssetUrl(asset.volume, asset.filename, false),
        }));
      }
      // Score is a single file, not an array
      if (workAssets.score && workAssets.score.length > 0) {
        const asset = workAssets.score[0];
        doc.score = {
          _type: 'file',
          _sanityAsset: buildSanityAssetUrl(asset.volume, asset.filename, false),
        };
      }
      if (workAssets.audio && workAssets.audio.length > 0) {
        doc.audio = workAssets.audio.map(asset => ({
          _type: 'file',
          _key: crypto.randomBytes(6).toString('hex'),
          _sanityAsset: buildSanityAssetUrl(asset.volume, asset.filename, false),
          title: asset.title || undefined,
        }));
      }
      if (workAssets.videos && workAssets.videos.length > 0) {
        doc.videos = workAssets.videos.map(asset => ({
          _type: 'file',
          _key: crypto.randomBytes(6).toString('hex'),
          _sanityAsset: buildSanityAssetUrl(asset.volume, asset.filename, false),
          title: asset.title || undefined,
        }));
      }
      if (workAssets.images && workAssets.images.length > 0) {
        doc.images = workAssets.images.map(asset => ({
          _type: 'image',
          _key: crypto.randomBytes(6).toString('hex'),
          _sanityAsset: buildSanityAssetUrl(asset.volume, asset.filename, true),
        }));
      }
    }

    works.push(cleanDoc(doc));
  }

  console.error(`Exported ${works.length} works`);
  return works;
}

// Export Recordings (CDs)
function exportRecordings(assetsMap) {
  console.error('Exporting recordings...');

  const sql = `
    SELECT
      e.id,
      el.uid,
      con.title,
      els.slug as craft_slug,
      con.field_recordLabel,
      con.field_catalogNumber,
      con.field_releaseDate,
      con.field_albumLink,
      con.field_purchaseLink,
      con.field_featuredQ
    FROM craft_entries e
    JOIN craft_elements el ON e.id = el.id
    JOIN craft_elements_sites els ON e.id = els.elementId
    JOIN craft_content con ON e.id = con.elementId
    JOIN craft_sections s ON e.sectionId = s.id
    WHERE s.handle = 'cds' AND el.dateDeleted IS NULL
      AND el.draftId IS NULL AND el.revisionId IS NULL
    ORDER BY e.id
  `;

  const rows = runQuery(sql);
  const columns = [
    'id', 'uid', 'title', 'craft_slug',
    'recordLabel', 'catalogNumber', 'releaseDate',
    'albumLink', 'purchaseLink', 'featuredQ'
  ];

  // Get pieces (related works) for recordings
  console.error('  Fetching recording pieces...');
  const piecesSql = `
    SELECT r.sourceId, work_el.uid as work_uid, con.field_performers
    FROM craft_relations r
    JOIN craft_elements work_el ON r.targetId = work_el.id
    JOIN craft_matrixblocks mb ON r.sourceId = mb.id
    JOIN craft_content con ON mb.id = con.elementId
    WHERE r.fieldId = (SELECT id FROM craft_fields WHERE handle = 'piece')
    ORDER BY r.sourceId, r.sortOrder
  `;

  // Actually the pieces are in a matrix block, let's find the right structure
  const matrixPiecesSql = `
    SELECT
      mb.ownerId as recordingId,
      work_el.uid as work_uid,
      con.field_performers
    FROM craft_matrixblocks mb
    JOIN craft_content con ON mb.id = con.elementId
    LEFT JOIN craft_relations r ON mb.id = r.sourceId
    LEFT JOIN craft_elements work_el ON r.targetId = work_el.id
    JOIN craft_elements mbe ON mb.id = mbe.id
    WHERE mb.fieldId = (SELECT id FROM craft_fields WHERE handle = 'pieces')
      AND mbe.dateDeleted IS NULL
    ORDER BY mb.ownerId, mb.sortOrder
  `;

  let piecesMap = {};
  try {
    const piecesRows = runQuery(matrixPiecesSql);
    for (const row of piecesRows) {
      const [recordingId, workUid, performers] = row.split('\t');
      if (!piecesMap[recordingId]) {
        piecesMap[recordingId] = [];
      }
      if (workUid && workUid !== 'NULL') {
        piecesMap[recordingId].push({ workUid, performers: performers || null });
      }
    }
  } catch (e) {
    console.error('  Warning: Could not fetch pieces matrix:', e.message);
  }

  const recordings = [];

  for (const row of rows) {
    const data = parseTsvRow(row, columns);
    if (!data.title) continue;

    const doc = {
      _id: craftIdToSanityId('recording', data.uid),
      _type: 'recording',
      title: data.title,
      slug: {
        _type: 'slug',
        current: data.craft_slug || slugify(data.title),
      },
      recordLabel: data.recordLabel || undefined,
      catalogNumber: data.catalogNumber || undefined,
      releaseDate: formatDate(data.releaseDate),
      albumLink: data.albumLink || undefined,
      purchaseLink: data.purchaseLink || undefined,
      isFeatured: data.featuredQ === '1',
    };

    // Add album art
    const recAssets = assetsMap[data.id];
    if (recAssets && recAssets.albumArt && recAssets.albumArt.length > 0) {
      const art = recAssets.albumArt[0];
      doc.albumArt = {
        _type: 'image',
        _sanityAsset: buildSanityAssetUrl(art.volume, art.filename, true),
      };
    }

    // Add pieces
    const pieces = piecesMap[data.id];
    if (pieces && pieces.length > 0) {
      doc.pieces = pieces.map(p => ({
        _type: 'object',
        _key: crypto.randomBytes(6).toString('hex'),
        piece: {
          _type: 'reference',
          _ref: craftIdToSanityId('work', p.workUid),
        },
        performers: p.performers || undefined,
      }));
    }

    recordings.push(cleanDoc(doc));
  }

  console.error(`Exported ${recordings.length} recordings`);
  return recordings;
}

// Export Reviews (News/Reviews)
function exportReviews(assetsMap) {
  console.error('Exporting reviews...');

  const sql = `
    SELECT
      e.id,
      el.uid,
      con.title,
      els.slug as craft_slug,
      con.field_body,
      con.field_excerpt,
      con.field_reviewDate,
      con.field_reviewSource,
      con.field_reviewAuthor,
      con.field_reviewLink
    FROM craft_entries e
    JOIN craft_elements el ON e.id = el.id
    JOIN craft_elements_sites els ON e.id = els.elementId
    JOIN craft_content con ON e.id = con.elementId
    JOIN craft_sections s ON e.sectionId = s.id
    WHERE s.handle = 'newsReviews' AND el.dateDeleted IS NULL
      AND el.draftId IS NULL AND el.revisionId IS NULL
    ORDER BY e.id
  `;

  const rows = runQuery(sql);
  const columns = [
    'id', 'uid', 'title', 'craft_slug',
    'body', 'excerpt', 'reviewDate', 'reviewSource',
    'reviewAuthor', 'reviewLink'
  ];

  // Get related works
  console.error('  Fetching related works...');
  const relatedWorksSql = `
    SELECT r.sourceId, work_el.uid as work_uid
    FROM craft_relations r
    JOIN craft_elements work_el ON r.targetId = work_el.id
    JOIN craft_fields f ON r.fieldId = f.id
    JOIN craft_entries e ON work_el.id = e.id
    JOIN craft_sections s ON e.sectionId = s.id
    WHERE f.handle = 'relatedWorks' AND s.handle = 'works'
    ORDER BY r.sourceId, r.sortOrder
  `;

  let relatedWorksMap = {};
  try {
    const relatedRows = runQuery(relatedWorksSql);
    for (const row of relatedRows) {
      const [sourceId, workUid] = row.split('\t');
      if (!relatedWorksMap[sourceId]) {
        relatedWorksMap[sourceId] = [];
      }
      relatedWorksMap[sourceId].push(workUid);
    }
  } catch (e) {
    console.error('  Warning: Could not fetch related works:', e.message);
  }

  // Get related recordings
  console.error('  Fetching related recordings...');
  const relatedRecordingsSql = `
    SELECT r.sourceId, rec_el.uid as rec_uid
    FROM craft_relations r
    JOIN craft_elements rec_el ON r.targetId = rec_el.id
    JOIN craft_fields f ON r.fieldId = f.id
    JOIN craft_entries e ON rec_el.id = e.id
    JOIN craft_sections s ON e.sectionId = s.id
    WHERE f.handle = 'relatedRecordings' AND s.handle = 'cds'
    ORDER BY r.sourceId, r.sortOrder
  `;

  let relatedRecordingsMap = {};
  try {
    const relatedRecRows = runQuery(relatedRecordingsSql);
    for (const row of relatedRecRows) {
      const [sourceId, recUid] = row.split('\t');
      if (!relatedRecordingsMap[sourceId]) {
        relatedRecordingsMap[sourceId] = [];
      }
      relatedRecordingsMap[sourceId].push(recUid);
    }
  } catch (e) {
    console.error('  Warning: Could not fetch related recordings:', e.message);
  }

  const reviews = [];

  for (const row of rows) {
    const data = parseTsvRow(row, columns);
    if (!data.title) continue;

    const doc = {
      _id: craftIdToSanityId('review', data.uid),
      _type: 'review',
      title: data.title,
      slug: {
        _type: 'slug',
        current: data.craft_slug || slugify(data.title),
      },
      reviewDate: formatDate(data.reviewDate),
      source: data.reviewSource || undefined,
      author: data.reviewAuthor || undefined,
      reviewLink: data.reviewLink || undefined,
    };

    // Convert HTML fields to Portable Text
    if (data.body) {
      doc.body = htmlToPortableText(data.body);
    }
    if (data.excerpt) {
      doc.excerpt = htmlToPortableText(data.excerpt);
    }

    // Add related works
    const relatedWorks = relatedWorksMap[data.id];
    if (relatedWorks && relatedWorks.length > 0) {
      doc.relatedWorks = relatedWorks.map(uid => ({
        _type: 'reference',
        _ref: craftIdToSanityId('work', uid),
        _key: crypto.randomBytes(6).toString('hex'),
      }));
    }

    // Add related recordings
    const relatedRecordings = relatedRecordingsMap[data.id];
    if (relatedRecordings && relatedRecordings.length > 0) {
      doc.relatedRecordings = relatedRecordings.map(uid => ({
        _type: 'reference',
        _ref: craftIdToSanityId('recording', uid),
        _key: crypto.randomBytes(6).toString('hex'),
      }));
    }

    reviews.push(cleanDoc(doc));
  }

  console.error(`Exported ${reviews.length} reviews`);
  return reviews;
}

// Export Performances (Programming)
function exportPerformances() {
  console.error('Exporting performances...');

  const sql = `
    SELECT
      e.id,
      el.uid,
      con.field_programID,
      con.field_programTitle,
      con.field_programComposer,
      con.field_programContext,
      con.field_programEnsemblePerformer,
      con.field_programInstrumentation,
      con.field_programPersonnel,
      con.field_programWork,
      con.field_programDate
    FROM craft_entries e
    JOIN craft_elements el ON e.id = el.id
    JOIN craft_content con ON e.id = con.elementId
    JOIN craft_sections s ON e.sectionId = s.id
    WHERE s.handle = 'programming' AND el.dateDeleted IS NULL
      AND el.draftId IS NULL AND el.revisionId IS NULL
    ORDER BY e.id
  `;

  const rows = runQuery(sql);
  const columns = [
    'id', 'uid', 'programID', 'programTitle', 'programComposer',
    'programContext', 'programEnsemblePerformer', 'programInstrumentation',
    'programPersonnel', 'programWork', 'programDate'
  ];

  const performances = [];

  for (const row of rows) {
    const data = parseTsvRow(row, columns);

    const doc = {
      _id: craftIdToSanityId('performance', data.uid),
      _type: 'performance',
      programTitle: data.programTitle || undefined,
      composer: data.programComposer || undefined,
      context: data.programContext || undefined,
      ensemble: data.programEnsemblePerformer || undefined,
      instrumentation: data.programInstrumentation || undefined,
      personnel: data.programPersonnel || undefined,
      programWork: data.programWork || undefined,
      programDate: formatDate(data.programDate),
    };

    performances.push(cleanDoc(doc));
  }

  console.error(`Exported ${performances.length} performances`);
  return performances;
}

// Export About Page (singleton)
function exportAboutPage(assetsMap) {
  console.error('Exporting about page...');

  const sql = `
    SELECT
      e.id,
      el.uid,
      con.title,
      con.field_body,
      con.field_vitalInfo,
      con.field_otherlinks,
      con.field_streamEmbed
    FROM craft_entries e
    JOIN craft_elements el ON e.id = el.id
    JOIN craft_content con ON e.id = con.elementId
    JOIN craft_sections s ON e.sectionId = s.id
    WHERE s.handle = 'about' AND el.dateDeleted IS NULL
      AND el.draftId IS NULL AND el.revisionId IS NULL
    LIMIT 1
  `;

  const rows = runQuery(sql);
  if (rows.length === 0) {
    console.error('  No about page found');
    return [];
  }

  const columns = ['id', 'uid', 'title', 'body', 'vitalInfo', 'otherlinks', 'streamEmbed'];
  const data = parseTsvRow(rows[0], columns);

  const doc = {
    _id: 'aboutPage',
    _type: 'aboutPage',
    title: data.title || 'About',
  };

  if (data.body) {
    doc.body = htmlToPortableText(data.body);
  }
  if (data.vitalInfo) {
    doc.vitalInfo = htmlToPortableText(data.vitalInfo);
  }
  if (data.otherlinks) {
    doc.otherLinks = htmlToPortableText(data.otherlinks);
  }
  if (data.streamEmbed) {
    doc.streamEmbed = data.streamEmbed;
  }

  // Add images
  const aboutAssets = assetsMap[data.id];
  if (aboutAssets && aboutAssets.images && aboutAssets.images.length > 0) {
    doc.images = aboutAssets.images.map(asset => ({
      _type: 'image',
      _key: crypto.randomBytes(6).toString('hex'),
      _sanityAsset: buildSanityAssetUrl(asset.volume, asset.filename, true),
    }));
  }

  console.error('  Exported about page');
  return [cleanDoc(doc)];
}

// Export Contact Page (singleton)
function exportContactPage() {
  console.error('Exporting contact page...');

  const sql = `
    SELECT
      e.id,
      el.uid,
      con.title,
      con.field_body
    FROM craft_entries e
    JOIN craft_elements el ON e.id = el.id
    JOIN craft_content con ON e.id = con.elementId
    JOIN craft_sections s ON e.sectionId = s.id
    WHERE s.handle = 'contact' AND el.dateDeleted IS NULL
      AND el.draftId IS NULL AND el.revisionId IS NULL
    LIMIT 1
  `;

  const rows = runQuery(sql);
  if (rows.length === 0) {
    console.error('  No contact page found');
    return [];
  }

  const columns = ['id', 'uid', 'title', 'body'];
  const data = parseTsvRow(rows[0], columns);

  const doc = {
    _id: 'contactPage',
    _type: 'contactPage',
    title: data.title || 'Contact',
  };

  if (data.body) {
    doc.body = htmlToPortableText(data.body);
  }

  console.error('  Exported contact page');
  return [cleanDoc(doc)];
}

// Main export function
function main() {
  const outputDir = path.join(__dirname, '..', 'sanity-import');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Get shared assets map
  const assetsMap = getAssetsMap();

  // Export all document types
  const allDocuments = [
    ...exportPublishers(),
    ...exportInstruments(),
    ...exportWorks(assetsMap),
    ...exportRecordings(assetsMap),
    ...exportReviews(assetsMap),
    ...exportPerformances(),
    ...exportAboutPage(assetsMap),
    ...exportContactPage(),
  ];

  // Write single NDJSON file
  const outputFile = path.join(outputDir, 'all-content.ndjson');
  fs.writeFileSync(outputFile, allDocuments.map(doc => JSON.stringify(doc)).join('\n'));
  console.error(`\nWrote ${allDocuments.length} documents to ${outputFile}`);

  console.error('\nTo import into Sanity:');
  console.error(`  cd david-felder.com`);
  console.error(`  npx sanity dataset import sanity-import/all-content.ndjson production --allow-failing-assets`);
}

main();
