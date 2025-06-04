export default {
  name: "person",
  type: "document",
  title: "Person",
  fields: [
    {
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "title",
      type: "string",
      options: {
        list: ["", "Prof.", "Dr.", "Prof. Dr."],
        layout: "radio",
        direction: "horizontal",
      },
    },
    {
      name: "position",
      type: "array",
      of: [{ name: "name", type: "string" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "affiliation",
      type: "text",
      title: "Affiliation",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "email",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "link",
      type: "array",
      of: [{ name: "link", type: "string" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "lab",
      type: "string",
      title: "Lab",
      options: {
        list: ["Cultures", "Planning", "Factory", "Imaginaries"],
        layout: "radio",
        direction: "horizontal",
      },
    },
    {
      name: "portrait",
      type: "image",
      title: "Portrait",
    },
    {
      name: "text",
      title: "Text",
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
        source: "name",
      },
      validation: (Rule) => Rule.required().error("Slug is required."),
    },
  ],
  preview: {
    select: {
      title: "name",
    },
    prepare({ title }) {
      return {
        title,
      };
    },
  },
};
