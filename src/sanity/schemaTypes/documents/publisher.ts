import { defineField, defineType } from "sanity";

export const publisher = defineType({
  name: "publisher",
  title: "Publisher",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "logo",
    },
  },
});
