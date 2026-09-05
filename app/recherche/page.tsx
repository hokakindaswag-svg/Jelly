import type { Metadata } from "next";
import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import SectionHeading from "@/components/ui/SectionHeading";
import { searchProducts, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Recherche",
  robots: { index: false, follow: true },
};

type Search = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Search) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const results = searchProducts(query);

  return (
    <section className="bg-cream py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Recherche"
          title={query ? <>🔍 « {query} »</> : <>🔍 Cherche ton doudou</>}
          subtitle={
            query
              ? `${results.length} résultat${results.length > 1 ? "s" : ""} — tous à 9,99 €.`
              : "Tape un mot dans la barre de recherche : fantôme, citrouille, lapin…"
          }
        />

        <div className="mt-8">
          {query && results.length === 0 ? (
            <div className="rounded-[var(--radius-cute)] bg-white p-10 text-center">
              <p className="text-4xl" aria-hidden="true">👻</p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-xl font-extrabold text-cocoa-800">
                Aucun doudou ne correspond.
              </p>
              <p className="mt-1 text-sm text-cocoa-600/80">
                Il s&apos;est peut-être caché. Regarde toute la collection à la place.
              </p>
              <Link
                href="/doudous"
                className="mt-5 inline-flex rounded-full bg-pumpkin-500 px-6 py-3 font-[family-name:var(--font-display)] text-sm font-extrabold uppercase tracking-wide text-white shadow-cute"
              >
                Voir tous les doudous
              </Link>
            </div>
          ) : (
            <ProductGrid products={query ? results : products.slice(0, 8)} />
          )}
        </div>
      </div>
    </section>
  );
}
