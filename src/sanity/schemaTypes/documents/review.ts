// sanity/schemas/review.ts
import { defineField, defineType } from "sanity";

export const review = defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "reviewType",
      title: "Review Category",
      type: "string",
      options: {
        list: [
          { title: "Recording", value: "recording" },
          { title: "Performance", value: "performance" },
        ],
        layout: "radio",
      },
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
      name: "source",
      title: "Review Source",
      type: "string",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
    }),
    defineField({
      name: "reviewDate",
      title: "Review Date",
      type: "date",
    }),
    defineField({
      name: "reviewLink",
      title: "Review Link",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "blockContent",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
    defineField({
      name: "relatedWorks",
      title: "Related Pieces",
      type: "array",
      of: [{ type: "reference", to: [{ type: "work" }] }],
    }),
    defineField({
      name: "relatedRecordings",
      title: "Related Recording(s)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "recording" }] }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      source: "source",
      type: "reviewType",
    },
    prepare({ title, source, type }) {
      return {
        title,
        subtitle: `${type?.toUpperCase() || "NO TYPE"} | ${source || "No Source"}`,
      };
    },
  },
  orderings: [
    {
      title: "Review Date (newest)",
      name: "reviewDateDesc",
      by: [{ field: "reviewDate", direction: "desc" }],
    },
  ],
});
