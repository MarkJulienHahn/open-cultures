export default {
  name: "conferences",
  type: "document",
  title: "Conferences",
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
        title: "Conferences",
      };
    },
  },
};
