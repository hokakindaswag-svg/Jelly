import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CheckoutFlow from "@/components/CheckoutFlow";
import Logo from "@/components/Logo";
import { getProduct } from "@/lib/products";

export const metadata: Metadata = {
  title: "Paiement",
  description: "Paiement direct Doudoumimi.",
  robots: { index: false, follow: false },
};

type Search = { searchParams: Promise<{ p?: string; q?: string; m?: string }> };

export default async function CheckoutPage({ searchParams }: Search) {
  const { p, q, m } = await searchParams;
  const product = p ? getProduct(p) : undefined;
  if (!product) notFound();

  const quantity = Math.min(10, Math.max(1, Number.parseInt(q ?? "1", 10) || 1));

  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <Logo />
          <p className="text-sm font-bold text-cocoa-600/75">
            Achat direct · aucun panier, aucune étape en trop
          </p>
        </div>

        <CheckoutFlow product={product} quantity={quantity} withMystery={m === "1"} />

        <p className="mt-10 text-center text-xs text-cocoa-600/60">
          <Link href={`/produit/${product.handle}`} className="underline hover:text-bubble-600">
            ← Revenir à la fiche du doudou
          </Link>
        </p>
      </div>
    </div>
  );
}
