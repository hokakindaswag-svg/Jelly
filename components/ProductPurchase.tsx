"use client";

/**
 * Bloc d'achat de la page produit.
 *
 * Sélecteur de quantité + bouton ACHETER MAINTENANT. Aucun panier : le clic
 * envoie directement au checkout avec la quantité choisie. Sur mobile, une
 * barre d'achat collante reste accessible pendant que l'on fait défiler les
 * photos et la description.
 */

import { useState } from "react";
import BuyNowButton from "./BuyNowButton";
import PriceTag from "./ui/PriceTag";
import { formatPrice, type Product } from "@/lib/products";

export default function ProductPurchase({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const max = Math.min(10, product.stock);
  const total = product.price * qty;

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
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
            <span aria-live="polite" className="w-10 text-center font-[family-name:var(--font-display)] text-lg font-extrabold text-cocoa-800">
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
            <span className="text-sm font-bold text-pumpkin-600">
              Total : {formatPrice(total)}
            </span>
          )}
        </div>

        <BuyNowButton handle={product.handle} quantity={qty} size="lg" full>
          Acheter maintenant 🧸
        </BuyNowButton>

        <BuyNowButton
          handle={product.handle}
          quantity={qty}
          mystery
          variant="secondary"
          size="md"
          full
        >
          + Ajouter un Doudou Mystère (2 €) 🎃
        </BuyNowButton>

        <p className="text-center text-xs text-cocoa-600/70">
          Paiement direct et sécurisé · pas de panier, pas de détour
        </p>
      </div>

      {/* Barre d'achat collante — mobile uniquement */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-cocoa-800/10 bg-cream/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0">
            <p className="truncate text-xs font-bold text-cocoa-600/80">{product.name}</p>
            <PriceTag price={total} size="md" />
          </div>
          <BuyNowButton handle={product.handle} quantity={qty} size="md" className="ml-auto flex-1">
            Acheter maintenant
          </BuyNowButton>
        </div>
      </div>
      {/* Espace pour ne pas masquer le contenu derrière la barre collante */}
      <div className="h-20 lg:hidden" aria-hidden="true" />
    </>
  );
}
