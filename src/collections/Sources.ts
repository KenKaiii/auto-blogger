import type { CollectionConfig } from "payload";

import { authenticated } from "../access.ts";

export const Sources: CollectionConfig = {
  slug: "sources",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["title", "type", "url", "updatedAt"],
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "type",
      type: "select",
      required: true,
      defaultValue: "website",
      options: ["website", "rss", "document", "manual"],
    },
    {
      name: "url",
      type: "text",
    },
    {
      name: "robotsAllowed",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description:
          "Mark true only after robots.txt and source terms allow ingestion.",
      },
    },
    {
      name: "notes",
      type: "textarea",
    },
  ],
};
