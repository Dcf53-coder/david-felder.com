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
      name: "relatedWorks",
      title: "Related Pieces",
      type: "array",
      description: "Select any pieces referenced in the review",
      of: [
        {
          type: "reference",
          to: [{ type: "work" }],
        },
      ],
    }),
    defineField({
      name: "relatedRecordings",
      title: "Related Recording(s)",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "recording" }],
        },
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "blockContent",
    }),
    defineField({
      name: "reviewDate",
      title: "Review Date",
      type: "date",
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
      name: "reviewLink",
      title: "Review Link",
      type: "url",
    }),
  ],
  preview: {
    select: {
      title: "title",
      source: "source",
      author: "author",
      reviewDate: "reviewDate",
    },
    prepare({ title, source, author, reviewDate }) {
      const parts = [source, author].filter(Boolean);
      const year = reviewDate ? new Date(reviewDate).getFullYear() : "";
      if (year) parts.push(String(year));
      return {
        title,
        subtitle: parts.join(" | "),
      };
    },
  },
  orderings: [
    {
      title: "Review Date (newest)",
      name: "reviewDateDesc",
      by: [{ field: "reviewDate", direction: "desc" }],
    },
    {
      title: "Review Date (oldest)",
      name: "reviewDateAsc",
      by: [{ field: "reviewDate", direction: "asc" }],
    },
    {
      title: "Title",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
