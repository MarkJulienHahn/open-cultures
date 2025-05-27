export default {
  name: "openCultures",
  type: "document",
  title: "Open Cultures",
  fields: [
    {
      name: "headerText",
      type: "text",
      title: "Header",
      validation: (Rule) => Rule.required(),
    },

    {
      name: "introtext",
      type: "object",
      fields: [
        {
          name: "title",
          type: "text",
          title: "Überschrift",
          validation: (Rule) => Rule.required(),
        },
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
          name: "partners",
          type: "array",
          of: [
            {
              name: "partner",
              type: "object",
              fields: [
                { name: "name", type: "text" },
                { name: "link", type: "string" },
                { name: "indented", type: "boolean" },
              ],
              preview: {
                select: {
                  title: "name",
                },
              },
            },
          ],
        },
        {
          name: "supporters",
          type: "array",
          of: [{ name: "name", type: "string" }],
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Open Cultures",
      };
    },
  },
};
