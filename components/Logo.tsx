import Link from "next/link";

/**
 * Logo Doudoumimi : mot-symbole rond + petit fantôme mascotte.
 * Pensé pour rester lisible en 24 px de haut sur mobile.
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Doudoumimi — accueil"
      className={`group inline-flex items-center gap-2 ${className}`}
    >
      <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-bubble-300 to-pumpkin-400 shadow-sm transition-transform duration-300 group-hover:-rotate-6">
        <svg viewBox="0 0 40 40" className="h-7 w-7" aria-hidden="true">
          <path
            d="M20 7c-7 0-12 5-12 12v13c0 2 2 3 3.5 1.5l2-2c.8-.9 2.2-.9 3 0l1.7 2c.8.9 2.2.9 3 0l1.7-2c.8-.9 2.2-.9 3 0l2 2C29.5 35 32 34 32 32V19c0-7-5-12-12-12z"
            fill="#fffdfb"
          />
          <circle cx="16" cy="19" r="1.9" fill="#33211a" />
          <circle cx="24" cy="19" r="1.9" fill="#33211a" />
          <ellipse cx="12.5" cy="23" rx="2.6" ry="1.8" fill="#ffa8c8" />
          <ellipse cx="27.5" cy="23" rx="2.6" ry="1.8" fill="#ffa8c8" />
          <path d="M18 24q2 2 4 0" stroke="#33211a" strokeWidth="1.3" strokeLinecap="round" fill="none" />
        </svg>
      </span>
      <span className="font-[family-name:var(--font-display)] text-xl font-extrabold tracking-tight text-cocoa-800 sm:text-2xl">
        Doudou<span className="text-bubble-500">mimi</span>
      </span>
    </Link>
  );
}
