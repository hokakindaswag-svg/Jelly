import type { Metadata } from "next";
import Link from "next/link";
import Plushie from "@/components/Plushie";
import ProductGrid from "@/components/ProductGrid";
import SectionHeading from "@/components/ui/SectionHeading";
import { formatPrice, getBadged, getProduct, mysteryProduct } from "@/lib/products";
import { shippingFor } from "@/lib/checkout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Merci ! 🧸",
  description: "Ta commande Doudoumimi est confirmée.",
  robots: { index: false, follow: false },
};

type Search = { searchParams: Promise<{ p?: string; q?: string; m?: string }> };

export default async function ConfirmationPage({ searchParams }: Search) {
  const { p, q, m } = await searchParams;
  const product = p ? getProduct(p) : undefined;
  const quantity = Math.min(10, Math.max(1, Number.parseInt(q ?? "1", 10) || 1));
  const withMystery = m === "1" && product?.handle !== mysteryProduct.handle;

  const items = product ? product.price * quantity + (withMystery ? mysteryProduct.price : 0) : 0;
  const total = items + shippingFor(items);
  const suggestions = getBadged("bestseller").slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-bubble-100 to-cream py-14 sm:py-20">
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
          {product && (
            <div className="mx-auto h-36 w-36 animate-float">
              <Plushie art={product.art} palette={product.palette} label={product.name} className="h-full w-full" />
            </div>
          )}

          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold text-cocoa-800 sm:text-5xl">
            Merci ! 💕
          </h1>
          <p className="mt-3 text-base text-cocoa-600/85 sm:text-lg">
            {product ? (
              <>
                <strong className="text-cocoa-800">{product.name}</strong>
                {quantity > 1 ? ` ×${quantity}` : ""} arrive bientôt chez toi.
              </>
            ) : (
              "Ta commande est confirmée."
            )}
            {withMystery && " Et ton Doudou Mystère est déjà en train d'être choisi 👀"}
          </p>

          {product && (
            <dl className="mx-auto mt-6 max-w-sm rounded-[var(--radius-cute)] bg-white p-5 text-left text-sm shadow-sm">
              <div className="flex justify-between py-1">
                <dt className="text-cocoa-600/85">{product.name} ×{quantity}</dt>
                <dd className="font-bold text-cocoa-800">{formatPrice(product.price * quantity)}</dd>
              </div>
              {withMystery && (
                <div className="flex justify-between py-1">
                  <dt className="text-cocoa-600/85">Doudou Mystère 🎃</dt>
                  <dd className="font-bold text-cocoa-800">{formatPrice(mysteryProduct.price)}</dd>
                </div>
              )}
              <div className="flex justify-between py-1">
                <dt className="text-cocoa-600/85">Livraison</dt>
                <dd className="font-bold text-cocoa-800">
                  {shippingFor(items) === 0 ? "Offerte" : formatPrice(shippingFor(items))}
                </dd>
              </div>
              <div className="mt-2 flex justify-between border-t border-cocoa-800/10 pt-2 font-[family-name:var(--font-display)] text-lg font-extrabold">
                <dt className="text-cocoa-800">Total</dt>
                <dd className="text-pumpkin-600">{formatPrice(total)}</dd>
              </div>
            </dl>
          )}

          <p className="mt-5 text-sm text-cocoa-600/80">
            📧 Un e-mail de confirmation part tout de suite. Tu recevras ton numéro de suivi
            dès l&apos;expédition du colis.
          </p>
          <p className="mt-1 text-sm text-cocoa-600/70">
            Une question ?{" "}
            <a href={`mailto:${site.email}`} className="font-bold text-bubble-600 underline">
              {site.email}
            </a>
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/doudous"
              className="rounded-full bg-pumpkin-500 px-7 py-4 font-[family-name:var(--font-display)] text-sm font-extrabold uppercase tracking-wide text-white shadow-cute transition-transform hover:-translate-y-0.5"
            >
              Continuer à craquer 🧸
            </Link>
            <a
              href={site.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-7 py-4 font-[family-name:var(--font-display)] text-sm font-extrabold uppercase tracking-wide text-cocoa-800 ring-2 ring-cocoa-800/10 transition-transform hover:-translate-y-0.5"
            >
              Nous suivre sur TikTok
            </a>
          </div>
        </div>
      </section>

      <section className="bg-cream py-14">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title={<>💕 Attention : risque élevé de vouloir tous les collectionner</>}
            subtitle="Les plus adoptés du moment, toujours à 9,99 €."
          />
          <div className="mt-8">
            <ProductGrid products={suggestions} />
          </div>
        </div>
      </section>
    </>
  );
}
