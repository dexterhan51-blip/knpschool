"use client";

import useCountdown from "@/hooks/useCountdown";

export default function CountdownTimer({ label }: { label: string }) {
  const { hours, minutes, seconds, isExpired } = useCountdown();

  const pad = (n: number) => n.toString().padStart(2, "0");

  if (isExpired) {
    return (
      <div className="text-center">
        <p className="text-orange text-sm font-semibold uppercase tracking-wider">
          골든타임이 만료되었습니다
        </p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <p className="mb-3 text-sm font-medium text-white/60 uppercase tracking-wider">
        {label}
      </p>
      <div className="inline-flex items-baseline gap-1 tabular-nums">
        <span className="text-5xl font-bold text-orange md:text-6xl">
          {pad(hours)}
        </span>
        <span className="text-3xl font-bold text-orange animate-blink md:text-4xl">
          :
        </span>
        <span className="text-5xl font-bold text-orange md:text-6xl">
          {pad(minutes)}
        </span>
        <span className="text-3xl font-bold text-orange animate-blink md:text-4xl">
          :
        </span>
        <span className="text-5xl font-bold text-orange md:text-6xl">
          {pad(seconds)}
        </span>
      </div>
      <div className="mt-2 flex justify-center gap-12 text-xs text-white/40">
        <span>시간</span>
        <span>분</span>
        <span>초</span>
      </div>
    </div>
  );
}
