import { defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
  name: "newsmeldung",
  type: "document",
  title: "Newsmeldung",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Überschrift",
      validation: (Rule) => Rule.required(),
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
      name: "image",
      type: "image",
      fields: [{ name: "alt", type: "string" }],
      validation: (Rule) => Rule.required().error("Image is required."),
    },
    {
      name: "slug",
      type: "string",
      title: "Referenz",
      description:
        "Hier bitte den »slug« des Referenz-Projekts eintragen, zum Beispiel ..",
    },
    {
      name: "lab",
      type: "string",
      title: "Lab",
      options: {
        list: ["none", "planning", "factory", "imaginaries"],
        layout: "radio",
        direction: "horizontal",
      },
    },
    orderRankField({ type: "bezugsquellen" }),
  ],
});
