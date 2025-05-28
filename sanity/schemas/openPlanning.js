export default {
  name: "openPlanning",
  type: "document",
  title: "OpenPlanning",
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
          name: "contact",
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
        // {
        //   name: "supporters",
        //   type: "array",
        //   of: [
        //     {
        //       name: "partner",
        //       type: "object",
        //       fields: [
        //         { name: "name", type: "string" },
        //         { name: "link", type: "string" },
        //       ],
        //     },
        //   ],
        // },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: "OpenPlanning",
      };
    },
  },
};
