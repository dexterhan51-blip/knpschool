"use client";

import { useState } from "react";
import { SECTION_ID, YOUTUBE_VIDEOS, CONTACT } from "@/lib/constants";
import { YOUTUBE } from "@/lib/content";
import TabGroup from "@/components/ui/TabGroup";
import YouTubeEmbed from "@/components/ui/YouTubeEmbed";
import CTAButton from "@/components/ui/CTAButton";

const videoIdMap: Record<string, string> = {
  urgent: YOUTUBE_VIDEOS.urgentResponse,
  defense: YOUTUBE_VIDEOS.defenseStrategy,
  reality: YOUTUBE_VIDEOS.realityCheck,
};

function TabContent({ tabId }: { tabId: string }) {
  const [showSummary, setShowSummary] = useState(false);
  const tab = YOUTUBE.tabs.find((t) => t.id === tabId);
  if (!tab) return null;

  return (
    <div className="space-y-6">
      {/* YouTube 영상 */}
      <YouTubeEmbed videoId={videoIdMap[tabId]} title={tab.label} />

      {/* 훅 포인트 */}
      <blockquote className="border-l-4 border-orange pl-4 text-lg font-semibold italic text-white/90">
        {tab.hookPoint}
      </blockquote>

      {/* 요약 */}
      <p className="text-base leading-relaxed text-white/70">
        {tab.summary}
      </p>

      {/* 3분 요약 토글 */}
      <div>
        <button
          onClick={() => setShowSummary(!showSummary)}
          className="flex items-center gap-2 text-sm font-semibold text-orange transition-colors hover:text-orange-light"
        >
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${showSummary ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
          {showSummary ? "접기" : "3분 요약 보기"}
        </button>

        <div
          className={`grid transition-all duration-300 ease-in-out ${
            showSummary ? "grid-rows-expand" : "grid-rows-collapse"
          }`}
        >
          <div className="overflow-hidden">
            <ul className="mt-4 space-y-3 rounded-xl bg-navy/50 p-5">
              {tab.threeMinSummary.map((point, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-white/80">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange/20 text-xs font-bold text-orange">
                    {i + 1}
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function YouTubeSection() {
  return (
    <section
      id={SECTION_ID.youtube}
      aria-label="학교폭력 대응 영상"
      className="bg-navy px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-3xl">
        {/* 섹션 라벨 */}
        <p className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-orange">
          {YOUTUBE.sectionLabel}
        </p>

        {/* 헤드라인 */}
        <h2 className="mb-12 text-center text-2xl font-bold leading-snug text-white whitespace-pre-line md:text-4xl md:leading-snug">
          {YOUTUBE.headline}
        </h2>

        {/* 탭 그룹 */}
        <TabGroup tabs={YOUTUBE.tabs.map((t) => ({ id: t.id, label: t.label }))}>
          {(activeTabId) => <TabContent tabId={activeTabId} />}
        </TabGroup>

        {/* CTA */}
        <div className="mt-12 text-center">
          <CTAButton variant="primary" href={CONTACT.phoneHref} icon="phone">
            {YOUTUBE.ctaText}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
