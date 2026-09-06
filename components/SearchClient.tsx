"use client";

/**
 * Recherche dans le catalogue, exécutée côté navigateur : le site étant
 * exporté en HTML statique, la requête est lue depuis l'URL après hydratation.
 */

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ProductGrid from "./ProductGrid";
import SectionHeading from "./ui/SectionHeading";
import { products, searchProducts } from "@/lib/products";

export default function SearchClient() {
  const query = (useSearchParams().get("q") ?? "").trim();
  const results = searchProducts(query);

  return (
    <>
      <SectionHeading
        eyebrow="Recherche"
        title={query ? <>🔍 « {query} »</> : <>🔍 Cherche ton doudou</>}
        subtitle={
          query
            ? `${results.length} résultat${results.length > 1 ? "s" : ""}.`
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
    </>
  );
}
