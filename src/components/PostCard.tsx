import Image from "next/image";
import Link from "next/link";

import {
  type BlogPost,
  formatPostDate,
  getCategoryLabels,
  getHeroImage,
  getMediaUrl,
  getPostHref,
} from "@/lib/blog";

type PostCardProps = Readonly<{
  post: BlogPost;
  priority?: boolean;
}>;

export function PostCard({
  post,
  priority = false,
}: PostCardProps): React.ReactNode {
  const image = getHeroImage(post.heroImage);
  const imageUrl = getMediaUrl(image);
  const categories = getCategoryLabels(post.categories);

  return (
    <article className="group overflow-hidden rounded-3xl border border-border bg-card transition-colors hover:bg-accent/40">
      <Link className="block" href={getPostHref(post)}>
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          {imageUrl ? (
            <Image
              alt={image?.alt ?? post.title ?? "Blog post image"}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              fill
              priority={priority}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              src={imageUrl}
            />
          ) : (
            <div className="flex h-full items-end bg-gradient-to-br from-muted via-card to-background p-6">
              <span className="font-medium text-muted-foreground text-sm">
                Auto Blogger
              </span>
            </div>
          )}
        </div>
        <div className="space-y-4 p-6">
          <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-xs uppercase tracking-[0.18em]">
            <time dateTime={post.publishedAt ?? undefined}>
              {formatPostDate(post.publishedAt)}
            </time>
            {categories.slice(0, 2).map((category) => (
              <span
                className="rounded-full border border-border px-2 py-1"
                key={category}
              >
                {category}
              </span>
            ))}
          </div>
          <div className="space-y-2">
            <h2 className="font-semibold text-2xl tracking-tight">
              {post.title ?? "Untitled post"}
            </h2>
            {post.excerpt ? (
              <p className="line-clamp-3 text-muted-foreground">
                {post.excerpt}
              </p>
            ) : null}
          </div>
        </div>
      </Link>
    </article>
  );
}
