export default {
  name: "spokenWord",
  type: "document",
  title: "Spoken Word",
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
        title: "Spoken Word",
      };
    },
  },
};
