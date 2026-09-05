import Link from "next/link";
import Hero from "@/components/Hero";
import PriceSection from "@/components/PriceSection";
import ProductGrid from "@/components/ProductGrid";
import MysteryBox from "@/components/MysteryBox";
import CollectionCard from "@/components/CollectionCard";
import Reviews from "@/components/Reviews";
import TrustBadges from "@/components/TrustBadges";
import UrgencyStrip from "@/components/UrgencyStrip";
import SectionHeading from "@/components/ui/SectionHeading";
import { collections } from "@/lib/site";
import { getBadged, getByCollection } from "@/lib/products";

export default function HomePage() {
  const halloween = getByCollection("halloween").slice(0, 8);
  const bestsellers = getBadged("bestseller").slice(0, 4);
  const nouveautes = getBadged("new").slice(0, 4);

  return (
    <>
      <Hero />
      <PriceSection />

      {/* ------------------------------- Halloween ------------------------------ */}
      <section className="bg-gradient-to-b from-peach-50 to-cream py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Édition limitée"
            title={<>🎃 Halloween Limited Edition</>}
            subtitle="Des doudous spooky, mais surtout beaucoup trop mignons."
          />
          <p className="mx-auto mt-3 max-w-xl rounded-full bg-white px-5 py-2.5 text-center text-sm font-extrabold text-pumpkin-600 shadow-sm">
            ÉDITION LIMITÉE — jusqu&apos;à épuisement des stocks.
          </p>

          <div className="mt-8">
            <ProductGrid products={halloween} />
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/collections/halloween"
              className="inline-flex items-center rounded-full bg-cocoa-800 px-7 py-4 font-[family-name:var(--font-display)] text-sm font-extrabold uppercase tracking-wide text-white shadow-cute transition-transform hover:-translate-y-0.5 active:scale-95"
            >
              Voir toute la collection Halloween →
            </Link>
          </div>
        </div>
      </section>

      <UrgencyStrip />

      {/* ----------------------------- Doudou Mystère --------------------------- */}
      <MysteryBox />

      {/* ------------------------------ Best-sellers ---------------------------- */}
      <section className="bg-cream py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Les chouchous"
            title={<>💕 Les plus adoptés</>}
            subtitle="Les doudous que tout le monde s'arrache. À 9,99 €, évidemment."
          />
          <div className="mt-8">
            <ProductGrid products={bestsellers} />
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/best-sellers"
              className="inline-flex items-center rounded-full bg-bubble-500 px-7 py-4 font-[family-name:var(--font-display)] text-sm font-extrabold uppercase tracking-wide text-white shadow-pop transition-transform hover:-translate-y-0.5 active:scale-95"
            >
              Voir tous les doudous
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------- Nouveautés ----------------------------- */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Fraîchement arrivés"
            title={<>👻 Les nouveautés</>}
            subtitle="Ils viennent d'arriver dans la boutique et ils sont déjà très demandés."
          />
          <div className="mt-8">
            <ProductGrid products={nouveautes} />
          </div>
        </div>
      </section>

      {/* ------------------------------ Collections ----------------------------- */}
      <section className="bg-cream py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Par univers"
            title={<>✨ Trouve ton style de doudou</>}
            subtitle="Cinq univers, un seul prix."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {collections.map((c) => (
              <CollectionCard key={c.handle} collection={c} />
            ))}
          </div>
        </div>
      </section>

      <Reviews />
      <TrustBadges />

      {/* -------------------------------- Rappel CTA ---------------------------- */}
      <section className="bg-gradient-to-br from-bubble-200 via-peach-100 to-lilac-100 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-cocoa-800 sm:text-4xl">
            Tu mérites un nouveau doudou. 🧸
          </h2>
          <p className="mt-3 text-base text-cocoa-800/80 sm:text-lg">
            9,99 € et il est à toi. Ou 2 € si tu préfères tenter le mystère.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/doudous"
              className="rounded-full bg-pumpkin-500 px-8 py-4 font-[family-name:var(--font-display)] text-base font-extrabold uppercase tracking-wide text-white shadow-cute transition-transform hover:-translate-y-0.5 active:scale-95"
            >
              J&apos;adopte 🧸
            </Link>
            <Link
              href="/doudou-mystere"
              className="rounded-full bg-lilac-400 px-8 py-4 font-[family-name:var(--font-display)] text-base font-extrabold uppercase tracking-wide text-white shadow-pop transition-transform hover:-translate-y-0.5 active:scale-95"
            >
              Je tente ma chance 👻
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
