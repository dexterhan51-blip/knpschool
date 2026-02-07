"use client";

import { useEffect, useState, useCallback } from "react";
import { RECENT_CONSULT } from "@/lib/content";

function getRandomItem<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomMinutes(): number {
  return Math.floor(Math.random() * 15) + 1;
}

export default function RecentConsultToast() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [leaving, setLeaving] = useState(false);

  const showToast = useCallback(() => {
    const location = getRandomItem(RECENT_CONSULT.locations);
    const msg = getRandomItem(RECENT_CONSULT.messages);
    const minutes = getRandomMinutes();
    setMessage(`${minutes}분 전 ${location}에서 ${msg}`);
    setLeaving(false);
    setVisible(true);

    // Auto-hide after 4 seconds
    setTimeout(() => {
      setLeaving(true);
      setTimeout(() => setVisible(false), 500);
    }, 4000);
  }, []);

  useEffect(() => {
    // First toast after 20 seconds
    const firstTimeout = setTimeout(showToast, 20000);

    // Subsequent toasts every 30-60 seconds
    const interval = setInterval(() => {
      showToast();
    }, 30000 + Math.random() * 30000);

    return () => {
      clearTimeout(firstTimeout);
      clearInterval(interval);
    };
  }, [showToast]);

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-20 left-4 z-40 max-w-sm md:bottom-6 md:left-6 ${
        leaving ? "animate-toast-out" : "animate-toast-in"
      }`}
    >
      <div className="flex items-center gap-3 rounded-xl bg-navy-light/95 px-4 py-3 shadow-2xl backdrop-blur-sm border border-white/10">
        {/* Green dot */}
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
        </span>

        <p className="text-sm text-white/80">{message}</p>

        <button
          onClick={() => {
            setLeaving(true);
            setTimeout(() => setVisible(false), 500);
          }}
          className="ml-2 shrink-0 text-white/30 hover:text-white/60"
          aria-label="닫기"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
