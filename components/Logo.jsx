export function Logo({ className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
        <rect width="28" height="28" rx="8" fill="#134a37" />
        <path
          d="M8 21V7h12M8 14h8"
          stroke="#f5f2ea"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="20" cy="14" r="2.2" fill="#e6a93b" />
      </svg>
      <span className="display text-[1.35rem] font-semibold leading-none">Fermor</span>
    </span>
  );
}
