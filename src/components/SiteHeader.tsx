import Link from "next/link";

const navItems = [
  { href: "/blog", label: "Blog" },
  { href: "/admin", label: "CMS" },
] as const;

export function SiteHeader(): React.ReactNode {
  return (
    <header className="sticky top-0 z-50 border-border/70 border-b bg-background/85 backdrop-blur-xl">
      <div className="container flex min-h-16 items-center justify-between gap-6">
        <Link className="group flex items-center gap-3" href="/">
          <span className="flex size-9 items-center justify-center rounded-full border border-border bg-card font-semibold text-sm transition-colors group-hover:bg-accent">
            AB
          </span>
          <span className="font-semibold tracking-tight">Auto Blogger</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {navItems.map((item) => (
            <Link
              className="rounded-full px-4 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
