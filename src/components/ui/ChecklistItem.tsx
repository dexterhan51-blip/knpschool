"use client";

import { useState } from "react";

interface ChecklistItemProps {
  label: string;
  danger: string;
  index: number;
}

export default function ChecklistItem({ label, danger, index }: ChecklistItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="border-b border-white/10 last:border-b-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-start gap-4 py-4 text-left transition-colors hover:bg-white/5 px-4 rounded-lg"
        aria-expanded={isOpen}
      >
        <span
          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200 ${
            isOpen
              ? "border-orange bg-orange text-white"
              : "border-white/30 text-transparent"
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </span>
        <span className="flex-1 text-base font-medium text-white md:text-lg">
          {label}
        </span>
        <svg
          className={`mt-1 w-5 h-5 shrink-0 text-white/40 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-expand" : "grid-rows-collapse"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 pl-14">
            <div className="rounded-lg bg-orange/10 border border-orange/20 p-4">
              <p className="text-sm leading-relaxed text-white/80">
                <span className="text-orange font-semibold">⚠ 위험: </span>
                {danger}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
