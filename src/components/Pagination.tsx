import Link from "next/link";

type PaginationProps = Readonly<{
  basePath: string;
  page?: number | null;
  totalPages: number;
}>;

export function Pagination({
  basePath,
  page = 1,
  totalPages,
}: PaginationProps): React.ReactNode {
  if (totalPages <= 1) {
    return null;
  }

  const currentPage = page ?? 1;
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <nav className="flex items-center justify-between gap-4 border-border border-t pt-8 text-sm">
      {previousPage >= 1 ? (
        <Link
          className="rounded-full border border-border px-4 py-2 hover:bg-accent"
          href={
            previousPage === 1 ? basePath : `${basePath}/page/${previousPage}`
          }
        >
          Previous
        </Link>
      ) : (
        <span />
      )}
      <span className="text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>
      {nextPage <= totalPages ? (
        <Link
          className="rounded-full border border-border px-4 py-2 hover:bg-accent"
          href={`${basePath}/page/${nextPage}`}
        >
          Next
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
