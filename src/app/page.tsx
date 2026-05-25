import Link from "next/link";

import { PostCard } from "@/components/PostCard";
import { getRecentPublishedPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export default async function Home(): Promise<React.ReactNode> {
  const posts = await getRecentPublishedPosts(3);

  return (
    <div>
      <section className="container grid gap-10 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:py-28">
        <div className="max-w-3xl space-y-8">
          <p className="font-medium text-muted-foreground text-sm uppercase tracking-[0.24em]">
            Payload powered publishing
          </p>
          <h1 className="font-semibold text-5xl tracking-tight sm:text-7xl">
            Automated publishing, with a real editorial CMS.
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground leading-8">
            Create, review, and publish AI-assisted blog content from Payload
            CMS. The public site now follows the official Payload website
            template patterns and maps directly to your collections.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              className="rounded-full bg-foreground px-5 py-3 font-medium text-background text-sm"
              href="/blog"
            >
              Read the blog
            </Link>
            <Link
              className="rounded-full border border-border px-5 py-3 font-medium text-sm hover:bg-accent"
              href="/admin"
            >
              Open CMS
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="grid gap-4">
            {["Ideas", "Outlines", "Drafts", "Reviews", "Published"].map(
              (stage, index) => (
                <div
                  className="flex items-center justify-between rounded-2xl border border-border bg-background p-4"
                  key={stage}
                >
                  <span className="font-medium">{stage}</span>
                  <span className="text-muted-foreground text-sm">
                    0{index + 1}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="border-border border-t bg-card/30 py-16">
        <div className="container space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-medium text-muted-foreground text-sm uppercase tracking-[0.2em]">
                Latest posts
              </p>
              <h2 className="mt-2 font-semibold text-3xl tracking-tight">
                Recently published
              </h2>
            </div>
            <Link className="text-sm underline underline-offset-4" href="/blog">
              View all posts
            </Link>
          </div>
          {posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3">
              {posts.map((post, index) => (
                <PostCard key={post.id} post={post} priority={index === 0} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-border bg-background p-10 text-muted-foreground">
              No published posts yet. Publish one in Payload and it will appear
              here.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
