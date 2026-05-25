import type { CollectionConfig } from "payload";

import { authenticated } from "../access.ts";

export const Keywords: CollectionConfig = {
  slug: "keywords",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["phrase", "intent", "priority", "updatedAt"],
    useAsTitle: "phrase",
  },
  fields: [
    {
      name: "phrase",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "intent",
      type: "select",
      options: ["informational", "commercial", "transactional", "navigational"],
    },
    {
      name: "priority",
      type: "number",
      defaultValue: 0,
      min: 0,
      max: 100,
    },
    {
      name: "notes",
      type: "textarea",
    },
  ],
};
