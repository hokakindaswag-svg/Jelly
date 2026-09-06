"use client";

/**
 * « Acheter maintenant » : ajoute au panier et part droit au paiement.
 *
 * Le bouton existe pour l'achat d'impulsion sur un seul doudou — celui qui
 * sait déjà ce qu'il veut n'a pas à ouvrir le tiroir puis à cliquer une
 * seconde fois. Le panier reste le chemin par défaut, c'est lui qui porte
 * l'offre par quantité.
 */

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useCart } from "./CartProvider";
import { checkoutHref } from "@/lib/checkout";
import { orderTotal } from "@/lib/pricing";
import { mysteryProduct } from "@/lib/products";

export default function BuyNowButton({
  handle,
  quantity = 1,
  className = "",
}: {
  handle: string;
  quantity?: number;
  className?: string;
}) {
  const router = useRouter();
  const { add, doudouCount, mysteryCount, isFull, close } = useCart();
  const [busy, setBusy] = useState(false);

  const onClick = useCallback(() => {
    setBusy(true);
    add(handle, quantity);
    close();

    // `add` passe par un state React : le total du contexte n'est pas encore à
    // jour ici, on projette donc le panier tel qu'il sera après l'ajout.
    const isMystery = handle === mysteryProduct.handle;
    const doudous = isMystery ? doudouCount : Math.min(10, doudouCount + quantity);
    const mystery = isMystery ? mysteryCount + quantity : mysteryCount;
    const amount = orderTotal(doudous, mystery);

    const href = checkoutHref(doudous + mystery, amount);
    if (href.startsWith("/")) router.push(href);
    else window.location.href = href;
  }, [add, close, handle, quantity, doudouCount, mysteryCount, router]);

  const blocked = isFull && handle !== mysteryProduct.handle;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy || blocked}
      className={`inline-flex items-center justify-center rounded-full bg-cocoa-800 px-6 py-4 font-[family-name:var(--font-display)] text-base font-extrabold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5 hover:bg-cocoa-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 ${className}`}
    >
      {busy ? "Un instant…" : "Acheter maintenant"}
    </button>
  );
}
