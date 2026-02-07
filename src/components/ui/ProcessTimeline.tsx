"use client";

import { useEffect, useRef, useState } from "react";
import { PROCESS } from "@/lib/content";

const iconPaths: Record<string, string> = {
  notification:
    "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
  consultation:
    "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  document:
    "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  shield:
    "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  result:
    "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
};

export default function ProcessTimeline() {
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
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mt-16">
      <p className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-orange">
        {PROCESS.sectionLabel}
      </p>
      <h3 className="mb-12 text-center text-2xl font-bold leading-snug text-white whitespace-pre-line md:text-3xl">
        {PROCESS.headline}
      </h3>

      {/* Desktop: horizontal */}
      <div className="hidden md:block">
        <div className="relative flex items-start justify-between">
          {/* Connection line */}
          <div className="absolute top-7 left-7 right-7 h-0.5 bg-white/10" />
          <div
            className="absolute top-7 left-7 h-0.5 bg-orange transition-all duration-1000 ease-out"
            style={{ width: visible ? "calc(100% - 56px)" : "0%" }}
          />

          {PROCESS.steps.map((step, i) => (
            <div
              key={step.number}
              className="relative z-10 flex w-1/5 flex-col items-center text-center transition-all duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: `${i * 150}ms`,
              }}
            >
              {/* Circle with icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-orange bg-navy shadow-lg shadow-orange/20">
                <svg
                  className="h-6 w-6 text-orange"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={iconPaths[step.icon]}
                  />
                </svg>
              </div>

              {/* Timeframe badge */}
              <span className="mt-3 rounded-full bg-orange/10 px-3 py-1 text-xs font-bold text-orange">
                {step.timeframe}
              </span>

              {/* Title */}
              <h4 className="mt-2 text-sm font-bold text-white">
                {step.title}
              </h4>

              {/* Description */}
              <p className="mt-1 text-xs leading-relaxed text-white/50">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical */}
      <div className="md:hidden">
        <div className="relative ml-7 border-l-2 border-white/10 pl-8">
          {/* Animated progress line */}
          <div
            className="absolute top-0 left-[-1px] w-0.5 bg-orange transition-all duration-1000 ease-out"
            style={{ height: visible ? "100%" : "0%" }}
          />

          {PROCESS.steps.map((step, i) => (
            <div
              key={step.number}
              className="relative pb-10 last:pb-0 transition-all duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-20px)",
                transitionDelay: `${i * 150}ms`,
              }}
            >
              {/* Circle */}
              <div className="absolute -left-12 flex h-10 w-10 items-center justify-center rounded-full border-2 border-orange bg-navy">
                <svg
                  className="h-5 w-5 text-orange"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={iconPaths[step.icon]}
                  />
                </svg>
              </div>

              {/* Content */}
              <span className="inline-block rounded-full bg-orange/10 px-3 py-1 text-xs font-bold text-orange">
                {step.timeframe}
              </span>
              <h4 className="mt-2 text-base font-bold text-white">
                {step.title}
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-white/60">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
