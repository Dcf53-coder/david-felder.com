import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "About",
    }),
    defineField({
      name: "body",
      title: "Biography",
      type: "blockContent",
    }),
    defineField({
      name: "vitalInfo",
      title: "Vital Info",
      type: "blockContent",
      description: "Short biographical summary, awards, positions, etc.",
    }),
    defineField({
      name: "otherLinks",
      title: "Other Links",
      type: "blockContent",
      description: "Links to external profiles, institutions, etc.",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "caption",
              title: "Caption",
              type: "string",
            },
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
            },
            {
              name: "credits",
              title: "Photo Credit",
              type: "string",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "streamEmbed",
      title: "Stream Embed URL",
      type: "url",
      description: "URL for embedded stream (YouTube, Vimeo, etc.)",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "About Page",
      };
    },
  },
});
