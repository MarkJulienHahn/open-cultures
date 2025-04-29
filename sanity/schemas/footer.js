import { defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
  name: "footer",
  type: "document",
  title: "Footer",
  fields: [
    {
      name: "text",
      title: "Contact",
      type: "text",
    },
    {
      name: "email",
      type: "string",
    },
    {
      name: "partners",
      type: "array",
      of: [
        {
          type: "image",
        },
      ],
    },
    {
      name: "supporters",
      type: "array",
      of: [
        {
          type: "image",
        },
      ],
    },
    orderRankField({ type: "footer" }),
  ],
  preview: {
    prepare() {
      return {
        title: "Footer",
      };
    },
  },
});
