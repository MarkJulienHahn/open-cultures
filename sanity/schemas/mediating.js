export default {
  name: "mediating",
  type: "document",
  title: "Mediating",
  fields: [
    {
      name: "text",
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
      fields: [
        { name: "caption", type: "string" },
        { name: "alt", type: "string" },
      ],
      validation: (Rule) => Rule.required().error("Image is required."),
    },
    {
      name: "slug",
      type: "slug",
      options: {
        source: "headline",
      },
      readOnly: true,
      validation: (Rule) => Rule.required().error("Slug is required."),
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Mediating",
      };
    },
  },
};
