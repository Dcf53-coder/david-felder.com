import { defineField, defineType } from "sanity";

export const recording = defineType({
  name: "recording",
  title: "Recording",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "recordLabel",
      title: "Record Label",
      type: "string",
    }),
    defineField({
      name: "catalogNumber",
      title: "Catalog Number",
      type: "string",
      description: "Ex. TROY1418",
    }),
    defineField({
      name: "releaseDate",
      title: "Release Date",
      type: "date",
    }),
    defineField({
      name: "albumLink",
      title: "Album Link",
      type: "url",
      description: "Permalink to the album on the record label website.",
    }),
    defineField({
      name: "purchaseLink",
      title: "Purchase Link",
      type: "url",
      description: "Link to where you can purchase the CD",
    }),
    defineField({
      name: "albumArt",
      title: "Album Art",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "pieces",
      title: "Pieces",
      type: "array",
      description: "The pieces featured on the CD",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "piece",
              title: "Piece",
              type: "reference",
              to: [{ type: "work" }],
            },
            {
              name: "performers",
              title: "Performer(s)",
              type: "string",
            },
          ],
          preview: {
            select: {
              workTitle: "piece.title",
              performers: "performers",
            },
            prepare({ workTitle, performers }) {
              return {
                title: workTitle || "Untitled",
                subtitle: performers,
              };
            },
          },
        },
      ],
    }),
    // --- NEW REVIEWS FIELD ADDED BELOW ---
    defineField({
      name: "reviews",
      title: "CD / Recording Reviews",
      type: "array",
      description: "Add reviews specific to this recording.",
      of: [
        {
          type: "object",
          name: "review",
          fields: [
            {
              name: "source",
              title: "Source / Publication",
              type: "string",
              description: "e.g., Gramophone, NY Times",
            },
            {
              name: "excerpt",
              title: "Substantial Lines (Short Excerpt)",
              type: "text",
              rows: 3,
              description: "This part shows before the 'Read More' button.",
            },
            {
              name: "fullReview",
              title: "Full Review Text",
              type: "blockContent", 
              description: "The complete text that appears after clicking 'Read More'.",
            },
            {
              name: "url",
              title: "Link to Original Review",
              type: "url",
            }
          ],
          preview: {
            select: {
              title: "source",
              subtitle: "excerpt",
            },
          },
        },
      ],
    }),
    // --- END OF NEW FIELD ---
    defineField({
      name: "isFeatured",
      title: "Featured?",
      type: "boolean",
      initialValue: false,
      description: "Featured recordings will be listed before the others.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      recordLabel: "recordLabel",
      releaseDate: "releaseDate",
      media: "albumArt",
    },
    prepare({ title, recordLabel, releaseDate, media }) {
      const year = releaseDate ? new Date(releaseDate).getFullYear() : "";
      const subtitle = [recordLabel, year].filter(Boolean).join(" | ");
      return {
        title,
        subtitle,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Release Date (newest)",
      name: "releaseDateDesc",
      by: [{ field: "releaseDate", direction: "desc" }],
    },
    {
      title: "Release Date (oldest)",
      name: "releaseDateAsc",
      by: [{ field: "releaseDate", direction: "asc" }],
    },
    {
      title: "Title",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});