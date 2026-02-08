import Link from "next/link";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function BlogPagination({
  currentPage,
  totalPages,
}: BlogPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const start = Math.max(0, currentPage - 3);
  const end = Math.min(totalPages, start + 5);
  const visiblePages = pages.slice(start, end);

  return (
    <nav
      className="mt-12 flex items-center justify-center gap-2"
      aria-label="페이지 네비게이션"
    >
      {currentPage > 1 && (
        <Link
          href={`/blog?page=${currentPage - 1}`}
          className="rounded-lg border border-navy/20 px-3 py-2 text-sm text-navy/60 transition-colors hover:bg-navy hover:text-white"
        >
          이전
        </Link>
      )}

      {visiblePages.map((page) => (
        <Link
          key={page}
          href={`/blog?page=${page}`}
          className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            page === currentPage
              ? "bg-orange text-white"
              : "border border-navy/20 text-navy/60 hover:bg-navy hover:text-white"
          }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={`/blog?page=${currentPage + 1}`}
          className="rounded-lg border border-navy/20 px-3 py-2 text-sm text-navy/60 transition-colors hover:bg-navy hover:text-white"
        >
          다음
        </Link>
      )}
    </nav>
  );
}
