import { defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
  name: "footer",
  type: "document",
  title: "Footer",
  fields: [
    {
      name: "coordination",
      type: "array",
      of: [
        {
          type: "block",
          styles: [],
          lists: [],
          marks: {
            decorators: [
              { title: "Italic", value: "em" },
              { title: "Bold", value: "strong" },
            ],
          },
        },
      ],
    },
    {
      name: "info",
      type: "array",
      of: [
        {
          type: "block",
          styles: [],
          lists: [],
          marks: {
            decorators: [
              { title: "Italic", value: "em" },
              { title: "Bold", value: "strong" },
            ],
          },
        },
      ],
    },
    {
      name: "address",
      type: "array",
      of: [
        {
          type: "block",
          styles: [],
          lists: [],
          marks: {
            decorators: [
              { title: "Italic", value: "em" },
              { title: "Bold", value: "strong" },
            ],
          },
        },
      ],
    },
    {
      name: "contact",
      type: "array",
      of: [
        {
          type: "block",
          styles: [],
          lists: [],
          marks: {
            decorators: [
              { title: "Italic", value: "em" },
              { title: "Bold", value: "strong" },
            ],
          },
        },
      ],
    },
    // {
    //   name: "email",
    //   type: "string",
    // },
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
