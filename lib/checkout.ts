/**
 * Parcours d'achat Doudoumimi — ACHETER MAINTENANT uniquement.
 *
 *   PRODUIT → ACHETER MAINTENANT → CHECKOUT → PAIEMENT → CONFIRMATION
 *
 * Il n'y a volontairement aucun panier, aucune page panier, aucun mini-panier.
 * Chaque bouton d'achat construit une URL de checkout direct qui contient le
 * produit et la quantité.
 *
 * PORTAGE SHOPIFY
 * ---------------
 * Deux options, sans jamais introduire de panier visible :
 *
 *  1. Permalien de checkout (le plus simple) :
 *       https://{boutique}.myshopify.com/cart/{variantId}:{qty}
 *     éventuellement suffixé par `,{mysteryVariantId}:1` pour l'upsell
 *     Doudou Mystère. Shopify redirige directement vers le paiement.
 *
 *  2. Storefront API : `cartCreate` côté serveur puis redirection immédiate
 *     vers `cart.checkoutUrl`. Le panier Shopify n'est alors qu'un objet
 *     technique, jamais exposé à l'utilisateur.
 *
 * Il suffit de remplacer le corps de `buildCheckoutUrl` — les composants
 * (BuyNowButton, ProductCard, StickyBuyBar…) n'ont pas besoin de changer.
 */

export type CheckoutIntent = {
  handle: string;
  quantity?: number;
  /** Ajoute un Doudou Mystère à 2 € au passage en caisse. */
  mystery?: boolean;
};

export function buildCheckoutUrl({ handle, quantity = 1, mystery }: CheckoutIntent): string {
  const params = new URLSearchParams({ p: handle });
  if (quantity > 1) params.set("q", String(quantity));
  if (mystery) params.set("m", "1");
  return `/checkout?${params.toString()}`;
}

export const SHIPPING_FEE = 290; // 2,90 €
export const FREE_SHIPPING_THRESHOLD = 3000; // 30,00 €

export function shippingFor(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
}
