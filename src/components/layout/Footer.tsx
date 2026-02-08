import Link from "next/link";
import { FOOTER } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-white/10 px-6 py-12">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs leading-relaxed text-white/40">
          {FOOTER.disclaimer}
        </p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <Link
            href="/blog"
            className="text-xs text-white/40 transition-colors hover:text-white/60"
          >
            학교폭력 법률 블로그
          </Link>
        </div>
        <p className="mt-4 text-xs text-white/30">
          {FOOTER.address}
        </p>
        <p className="mt-2 text-xs text-white/30">
          {FOOTER.copyright}
        </p>
      </div>
    </footer>
  );
}
