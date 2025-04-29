import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import schemaTypes from "./sanity/schemas/index";
import { myStructure } from "./sanity/deskStructure";

// Define the actions that should be available for singleton documents
const singletonActions = new Set(["publish", "discardChanges", "restore"]);

// Define the singleton document types
const singletonTypes = new Set(["settings"]);

const config = defineConfig({
  name: 'default',
  title: 'Open Cultures',

  projectId: 'anxs6t8r',
  dataset: 'production',
  apiVersion: "2025-03-24",
  basePath: "/admin",
  plugins: [
    structureTool({
      structure: myStructure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes, // Ensure schemaTypes is correctly exported and defined
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});

export default config;
