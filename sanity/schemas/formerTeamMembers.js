export default {
  name: "formerTeamMembers",
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
