import type { CollectionConfig } from "payload";

import { authenticated, authenticatedField } from "../access.ts";

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    admin: authenticatedField,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    {
      name: "name",
      type: "text",
    },
  ],
};
