import type { CollectionConfig } from "payload";

import { authenticated } from "../access.ts";

export const PromptTemplates: CollectionConfig = {
  slug: "prompt-templates",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["name", "purpose", "model", "updatedAt"],
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "purpose",
      type: "select",
      required: true,
      options: ["ideation", "outline", "draft", "seo", "fact-check", "rewrite"],
    },
    {
      name: "model",
      type: "text",
      admin: {
        description: "Provider model identifier, for example gpt-4.1-mini.",
      },
    },
    {
      name: "systemPrompt",
      type: "textarea",
      required: true,
    },
    {
      name: "userPrompt",
      type: "textarea",
      required: true,
    },
    {
      name: "temperature",
      type: "number",
      min: 0,
      max: 2,
      defaultValue: 0.7,
    },
  ],
  versions: {
    maxPerDoc: 25,
  },
};
