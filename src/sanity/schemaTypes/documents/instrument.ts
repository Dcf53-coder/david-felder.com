import { defineField, defineType } from "sanity";

export const instrument = defineType({
  name: "instrument",
  title: "Instrument",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "abbreviation",
      title: "Abbreviation",
      type: "string",
      description: 'Short form (e.g., "fl" for flute, "vn" for violin)',
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Woodwinds", value: "woodwinds" },
          { title: "Brass", value: "brass" },
          { title: "Strings", value: "strings" },
          { title: "Percussion", value: "percussion" },
          { title: "Keyboard", value: "keyboard" },
          { title: "Voice", value: "voice" },
          { title: "Electronics", value: "electronics" },
          { title: "Other", value: "other" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: "name",
      abbreviation: "abbreviation",
      category: "category",
    },
    prepare({ title, abbreviation, category }) {
      const subtitle = [abbreviation, category].filter(Boolean).join(" | ");
      return {
        title,
        subtitle,
      };
    },
  },
  orderings: [
    {
      title: "Score Order",
      name: "scoreOrder",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
    {
      title: "Name",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
    {
      title: "Category",
      name: "categoryAsc",
      by: [
        { field: "category", direction: "asc" },
        { field: "sortOrder", direction: "asc" },
      ],
    },
  ],
});
