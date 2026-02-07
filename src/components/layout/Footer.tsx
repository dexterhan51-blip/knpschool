import { FOOTER } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-white/10 px-6 py-12">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs leading-relaxed text-white/40">
          {FOOTER.disclaimer}
        </p>
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
