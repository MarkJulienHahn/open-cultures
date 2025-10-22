export default {
  name: "interdisciplinaryWorkshop",
  type: "document",
  title: "Inter(disciplinary Work)shop",
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
      // validation: (Rule) =>
      //   Rule.required()
      //     .min(1)
      //     .error("Text is required and must contain at least one block."),
    },
    {
      name: "slug",
      type: "slug",
      options: {
        source: "headline",
      },
      // readOnly: true,
      validation: (Rule) => Rule.required().error("Slug is required."),
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Inter(disciplinary Work)shop",
      };
    },
  },
};
