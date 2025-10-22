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
      decorators: [],
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
        "Hier bitte die URL des Referenzprojekts innerhalb der Seite eintragen also zum Beispiel: »http://open-cultures.org/glossary?category=living-lab&entry=factory«",
    },
    {
      name: "external",
      type: "object",
      title: "External Link",
      fields: [
        {
          name: "url",
          type: "string",
          description: "Hier bitte die URL des externen Links einfügen.",
        },
        {
          name: "name",
          type: "string",
          description: "Das ist der Name des Links.",
        },
      ],
    },
    {
      name: "lab",
      type: "string",
      title: "Lab",
      options: {
        list: ["none", "planning", "factory", "imaginaries"],
        default: "none",
        layout: "radio",
        direction: "horizontal",
      },
    },
    orderRankField({ type: "bezugsquellen" }),
  ],
});
