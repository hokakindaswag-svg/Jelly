/**
 * Bannière livraison offerte.
 *
 * L'information était noyée dans une pastille qui ressemblait à un bouton :
 * on cliquait dessus sans que rien ne se passe. Elle prend ici toute la
 * largeur, en gros, et ne ressemble plus à une action — c'est une promesse,
 * pas un clic.
 */
export default function ShippingBanner() {
  return (
    <aside className="border-y border-cocoa-800/10 bg-bubble-50 py-8 sm:py-10">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-2 px-4 text-center">
        <p className="font-[family-name:var(--font-display)] text-3xl font-extrabold leading-tight text-cocoa-800 sm:text-4xl">
          🚚 Livraison offerte
        </p>
        <p className="text-base text-cocoa-600/80 sm:text-lg">
          Sur toutes les commandes, sans minimum d&apos;achat. Colis suivi, expédié
          depuis l&apos;Europe.
        </p>
      </div>
    </aside>
  );
}
