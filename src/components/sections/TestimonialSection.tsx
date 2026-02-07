"use client";

import { useEffect, useRef, useState } from "react";
import { NEW_SECTION_ID, CONTACT } from "@/lib/constants";
import { TESTIMONIALS, CONSULTATION_REVIEWS } from "@/lib/content";
import TabGroup from "@/components/ui/TabGroup";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating}점 만점에 ${rating}점`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "text-yellow-400" : "text-white/20"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  visible,
  delay,
}: {
  testimonial: (typeof TESTIMONIALS.items)[number];
  visible: boolean;
  delay: number;
}) {
  return (
    <div
      className="rounded-2xl bg-navy/60 p-6 shadow-xl transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <StarRating rating={testimonial.rating} />

      <span className="mt-3 inline-block rounded-full bg-orange/10 px-3 py-1 text-xs font-medium text-orange">
        {testimonial.situation}
      </span>

      <p className="mt-4 text-sm leading-relaxed text-white/70">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      <p className="mt-4 text-sm font-semibold text-white/50">
        — {testimonial.name}
      </p>
    </div>
  );
}

export default function TestimonialSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={NEW_SECTION_ID.testimonials}
      aria-label="의뢰인 후기"
      className="bg-navy-light px-6 py-20 md:py-28"
    >
      <div ref={ref} className="mx-auto max-w-4xl">
        <p className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-orange">
          {TESTIMONIALS.sectionLabel}
        </p>
        <h2 className="mb-4 text-center text-2xl font-bold leading-snug text-white whitespace-pre-line md:text-4xl md:leading-snug">
          {TESTIMONIALS.headline}
        </h2>
        <p className="mb-12 text-center text-sm text-white/40">
          {TESTIMONIALS.disclaimer}
        </p>

        <TabGroup
          tabs={[
            { id: "client", label: "의뢰인 후기" },
            { id: "consultation", label: "상담 후기 (로톡)" },
          ]}
        >
          {(activeTabId) =>
            activeTabId === "client" ? (
              <div className="grid gap-6 md:grid-cols-2">
                {TESTIMONIALS.items.map((item, i) => (
                  <TestimonialCard
                    key={i}
                    testimonial={item}
                    visible={visible}
                    delay={i * 150}
                  />
                ))}
              </div>
            ) : (
              <div>
                <p className="mb-4 text-center text-xs text-white/40">
                  ※ {CONSULTATION_REVIEWS.source}
                </p>
                <div className="space-y-6">
                  {CONSULTATION_REVIEWS.categories.map((category, ci) => (
                    <div key={ci}>
                      <span className="mb-3 inline-block rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold text-orange">
                        #{category.tag}
                      </span>
                      <div className="space-y-3">
                        {category.items.map((review, ri) => (
                          <div
                            key={ri}
                            className="rounded-xl border border-white/10 bg-white/5 p-5 transition-all duration-500"
                            style={{
                              opacity: visible ? 1 : 0,
                              transform: visible
                                ? "translateY(0)"
                                : "translateY(12px)",
                              transitionDelay: `${(ci * 2 + ri) * 100}ms`,
                            }}
                          >
                            <p className="text-sm leading-relaxed text-white/70">
                              &ldquo;{review.text}&rdquo;
                            </p>
                            <p className="mt-3 text-xs text-white/40">
                              — {review.author} · 로톡 후기
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          }
        </TabGroup>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href={CONTACT.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-orange-light"
          >
            나도 상담받기
          </a>
        </div>
      </div>
    </section>
  );
}
