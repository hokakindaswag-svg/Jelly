"use client";

/**
 * Lit le produit et la quantité depuis l'URL d'achat direct
 * (`/checkout/?p=handle&q=2&m=1`).
 *
 * Le site étant exporté en HTML statique, ces paramètres sont résolus côté
 * navigateur et non au rendu serveur.
 */

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import CheckoutFlow from "./CheckoutFlow";
import { getProduct } from "@/lib/products";

export default function CheckoutClient() {
  const params = useSearchParams();
  const product = getProduct(params.get("p") ?? "");

  if (!product) {
    return (
      <div className="mx-auto max-w-md rounded-[var(--radius-cute)] bg-white p-8 text-center shadow-sm">
        <p className="text-4xl" aria-hidden="true">👻</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-xl font-extrabold text-cocoa-800">
          Ce doudou s&apos;est échappé
        </h1>
        <p className="mt-1 text-sm text-cocoa-600/80">
          On n&apos;arrive pas à retrouver le doudou de cette commande.
        </p>
        <Link
          href="/doudous"
          className="mt-5 inline-flex rounded-full bg-pumpkin-500 px-6 py-3 font-[family-name:var(--font-display)] text-sm font-extrabold uppercase tracking-wide text-white shadow-cute"
        >
          Choisir un doudou
        </Link>
      </div>
    );
  }

  const quantity = Math.min(10, Math.max(1, Number.parseInt(params.get("q") ?? "1", 10) || 1));

  return (
    <>
      <CheckoutFlow product={product} quantity={quantity} withMystery={params.get("m") === "1"} />

      <p className="mt-10 text-center text-xs text-cocoa-600/60">
        <Link href={`/produit/${product.handle}`} className="underline hover:text-bubble-600">
          ← Revenir à la fiche du doudou
        </Link>
      </p>
    </>
  );
}
