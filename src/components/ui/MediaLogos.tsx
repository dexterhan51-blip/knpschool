import { MEDIA } from "@/lib/content";

export default function MediaLogos() {
  return (
    <div className="mt-12">
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-wider text-navy/40">
        {MEDIA.sectionLabel}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {MEDIA.outlets.map((outlet) => (
          <div
            key={outlet.name}
            className="flex h-8 items-center opacity-30 grayscale transition-all duration-300 hover:opacity-70 hover:grayscale-0"
          >
            <span className="text-lg font-bold tracking-wider text-navy/70">
              {outlet.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
