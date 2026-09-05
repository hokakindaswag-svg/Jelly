import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mon compte",
  description: "Suivi de commande et informations client Doudoumimi.",
};

export default function AccountPage() {
  const field =
    "w-full rounded-2xl bg-white px-4 py-3 text-sm text-cocoa-800 outline-none ring-1 ring-cocoa-800/10 placeholder:text-cocoa-400 focus:ring-2 focus:ring-bubble-300";

  return (
    <section className="bg-cream py-12 sm:py-16">
      <div className="mx-auto max-w-xl px-4">
        <SectionHeading
          eyebrow="Espace client"
          title={<>👤 Mon compte</>}
          subtitle="Chez Doudoumimi, tu n'as pas besoin de compte pour acheter. Il sert uniquement à suivre tes commandes."
        />

        <form className="mt-8 flex flex-col gap-4 rounded-[var(--radius-cute)] bg-white p-6 shadow-sm">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-cocoa-800">
            📦 Suivre ma commande
          </h2>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-extrabold uppercase tracking-wide text-cocoa-600/80">
              Numéro de commande
            </span>
            <input placeholder="DMI-000000" className={field} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-extrabold uppercase tracking-wide text-cocoa-600/80">
              E-mail de commande
            </span>
            <input type="email" placeholder="toi@exemple.fr" className={field} />
          </label>
          <button
            type="submit"
            className="rounded-full bg-cocoa-800 px-6 py-3.5 font-[family-name:var(--font-display)] text-sm font-extrabold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5"
          >
            Voir ma commande
          </button>
          <p className="text-xs text-cocoa-600/70">
            Tu ne retrouves pas ton numéro ? Écris-nous à{" "}
            <a href={`mailto:${site.email}`} className="font-bold text-bubble-600 underline">
              {site.email}
            </a>
            , on te retrouve ça.
          </p>
        </form>

        <div className="mt-6 rounded-[var(--radius-cute)] bg-bubble-100 p-6 text-center">
          <p className="font-[family-name:var(--font-display)] text-lg font-extrabold text-cocoa-800">
            Envie d&apos;un nouveau doudou ? 🧸
          </p>
          <Link
            href="/doudous"
            className="mt-3 inline-flex rounded-full bg-pumpkin-500 px-6 py-3 font-[family-name:var(--font-display)] text-sm font-extrabold uppercase tracking-wide text-white shadow-cute"
          >
            Voir les doudous — 9,99 €
          </Link>
        </div>
      </div>
    </section>
  );
}
