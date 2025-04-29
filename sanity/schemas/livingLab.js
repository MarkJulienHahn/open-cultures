export default {
  name: "livingLab",
  type: "document",
  title: "LivingLab",
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
      fields: [
        { name: "caption", type: "string" },
        { name: "alt", type: "string" },
      ],
      validation: (Rule) =>
        Rule.required()
          .error("Image is required."),
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Living Lab",
      };
    },
  },
};
