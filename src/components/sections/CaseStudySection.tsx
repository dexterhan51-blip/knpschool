import { SECTION_ID, CONTACT } from "@/lib/constants";
import { CASE_STUDY } from "@/lib/content";

export default function CaseStudySection() {
  return (
    <section
      id={SECTION_ID.caseStudy}
      aria-label="실제 해결 사례"
      className="bg-navy-light px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-4xl">
        {/* 섹션 라벨 */}
        <p className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-orange">
          {CASE_STUDY.sectionLabel}
        </p>

        {/* 헤드라인 */}
        <h2 className="mb-4 text-center text-2xl font-bold leading-snug text-white whitespace-pre-line md:text-4xl md:leading-snug">
          {CASE_STUDY.headline}
        </h2>
        <p className="mb-12 text-center text-sm text-white/40">
          {CASE_STUDY.disclaimer}
        </p>

        {/* 사례 카드들 */}
        <div className="space-y-6">
          {CASE_STUDY.cases.map((c, i) => (
            <article
              key={i}
              className="overflow-hidden rounded-2xl bg-navy/60 shadow-xl"
            >
              {/* 제목 */}
              <div className="border-b border-white/10 bg-navy/80 px-6 py-4">
                <h3 className="text-lg font-bold text-white md:text-xl">
                  {c.title}
                </h3>
              </div>

              <div className="space-y-4 p-6">
                {/* 상황 */}
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-orange">
                    상황
                  </p>
                  <p className="text-sm leading-relaxed text-white/70">
                    {c.situation}
                  </p>
                </div>

                {/* 전략 */}
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-orange">
                    전략
                  </p>
                  <p className="text-sm leading-relaxed text-white/70">
                    {c.strategy}
                  </p>
                </div>

                {/* 결과 */}
                <div className="rounded-xl bg-orange/10 border border-orange/20 p-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-orange">
                    결과
                  </p>
                  <p className="text-sm font-medium leading-relaxed text-white/90">
                    {c.result}
                  </p>
                </div>

                {/* 태그 */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {c.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href={CONTACT.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-orange-light"
          >
            {CASE_STUDY.ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
