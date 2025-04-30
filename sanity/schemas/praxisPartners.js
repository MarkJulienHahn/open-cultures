import { defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
  name: "praxisPartners",
  type: "document",
  title: "Praxis Partners",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().error("Name is required"),
    },
    {
      name: "text",
      title: "Text",
      type: "array",
      of: [
        {
          type: "block",
          styles: [],
          lists: [],
          marks: {
            decorators: [{ title: "Italic", value: "em" }],
          },
        },
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error("Text is required and must contain at least one block."),
    },
    {
      name: "link",
      title: "Link",
      type: "string",
      validation: (Rule) =>
        Rule.max(150).warning("Zitat should not exceed 150 characters"),
    },
    {
      name: "slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required().error("Slug is required."),
    },
    orderRankField({ type: "praxisPartners" }),
  ],
});
