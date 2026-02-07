"use client";

import { useState } from "react";
import { CONSULTATION_FORM } from "@/lib/content";

export default function ConsultationForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [situation, setSituation] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  const isValid = name.trim() && phone.trim() && situation && privacyAgreed;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    // In a real implementation, this would send data to a backend
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mt-10 rounded-2xl border border-orange/20 bg-orange/5 p-8 text-center">
        <svg
          className="mx-auto h-12 w-12 text-orange"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="mt-4 text-lg font-bold text-white">
          {CONSULTATION_FORM.successMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
      <h3 className="text-lg font-bold text-white">
        {CONSULTATION_FORM.headline}
      </h3>
      <p className="mt-1 text-sm text-white/50">
        {CONSULTATION_FORM.subheadline}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={CONSULTATION_FORM.namePlaceholder}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={CONSULTATION_FORM.phonePlaceholder}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
          />
        </div>

        <select
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange [&>option]:bg-navy [&>option]:text-white"
        >
          <option value="" disabled>
            {CONSULTATION_FORM.situationPlaceholder}
          </option>
          {CONSULTATION_FORM.situations.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {/* Privacy agreement */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={privacyAgreed}
            onChange={(e) => setPrivacyAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/30 bg-white/5 text-orange accent-orange"
          />
          <span className="text-xs leading-relaxed text-white/40">
            {CONSULTATION_FORM.privacyNotice}
          </span>
        </label>

        <button
          type="submit"
          disabled={!isValid}
          className={`w-full rounded-xl px-8 py-4 text-lg font-bold transition-all duration-200 ${
            isValid
              ? "bg-orange text-white hover:bg-orange-light"
              : "bg-white/10 text-white/30 cursor-not-allowed"
          }`}
        >
          {CONSULTATION_FORM.submitText}
        </button>
      </form>
    </div>
  );
}
