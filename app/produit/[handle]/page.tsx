import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import ProductPurchase from "@/components/ProductPurchase";
import ProductGrid from "@/components/ProductGrid";
import Badge from "@/components/ui/Badge";
import PriceTag from "@/components/ui/PriceTag";
import Stars from "@/components/ui/Stars";
import SectionHeading from "@/components/ui/SectionHeading";
import TrustBadges from "@/components/TrustBadges";
import { allProducts, getProduct, isLowStock, products } from "@/lib/products";
import { reviews } from "@/lib/site";

type Params = { params: Promise<{ handle: string }> };

export function generateStaticParams() {
  return allProducts.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) return { title: "Doudou introuvable" };
  return {
    title: `${product.name} — ${(product.price / 100).toFixed(2).replace(".", ",")} €`,
    description: product.tagline,
  };
}

export default async function ProductPage({ params }: Params) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) notFound();

  const suggestions = products
    .filter((p) => p.handle !== product.handle)
    .filter((p) => p.collections.some((c) => product.collections.includes(c)))
    .slice(0, 4);

  const productReviews = reviews.filter((r) => r.product === product.name).slice(0, 2);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-10">
        <nav aria-label="Fil d'Ariane" className="mb-5 text-xs font-semibold text-cocoa-600/70">
          <Link href="/" className="hover:text-bubble-600">Accueil</Link>
          {" / "}
          <Link href="/doudous" className="hover:text-bubble-600">Doudous</Link>
          {" / "}
          <span className="text-cocoa-800">{product.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <ProductGallery product={product} />

          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-1.5">
              {product.badges.map((b) => (
                <Badge key={b} type={b} />
              ))}
            </div>

            <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold leading-tight text-cocoa-800 sm:text-4xl">
              {product.name}
            </h1>
            <p className="text-base text-cocoa-600/85">{product.tagline}</p>

            <Stars rating={product.rating} count={product.reviewCount} />

            <div className="flex items-baseline gap-3">
              <PriceTag price={product.price} size="lg" />
              <span className="text-sm font-bold text-cocoa-600/70">livraison en sus</span>
            </div>

            {product.collections.includes("halloween") && (
              <p className="rounded-2xl bg-pumpkin-500/10 px-4 py-3 text-sm font-extrabold text-pumpkin-600">
                🎃 Édition limitée Halloween — produite une seule fois.
              </p>
            )}
            {isLowStock(product) && (
              <p className="text-sm font-bold text-bubble-600">
                👻 Plus que {product.stock} exemplaires. Adopte-le avant qu&apos;il ne soit trop tard.
              </p>
            )}

            <p className="text-base leading-relaxed text-cocoa-600/90">{product.description}</p>

            <ProductPurchase product={product} />

            <dl className="mt-2 divide-y divide-cocoa-800/10 rounded-[var(--radius-cute)] bg-white p-5 text-sm">
              <div className="flex justify-between pb-2">
                <dt className="font-bold text-cocoa-800">Taille</dt>
                <dd className="text-cocoa-600/85">{product.size}</dd>
              </div>
              {product.details.map((d) => (
                <div key={d} className="py-2 text-cocoa-600/85">
                  ✦ {d}
                </div>
              ))}
              <div className="pt-2 text-cocoa-600/85">
                📦 Expédié depuis notre entrepôt européen sous 24 à 48 h ouvrées, avec suivi.
              </div>
            </dl>

            {productReviews.length > 0 && (
              <div className="flex flex-col gap-3">
                <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-cocoa-800">
                  Avis vérifiés
                </h2>
                {productReviews.map((r) => (
                  <figure key={r.handle} className="rounded-2xl bg-bubble-50 p-4">
                    <Stars rating={r.rating} />
                    <blockquote className="mt-1 text-sm text-cocoa-600/85">« {r.text} »</blockquote>
                    <figcaption className="mt-1 text-xs font-bold text-cocoa-600/70">
                      {r.name} · {r.handle}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>
        </div>

        {suggestions.length > 0 && (
          <section className="mt-16">
            <SectionHeading
              title={<>🧸 Il irait bien avec…</>}
              subtitle="Tous à 9,99 €, évidemment."
            />
            <div className="mt-6">
              <ProductGrid products={suggestions} />
            </div>
          </section>
        )}
      </div>

      <TrustBadges />
    </>
  );
}
