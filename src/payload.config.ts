import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { searchPlugin } from "@payloadcms/plugin-search";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Categories } from "./collections/Categories.ts";
import { GenerationJobs } from "./collections/GenerationJobs.ts";
import { Keywords } from "./collections/Keywords.ts";
import { Media } from "./collections/Media.ts";
import { Posts } from "./collections/Posts.ts";
import { PromptTemplates } from "./collections/PromptTemplates.ts";
import { Sources } from "./collections/Sources.ts";
import { Users } from "./collections/Users.ts";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000";

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
  },
  collections: [
    Users,
    Media,
    Categories,
    Keywords,
    Sources,
    PromptTemplates,
    Posts,
    GenerationJobs,
  ],
  cors: [serverUrl].filter(Boolean),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL ?? "",
    },
  }),
  editor: lexicalEditor({}),
  plugins: [
    seoPlugin({
      collections: ["posts"],
      generateDescription: ({ doc }) => doc?.excerpt ?? "",
      generateTitle: ({ doc }) => doc?.title ?? "",
      generateURL: ({ doc }) => `${serverUrl}/blog/${doc?.slug ?? ""}`,
      uploadsCollection: "media",
    }),
    searchPlugin({
      collections: ["posts"],
    }),
    formBuilderPlugin({
      fields: {
        payment: false,
        upload: false,
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET ?? "",
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
