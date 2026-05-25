export default function Home() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 text-foreground">
      <section className="mx-auto flex max-w-3xl flex-col gap-6">
        <p className="font-medium text-sm uppercase tracking-[0.24em] text-foreground/60">
          Auto Blogger
        </p>
        <h1 className="font-semibold text-4xl tracking-tight sm:text-6xl">
          Automated publishing, with a real editorial CMS.
        </h1>
        <p className="text-foreground/70 text-lg leading-8">
          Payload CMS is installed at{" "}
          <a className="underline" href="/admin">
            /admin
          </a>
          , with collections for posts, categories, keywords, sources, prompt
          templates, and generation jobs.
        </p>
      </section>
    </main>
  );
}
