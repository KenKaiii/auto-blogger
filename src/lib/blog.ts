import { createConnection } from "node:net";
import configPromise from "@payload-config";
import { getPayload } from "payload";

export type MediaSize = Readonly<{
  url?: string | null;
  width?: number | null;
  height?: number | null;
}>;

export type MediaResource = Readonly<{
  alt?: string | null;
  filename?: string | null;
  height?: number | null;
  sizes?: Readonly<{
    og?: MediaSize | null;
    thumbnail?: MediaSize | null;
  }> | null;
  url?: string | null;
  width?: number | null;
}>;

export type CategoryResource = Readonly<{
  slug?: string | null;
  title?: string | null;
}>;

export type AuthorResource = Readonly<{
  email?: string | null;
}>;

export type BlogPost = Readonly<{
  id: number | string;
  aiDisclosure?: boolean | null;
  authors?: ReadonlyArray<AuthorResource | number | string> | null;
  categories?: ReadonlyArray<CategoryResource | number | string> | null;
  content?: unknown;
  excerpt?: string | null;
  heroImage?: MediaResource | number | string | null;
  publishedAt?: string | null;
  slug?: string | null;
  status?: string | null;
  title?: string | null;
  updatedAt?: string | null;
}>;

export type BlogPostPage = Readonly<{
  docs: ReadonlyArray<BlogPost>;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage?: number | null;
  page?: number | null;
  pagingCounter: number;
  prevPage?: number | null;
  totalDocs: number;
  totalPages: number;
}>;

type PayloadReadError = Readonly<{
  error: unknown;
  operation: string;
  startedAt: number;
}>;

let databaseReachable: boolean | null = null;

const postsSelect = {
  aiDisclosure: true,
  authors: true,
  categories: true,
  excerpt: true,
  heroImage: true,
  publishedAt: true,
  slug: true,
  status: true,
  title: true,
  updatedAt: true,
} as const;

export async function getPublishedPosts(args?: {
  readonly limit?: number;
  readonly page?: number;
}): Promise<BlogPostPage> {
  const limit = args?.limit ?? 12;
  const page = args?.page ?? 1;
  const startedAt = performance.now();

  try {
    await assertDatabaseReachable();

    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: "posts",
      depth: 2,
      limit,
      overrideAccess: false,
      page,
      select: postsSelect,
      sort: "-publishedAt",
      where: {
        _status: {
          equals: "published",
        },
      },
    });

    return result as unknown as BlogPostPage;
  } catch (error) {
    logPayloadReadError({ error, operation: "getPublishedPosts", startedAt });

    return emptyPostPage({ limit, page });
  }
}

export async function getRecentPublishedPosts(
  limit = 3,
): Promise<ReadonlyArray<BlogPost>> {
  const posts = await getPublishedPosts({ limit });
  return posts.docs;
}

export async function getPublishedPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const startedAt = performance.now();

  try {
    await assertDatabaseReachable();

    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: "posts",
      depth: 2,
      draft: false,
      limit: 1,
      overrideAccess: false,
      pagination: false,
      where: {
        slug: {
          equals: slug,
        },
        _status: {
          equals: "published",
        },
      },
    });

    const docs = result.docs as unknown as ReadonlyArray<BlogPost>;
    return docs[0] ?? null;
  } catch (error) {
    logPayloadReadError({
      error,
      operation: "getPublishedPostBySlug",
      startedAt,
    });

    return null;
  }
}

export async function getAllPublishedPostSlugs(): Promise<
  ReadonlyArray<string>
> {
  const startedAt = performance.now();

  try {
    await assertDatabaseReachable();

    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: "posts",
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: {
        slug: true,
      },
      where: {
        _status: {
          equals: "published",
        },
      },
    });

    const docs = result.docs as unknown as ReadonlyArray<
      Pick<BlogPost, "slug">
    >;
    return docs.flatMap((post) => (post.slug ? [post.slug] : []));
  } catch (error) {
    logPayloadReadError({
      error,
      operation: "getAllPublishedPostSlugs",
      startedAt,
    });

    return [];
  }
}

export function formatPostDate(value?: string | null): string {
  if (!value) {
    return "Unscheduled";
  }

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function getPostHref(post: Pick<BlogPost, "slug">): string {
  return post.slug ? `/blog/${post.slug}` : "/blog";
}

export function getCategoryLabels(
  categories?: ReadonlyArray<CategoryResource | number | string> | null,
): ReadonlyArray<string> {
  if (!categories) {
    return [];
  }

  return categories.flatMap((category) => {
    if (typeof category !== "object" || category === null) {
      return [];
    }

    return category.title ? [category.title] : [];
  });
}

export function getHeroImage(
  image?: MediaResource | number | string | null,
): MediaResource | null {
  if (typeof image !== "object" || image === null) {
    return null;
  }

  return image;
}

export function getMediaUrl(media: MediaResource | null): string | null {
  return media?.sizes?.og?.url ?? media?.url ?? null;
}

async function assertDatabaseReachable(): Promise<void> {
  if (databaseReachable === true) {
    return;
  }

  if (databaseReachable === false) {
    throw new Error("Payload database is not reachable");
  }

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    databaseReachable = false;
    throw new Error("DATABASE_URL is not configured");
  }

  const url = new URL(databaseUrl);
  const port = url.port ? Number.parseInt(url.port, 10) : 5432;
  databaseReachable = await canConnectToDatabase(url.hostname, port);

  if (!databaseReachable) {
    throw new Error("Payload database is not reachable");
  }
}

async function canConnectToDatabase(
  host: string,
  port: number,
): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = createConnection({ host, port, timeout: 250 });

    socket.once("connect", () => {
      socket.destroy();
      resolve(true);
    });

    socket.once("error", () => {
      socket.destroy();
      resolve(false);
    });

    socket.once("timeout", () => {
      socket.destroy();
      resolve(false);
    });
  });
}

function emptyPostPage(args: {
  readonly limit: number;
  readonly page: number;
}): BlogPostPage {
  return {
    docs: [],
    hasNextPage: false,
    hasPrevPage: false,
    limit: args.limit,
    nextPage: null,
    page: args.page,
    pagingCounter: 1,
    prevPage: null,
    totalDocs: 0,
    totalPages: 0,
  };
}

function logPayloadReadError({
  error,
  operation,
  startedAt,
}: PayloadReadError): void {
  console.error("Payload public read failed", {
    elapsedMs: Math.round(performance.now() - startedAt),
    error: error instanceof Error ? error.message : String(error),
    operation,
  });
}
