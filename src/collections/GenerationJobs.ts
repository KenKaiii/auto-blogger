import type { CollectionConfig } from "payload";

import { authenticated } from "../access.ts";

export const GenerationJobs: CollectionConfig = {
  slug: "generation-jobs",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["title", "status", "kind", "updatedAt"],
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "kind",
      type: "select",
      required: true,
      options: ["idea", "outline", "draft", "seo", "fact-check", "publish"],
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "queued",
      options: [
        "queued",
        "running",
        "needs-review",
        "completed",
        "failed",
        "cancelled",
      ],
    },
    {
      name: "post",
      type: "relationship",
      relationTo: "posts",
    },
    {
      name: "promptTemplate",
      type: "relationship",
      relationTo: "prompt-templates",
    },
    {
      name: "input",
      type: "json",
    },
    {
      name: "output",
      type: "json",
    },
    {
      name: "error",
      type: "textarea",
    },
    {
      name: "startedAt",
      type: "date",
    },
    {
      name: "finishedAt",
      type: "date",
    },
  ],
  versions: {
    maxPerDoc: 25,
  },
};
