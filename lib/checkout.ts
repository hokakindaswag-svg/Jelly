/**
 * Livraison Doudoumimi.
 *
 * Elle est offerte sur toutes les commandes, sans seuil : il n'y a donc rien
 * à calculer. La fonction existe pour rester le point d'entrée si un jour un
 * tarif ou une zone hors Europe s'ajoute.
 *
 * PORTAGE SHOPIFY
 * ---------------
 * Le panier (`components/CartProvider`) porte des `handle` + quantités. Pour
 * brancher Shopify, mapper chaque handle sur son `variantId` et créer un
 * panier via l'API Storefront (`cartCreate`), puis rediriger vers
 * `cart.checkoutUrl` depuis `submitOrder` dans `CheckoutFlow`.
 */

export const SHIPPING_FEE = 0;

export function shippingFor(): number {
  return SHIPPING_FEE;
}
