import { trustBadges } from "@/lib/site";

/** Réassurance : uniquement des promesses tenables. */
export default function TrustBadges() {
  return (
    <section className="bg-cream-deep py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
          {trustBadges.map((b) => (
            <li
              key={b.title}
              className="flex flex-col items-center gap-1.5 rounded-[var(--radius-cute)] bg-cream px-3 py-5 text-center transition-transform hover:-translate-y-1"
            >
              <span className="text-3xl" aria-hidden="true">{b.emoji}</span>
              <h3 className="font-[family-name:var(--font-display)] text-sm font-extrabold text-cocoa-800">
                {b.title}
              </h3>
              <p className="text-xs leading-snug text-cocoa-600/75">{b.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
