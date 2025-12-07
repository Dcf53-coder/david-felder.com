import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      initialValue: "Site Settings",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "defaultAssetPassword",
      title: "Default Asset Password",
      type: "string",
      description:
        "The default password for password-protected downloads. Individual works can override this with their own password.",
      validation: (Rule) =>
        Rule.required().min(4).error("Password must be at least 4 characters"),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
});
