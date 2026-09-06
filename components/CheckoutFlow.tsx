"use client";

/**
 * CheckoutFlow — paiement de la commande présente dans le panier.
 *
 * Le montant n'est jamais recalculé ici : il vient de `lib/pricing`, seule
 * source de vérité pour les paliers. La livraison est offerte sur toutes les
 * commandes, donc aucune ligne de frais à additionner.
 *
 * BRANCHEMENT PAIEMENT
 * --------------------
 * `submitOrder` est le point d'intégration : remplacer la simulation par
 *   - une redirection vers le checkout Shopify
 *     (`cart.checkoutUrl`, construit depuis les lignes du panier), ou
 *   - la création d'un PaymentIntent Stripe côté serveur.
 * Aucun autre composant n'a besoin de changer.
 */

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProductVisual from "./ProductVisual";
import { useCart } from "./CartProvider";
import { MAX_DOUDOUS, TIERS, nextTierHint, tierFor } from "@/lib/pricing";
import { formatPrice, mysteryProduct } from "@/lib/products";

/**
 * Un seul écran : coordonnées, adresse et paiement à la suite. Le découpage
 * en trois étapes rallongeait le parcours sans rien apporter — sur une
 * commande à un seul produit, chaque étape était une occasion d'abandonner.
 */
export default function CheckoutFlow() {
  const router = useRouter();
  const { items, doudouCount, mysteryCount, doudousTotal, savings, total, ready, clear, setQuantity } =
    useCart();
  const [submitting, setSubmitting] = useState(false);

  function submitOrder(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const count = doudouCount + mysteryCount;
    clear();
    router.push(`/checkout/confirmation?n=${count}&t=${total}`);
  }

  // Tant que le panier n'est pas relu depuis le navigateur, on n'affiche rien
  // plutôt qu'un « panier vide » qui disparaîtrait aussitôt.
  if (!ready) return <div className="min-h-[40vh]" aria-hidden="true" />;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md rounded-3xl bg-white p-8 text-center ring-1 ring-cocoa-800/10">
        <p className="text-4xl" aria-hidden="true">🧺</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-xl font-extrabold text-cocoa-800">
          Ton panier est vide
        </h1>
        <p className="mt-1 text-sm text-cocoa-600/80">
          Choisis un doudou et il apparaîtra ici. Livraison offerte.
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

  const hint = nextTierHint(doudouCount);
  const activeTier = tierFor(doudouCount);

  const field =
    "w-full rounded-2xl bg-white px-4 py-3 text-sm text-cocoa-800 outline-none ring-1 ring-cocoa-800/10 placeholder:text-cocoa-400 focus:ring-2 focus:ring-bubble-300";
  const labelCls = "text-xs font-extrabold uppercase tracking-wide text-cocoa-600/80";
  const legend =
    "font-[family-name:var(--font-display)] text-lg font-extrabold text-cocoa-800";

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
      <form onSubmit={submitOrder} className="flex flex-col gap-8">
        <fieldset className="flex flex-col gap-4">
          <legend className={legend}>Où on t&apos;envoie ton doudou ?</legend>
          <label className="flex flex-col gap-1.5">
            <span className={labelCls}>E-mail</span>
            <input required type="email" autoComplete="email" placeholder="toi@exemple.fr" className={field} />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className={labelCls}>Prénom</span>
              <input required autoComplete="given-name" placeholder="Léa" className={field} />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className={labelCls}>Nom</span>
              <input required autoComplete="family-name" placeholder="Martin" className={field} />
            </label>
          </div>
          <label className="flex flex-col gap-1.5">
            <span className={labelCls}>Adresse</span>
            <input required autoComplete="street-address" placeholder="12 rue des Citrouilles" className={field} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={labelCls}>Complément (optionnel)</span>
            <input autoComplete="address-line2" placeholder="Appartement, bâtiment…" className={field} />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className={labelCls}>Code postal</span>
              <input required autoComplete="postal-code" inputMode="numeric" placeholder="75011" className={field} />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className={labelCls}>Ville</span>
              <input required autoComplete="address-level2" placeholder="Paris" className={field} />
            </label>
          </div>
          <label className="flex flex-col gap-1.5">
            <span className={labelCls}>Pays</span>
            <select required autoComplete="country-name" className={field} defaultValue="France">
              <option>France</option>
              <option>Belgique</option>
              <option>Suisse</option>
              <option>Luxembourg</option>
            </select>
          </label>
        </fieldset>

        <fieldset className="flex flex-col gap-4">
          <legend className={legend}>Paiement sécurisé</legend>
          <label className="flex flex-col gap-1.5">
            <span className={labelCls}>Numéro de carte</span>
            <input required inputMode="numeric" placeholder="1234 5678 9012 3456" className={field} />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className={labelCls}>Expiration</span>
              <input required placeholder="10/28" className={field} />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className={labelCls}>Cryptogramme</span>
              <input required inputMode="numeric" placeholder="123" className={field} />
            </label>
          </div>
          <p className="text-xs text-cocoa-600/70">
            Connexion chiffrée. Tes informations bancaires ne sont jamais stockées par Doudoumimi.
          </p>
        </fieldset>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-pumpkin-500 px-6 py-4 font-[family-name:var(--font-display)] text-base font-extrabold uppercase tracking-wide text-white shadow-cute transition-transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-60"
        >
          {submitting ? "Paiement en cours…" : `Payer ${formatPrice(total)}`}
        </button>
      </form>

      {/* ---------------------------- Récapitulatif ---------------------------- */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-[var(--radius-cute)] bg-white p-5 shadow-[0_2px_18px_-10px_rgba(111,76,56,0.4)]">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-cocoa-800">
            Ta commande
          </h2>

          <ul className="mt-4 divide-y divide-cocoa-800/5">
            {items.map(({ product, quantity }) => (
              <li key={product.handle} className="flex items-center gap-3 py-3">
                <div className="h-16 w-16 shrink-0 rounded-2xl bg-gradient-to-br from-peach-50 to-bubble-50 p-1.5">
                  <ProductVisual product={product} label={null} sizes="80px" className="h-full w-full" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-extrabold text-cocoa-800">{product.name}</p>
                  <div className="mt-1 inline-flex items-center rounded-full bg-cream ring-1 ring-cocoa-800/10">
                    <button
                      type="button"
                      onClick={() => setQuantity(product.handle, quantity - 1)}
                      aria-label={`Retirer un ${product.name}`}
                      className="grid h-7 w-7 place-items-center rounded-full text-base font-extrabold text-cocoa-800 hover:bg-white"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-xs font-extrabold text-cocoa-800">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(product.handle, quantity + 1)}
                      aria-label={`Ajouter un ${product.name}`}
                      className="grid h-7 w-7 place-items-center rounded-full text-base font-extrabold text-cocoa-800 hover:bg-white"
                    >
                      +
                    </button>
                  </div>
                </div>
                {product.handle === mysteryProduct.handle && (
                  <span className="text-sm font-extrabold text-lilac-500">
                    {formatPrice(product.price * quantity)}
                  </span>
                )}
              </li>
            ))}
          </ul>

          {doudouCount > 0 && (
            <div className="mt-3 rounded-2xl bg-cream p-3">
              <p className="text-center text-[11px] font-extrabold uppercase tracking-widest text-cocoa-600/70">
                Ton palier
              </p>
              <ul className="mt-2 grid grid-cols-5 gap-1">
                {TIERS.map((t) => {
                  const on = activeTier?.min === t.min;
                  return (
                    <li
                      key={t.min}
                      className={`rounded-lg px-1 py-1.5 text-center text-[10px] font-extrabold ${
                        on ? "bg-pumpkin-500 text-white" : "bg-white text-cocoa-800/60"
                      }`}
                    >
                      <span className="block">{t.min === t.max ? t.min : `${t.min}–${t.max}`}</span>
                      <span className="block font-bold">{formatPrice(t.total)}</span>
                    </li>
                  );
                })}
              </ul>
              {hint && doudouCount < MAX_DOUDOUS && (
                <p className="mt-2 text-center text-xs font-bold text-pumpkin-600">
                  🎃 Encore {hint.missing} doudou{hint.missing > 1 ? "s" : ""} → {formatPrice(hint.total)}
                </p>
              )}
            </div>
          )}

          <dl className="mt-4 space-y-1.5 border-t border-cocoa-800/10 pt-4 text-sm">
            {doudouCount > 0 && (
              <div className="flex justify-between text-cocoa-600/85">
                <dt>
                  {doudouCount} doudou{doudouCount > 1 ? "s" : ""}
                </dt>
                <dd>{formatPrice(doudousTotal)}</dd>
              </div>
            )}
            {mysteryCount > 0 && (
              <div className="flex justify-between text-cocoa-600/85">
                <dt>{mysteryCount} Doudou Mystère</dt>
                <dd>{formatPrice(mysteryCount * mysteryProduct.price)}</dd>
              </div>
            )}
            {savings > 0 && (
              <div className="flex justify-between font-bold text-bubble-500">
                <dt>Économie</dt>
                <dd>−{formatPrice(savings)}</dd>
              </div>
            )}
            <div className="flex justify-between text-cocoa-600/85">
              <dt>Livraison</dt>
              <dd className="font-extrabold text-bubble-500">Offerte 🚚</dd>
            </div>
            <div className="flex justify-between pt-2 font-[family-name:var(--font-display)] text-lg font-extrabold text-cocoa-800">
              <dt>Total</dt>
              <dd className="text-pumpkin-600">{formatPrice(total)}</dd>
            </div>
          </dl>

          <ul className="mt-4 flex flex-col gap-1.5 border-t border-cocoa-800/10 pt-4 text-xs text-cocoa-600/75">
            <li>🔒 Paiement chiffré</li>
            <li>🚚 Livraison offerte, colis suivi</li>
            <li>💕 Une question ? coucou@doudoumimi.fr</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
