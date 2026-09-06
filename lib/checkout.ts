/**
 * Passage en caisse Doudoumimi.
 *
 * La livraison est offerte sur toutes les commandes, sans seuil : il n'y a
 * rien à calculer. La fonction existe pour rester le point d'entrée si un
 * tarif ou une zone hors Europe s'ajoute un jour.
 *
 * LIEN DE PAIEMENT
 * ----------------
 * Valider le panier doit envoyer directement sur le paiement. Renseigner
 * `NEXT_PUBLIC_PAYMENT_URL` suffit : dès qu'elle existe, le bouton du panier
 * pointe dessus au lieu du formulaire interne, sans autre changement de code.
 *
 *   NEXT_PUBLIC_PAYMENT_URL=https://buy.stripe.com/xxxxxxxx
 *   NEXT_PUBLIC_PAYMENT_URL=https://doudoumimi.myshopify.com/cart
 *
 * Le nombre d'articles et le montant sont ajoutés en paramètres (`quantity`,
 * `amount` en centimes) : Stripe comme Shopify les ignorent s'ils ne les
 * gèrent pas, donc c'est sans risque.
 *
 * Tant que la variable est vide, on retombe sur `/checkout`, qui reste une
 * simulation — aucun paiement réel n'y est encaissé.
 */

export const SHIPPING_FEE = 0;

export function shippingFor(): number {
  return SHIPPING_FEE;
}

const PAYMENT_URL = process.env.NEXT_PUBLIC_PAYMENT_URL ?? "";

/** Vrai quand un vrai prestataire de paiement est branché. */
export const hasPaymentLink = PAYMENT_URL.length > 0;

/**
 * Où envoyer le client quand il valide son panier : le lien de paiement
 * s'il est configuré, sinon le formulaire interne.
 */
export function checkoutHref(quantity: number, amount: number): string {
  if (!hasPaymentLink) return "/checkout";
  const url = new URL(PAYMENT_URL);
  url.searchParams.set("quantity", String(quantity));
  url.searchParams.set("amount", String(amount));
  return url.toString();
}
