"use client";

import { SECTION_ID, CONTACT } from "@/lib/constants";
import { HERO } from "@/lib/content";
import CountdownTimer from "@/components/ui/CountdownTimer";
import CTAButton from "@/components/ui/CTAButton";
import ConfidentialityBadge from "@/components/ui/ConfidentialityBadge";

export default function HeroSection() {
  return (
    <section
      id={SECTION_ID.hero}
      className="relative flex min-h-screen flex-col items-center justify-center bg-navy px-6 py-20 text-center"
    >
      {/* 배경 그라데이션 */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy via-navy to-navy-light opacity-60" />

      <div className="relative z-10 flex max-w-2xl flex-col items-center gap-8">
        {/* 배지 */}
        <span className="inline-block rounded-full border border-orange/30 bg-orange/10 px-4 py-1.5 text-sm font-semibold text-orange">
          {HERO.badge}
        </span>

        {/* 카운트다운 타이머 */}
        <CountdownTimer label={HERO.timerLabel} />

        {/* 메인 카피 */}
        <h1 className="text-3xl font-extrabold leading-tight text-white md:text-5xl md:leading-tight">
          {HERO.headline}
        </h1>
        <p className="whitespace-pre-line text-lg leading-relaxed text-white/70 md:text-xl">
          {HERO.subheadline}
        </p>

        {/* CTA 버튼 */}
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <CTAButton
            variant="primary"
            href={CONTACT.phoneHref}
            icon="phone"
            pulse
          >
            {HERO.ctaPrimary}
          </CTAButton>
          <CTAButton
            variant="kakao"
            href={CONTACT.kakao}
            icon="kakao"
          >
            {HERO.ctaKakao}
          </CTAButton>
        </div>

        {/* 비밀보장 안내 */}
        <ConfidentialityBadge text={HERO.confidentiality} />
      </div>

      {/* 스크롤 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a
          href={`#${SECTION_ID.problem}`}
          className="flex flex-col items-center gap-2 text-white/30 transition-colors hover:text-white/60"
          aria-label="아래로 스크롤"
        >
          <span className="text-xs">더 알아보기</span>
          <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
