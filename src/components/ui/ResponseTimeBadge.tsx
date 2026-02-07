export default function ResponseTimeBadge({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 ${className}`}
    >
      <svg
        className="h-4 w-4 shrink-0 text-orange"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="text-sm font-medium text-white/70">
        평균 응답 시간:{" "}
        <span className="font-bold text-orange">23분</span>
      </span>
    </div>
  );
}
