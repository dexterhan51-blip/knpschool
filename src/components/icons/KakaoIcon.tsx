export default function KakaoIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.72 1.794 5.108 4.508 6.457-.144.522-.926 3.357-.962 3.571 0 0-.019.158.084.218.103.061.224.014.224.014.296-.041 3.434-2.259 3.977-2.639.703.101 1.432.155 2.169.155 5.523 0 10-3.463 10-7.776C22 6.463 17.523 3 12 3z" />
    </svg>
  );
}
