export default {
  name: "learningAndDoing",
  type: "document",
  title: "Learning & Doing",
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
        title: "Learning & Doing",
      };
    },
  },
};
