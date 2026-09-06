import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import SectionHeading from "@/components/ui/SectionHeading";
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
      <section
        className="py-12 sm:py-16"
        style={{
          backgroundImage: `linear-gradient(160deg, ${collection.colors.from}, ${collection.colors.to})`,
        }}
      >
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow={collection.subtitle}
            title={
              <>
                {collection.emoji} {collection.title}
              </>
            }
            subtitle={collection.blurb}
          />
          <p className="mx-auto mt-4 w-fit rounded-full bg-white/90 px-5 py-2.5 font-[family-name:var(--font-display)] text-lg font-extrabold text-pumpkin-600 shadow-sm">
            Livraison offerte 🎀
          </p>
        </div>
      </section>

      {isHalloween && <UrgencyStrip />}

      <section className="bg-cream py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <p className="mb-6 text-sm font-bold text-cocoa-600/70">
            {items.length} doudou{items.length > 1 ? "s" : ""} dans cette collection
          </p>
          <ProductGrid products={items} />

          <div className="mt-10 flex flex-col justify-center gap-3 text-center sm:flex-row">
            <Link
              href="/doudou-mystere"
              className="rounded-full bg-lilac-400 px-7 py-4 font-[family-name:var(--font-display)] text-sm font-extrabold uppercase tracking-wide text-white shadow-pop transition-transform hover:-translate-y-0.5"
            >
              🎁 Doudou Mystère — 2 €
            </Link>
            <Link
              href="/doudous"
              className="rounded-full bg-white px-7 py-4 font-[family-name:var(--font-display)] text-sm font-extrabold uppercase tracking-wide text-cocoa-800 ring-2 ring-cocoa-800/10 transition-transform hover:-translate-y-0.5"
            >
              Voir tous les doudous
            </Link>
          </div>
        </div>
      </section>

      <TrustBadges />
    </>
  );
}
