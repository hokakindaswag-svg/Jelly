import Link from "next/link";
import ProductVisual from "./ProductVisual";
import { featuredProducts } from "@/lib/products";

/**
 * Le prix unique est un pilier de la marque, mais le chiffre lui-même reste
 * sur les cartes produit : répété en très gros ici, juste sous le hero qui
 * l'annonce déjà, il donnait un ton de camelote.
 */
export default function PriceSection() {
  const showcase = featuredProducts.slice(0, 5);

  return (
    <section className="bg-cream py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-[1.1fr_1fr]">
        <div className="text-center lg:text-left">
          <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-bubble-500">
            Prix unique
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-tight text-cocoa-800 sm:text-5xl">
            Un seul prix pour toute la boutique
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-cocoa-600/85 sm:text-lg lg:mx-0">
            Tu choisis avec le cœur, pas avec une calculatrice. Livraison
            offerte, sans minimum.
          </p>
          <div>
            <Link
              href="/doudous"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-cocoa-800 px-7 py-4 font-[family-name:var(--font-display)] text-base font-extrabold uppercase tracking-wide text-white shadow-cute transition-transform hover:-translate-y-0.5 hover:bg-cocoa-600 active:scale-95"
            >
              Voir tous les doudous →
            </Link>
          </div>
        </div>

        <ul className="grid grid-cols-3 gap-3 sm:gap-4">
          {showcase.map((p, i) => (
            <li key={p.handle} className={i === 0 ? "col-span-2 row-span-2" : undefined}>
              <Link
                href={`/produit/${p.handle}`}
                className="group block overflow-hidden rounded-[var(--radius-cute)] bg-gradient-to-br from-peach-50 to-bubble-50 p-2 ring-1 ring-cocoa-800/5 transition-transform duration-300 hover:-translate-y-1"
              >
                <ProductVisual
                  product={p}
                  sizes="(max-width: 640px) 33vw, 220px"
                  className="aspect-square w-full transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
