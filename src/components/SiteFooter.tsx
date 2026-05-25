import Link from "next/link";

export function SiteFooter(): React.ReactNode {
  return (
    <footer className="border-border border-t bg-card/30">
      <div className="container flex flex-col gap-4 py-10 text-muted-foreground text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} Auto Blogger. Built for assisted
          editorial workflows.
        </p>
        <div className="flex gap-4">
          <Link className="hover:text-foreground" href="/blog">
            Posts
          </Link>
          <Link className="hover:text-foreground" href="/admin">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
