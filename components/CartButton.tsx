"use client";

import { useCart } from "./CartProvider";

/** Icône panier du header, avec le nombre d'articles. */
export default function CartButton() {
  const { open, items, doudouCount, mysteryCount, ready } = useCart();
  const count = doudouCount + mysteryCount;

  return (
    <button
      type="button"
      onClick={open}
      aria-label={count > 0 ? `Panier, ${count} article${count > 1 ? "s" : ""}` : "Panier"}
      className="relative grid h-10 w-10 place-items-center rounded-full text-cocoa-800 transition hover:bg-white"
    >
      <span className="text-xl" aria-hidden="true">🧺</span>
      {/* `ready` évite d'afficher 0 puis le vrai total au chargement. */}
      {ready && items.length > 0 && (
        <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-pumpkin-500 px-1 text-[11px] font-extrabold text-white">
          {count}
        </span>
      )}
    </button>
  );
}
