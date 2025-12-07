import { defineField, defineType } from "sanity";

export const performance = defineType({
  name: "performance",
  title: "Performance",
  type: "document",
  fields: [
    defineField({
      name: "programTitle",
      title: "Program Title",
      type: "string",
    }),
    defineField({
      name: "composer",
      title: "Program Composer",
      type: "string",
      initialValue: "David Felder",
    }),
    defineField({
      name: "context",
      title: "Program Context",
      type: "string",
    }),
    defineField({
      name: "ensemble",
      title: "Program Ensemble / Performer",
      type: "string",
    }),
    defineField({
      name: "instrumentation",
      title: "Program Instrumentation",
      type: "string",
    }),
    defineField({
      name: "personnel",
      title: "Program Personnel",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "programWork",
      title: "Program Work",
      type: "string",
    }),
    defineField({
      name: "programDate",
      title: "Program Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      date: "programDate",
      workTitle: "programWork",
      ensemble: "ensemble",
      context: "context",
    },
    prepare({ date, workTitle, ensemble, context }) {
      const title = workTitle || "Performance";
      const formattedDate = date
        ? new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "";
      const subtitle = [formattedDate, ensemble, context]
        .filter(Boolean)
        .join(" | ");
      return {
        title,
        subtitle,
      };
    },
  },
  orderings: [
    {
      title: "Date (newest)",
      name: "dateDesc",
      by: [{ field: "programDate", direction: "desc" }],
    },
    {
      title: "Date (oldest)",
      name: "dateAsc",
      by: [{ field: "programDate", direction: "asc" }],
    },
  ],
});
