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
      name: "affiliation",
      title: "Affiliation",
      type: "text",
      validation: (Rule) => Rule.required().error("Affiliation is required"),
    },
    {
      name: "link",
      title: "Link",
      type: "string",
      validation: (Rule) =>
        Rule.max(150).warning("Zitat should not exceed 150 characters"),
    },
    orderRankField({ type: "praxisPartners" }),
  ],
});
