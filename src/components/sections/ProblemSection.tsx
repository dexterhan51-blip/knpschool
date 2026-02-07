"use client";

import { SECTION_ID, CONTACT } from "@/lib/constants";
import { PROBLEM } from "@/lib/content";
import ChecklistItem from "@/components/ui/ChecklistItem";
import CTAButton from "@/components/ui/CTAButton";


export default function ProblemSection() {
  return (
    <section
      id={SECTION_ID.problem}
      aria-label="학교폭력 상황 체크리스트"
      className="bg-navy-light px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-3xl">
        {/* 섹션 라벨 */}
        <p className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-orange">
          {PROBLEM.sectionLabel}
        </p>

        {/* 헤드라인 */}
        <h2 className="mb-12 text-center text-2xl font-bold leading-snug text-white whitespace-pre-line md:text-4xl md:leading-snug">
          {PROBLEM.headline}
        </h2>

        {/* 체크리스트 */}
        <div className="rounded-2xl bg-navy/50 p-2 md:p-4">
          {PROBLEM.items.map((item, index) => (
            <ChecklistItem
              key={index}
              label={item.label}
              danger={item.danger}
              index={index}
            />
          ))}
        </div>

        {/* 솔루션 메시지 */}
        <div className="mt-12 text-center">
          <p className="mb-8 whitespace-pre-line text-lg leading-relaxed text-white/80 md:text-xl">
            {PROBLEM.solution}
          </p>
          <CTAButton
            variant="primary"
            href={CONTACT.phoneHref}
            icon="phone"
          >
            {PROBLEM.ctaText}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
