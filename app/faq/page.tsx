import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { faq, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Toutes les réponses sur les doudous Doudoumimi, le prix unique de 9,99 € et le Doudou Mystère à 2 €.",
};

export default function FaqPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-lilac-100 to-cream py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4">
          <SectionHeading
            eyebrow="On répond à tout"
            title={<>❓ Questions fréquentes</>}
            subtitle="Et si la réponse n'est pas là, écris-nous, on est sympas."
          />
        </div>
      </section>

      <section className="bg-cream py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4">
          <div className="flex flex-col gap-3">
            {faq.map((item) => (
              <details
                key={item.q}
                className="group rounded-[var(--radius-cute)] bg-white p-5 shadow-[0_2px_14px_-10px_rgba(111,76,56,0.4)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-[family-name:var(--font-display)] text-base font-extrabold text-cocoa-800">
                  {item.q}
                  <span className="shrink-0 text-bubble-500 transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-cocoa-600/85">{item.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-10 rounded-[var(--radius-cute)] bg-bubble-100 p-6 text-center">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-cocoa-800">
              Toujours une question ? 💌
            </h2>
            <p className="mt-1 text-sm text-cocoa-600/85">
              Écris-nous à{" "}
              <a href={`mailto:${site.email}`} className="font-bold text-bubble-600 underline">
                {site.email}
              </a>
            </p>
            <Link
              href="/doudous"
              className="mt-4 inline-flex rounded-full bg-pumpkin-500 px-6 py-3 font-[family-name:var(--font-display)] text-sm font-extrabold uppercase tracking-wide text-white shadow-cute transition-transform hover:-translate-y-0.5"
            >
              Voir les doudous
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
