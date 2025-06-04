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
      description:
        "Um ungewünschte Umbrüche zu vermeiden bitte einen »Non-Breaking Space« zwischen Vor- und Nachnamen einfügen. Auf macOS: Option + Space, auf Windows: Alt + 0160 (auf numeric keypad).",
    },
    {
      name: "title",
      type: "string",
      options: {
        list: ["", "Prof.", "Dr.", "Prof. Dr."],
        layout: "radio",
        direction: "horizontal",
      },
    },
    {
      name: "quote",
      title: "Zitat",
      type: "text",
      validation: (Rule) =>
        Rule.max(400).warning("Zitat should not exceed 150 characters"),
    },
    { name: "website", title: "Website", type: "string" },
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
  preview: {
    select: {
      title: "name",
    },
    prepare({ title }) {
      return {
        title,
      };
    },
  },
});
