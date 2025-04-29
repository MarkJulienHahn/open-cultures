export default {
  name: "summerSchools",
  type: "document",
  title: "Summer Schools",
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
  ],
  preview: {
    prepare() {
      return {
        title: "Summer Schools",
      };
    },
  },
};
