import Link from "next/link";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import MysteryBox from "@/components/MysteryBox";
import Reviews from "@/components/Reviews";
import ShippingBanner from "@/components/ShippingBanner";
import TrustBadges from "@/components/TrustBadges";
import UrgencyStrip from "@/components/UrgencyStrip";
import SectionHeading from "@/components/ui/SectionHeading";
import { featuredProducts, getByCollection, products } from "@/lib/products";

export default function HomePage() {
  const halloween = getByCollection("halloween").slice(0, 8);
  // Les têtes d'affiche passent devant ; on complète avec le reste du catalogue.
  const cutest = [...featuredProducts, ...products.filter((p) => p.featured === undefined)].slice(0, 8);

  return (
    <>
      <Hero />

      {/* L'offre Mystère prend la place de l'ancien bloc « prix unique », qui
          répétait juste sous le hero le chiffre que le hero venait d'annoncer.
          La livraison offerte suit dans la foulée : les deux promesses qui
          font cliquer sont ainsi visibles sans défiler bien loin. */}
      <MysteryBox />
      <ShippingBanner />

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
