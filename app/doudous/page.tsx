import type { Metadata } from "next";
import ProductGrid from "@/components/ProductGrid";
import SectionHeading from "@/components/ui/SectionHeading";
import TrustBadges from "@/components/TrustBadges";
import CollectionCard from "@/components/CollectionCard";
import { products } from "@/lib/products";
import { collections } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tous les doudous",
  description: "Toute la collection Doudoumimi, livraison offerte.",
};

export default function DoudousPage() {
  return (
    <>
      <section className="bg-cream py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow={`${products.length} doudous disponibles`}
            title={<>🧸 Tous les doudous</>}
            subtitle="Un seul prix pour toute la boutique, livraison offerte."
          />
        </div>
      </section>

      <section className="bg-cream py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4">
          <ProductGrid products={products} />
        </div>
      </section>

      <section className="bg-cream-deep py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title={<>✨ Explorer par univers</>} />
          <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {collections.map((c) => (
              <CollectionCard key={c.handle} collection={c} />
            ))}
          </div>
        </div>
      </section>

      <TrustBadges />
    </>
  );
}
