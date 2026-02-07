"use client";

import { useState } from "react";
import { NEW_SECTION_ID, CONTACT } from "@/lib/constants";
import { SELF_DIAGNOSIS } from "@/lib/content";

type ResultLevel = "high" | "medium" | "low";

function getResultLevel(score: number): ResultLevel {
  if (score >= 8) return "high";
  if (score >= 4) return "medium";
  return "low";
}

export default function SelfDiagnosis() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const totalQuestions = SELF_DIAGNOSIS.questions.length;
  const progress = ((currentStep) / totalQuestions) * 100;

  function handleSelect(score: number) {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentStep + 1 < totalQuestions) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  }

  function handleReset() {
    setCurrentStep(0);
    setAnswers([]);
    setShowResult(false);
  }

  const totalScore = answers.reduce((sum, s) => sum + s, 0);
  const resultLevel = getResultLevel(totalScore);
  const result = SELF_DIAGNOSIS.results[resultLevel];

  if (showResult) {
    return (
      <section
        id={NEW_SECTION_ID.selfDiagnosis}
        className="bg-navy px-6 py-20 md:py-28"
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-orange">
            진단 결과
          </p>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-12">
            <h3 className="text-2xl font-bold text-white md:text-3xl">
              {result.title}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-white/60">
              {result.description}
            </p>

            {/* Score bar */}
            <div className="mx-auto mt-8 max-w-xs">
              <div className="flex justify-between text-xs text-white/40">
                <span>여유</span>
                <span>긴급</span>
              </div>
              <div className="mt-1 h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    resultLevel === "high"
                      ? "bg-red-500"
                      : resultLevel === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }`}
                  style={{
                    width: `${Math.min((totalScore / 12) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-orange-light animate-pulse-cta"
              >
                {result.ctaText}
              </a>
              <button
                onClick={handleReset}
                className="text-sm text-white/40 underline hover:text-white/60"
              >
                다시 진단하기
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const question = SELF_DIAGNOSIS.questions[currentStep];

  return (
    <section
      id={NEW_SECTION_ID.selfDiagnosis}
      className="bg-navy px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-2xl">
        <p className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-orange">
          {SELF_DIAGNOSIS.sectionLabel}
        </p>
        <h2 className="mb-2 text-center text-2xl font-bold leading-snug text-white whitespace-pre-line md:text-4xl md:leading-snug">
          {SELF_DIAGNOSIS.headline}
        </h2>
        <p className="mb-10 text-center text-base text-white/50">
          {SELF_DIAGNOSIS.subheadline}
        </p>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-white/40">
            <span>
              질문 {currentStep + 1} / {totalQuestions}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-orange transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
          <h3 className="mb-6 text-lg font-bold text-white md:text-xl">
            {question.question}
          </h3>

          <div className="space-y-3">
            {question.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleSelect(option.score)}
                className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-left text-sm text-white/80 transition-all duration-200 hover:border-orange/50 hover:bg-orange/5 hover:text-white md:text-base"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/20 text-xs font-bold text-white/40">
                  {String.fromCharCode(65 + i)}
                </span>
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
