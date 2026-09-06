import Link from "next/link";
import ProductVisual from "./ProductVisual";
import { SectionDecor } from "./ui/HalloweenDecor";
import { featuredProducts } from "@/lib/products";

/**
 * Le prix unique est un pilier de la marque : il a sa propre section.
 * On y annonce le tarif à l'unité et la livraison offerte — jamais la grille
 * par quantité, réservée au panier.
 */
export default function PriceSection() {
  const showcase = featuredProducts.slice(0, 5);

  return (
    <section className="relative overflow-hidden bg-cream-deep py-14 sm:py-20">
      <SectionDecor />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-[1.1fr_1fr]">
        <div className="text-center lg:text-left">
          <span className="text-sm font-extrabold uppercase tracking-widest text-bubble-500">
            Prix unique
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-tight text-cocoa-800 sm:text-5xl">
            🧸 Tous les doudous
          </h2>
          <p className="mt-1 font-[family-name:var(--font-display)] text-6xl font-extrabold text-pumpkin-600 sm:text-7xl">
            9,99 €
          </p>
          <p className="mx-auto mt-4 max-w-md text-base text-cocoa-600/85 sm:text-lg lg:mx-0">
            Un seul prix pour toute la boutique. Tu choisis avec le cœur, pas
            avec une calculatrice.
          </p>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-bubble-100 px-5 py-2.5 text-sm font-extrabold text-bubble-500">
            🚚 Livraison offerte, sans minimum
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
