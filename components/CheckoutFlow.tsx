"use client";

/**
 * CheckoutFlow — paiement direct, sans panier.
 *
 * L'utilisateur arrive ici depuis un bouton « Acheter maintenant » avec un
 * produit et une quantité déjà déterminés. Il n'y a donc rien à « valider » :
 * coordonnées → livraison → paiement, et c'est fini.
 *
 * Le seul écart au produit choisi est l'upsell Doudou Mystère à 2 €, proposé
 * dans le récapitulatif. C'est une case à cocher qui modifie la commande en
 * cours, pas un panier.
 *
 * BRANCHEMENT PAIEMENT
 * --------------------
 * `submitOrder` est le point d'intégration : remplacer la simulation par
 *   - une redirection vers le checkout Shopify
 *     (`/cart/{variantId}:{qty}` ou `cart.checkoutUrl`), ou
 *   - la création d'un PaymentIntent Stripe côté serveur.
 * Aucun autre composant n'a besoin de changer.
 */

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import ProductVisual from "./ProductVisual";
import { formatPrice, mysteryProduct, type Product } from "@/lib/products";
import { shippingFor, FREE_SHIPPING_THRESHOLD } from "@/lib/checkout";

type Props = {
  product: Product;
  quantity: number;
  withMystery: boolean;
};

const STEPS = ["Coordonnées", "Livraison", "Paiement"] as const;

export default function CheckoutFlow({ product, quantity, withMystery }: Props) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [mystery, setMystery] = useState(withMystery);
  const [submitting, setSubmitting] = useState(false);

  const isMysteryOrder = product.handle === mysteryProduct.handle;

  const totals = useMemo(() => {
    const items = product.price * quantity + (mystery && !isMysteryOrder ? mysteryProduct.price : 0);
    const shipping = shippingFor(items);
    return { items, shipping, total: items + shipping };
  }, [product.price, quantity, mystery, isMysteryOrder]);

  function next(e: React.FormEvent) {
    e.preventDefault();
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  }

  function submitOrder(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const params = new URLSearchParams({ p: product.handle, q: String(quantity) });
    if (mystery && !isMysteryOrder) params.set("m", "1");
    router.push(`/checkout/confirmation?${params.toString()}`);
  }

  const field =
    "w-full rounded-2xl bg-white px-4 py-3 text-sm text-cocoa-800 outline-none ring-1 ring-cocoa-800/10 placeholder:text-cocoa-400 focus:ring-2 focus:ring-bubble-300";
  const labelCls = "text-xs font-extrabold uppercase tracking-wide text-cocoa-600/80";

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
      {/* ------------------------------ Formulaire ----------------------------- */}
      <div>
        <ol className="mb-6 flex items-center gap-2">
          {STEPS.map((label, i) => (
            <li key={label} className="flex flex-1 items-center gap-2">
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-extrabold transition ${
                  i <= step ? "bg-pumpkin-500 text-white" : "bg-white text-cocoa-400 ring-1 ring-cocoa-800/10"
                }`}
              >
                {i + 1}
              </span>
              <span className={`hidden text-xs font-bold sm:block ${i <= step ? "text-cocoa-800" : "text-cocoa-400"}`}>
                {label}
              </span>
              {i < STEPS.length - 1 && <span className="h-px flex-1 bg-cocoa-800/10" />}
            </li>
          ))}
        </ol>

        {step === 0 && (
          <form onSubmit={next} className="flex flex-col gap-4">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-cocoa-800">
              📮 Où on t&apos;envoie ton doudou ?
            </h2>
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
            <button
              type="submit"
              className="mt-2 rounded-full bg-cocoa-800 px-6 py-4 font-[family-name:var(--font-display)] text-sm font-extrabold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5 active:scale-95"
            >
              Continuer →
            </button>
          </form>
        )}

        {step === 1 && (
          <form onSubmit={next} className="flex flex-col gap-4">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-cocoa-800">
              🚚 Adresse de livraison
            </h2>
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
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(0)}
                className="rounded-full bg-white px-6 py-4 text-sm font-extrabold text-cocoa-800 ring-1 ring-cocoa-800/10"
              >
                Retour
              </button>
              <button
                type="submit"
                className="flex-1 rounded-full bg-cocoa-800 px-6 py-4 font-[family-name:var(--font-display)] text-sm font-extrabold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5 active:scale-95"
              >
                Aller au paiement →
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={submitOrder} className="flex flex-col gap-4">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-cocoa-800">
              🔒 Paiement sécurisé
            </h2>
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

            <p className="rounded-2xl bg-white px-4 py-3 text-xs text-cocoa-600/75">
              🔐 Connexion chiffrée. Tes informations bancaires ne sont jamais stockées par Doudoumimi.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded-full bg-white px-6 py-4 text-sm font-extrabold text-cocoa-800 ring-1 ring-cocoa-800/10"
              >
                Retour
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 rounded-full bg-pumpkin-500 px-6 py-4 font-[family-name:var(--font-display)] text-sm font-extrabold uppercase tracking-wide text-white shadow-cute transition-transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-60"
              >
                {submitting ? "Paiement en cours…" : `Payer ${formatPrice(totals.total)} 🧸`}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* ---------------------------- Récapitulatif ---------------------------- */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-[var(--radius-cute)] bg-white p-5 shadow-[0_2px_18px_-10px_rgba(111,76,56,0.4)]">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-cocoa-800">
            Ta commande
          </h2>

          <div className="mt-4 flex items-center gap-3">
            <div className="h-16 w-16 shrink-0 rounded-2xl bg-gradient-to-br from-peach-50 to-bubble-50 p-1.5">
              <ProductVisual product={product} label={null} sizes="80px" className="h-full w-full" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-extrabold text-cocoa-800">{product.name}</p>
              <p className="text-xs text-cocoa-600/70">Quantité : {quantity}</p>
            </div>
            <span className="text-sm font-extrabold text-cocoa-800">
              {formatPrice(product.price * quantity)}
            </span>
          </div>

          {mystery && !isMysteryOrder && (
            <div className="mt-3 flex items-center gap-3 border-t border-cocoa-800/10 pt-3">
              <div className="h-12 w-12 shrink-0 rounded-2xl bg-lilac-100 p-1.5 text-center text-xl leading-9">
                🎁
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-extrabold text-cocoa-800">Doudou Mystère</p>
                <p className="text-xs text-cocoa-600/70">Surprise Halloween</p>
              </div>
              <span className="text-sm font-extrabold text-cocoa-800">
                {formatPrice(mysteryProduct.price)}
              </span>
            </div>
          )}

          <dl className="mt-4 space-y-1.5 border-t border-cocoa-800/10 pt-4 text-sm">
            <div className="flex justify-between text-cocoa-600/85">
              <dt>Sous-total</dt>
              <dd>{formatPrice(totals.items)}</dd>
            </div>
            <div className="flex justify-between text-cocoa-600/85">
              <dt>Livraison suivie</dt>
              <dd>{totals.shipping === 0 ? "Offerte 🎉" : formatPrice(totals.shipping)}</dd>
            </div>
            <div className="flex justify-between pt-2 font-[family-name:var(--font-display)] text-lg font-extrabold text-cocoa-800">
              <dt>Total</dt>
              <dd className="text-pumpkin-600">{formatPrice(totals.total)}</dd>
            </div>
          </dl>

          {totals.shipping > 0 && (
            <p className="mt-2 text-xs text-cocoa-600/70">
              Livraison offerte dès {formatPrice(FREE_SHIPPING_THRESHOLD)} d&apos;achat.
            </p>
          )}
        </div>

        {/* Upsell Doudou Mystère — modifie la commande en cours, sans panier */}
        {!isMysteryOrder && (
          <label
            className={`mt-4 flex cursor-pointer items-start gap-3 rounded-[var(--radius-cute)] p-4 transition ${
              mystery ? "bg-lilac-200 ring-2 ring-lilac-400" : "bg-lilac-100 hover:bg-lilac-200"
            }`}
          >
            <input
              type="checkbox"
              checked={mystery}
              onChange={(e) => setMystery(e.target.checked)}
              className="mt-1 h-5 w-5 shrink-0 accent-[#9670f2]"
            />
            <span>
              <span className="block font-[family-name:var(--font-display)] text-base font-extrabold text-cocoa-800">
                🎃 Tu veux tenter le Doudou Mystère pour +2 € ?
              </span>
              <span className="mt-0.5 block text-xs text-cocoa-800/75">
                On glisse un doudou surprise Halloween dans ton colis. Tu ne sais pas lequel. 👀
              </span>
            </span>
          </label>
        )}

        <ul className="mt-4 space-y-1.5 px-1 text-xs text-cocoa-600/75">
          <li>🔒 Paiement chiffré</li>
          <li>📦 Expédition sous 24-48 h ouvrées, avec suivi</li>
          <li>💌 Support : on répond sous 24 h</li>
        </ul>
      </aside>
    </div>
  );
}
