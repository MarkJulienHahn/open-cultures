export default {
  name: "openCultures",
  type: "document",
  title: "OpenCultures",
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
          name: "partnerLogos",
          title: "Partner Logos",
          type: "array",
          of: [
            {
              type: "image",
            },
          ],
        },
        {
          name: "supporterLogos",
          title: "Supporter Logos",
          type: "array",
          of: [
            {
              type: "image",
            },
          ],
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: "OpenCultures",
      };
    },
  },
};
