import type { Metadata } from "next";

import { Pagination } from "@/components/Pagination";
import { PostCard } from "@/components/PostCard";
import { getPublishedPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Auto Blogger",
  description: "Published posts from Auto Blogger.",
};

export default async function BlogPage(): Promise<React.ReactNode> {
  const posts = await getPublishedPosts({ limit: 12, page: 1 });

  return (
    <div className="container py-16">
      <div className="mb-12 max-w-3xl space-y-4">
        <p className="font-medium text-muted-foreground text-sm uppercase tracking-[0.24em]">
          Blog
        </p>
        <h1 className="font-semibold text-5xl tracking-tight">
          Published posts
        </h1>
        <p className="text-lg text-muted-foreground leading-8">
          A Payload-backed archive of approved and published articles.
        </p>
      </div>

      {posts.docs.length > 0 ? (
        <div className="space-y-10">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.docs.map((post, index) => (
              <PostCard key={post.id} post={post} priority={index < 3} />
            ))}
          </div>
          <Pagination
            basePath="/blog"
            page={posts.page}
            totalPages={posts.totalPages}
          />
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-border bg-card p-10 text-muted-foreground">
          No published posts are available yet.
        </div>
      )}
    </div>
  );
}
