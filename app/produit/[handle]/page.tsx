import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import ProductPurchase from "@/components/ProductPurchase";
import ProductGrid from "@/components/ProductGrid";
import Badge from "@/components/ui/Badge";
import PriceTag from "@/components/ui/PriceTag";
import SectionHeading from "@/components/ui/SectionHeading";
import TrustBadges from "@/components/TrustBadges";
import { allProducts, getProduct, getRelated } from "@/lib/products";

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

  const suggestions = getRelated(product);

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

            <div className="flex flex-wrap items-baseline gap-3">
              <PriceTag price={product.price} size="lg" />
              <span className="rounded-full bg-bubble-100 px-3 py-1 text-xs font-extrabold text-bubble-500">
                🚚 Livraison offerte
              </span>
            </div>

            {product.collections.includes("halloween") && (
              <p className="rounded-2xl bg-pumpkin-500/10 px-4 py-3 text-sm font-extrabold text-pumpkin-600">
                🎃 Édition limitée Halloween — produite une seule fois.
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
                📦 Expédié depuis notre entrepôt européen, avec numéro de suivi.
              </div>
              <div className="pt-2 text-cocoa-600/85">🚚 Livraison offerte, sans minimum.</div>
              <div className="pt-2 text-cocoa-600/85">
                🔒 Paiement sécurisé — carte, Apple Pay, Google Pay.
              </div>
            </dl>

          </div>
        </div>

        {suggestions.length > 0 && (
          <section className="mt-16">
            <SectionHeading
              title={<>🧸 Il irait bien avec…</>}
              subtitle="Dans le même esprit."
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
