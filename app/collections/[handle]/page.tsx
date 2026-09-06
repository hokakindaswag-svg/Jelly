import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MysteryBox from "@/components/MysteryBox";
import ProductGrid from "@/components/ProductGrid";
import SectionHeading from "@/components/ui/SectionHeading";
import HalloweenPattern from "@/components/ui/HalloweenPattern";
import ShippingBanner from "@/components/ShippingBanner";
import TrustBadges from "@/components/TrustBadges";
import UrgencyStrip from "@/components/UrgencyStrip";
import { getByCollection, type CollectionHandle } from "@/lib/products";
import { collections } from "@/lib/site";

type Params = { params: Promise<{ handle: string }> };

export function generateStaticParams() {
  return collections.map((c) => ({ handle: c.handle }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { handle } = await params;
  const collection = collections.find((c) => c.handle === handle);
  if (!collection) return { title: "Collection introuvable" };
  return { title: collection.title, description: collection.blurb };
}

export default async function CollectionPage({ params }: Params) {
  const { handle } = await params;
  const collection = collections.find((c) => c.handle === handle);
  if (!collection) notFound();

  const items = getByCollection(collection.handle as CollectionHandle);
  const isHalloween = collection.handle === "halloween";

  return (
    <>
      <section className="relative overflow-hidden bg-cream py-14 sm:py-20">
        {/* Le motif doit se voir ; c'est le halo derrière le texte, et non un
            voile sur toute la surface, qui garde le titre lisible. */}
        <HalloweenPattern className="opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream/45 to-cream" />
        <div className="absolute left-1/2 top-1/2 h-64 w-[min(90%,44rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream/85 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow={collection.subtitle}
            title={
              <>
                {collection.emoji} {collection.title}
              </>
            }
            subtitle={collection.blurb}
          />
          <div className="mt-6 text-center">
            <Link
              href="/doudous"
              className="inline-flex rounded-full bg-cocoa-800 px-8 py-4 font-[family-name:var(--font-display)] text-sm font-extrabold uppercase tracking-wide text-white shadow-cute transition-transform hover:-translate-y-0.5 hover:bg-cocoa-600 active:scale-95"
            >
              Voir tous les doudous
            </Link>
          </div>
        </div>
      </section>

      {isHalloween && <UrgencyStrip />}

      <section className="bg-cream py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <p className="mb-6 text-sm font-bold text-cocoa-600/70">
            {items.length} doudou{items.length > 1 ? "s" : ""} dans cette collection
          </p>
          <ProductGrid products={items} />
        </div>
      </section>

      {/* L'offre Mystère en grand, juste sous la collection */}
      <MysteryBox />

      <ShippingBanner />
      <TrustBadges />
    </>
  );
}
