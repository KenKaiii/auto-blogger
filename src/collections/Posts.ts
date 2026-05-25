import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";
import { slugField } from "payload";

import { authenticated, authenticatedOrPublished } from "../access.ts";

export const Posts: CollectionConfig = {
  slug: "posts",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["title", "status", "publishedAt", "updatedAt"],
    useAsTitle: "title",
  },
  defaultPopulate: {
    title: true,
    slug: true,
    excerpt: true,
    publishedAt: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "excerpt",
      type: "textarea",
      admin: {
        description: "Short summary for cards, RSS, and meta descriptions.",
      },
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "content",
      type: "richText",
      editor: lexicalEditor({}),
      required: true,
    },
    {
      name: "status",
      type: "select",
      enumName: "posts_editorial_status",
      required: true,
      defaultValue: "idea",
      options: [
        "idea",
        "outline",
        "draft",
        "review",
        "approved",
        "published",
        "archived",
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        position: "sidebar",
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === "published" && !value) {
              return new Date();
            }

            return value;
          },
        ],
      },
    },
    {
      name: "authors",
      type: "relationship",
      hasMany: true,
      relationTo: "users",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "categories",
      type: "relationship",
      hasMany: true,
      relationTo: "categories",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "keywords",
      type: "relationship",
      hasMany: true,
      relationTo: "keywords",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "sources",
      type: "relationship",
      hasMany: true,
      relationTo: "sources",
    },
    {
      name: "canonicalUrl",
      type: "text",
    },
    {
      name: "aiDisclosure",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Disclose AI assistance where required by policy or law.",
      },
    },
    slugField(),
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 2000,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};
