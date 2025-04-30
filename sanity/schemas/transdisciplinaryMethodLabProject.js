import { defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
  name: "transdisciplinaryMethodLabProject",
  type: "document",
  title: "Transdisciplinary Method Lab — Projekt",
  fields: [
    {
      name: "headline",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error("Text is required and must contain at least one block."),
    },
    {
      name: "subHeadline",
      type: "text",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error("Text is required and must contain at least one block."),
    },
    {
      name: "text",
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
      name: "images",
      type: "array",
      of: [
        {
          name: "image",
          type: "image",
          fields: [
            { name: "caption", type: "string" },
            { name: "alt", type: "string" },
          ],
          validation: (Rule) => Rule.required().error("Image is required."),
        },
      ],
    },
    {
      name: "slug",
      type: "slug",
      options: {
        source: "headline",
      },
      validation: (Rule) => Rule.required().error("Slug is required."),
    },

    orderRankField({ type: "transdisciplinaryMethodLabProject" }),
  ],
});
