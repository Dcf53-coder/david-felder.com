-- Analyze field usage in Craft CMS database
-- Run with: ddev mysql < scripts/analyze-craft-fields.sql

-- Get all content entries with their field data
-- This query checks each field's usage across all entries

SELECT 'WORKS (Pieces) Field Usage' as section;
SELECT '================================' as '';

SELECT
    'duration' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_duration IS NOT NULL AND c.field_duration != '' THEN 1 ELSE 0 END) as populated,
    ROUND(100.0 * SUM(CASE WHEN c.field_duration IS NOT NULL AND c.field_duration != '' THEN 1 ELSE 0 END) / COUNT(*), 1) as pct_used
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'works';

SELECT
    'completedQ' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_completedQ = 1 THEN 1 ELSE 0 END) as is_true,
    SUM(CASE WHEN c.field_completedQ = 0 OR c.field_completedQ IS NULL THEN 1 ELSE 0 END) as is_false_or_null
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'works';

SELECT
    'completionDates' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_completionDates IS NOT NULL AND c.field_completionDates != '' THEN 1 ELSE 0 END) as populated,
    ROUND(100.0 * SUM(CASE WHEN c.field_completionDates IS NOT NULL AND c.field_completionDates != '' THEN 1 ELSE 0 END) / COUNT(*), 1) as pct_used
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'works';

SELECT
    'abbreviatedInstrumentationQ' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_abbreviatedInstrumentationQ = 1 THEN 1 ELSE 0 END) as is_true,
    SUM(CASE WHEN c.field_abbreviatedInstrumentationQ = 0 OR c.field_abbreviatedInstrumentationQ IS NULL THEN 1 ELSE 0 END) as is_false_or_null
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'works';

SELECT
    'abbreviatedInstrumentation' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_abbreviatedInstrumentation IS NOT NULL AND c.field_abbreviatedInstrumentation != '' THEN 1 ELSE 0 END) as populated,
    ROUND(100.0 * SUM(CASE WHEN c.field_abbreviatedInstrumentation IS NOT NULL AND c.field_abbreviatedInstrumentation != '' THEN 1 ELSE 0 END) / COUNT(*), 1) as pct_used
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'works';

SELECT
    'alternativeInstrumentationQ' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_alternativeInstrumentationQ = 1 THEN 1 ELSE 0 END) as is_true,
    SUM(CASE WHEN c.field_alternativeInstrumentationQ = 0 OR c.field_alternativeInstrumentationQ IS NULL THEN 1 ELSE 0 END) as is_false_or_null
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'works';

SELECT
    'inlineNotes' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_inlineNotes IS NOT NULL AND c.field_inlineNotes != '' THEN 1 ELSE 0 END) as populated,
    ROUND(100.0 * SUM(CASE WHEN c.field_inlineNotes IS NOT NULL AND c.field_inlineNotes != '' THEN 1 ELSE 0 END) / COUNT(*), 1) as pct_used
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'works';

SELECT
    'programNote' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_programNote IS NOT NULL AND c.field_programNote != '' THEN 1 ELSE 0 END) as populated,
    ROUND(100.0 * SUM(CASE WHEN c.field_programNote IS NOT NULL AND c.field_programNote != '' THEN 1 ELSE 0 END) / COUNT(*), 1) as pct_used
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'works';

SELECT
    'miscellaneousNotes' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_miscellaneousNotes IS NOT NULL AND c.field_miscellaneousNotes != '' THEN 1 ELSE 0 END) as populated,
    ROUND(100.0 * SUM(CASE WHEN c.field_miscellaneousNotes IS NOT NULL AND c.field_miscellaneousNotes != '' THEN 1 ELSE 0 END) / COUNT(*), 1) as pct_used
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'works';

SELECT
    'soundCloudEmbedLink' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_soundCloudEmbedLink IS NOT NULL AND c.field_soundCloudEmbedLink != '' THEN 1 ELSE 0 END) as populated,
    ROUND(100.0 * SUM(CASE WHEN c.field_soundCloudEmbedLink IS NOT NULL AND c.field_soundCloudEmbedLink != '' THEN 1 ELSE 0 END) / COUNT(*), 1) as pct_used
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'works';

SELECT
    'publishedOnCdQ' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_publishedOnCdQ = 1 THEN 1 ELSE 0 END) as is_true,
    SUM(CASE WHEN c.field_publishedOnCdQ = 0 OR c.field_publishedOnCdQ IS NULL THEN 1 ELSE 0 END) as is_false_or_null
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'works';

SELECT
    'electronicsQ' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_electronicsQ = 1 THEN 1 ELSE 0 END) as is_true,
    SUM(CASE WHEN c.field_electronicsQ = 0 OR c.field_electronicsQ IS NULL THEN 1 ELSE 0 END) as is_false_or_null
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'works';

SELECT
    'electronicsDescription' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_electronicsDescription IS NOT NULL AND c.field_electronicsDescription != '' THEN 1 ELSE 0 END) as populated,
    ROUND(100.0 * SUM(CASE WHEN c.field_electronicsDescription IS NOT NULL AND c.field_electronicsDescription != '' THEN 1 ELSE 0 END) / COUNT(*), 1) as pct_used
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'works';

SELECT
    'commissionInfo' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_commissionInfo IS NOT NULL AND c.field_commissionInfo != '' THEN 1 ELSE 0 END) as populated,
    ROUND(100.0 * SUM(CASE WHEN c.field_commissionInfo IS NOT NULL AND c.field_commissionInfo != '' THEN 1 ELSE 0 END) / COUNT(*), 1) as pct_used
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'works';

SELECT
    'dedication' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_dedication IS NOT NULL AND c.field_dedication != '' THEN 1 ELSE 0 END) as populated,
    ROUND(100.0 * SUM(CASE WHEN c.field_dedication IS NOT NULL AND c.field_dedication != '' THEN 1 ELSE 0 END) / COUNT(*), 1) as pct_used
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'works';

SELECT
    'publishedQ' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_publishedQ = 1 THEN 1 ELSE 0 END) as is_true,
    SUM(CASE WHEN c.field_publishedQ = 0 OR c.field_publishedQ IS NULL THEN 1 ELSE 0 END) as is_false_or_null
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'works';

SELECT
    'publisher' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_publisher IS NOT NULL AND c.field_publisher != '' THEN 1 ELSE 0 END) as populated,
    ROUND(100.0 * SUM(CASE WHEN c.field_publisher IS NOT NULL AND c.field_publisher != '' THEN 1 ELSE 0 END) / COUNT(*), 1) as pct_used
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'works';

SELECT
    'publisherLink' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_publisherLink IS NOT NULL AND c.field_publisherLink != '' THEN 1 ELSE 0 END) as populated,
    ROUND(100.0 * SUM(CASE WHEN c.field_publisherLink IS NOT NULL AND c.field_publisherLink != '' THEN 1 ELSE 0 END) / COUNT(*), 1) as pct_used
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'works';

SELECT
    'scoreSampleLink' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_scoreSampleLink IS NOT NULL AND c.field_scoreSampleLink != '' THEN 1 ELSE 0 END) as populated,
    ROUND(100.0 * SUM(CASE WHEN c.field_scoreSampleLink IS NOT NULL AND c.field_scoreSampleLink != '' THEN 1 ELSE 0 END) / COUNT(*), 1) as pct_used
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'works';

SELECT
    'passwordProtectQ' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_passwordProtectQ = 1 THEN 1 ELSE 0 END) as is_true,
    SUM(CASE WHEN c.field_passwordProtectQ = 0 OR c.field_passwordProtectQ IS NULL THEN 1 ELSE 0 END) as is_false_or_null
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'works';

SELECT
    'passwordOverride' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_passwordOverride IS NOT NULL AND c.field_passwordOverride != '' THEN 1 ELSE 0 END) as populated,
    ROUND(100.0 * SUM(CASE WHEN c.field_passwordOverride IS NOT NULL AND c.field_passwordOverride != '' THEN 1 ELSE 0 END) / COUNT(*), 1) as pct_used
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'works';

-- Asset relations for works
SELECT
    'audio (assets)' as field_name,
    (SELECT COUNT(DISTINCT e.id) FROM craft_entries e JOIN craft_sections s ON e.sectionId = s.id WHERE s.handle = 'works') as total_entries,
    COUNT(DISTINCT r.sourceId) as entries_with_audio,
    ROUND(100.0 * COUNT(DISTINCT r.sourceId) / (SELECT COUNT(DISTINCT e.id) FROM craft_entries e JOIN craft_sections s ON e.sectionId = s.id WHERE s.handle = 'works'), 1) as pct_used
FROM craft_relations r
JOIN craft_fields f ON r.fieldId = f.id
WHERE f.handle = 'audio';

SELECT
    'videos (assets)' as field_name,
    (SELECT COUNT(DISTINCT e.id) FROM craft_entries e JOIN craft_sections s ON e.sectionId = s.id WHERE s.handle = 'works') as total_entries,
    COUNT(DISTINCT r.sourceId) as entries_with_videos,
    ROUND(100.0 * COUNT(DISTINCT r.sourceId) / (SELECT COUNT(DISTINCT e.id) FROM craft_entries e JOIN craft_sections s ON e.sectionId = s.id WHERE s.handle = 'works'), 1) as pct_used
FROM craft_relations r
JOIN craft_fields f ON r.fieldId = f.id
WHERE f.handle = 'videos';

SELECT
    'images (assets)' as field_name,
    (SELECT COUNT(DISTINCT e.id) FROM craft_entries e JOIN craft_sections s ON e.sectionId = s.id WHERE s.handle = 'works') as total_entries,
    COUNT(DISTINCT r.sourceId) as entries_with_images,
    ROUND(100.0 * COUNT(DISTINCT r.sourceId) / (SELECT COUNT(DISTINCT e.id) FROM craft_entries e JOIN craft_sections s ON e.sectionId = s.id WHERE s.handle = 'works'), 1) as pct_used
FROM craft_relations r
JOIN craft_fields f ON r.fieldId = f.id
WHERE f.handle = 'images';

SELECT
    'score (assets)' as field_name,
    (SELECT COUNT(DISTINCT e.id) FROM craft_entries e JOIN craft_sections s ON e.sectionId = s.id WHERE s.handle = 'works') as total_entries,
    COUNT(DISTINCT r.sourceId) as entries_with_score,
    ROUND(100.0 * COUNT(DISTINCT r.sourceId) / (SELECT COUNT(DISTINCT e.id) FROM craft_entries e JOIN craft_sections s ON e.sectionId = s.id WHERE s.handle = 'works'), 1) as pct_used
FROM craft_relations r
JOIN craft_fields f ON r.fieldId = f.id
WHERE f.handle = 'score';

SELECT
    'downloads (assets)' as field_name,
    (SELECT COUNT(DISTINCT e.id) FROM craft_entries e JOIN craft_sections s ON e.sectionId = s.id WHERE s.handle = 'works') as total_entries,
    COUNT(DISTINCT r.sourceId) as entries_with_downloads,
    ROUND(100.0 * COUNT(DISTINCT r.sourceId) / (SELECT COUNT(DISTINCT e.id) FROM craft_entries e JOIN craft_sections s ON e.sectionId = s.id WHERE s.handle = 'works'), 1) as pct_used
FROM craft_relations r
JOIN craft_fields f ON r.fieldId = f.id
WHERE f.handle = 'downloads';

SELECT
    'publicDownloads (assets)' as field_name,
    (SELECT COUNT(DISTINCT e.id) FROM craft_entries e JOIN craft_sections s ON e.sectionId = s.id WHERE s.handle = 'works') as total_entries,
    COUNT(DISTINCT r.sourceId) as entries_with_publicDownloads,
    ROUND(100.0 * COUNT(DISTINCT r.sourceId) / (SELECT COUNT(DISTINCT e.id) FROM craft_entries e JOIN craft_sections s ON e.sectionId = s.id WHERE s.handle = 'works'), 1) as pct_used
FROM craft_relations r
JOIN craft_fields f ON r.fieldId = f.id
WHERE f.handle = 'publicDownloads';

SELECT
    'cd (relation)' as field_name,
    (SELECT COUNT(DISTINCT e.id) FROM craft_entries e JOIN craft_sections s ON e.sectionId = s.id WHERE s.handle = 'works') as total_entries,
    COUNT(DISTINCT r.sourceId) as entries_with_cd,
    ROUND(100.0 * COUNT(DISTINCT r.sourceId) / (SELECT COUNT(DISTINCT e.id) FROM craft_entries e JOIN craft_sections s ON e.sectionId = s.id WHERE s.handle = 'works'), 1) as pct_used
FROM craft_relations r
JOIN craft_fields f ON r.fieldId = f.id
WHERE f.handle = 'cd';

-- Instrumentation (SuperTable)
SELECT
    'instrumentation (supertable)' as field_name,
    (SELECT COUNT(DISTINCT e.id) FROM craft_entries e JOIN craft_sections s ON e.sectionId = s.id WHERE s.handle = 'works') as total_entries,
    COUNT(DISTINCT r.sourceId) as entries_with_instrumentation,
    ROUND(100.0 * COUNT(DISTINCT r.sourceId) / (SELECT COUNT(DISTINCT e.id) FROM craft_entries e JOIN craft_sections s ON e.sectionId = s.id WHERE s.handle = 'works'), 1) as pct_used
FROM craft_relations r
JOIN craft_fields f ON r.fieldId = f.id
WHERE f.handle = 'instrumentation';

SELECT
    'alternativeInstrumentation (supertable)' as field_name,
    (SELECT COUNT(DISTINCT e.id) FROM craft_entries e JOIN craft_sections s ON e.sectionId = s.id WHERE s.handle = 'works') as total_entries,
    COUNT(DISTINCT r.sourceId) as entries_with_altInstrumentation,
    ROUND(100.0 * COUNT(DISTINCT r.sourceId) / (SELECT COUNT(DISTINCT e.id) FROM craft_entries e JOIN craft_sections s ON e.sectionId = s.id WHERE s.handle = 'works'), 1) as pct_used
FROM craft_relations r
JOIN craft_fields f ON r.fieldId = f.id
WHERE f.handle = 'alternativeInstrumentation';


SELECT '' as '';
SELECT 'CDS Field Usage' as section;
SELECT '================================' as '';

SELECT
    'recordLabel' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_recordLabel IS NOT NULL AND c.field_recordLabel != '' THEN 1 ELSE 0 END) as populated,
    ROUND(100.0 * SUM(CASE WHEN c.field_recordLabel IS NOT NULL AND c.field_recordLabel != '' THEN 1 ELSE 0 END) / COUNT(*), 1) as pct_used
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'cds';

SELECT
    'catalogNumber' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_catalogNumber IS NOT NULL AND c.field_catalogNumber != '' THEN 1 ELSE 0 END) as populated,
    ROUND(100.0 * SUM(CASE WHEN c.field_catalogNumber IS NOT NULL AND c.field_catalogNumber != '' THEN 1 ELSE 0 END) / COUNT(*), 1) as pct_used
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'cds';

SELECT
    'releaseDate' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_releaseDate IS NOT NULL THEN 1 ELSE 0 END) as populated,
    ROUND(100.0 * SUM(CASE WHEN c.field_releaseDate IS NOT NULL THEN 1 ELSE 0 END) / COUNT(*), 1) as pct_used
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'cds';

SELECT
    'albumLink' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_albumLink IS NOT NULL AND c.field_albumLink != '' THEN 1 ELSE 0 END) as populated,
    ROUND(100.0 * SUM(CASE WHEN c.field_albumLink IS NOT NULL AND c.field_albumLink != '' THEN 1 ELSE 0 END) / COUNT(*), 1) as pct_used
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'cds';

SELECT
    'purchaseLink' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_purchaseLink IS NOT NULL AND c.field_purchaseLink != '' THEN 1 ELSE 0 END) as populated,
    ROUND(100.0 * SUM(CASE WHEN c.field_purchaseLink IS NOT NULL AND c.field_purchaseLink != '' THEN 1 ELSE 0 END) / COUNT(*), 1) as pct_used
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'cds';

SELECT
    'featuredQ' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_featuredQ = 1 THEN 1 ELSE 0 END) as is_true,
    SUM(CASE WHEN c.field_featuredQ = 0 OR c.field_featuredQ IS NULL THEN 1 ELSE 0 END) as is_false_or_null
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'cds';

SELECT
    'albumArt (assets)' as field_name,
    (SELECT COUNT(DISTINCT e.id) FROM craft_entries e JOIN craft_sections s ON e.sectionId = s.id WHERE s.handle = 'cds') as total_entries,
    COUNT(DISTINCT r.sourceId) as entries_with_albumArt,
    ROUND(100.0 * COUNT(DISTINCT r.sourceId) / (SELECT COUNT(DISTINCT e.id) FROM craft_entries e JOIN craft_sections s ON e.sectionId = s.id WHERE s.handle = 'cds'), 1) as pct_used
FROM craft_relations r
JOIN craft_fields f ON r.fieldId = f.id
JOIN craft_entries e ON r.sourceId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE f.handle = 'albumArt' AND s.handle = 'cds';


SELECT '' as '';
SELECT 'NEWS/REVIEWS Field Usage' as section;
SELECT '================================' as '';

SELECT
    'reviewSource' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_reviewSource IS NOT NULL AND c.field_reviewSource != '' THEN 1 ELSE 0 END) as populated,
    ROUND(100.0 * SUM(CASE WHEN c.field_reviewSource IS NOT NULL AND c.field_reviewSource != '' THEN 1 ELSE 0 END) / COUNT(*), 1) as pct_used
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'newsReviews';

SELECT
    'reviewAuthor' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_reviewAuthor IS NOT NULL AND c.field_reviewAuthor != '' THEN 1 ELSE 0 END) as populated,
    ROUND(100.0 * SUM(CASE WHEN c.field_reviewAuthor IS NOT NULL AND c.field_reviewAuthor != '' THEN 1 ELSE 0 END) / COUNT(*), 1) as pct_used
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'newsReviews';

SELECT
    'reviewDate' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_reviewDate IS NOT NULL THEN 1 ELSE 0 END) as populated,
    ROUND(100.0 * SUM(CASE WHEN c.field_reviewDate IS NOT NULL THEN 1 ELSE 0 END) / COUNT(*), 1) as pct_used
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'newsReviews';

SELECT
    'reviewLink' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_reviewLink IS NOT NULL AND c.field_reviewLink != '' THEN 1 ELSE 0 END) as populated,
    ROUND(100.0 * SUM(CASE WHEN c.field_reviewLink IS NOT NULL AND c.field_reviewLink != '' THEN 1 ELSE 0 END) / COUNT(*), 1) as pct_used
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'newsReviews';

SELECT
    'excerpt' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_excerpt IS NOT NULL AND c.field_excerpt != '' THEN 1 ELSE 0 END) as populated,
    ROUND(100.0 * SUM(CASE WHEN c.field_excerpt IS NOT NULL AND c.field_excerpt != '' THEN 1 ELSE 0 END) / COUNT(*), 1) as pct_used
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'newsReviews';

SELECT
    'body' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_body IS NOT NULL AND c.field_body != '' THEN 1 ELSE 0 END) as populated,
    ROUND(100.0 * SUM(CASE WHEN c.field_body IS NOT NULL AND c.field_body != '' THEN 1 ELSE 0 END) / COUNT(*), 1) as pct_used
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'newsReviews';

SELECT
    'relatedPieces (relation)' as field_name,
    (SELECT COUNT(DISTINCT e.id) FROM craft_entries e JOIN craft_sections s ON e.sectionId = s.id WHERE s.handle = 'newsReviews') as total_entries,
    COUNT(DISTINCT r.sourceId) as entries_with_relatedPieces,
    ROUND(100.0 * COUNT(DISTINCT r.sourceId) / NULLIF((SELECT COUNT(DISTINCT e.id) FROM craft_entries e JOIN craft_sections s ON e.sectionId = s.id WHERE s.handle = 'newsReviews'), 0), 1) as pct_used
FROM craft_relations r
JOIN craft_fields f ON r.fieldId = f.id
JOIN craft_entries e ON r.sourceId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE f.handle = 'relatedPieces' AND s.handle = 'newsReviews';

SELECT
    'relatedCds (relation)' as field_name,
    (SELECT COUNT(DISTINCT e.id) FROM craft_entries e JOIN craft_sections s ON e.sectionId = s.id WHERE s.handle = 'newsReviews') as total_entries,
    COUNT(DISTINCT r.sourceId) as entries_with_relatedCds,
    ROUND(100.0 * COUNT(DISTINCT r.sourceId) / NULLIF((SELECT COUNT(DISTINCT e.id) FROM craft_entries e JOIN craft_sections s ON e.sectionId = s.id WHERE s.handle = 'newsReviews'), 0), 1) as pct_used
FROM craft_relations r
JOIN craft_fields f ON r.fieldId = f.id
JOIN craft_entries e ON r.sourceId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE f.handle = 'relatedCds' AND s.handle = 'newsReviews';


SELECT '' as '';
SELECT 'PROGRAMMING Field Usage' as section;
SELECT '================================' as '';

SELECT
    'programID' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_programID IS NOT NULL THEN 1 ELSE 0 END) as populated,
    ROUND(100.0 * SUM(CASE WHEN c.field_programID IS NOT NULL THEN 1 ELSE 0 END) / COUNT(*), 1) as pct_used
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'programming';

SELECT
    'programTitle' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_programTitle IS NOT NULL AND c.field_programTitle != '' THEN 1 ELSE 0 END) as populated,
    ROUND(100.0 * SUM(CASE WHEN c.field_programTitle IS NOT NULL AND c.field_programTitle != '' THEN 1 ELSE 0 END) / COUNT(*), 1) as pct_used
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'programming';

SELECT
    'programComposer' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_programComposer IS NOT NULL AND c.field_programComposer != '' THEN 1 ELSE 0 END) as populated,
    ROUND(100.0 * SUM(CASE WHEN c.field_programComposer IS NOT NULL AND c.field_programComposer != '' THEN 1 ELSE 0 END) / COUNT(*), 1) as pct_used
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'programming';

SELECT
    'programContext' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_programContext IS NOT NULL AND c.field_programContext != '' THEN 1 ELSE 0 END) as populated,
    ROUND(100.0 * SUM(CASE WHEN c.field_programContext IS NOT NULL AND c.field_programContext != '' THEN 1 ELSE 0 END) / COUNT(*), 1) as pct_used
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'programming';

SELECT
    'programEnsemblePerformer' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_programEnsemblePerformer IS NOT NULL AND c.field_programEnsemblePerformer != '' THEN 1 ELSE 0 END) as populated,
    ROUND(100.0 * SUM(CASE WHEN c.field_programEnsemblePerformer IS NOT NULL AND c.field_programEnsemblePerformer != '' THEN 1 ELSE 0 END) / COUNT(*), 1) as pct_used
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'programming';

SELECT
    'programInstrumentation' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_programInstrumentation IS NOT NULL AND c.field_programInstrumentation != '' THEN 1 ELSE 0 END) as populated,
    ROUND(100.0 * SUM(CASE WHEN c.field_programInstrumentation IS NOT NULL AND c.field_programInstrumentation != '' THEN 1 ELSE 0 END) / COUNT(*), 1) as pct_used
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'programming';

SELECT
    'programPersonnel' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_programPersonnel IS NOT NULL AND c.field_programPersonnel != '' THEN 1 ELSE 0 END) as populated,
    ROUND(100.0 * SUM(CASE WHEN c.field_programPersonnel IS NOT NULL AND c.field_programPersonnel != '' THEN 1 ELSE 0 END) / COUNT(*), 1) as pct_used
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'programming';

SELECT
    'programWork' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_programWork IS NOT NULL AND c.field_programWork != '' THEN 1 ELSE 0 END) as populated,
    ROUND(100.0 * SUM(CASE WHEN c.field_programWork IS NOT NULL AND c.field_programWork != '' THEN 1 ELSE 0 END) / COUNT(*), 1) as pct_used
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'programming';

SELECT
    'programDate' as field_name,
    COUNT(*) as total_entries,
    SUM(CASE WHEN c.field_programDate IS NOT NULL THEN 1 ELSE 0 END) as populated,
    ROUND(100.0 * SUM(CASE WHEN c.field_programDate IS NOT NULL THEN 1 ELSE 0 END) / COUNT(*), 1) as pct_used
FROM craft_content c
JOIN craft_entries e ON c.elementId = e.id
JOIN craft_sections s ON e.sectionId = s.id
WHERE s.handle = 'programming';
