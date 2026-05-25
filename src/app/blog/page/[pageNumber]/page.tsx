import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Pagination } from "@/components/Pagination";
import { PostCard } from "@/components/PostCard";
import { getPublishedPosts } from "@/lib/blog";

type BlogPageParams = Readonly<{
  params: Promise<Readonly<{ pageNumber: string }>>;
}>;

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Auto Blogger",
};

export default async function PaginatedBlogPage({
  params,
}: BlogPageParams): Promise<React.ReactNode> {
  const { pageNumber } = await params;
  const page = Number.parseInt(pageNumber, 10);

  if (!Number.isInteger(page) || page < 1) {
    notFound();
  }

  const posts = await getPublishedPosts({ limit: 12, page });

  if (page > posts.totalPages && posts.totalPages > 0) {
    notFound();
  }

  return (
    <div className="container py-16">
      <div className="mb-12 max-w-3xl space-y-4">
        <p className="font-medium text-muted-foreground text-sm uppercase tracking-[0.24em]">
          Blog
        </p>
        <h1 className="font-semibold text-5xl tracking-tight">
          Published posts
        </h1>
      </div>

      <div className="space-y-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.docs.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <Pagination
          basePath="/blog"
          page={posts.page}
          totalPages={posts.totalPages}
        />
      </div>
    </div>
  );
}
