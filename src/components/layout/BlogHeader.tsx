import Link from "next/link";
import { CONTACT } from "@/lib/constants";

export default function BlogHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-navy/10 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-sm font-bold text-navy transition-colors hover:text-orange"
        >
          학교폭력 전문 변호사
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/blog"
            className="text-sm font-medium text-navy/70 transition-colors hover:text-navy"
          >
            블로그
          </Link>
          <a
            href={CONTACT.phoneHref}
            className="rounded-full bg-orange px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-orange-light"
          >
            무료 상담
          </a>
        </nav>
      </div>
    </header>
  );
}
