import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { RichText } from "@/components/RichText";
import {
  formatPostDate,
  getAllPublishedPostSlugs,
  getCategoryLabels,
  getHeroImage,
  getMediaUrl,
  getPublishedPostBySlug,
} from "@/lib/blog";

type PostPageParams = Readonly<{
  params: Promise<Readonly<{ slug: string }>>;
}>;

export const dynamic = "force-dynamic";

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const slugs = await getAllPublishedPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PostPageParams): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(decodeURIComponent(slug));

  if (!post) {
    return {
      title: "Post not found | Auto Blogger",
    };
  }

  const image = getHeroImage(post.heroImage);
  const imageUrl = getMediaUrl(image);

  return {
    description: post.excerpt ?? undefined,
    openGraph: imageUrl
      ? {
          images: [
            {
              alt: image?.alt ?? post.title ?? "Blog post image",
              url: imageUrl,
            },
          ],
        }
      : undefined,
    title: `${post.title ?? "Untitled post"} | Auto Blogger`,
  };
}

export default async function PostPage({
  params,
}: PostPageParams): Promise<React.ReactNode> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(decodeURIComponent(slug));

  if (!post) {
    notFound();
  }

  const image = getHeroImage(post.heroImage);
  const imageUrl = getMediaUrl(image);
  const categories = getCategoryLabels(post.categories);

  return (
    <article>
      <header className="container py-14">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          <Link
            className="text-muted-foreground text-sm underline underline-offset-4 hover:text-foreground"
            href="/blog"
          >
            Back to all posts
          </Link>
          <div className="space-y-5">
            <div className="flex flex-wrap justify-center gap-2 text-muted-foreground text-xs uppercase tracking-[0.18em]">
              <time dateTime={post.publishedAt ?? undefined}>
                {formatPostDate(post.publishedAt)}
              </time>
              {categories.map((category) => (
                <span
                  className="rounded-full border border-border px-2 py-1"
                  key={category}
                >
                  {category}
                </span>
              ))}
            </div>
            <h1 className="font-semibold text-5xl tracking-tight sm:text-6xl">
              {post.title ?? "Untitled post"}
            </h1>
            {post.excerpt ? (
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-8">
                {post.excerpt}
              </p>
            ) : null}
          </div>
        </div>
      </header>

      {imageUrl ? (
        <div className="container pb-12">
          <div className="relative aspect-[16/8] overflow-hidden rounded-3xl border border-border bg-muted">
            <Image
              alt={image?.alt ?? post.title ?? "Blog post image"}
              className="object-cover"
              fill
              priority
              sizes="(min-width: 1024px) 86rem, 100vw"
              src={imageUrl}
            />
          </div>
        </div>
      ) : null}

      <div className="container pb-20">
        <div className="mx-auto max-w-3xl">
          <RichText data={post.content} />
          {post.aiDisclosure ? (
            <p className="mt-10 rounded-2xl border border-border bg-card p-4 text-muted-foreground text-sm">
              This article may include AI-assisted research, drafting, or
              editing and was managed through the editorial CMS.
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
