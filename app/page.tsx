import Link from "next/link";
import Hero from "@/components/Hero";
import PriceSection from "@/components/PriceSection";
import ProductGrid from "@/components/ProductGrid";
import MysteryBox from "@/components/MysteryBox";
import Reviews from "@/components/Reviews";
import CollectionCard from "@/components/CollectionCard";
import TrustBadges from "@/components/TrustBadges";
import UrgencyStrip from "@/components/UrgencyStrip";
import SectionHeading from "@/components/ui/SectionHeading";
import { collections } from "@/lib/site";
import { featuredProducts, getByCollection, products } from "@/lib/products";

export default function HomePage() {
  const halloween = getByCollection("halloween").slice(0, 8);
  // Les têtes d'affiche passent devant ; on complète avec le reste du catalogue.
  const cutest = [...featuredProducts, ...products.filter((p) => p.featured === undefined)].slice(0, 8);

  return (
    <>
      <Hero />
      <PriceSection />

      {/* ------------------------------- Halloween ------------------------------ */}
      <section className="bg-cream-deep py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Édition limitée"
            title={<>Collection Halloween</>}
            subtitle="Des doudous spooky, mais surtout beaucoup trop mignons."
          />
          <p className="mx-auto mt-3 max-w-xl text-center text-sm font-bold text-cocoa-600/70">
            Série produite une seule fois — une fois épuisée, elle disparaît.
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


      {/* ---------------------------- Les plus mignons -------------------------- */}
      <section className="bg-cream py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Les chouchous"
            title={<>Les plus mignons</>}
            subtitle="Le classique, la lapine, les petits dragons — nos préférés."
          />
          <div className="mt-8">
            <ProductGrid products={cutest} />
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/doudous"
              className="inline-flex items-center rounded-full bg-bubble-500 px-7 py-4 font-[family-name:var(--font-display)] text-sm font-extrabold uppercase tracking-wide text-white shadow-pop transition-transform hover:-translate-y-0.5 active:scale-95"
            >
              Voir tous les doudous
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------ Collections ----------------------------- */}
      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Par univers"
            title={<>Trouve ton style</>}
            subtitle="Cinq univers, un seul prix."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {collections.map((c) => (
              <CollectionCard key={c.handle} collection={c} />
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------- Doudou Mystère --------------------------- */}
      <MysteryBox />

      <Reviews />
      <UrgencyStrip />
      <TrustBadges />

      {/* -------------------------------- Rappel CTA ---------------------------- */}
      <section className="bg-cream-deep py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-cocoa-800 sm:text-4xl">
            Tu mérites un nouveau doudou.
          </h2>
          <p className="mt-3 text-base text-cocoa-800/80 sm:text-lg">
            Livraison offerte. Ou tente le Doudou Mystère si tu préfères la surprise.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/doudous"
              className="rounded-full bg-pumpkin-500 px-8 py-4 font-[family-name:var(--font-display)] text-base font-extrabold uppercase tracking-wide text-white shadow-cute transition-transform hover:-translate-y-0.5 active:scale-95"
            >
              J&apos;adopte
            </Link>
            <Link
              href="/doudou-mystere"
              className="rounded-full bg-lilac-400 px-8 py-4 font-[family-name:var(--font-display)] text-base font-extrabold uppercase tracking-wide text-white shadow-pop transition-transform hover:-translate-y-0.5 active:scale-95"
            >
              Je tente ma chance
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
