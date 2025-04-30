import { defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
  name: "advisoryBoard",
  type: "document",
  title: "Advisory Board",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().error("Name is required"),
    },
    {
      name: "affiliation",
      title: "Affiliation",
      type: "text",
      validation: (Rule) => Rule.required().error("Affiliation is required"),
    },
    {
      name: "quote",
      title: "Zitat",
      type: "text",
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
    orderRankField({ type: "advisoryBoard" }),
  ],
});
