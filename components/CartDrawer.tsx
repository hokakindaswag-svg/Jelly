"use client";

/**
 * Tiroir panier — le seul endroit du site où la grille par quantité est dévoilée.
 *
 * Le parcours repose là-dessus : le client choisit à 9,99 €, ouvre son panier,
 * et découvre qu'un deuxième doudou ne coûte presque rien. La relance vers le
 * palier suivant est donc l'élément principal du tiroir, pas une note en bas.
 */

import Link from "next/link";
import { useEffect, useRef } from "react";
import ProductVisual from "./ProductVisual";
import { useCart } from "./CartProvider";
import { MAX_DOUDOUS, TIERS, nextTierHint, tierFor } from "@/lib/pricing";
import { formatPrice, mysteryProduct } from "@/lib/products";

function TierLadder({ count }: { count: number }) {
  const active = tierFor(count);
  return (
    <ul className="grid grid-cols-5 gap-1.5">
      {TIERS.map((t) => {
        const on = active?.min === t.min;
        const label = t.min === t.max ? `${t.min}` : `${t.min}–${t.max}`;
        return (
          <li
            key={t.min}
            className={`rounded-xl px-1 py-2 text-center transition ${
              on
                ? "bg-pumpkin-500 text-white shadow-cute"
                : "bg-white text-cocoa-800/70 ring-1 ring-cocoa-800/10"
            }`}
          >
            <span className="block text-[11px] font-extrabold">{label}</span>
            <span className={`block text-[11px] font-bold ${on ? "text-white/90" : "text-cocoa-600/70"}`}>
              {formatPrice(t.total)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function NextTierNudge({ count }: { count: number }) {
  const hint = nextTierHint(count);

  if (count >= MAX_DOUDOUS) {
    return (
      <p className="rounded-2xl bg-lilac-100 px-4 py-3 text-center text-sm font-bold text-lilac-500">
        🎀 Collection complète ! Tu profites du meilleur tarif.
      </p>
    );
  }
  if (!hint) return null;

  const s = hint.missing > 1 ? "s" : "";
  const free = tierFor(count)?.max === hint.target;

  return (
    <p className="rounded-2xl bg-gradient-to-r from-pumpkin-300/50 to-bubble-200/60 px-4 py-3 text-center text-sm font-bold text-cocoa-800">
      {free ? (
        <>
          🎃 Ajoute {hint.missing} doudou{s} de plus : ton total reste à{" "}
          {formatPrice(hint.total)}.
        </>
      ) : (
        <>
          👻 Plus que {hint.missing} doudou{s} pour passer à {hint.target} doudous à{" "}
          {formatPrice(hint.total)} !
        </>
      )}
    </p>
  );
}

export default function CartDrawer() {
  const { isOpen, close, items, doudouCount, doudousTotal, savings, total, mysteryCount, setQuantity, remove, isFull } =
    useCart();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panel.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  const empty = items.length === 0;

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Panier">
      <button
        type="button"
        aria-label="Fermer le panier"
        onClick={close}
        className="absolute inset-0 bg-cocoa-800/40 backdrop-blur-sm"
      />
      <div
        ref={panel}
        tabIndex={-1}
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream shadow-2xl outline-none animate-slide-in"
      >
        <header className="flex items-center justify-between border-b border-cocoa-800/10 px-5 py-4">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-cocoa-800">
            🧺 Ton panier
            {doudouCount > 0 && (
              <span className="ml-2 text-sm font-bold text-cocoa-600/70">
                {doudouCount}/{MAX_DOUDOUS}
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Fermer"
            className="grid h-10 w-10 place-items-center rounded-full text-2xl text-cocoa-800 transition hover:bg-white"
          >
            ×
          </button>
        </header>

        {empty ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="text-5xl" aria-hidden="true">🧸</span>
            <p className="font-[family-name:var(--font-display)] text-lg font-extrabold text-cocoa-800">
              Ton panier est vide
            </p>
            <p className="text-sm text-cocoa-600/80">
              Tous les doudous sont à 9,99 €. Il y a forcément un qui te fait de l&apos;œil.
            </p>
            <Link
              href="/doudous"
              onClick={close}
              className="rounded-full bg-pumpkin-500 px-6 py-3 font-[family-name:var(--font-display)] text-sm font-extrabold uppercase tracking-wide text-white shadow-cute"
            >
              Voir les doudous
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-cocoa-800/5 overflow-y-auto px-5">
              {items.map(({ product, quantity }) => {
                const isMystery = product.handle === mysteryProduct.handle;
                return (
                  <li key={product.handle} className="flex gap-3 py-4">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-peach-50 to-bubble-50">
                      <ProductVisual product={product} label={null} sizes="80px" className="h-full w-full p-1.5" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/produit/${product.handle}`}
                          onClick={close}
                          className="truncate font-[family-name:var(--font-display)] text-sm font-extrabold text-cocoa-800 hover:underline"
                        >
                          {product.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => remove(product.handle)}
                          aria-label={`Retirer ${product.name}`}
                          className="shrink-0 text-xs font-bold text-cocoa-600/60 underline hover:text-pumpkin-600"
                        >
                          Retirer
                        </button>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="inline-flex items-center rounded-full bg-white ring-1 ring-cocoa-800/10">
                          <button
                            type="button"
                            onClick={() => setQuantity(product.handle, quantity - 1)}
                            aria-label={`Retirer un ${product.name}`}
                            className="grid h-8 w-8 place-items-center rounded-full text-lg font-extrabold text-cocoa-800 transition hover:bg-bubble-50"
                          >
                            −
                          </button>
                          <span aria-live="polite" className="w-7 text-center text-sm font-extrabold text-cocoa-800">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuantity(product.handle, quantity + 1)}
                            disabled={!isMystery && isFull}
                            aria-label={`Ajouter un ${product.name}`}
                            className="grid h-8 w-8 place-items-center rounded-full text-lg font-extrabold text-cocoa-800 transition hover:bg-bubble-50 disabled:opacity-30"
                          >
                            +
                          </button>
                        </div>
                        {isMystery && (
                          <span className="text-sm font-extrabold text-lilac-500">
                            {formatPrice(product.price * quantity)}
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-cocoa-800/10 bg-white/70 px-5 py-4">
              {doudouCount > 0 && (
                <div className="mb-3 flex flex-col gap-2.5">
                  <p className="text-center text-[11px] font-extrabold uppercase tracking-widest text-cocoa-600/70">
                    Plus tu en prends, moins ça coûte
                  </p>
                  <TierLadder count={doudouCount} />
                  <NextTierNudge count={doudouCount} />
                </div>
              )}

              <dl className="flex flex-col gap-1.5 text-sm">
                {doudouCount > 0 && (
                  <div className="flex justify-between">
                    <dt className="text-cocoa-800/80">
                      {doudouCount} doudou{doudouCount > 1 ? "s" : ""}
                    </dt>
                    <dd className="font-bold text-cocoa-800">{formatPrice(doudousTotal)}</dd>
                  </div>
                )}
                {mysteryCount > 0 && (
                  <div className="flex justify-between">
                    <dt className="text-cocoa-800/80">
                      {mysteryCount} Doudou Mystère
                    </dt>
                    <dd className="font-bold text-cocoa-800">
                      {formatPrice(mysteryCount * mysteryProduct.price)}
                    </dd>
                  </div>
                )}
                {savings > 0 && (
                  <div className="flex justify-between text-bubble-500">
                    <dt className="font-bold">Économie</dt>
                    <dd className="font-extrabold">−{formatPrice(savings)}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-cocoa-800/80">Livraison</dt>
                  <dd className="font-extrabold text-bubble-500">Offerte 🚚</dd>
                </div>
                <div className="mt-1 flex items-baseline justify-between border-t border-cocoa-800/10 pt-2">
                  <dt className="font-[family-name:var(--font-display)] text-lg font-extrabold text-cocoa-800">
                    Total
                  </dt>
                  <dd className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-pumpkin-600">
                    {formatPrice(total)}
                  </dd>
                </div>
              </dl>

              <Link
                href="/checkout"
                onClick={close}
                className="mt-3 block rounded-full bg-pumpkin-500 px-6 py-4 text-center font-[family-name:var(--font-display)] text-base font-extrabold uppercase tracking-wide text-white shadow-cute transition-transform hover:-translate-y-0.5 active:scale-95"
              >
                Passer commande
              </Link>
              <button
                type="button"
                onClick={close}
                className="mt-2 w-full text-center text-xs font-bold text-cocoa-600/70 underline"
              >
                Continuer mes achats
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
