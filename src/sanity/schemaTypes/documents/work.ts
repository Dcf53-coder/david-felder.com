import { defineField, defineType } from 'sanity'

export const work = defineType({
  name: 'work',
  title: 'Work',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'media', title: 'Media' },
    { name: 'electronics', title: 'Electronics' },
    { name: 'commission', title: 'Commission Info' },
    { name: 'publication', title: 'Publication Info' },
    { name: 'downloads', title: 'Downloads' },
  ],
  fields: [
    // Basic Info
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'parent',
      title: 'Parent Work (for series)',
      type: 'reference',
      to: [{ type: 'work' }],
      group: 'basic',
      description: 'If this piece is part of a series, select the parent work',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      group: 'basic',
      description: "The piece's duration (in minutes)",
    }),
    defineField({
      name: 'isCompleted',
      title: 'Completed?',
      type: 'boolean',
      group: 'basic',
      description: 'Is the piece completed?',
      initialValue: true,
    }),
    defineField({
      name: 'completionDate',
      title: 'Completion Date(s)',
      type: 'string',
      group: 'basic',
      description: 'For unfinished pieces, these may be the expected completion date(s).',
    }),
    defineField({
      name: 'instrumentation',
      title: 'Instrumentation',
      type: 'array',
      group: 'basic',
      description: 'What instruments are called for in the piece?',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'instrument',
              title: 'Instrument',
              type: 'reference',
              to: [{ type: 'instrument' }],
            },
            {
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
              description: 'How many of this instrument are required?',
              initialValue: 1,
            },
          ],
          preview: {
            select: {
              instrument: 'instrument.name',
              quantity: 'quantity',
            },
            prepare({ instrument, quantity }) {
              const qty = quantity && quantity > 1 ? `${quantity}x ` : ''
              return {
                title: `${qty}${instrument || 'Instrument'}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'useAbbreviatedInstrumentation',
      title: 'Use Abbreviated Instrumentation?',
      type: 'boolean',
      group: 'basic',
      description:
        'Should an abbreviated description of the instrumentation be used in the general works list?',
      initialValue: false,
    }),
    defineField({
      name: 'abbreviatedInstrumentation',
      title: 'Abbreviated Instrumentation',
      type: 'string',
      group: 'basic',
      description:
        'This concise description of instrumentation will be shown in the global works list. The fully detailed instrumentation will be shown on the piece\'s own page. (ex. 2, 2, 2, 2 | 1, 1, 1 | hp, pno, etc.)',
      hidden: ({ document }) => !document?.useAbbreviatedInstrumentation,
    }),
    defineField({
      name: 'hasAlternativeInstrumentation',
      title: 'Alternative Instrumentation?',
      type: 'boolean',
      group: 'basic',
      description: 'Are there versions of this piece for an alternative instrumentation?',
      initialValue: false,
    }),
    defineField({
      name: 'alternativeInstrumentation',
      title: 'Alternative Instrumentation',
      type: 'array',
      group: 'basic',
      hidden: ({ document }) => !document?.hasAlternativeInstrumentation,
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'instrument',
              title: 'Instrument',
              type: 'reference',
              to: [{ type: 'instrument' }],
            },
            {
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
              description: 'How many of this instrument are required?',
              initialValue: 1,
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'inlineNotes',
      title: 'Inline Notes',
      type: 'text',
      group: 'basic',
      description:
        'These notes will appear immediately after the instrumentation in the main works list.',
    }),
    defineField({
      name: 'programNote',
      title: 'Program Note',
      type: 'blockContent',
      group: 'basic',
    }),
    defineField({
      name: 'miscellaneousNotes',
      title: 'Miscellaneous Notes',
      type: 'blockContent',
      group: 'basic',
      description: 'Notes about any texts used, credit for collaborators, etc.',
    }),

    // Media
    defineField({
      name: 'soundCloudEmbedUrl',
      title: 'SoundCloud Embed Link',
      type: 'url',
      group: 'media',
    }),
    defineField({
      name: 'audio',
      title: 'Audio',
      type: 'array',
      group: 'media',
      description: 'Share one or more audio recordings. Paste SoundCloud URLs or other audio embed links.',
      of: [
        {
          type: 'object',
          name: 'audioEmbed',
          title: 'Audio Embed',
          fields: [
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              description: 'Paste a SoundCloud URL (e.g., https://soundcloud.com/david-felder/track-name)',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'date',
              title: 'Date',
              type: 'string',
            },
            {
              name: 'performers',
              title: 'Performers',
              type: 'string',
            },
            {
              name: 'location',
              title: 'Location',
              type: 'string',
            },
            {
              name: 'credits',
              title: 'Credits',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'title',
              url: 'url',
            },
            prepare({ title, url }) {
              return {
                title: title || 'Audio Embed',
                subtitle: url,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'videos',
      title: 'Videos',
      type: 'array',
      group: 'media',
      description: 'Share one or more videos. Paste YouTube or Vimeo URLs.',
      of: [
        {
          type: 'object',
          name: 'videoEmbed',
          title: 'Video Embed',
          fields: [
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              description: 'Paste a YouTube or Vimeo URL (e.g., https://www.youtube.com/watch?v=...)',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'date',
              title: 'Date',
              type: 'string',
            },
            {
              name: 'performers',
              title: 'Performers',
              type: 'string',
            },
            {
              name: 'location',
              title: 'Location',
              type: 'string',
            },
            {
              name: 'credits',
              title: 'Credits',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'title',
              url: 'url',
            },
            prepare({ title, url }) {
              return {
                title: title || 'Video Embed',
                subtitle: url,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      group: 'media',
      description: 'Share one or more images of this piece.',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'date',
              title: 'Date',
              type: 'string',
            },
            {
              name: 'performers',
              title: 'Performers',
              type: 'string',
            },
            {
              name: 'location',
              title: 'Location',
              type: 'string',
            },
            {
              name: 'credits',
              title: 'Credits',
              type: 'string',
            },
          ],
        },
      ],
    }),
    // Electronics
    defineField({
      name: 'hasElectronics',
      title: 'Electronics?',
      type: 'boolean',
      group: 'electronics',
      description: 'Does the piece include electronics?',
      initialValue: false,
    }),
    defineField({
      name: 'electronicsDescription',
      title: 'Description',
      type: 'blockContent',
      group: 'electronics',
      description:
        "If we're not hosting the files, indicate how someone could get ahold of them.",
      hidden: ({ document }) => !document?.hasElectronics,
    }),

    // Commission Info
    defineField({
      name: 'commissionInfo',
      title: 'Commission Info',
      type: 'text',
      group: 'commission',
      rows: 3,
      description: 'By whom was the piece commissioned, for what purpose, etc.?',
    }),
    defineField({
      name: 'dedication',
      title: 'Dedication',
      type: 'string',
      group: 'commission',
      description: 'To whom is the piece dedicated or for whom was it written?',
    }),

    // Publication Info
    defineField({
      name: 'isPublished',
      title: 'Published?',
      type: 'boolean',
      group: 'publication',
      description: 'Is the piece published?',
      initialValue: false,
    }),
    defineField({
      name: 'publisher',
      title: 'Publisher',
      type: 'reference',
      to: [{ type: 'publisher' }],
      group: 'publication',
      hidden: ({ document }) => !document?.isPublished,
    }),
    defineField({
      name: 'publisherLink',
      title: 'Publisher Link',
      type: 'url',
      group: 'publication',
      description: "Link to the Publisher's page for this piece.",
      hidden: ({ document }) => !document?.isPublished,
    }),
    defineField({
      name: 'scoreSampleLink',
      title: 'Score Sample Link',
      type: 'url',
      group: 'publication',
      description: "Provide a link to the publisher's score sample.",
      hidden: ({ document }) => !document?.isPublished,
    }),

    // Downloads
    defineField({
      name: 'score',
      title: 'Score',
      type: 'file',
      group: 'downloads',
      description: 'Attach a PDF score sample',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'downloads',
      title: 'Electronics, Program Notes, and other Downloads',
      type: 'array',
      group: 'downloads',
      description: 'Attach electronics files here to make them available for downloading',
      of: [{ type: 'file' }],
    }),
    defineField({
      name: 'isPasswordProtected',
      title: 'Password Protect?',
      type: 'boolean',
      group: 'downloads',
      description: 'Would you like to password protect these files?',
      initialValue: true,
    }),
    defineField({
      name: 'passwordOverride',
      title: 'Password Override',
      type: 'string',
      group: 'downloads',
      description:
        'Leave this blank unless you wish to override the default asset password, which is accessible through the Globals menu.',
      hidden: ({ document }) => !document?.isPasswordProtected,
    }),
    defineField({
      name: 'publicDownloads',
      title: 'Public Downloads',
      type: 'array',
      group: 'downloads',
      description:
        'Add any downloads here that you want to be publicly accessible, regardless of the status of the other downloads.',
      of: [{ type: 'file' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      completionDate: 'completionDate',
      parent: 'parent.title',
      media: 'images.0',
    },
    prepare({ title, completionDate, parent, media }) {
      const subtitle = [completionDate, parent ? `Part of: ${parent}` : null]
        .filter(Boolean)
        .join(' | ')
      return {
        title,
        subtitle,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Completion Date (newest)',
      name: 'completionDateDesc',
      by: [{ field: 'completionDate', direction: 'desc' }],
    },
    {
      title: 'Completion Date (oldest)',
      name: 'completionDateAsc',
      by: [{ field: 'completionDate', direction: 'asc' }],
    },
  ],
})
