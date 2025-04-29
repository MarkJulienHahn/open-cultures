export default {
  name: "person",
  type: "document",
  title: "Person",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "affiliation",
      type: "text",
      title: "Affiliation",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "lab",
      type: "string",
      title: "Lab",
      options: {
        list: ["None", "Planning", "Factory", "Imaginaries"],
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
  ],
};
