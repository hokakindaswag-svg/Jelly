import type { Metadata } from "next";
import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import Reviews from "@/components/Reviews";
import SectionHeading from "@/components/ui/SectionHeading";
import { getBadged, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Nos coups de cœur",
  description: "La sélection Doudoumimi. Tous les doudous à 9,99 €, livraison offerte.",
};

export default function BestSellersPage() {
  const best = getBadged("bestseller");
  const rest = products
    .filter((p) => !p.badges.includes("bestseller"))
    .slice(0, 8);

  return (
    <>
      <section className="bg-gradient-to-b from-bubble-200 to-cream py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Les chouchous"
            title={<>💕 Nos coups de cœur</>}
            subtitle="La sélection Doudoumimi, à 9,99 € comme le reste."
          />
        </div>
      </section>

      <section className="bg-cream py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4">
          <ProductGrid products={best} />

          <div className="mt-14">
            <SectionHeading title={<>🌟 Ils montent, ils montent</>} />
            <div className="mt-6">
              <ProductGrid products={rest} />
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/doudous"
              className="inline-flex rounded-full bg-cocoa-800 px-7 py-4 font-[family-name:var(--font-display)] text-sm font-extrabold uppercase tracking-wide text-white shadow-cute transition-transform hover:-translate-y-0.5"
            >
              Voir tous les doudous
            </Link>
          </div>
        </div>
      </section>

      <Reviews />
    </>
  );
}
