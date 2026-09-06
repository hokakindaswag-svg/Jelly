import type { Metadata } from "next";
import { Suspense } from "react";
import ConfirmationClient from "@/components/ConfirmationClient";
import ProductGrid from "@/components/ProductGrid";
import SectionHeading from "@/components/ui/SectionHeading";
import { getBadged } from "@/lib/products";

export const metadata: Metadata = {
  title: "Merci ! 🧸",
  description: "Ta commande Doudoumimi est confirmée.",
  robots: { index: false, follow: false },
};

export default function ConfirmationPage() {
  const suggestions = getBadged("bestseller").slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden bg-cream py-14 sm:py-20">
        <div className="deco absolute inset-0" aria-hidden="true">
          {["🎃", "✨", "🧸", "👻", "🎀", "🍂"].map((e, i) => (
            <span
              key={e}
              className="absolute hidden animate-float text-3xl opacity-50 sm:block"
              style={{ left: `${8 + i * 15}%`, top: i % 2 ? "12%" : "72%", animationDelay: `${i * 0.3}s` }}
            >
              {e}
            </span>
          ))}
        </div>

        <div className="relative mx-auto max-w-2xl px-4 text-center">
          <Suspense
            fallback={
              <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-cocoa-800 sm:text-5xl">
                Merci ! 💕
              </h1>
            }
          >
            <ConfirmationClient />
          </Suspense>
        </div>
      </section>

      <section className="bg-cream py-14">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title={<>💕 Attention : risque élevé de vouloir tous les collectionner</>}
            subtitle="Nos coups de cœur, toujours à 9,99 €."
          />
          <div className="mt-8">
            <ProductGrid products={suggestions} />
          </div>
        </div>
      </section>
    </>
  );
}
