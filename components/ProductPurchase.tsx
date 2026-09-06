"use client";

/**
 * Bloc d'achat de la fiche produit.
 *
 * Quantité + ajout au panier. Le prix montré est le prix unitaire multiplié :
 * aucune allusion aux paliers ici, ils se découvrent au panier. Sur mobile,
 * une barre collante garde le bouton accessible pendant la lecture.
 */

import { useState } from "react";
import AddToCartButton from "./AddToCartButton";
import BuyNowButton from "./BuyNowButton";
import PriceTag from "./ui/PriceTag";
import { useCart } from "./CartProvider";
import { MAX_DOUDOUS } from "@/lib/pricing";
import { formatPrice, mysteryProduct, type Product } from "@/lib/products";

export default function ProductPurchase({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const { doudouCount } = useCart();
  const isMystery = product.handle === mysteryProduct.handle;
  // On ne propose jamais plus que ce qui tient encore dans la commande.
  const max = isMystery ? 10 : Math.max(1, MAX_DOUDOUS - doudouCount);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-bold text-cocoa-600/80">Quantité</span>
          <div className="inline-flex items-center rounded-full bg-white shadow-sm ring-1 ring-cocoa-800/10">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              disabled={qty <= 1}
              aria-label="Diminuer la quantité"
              className="grid h-11 w-11 place-items-center rounded-full text-xl font-extrabold text-cocoa-800 transition hover:bg-bubble-50 disabled:opacity-30"
            >
              −
            </button>
            <span
              aria-live="polite"
              className="w-10 text-center font-[family-name:var(--font-display)] text-lg font-extrabold text-cocoa-800"
            >
              {qty}
            </span>
            <button
              type="button"
              onClick={() => setQty((q) => Math.min(max, q + 1))}
              disabled={qty >= max}
              aria-label="Augmenter la quantité"
              className="grid h-11 w-11 place-items-center rounded-full text-xl font-extrabold text-cocoa-800 transition hover:bg-bubble-50 disabled:opacity-30"
            >
              +
            </button>
          </div>
          {qty > 1 && (
            <span className="text-sm font-bold text-cocoa-800">
              {formatPrice(product.price * qty)}
            </span>
          )}
        </div>

        <BuyNowButton handle={product.handle} quantity={qty} className="w-full" />

        <AddToCartButton handle={product.handle} quantity={qty} variant="secondary" size="lg" full>
          Ajouter au panier
        </AddToCartButton>

        {!isMystery && (
          <AddToCartButton
            handle={mysteryProduct.handle}
            variant="secondary"
            size="sm"
            className="self-center border-none !bg-transparent !ring-0 underline decoration-lilac-300 underline-offset-4 !text-lilac-500 hover:!text-lilac-400"
          >
            + Ajouter un Doudou Mystère (2 €) 🎃
          </AddToCartButton>
        )}

        <p className="text-center text-xs font-bold text-bubble-500">
          🚚 Livraison offerte · paiement sécurisé
        </p>
      </div>

      {/* Barre d'achat collante — mobile uniquement */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-cocoa-800/10 bg-cream/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0">
            <p className="truncate text-xs font-bold text-cocoa-600/80">{product.name}</p>
            <PriceTag price={product.price * qty} size="md" />
          </div>
          <AddToCartButton handle={product.handle} quantity={qty} size="md" className="ml-auto flex-1">
            Ajouter
          </AddToCartButton>
        </div>
      </div>
      <div className="h-20 lg:hidden" aria-hidden="true" />
    </>
  );
}
