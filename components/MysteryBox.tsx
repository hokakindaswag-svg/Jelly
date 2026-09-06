import AddToCartButton from "./AddToCartButton";
import MysteryReveal from "./MysteryReveal";
import ProductVisual from "./ProductVisual";
import Sparkles from "./ui/Sparkles";
import { getByCollection, mysteryProduct } from "@/lib/products";

/**
 * Section Doudou Mystère — la mécanique marketing centrale du site.
 * Il s'ajoute au panier comme un doudou normal, à 2 €.
 */
export default function MysteryBox() {
  const candidates = getByCollection("halloween").slice(0, 6);

  return (
    <section
      id="doudou-mystere"
      className="relative overflow-hidden bg-gradient-to-br from-lilac-200 via-bubble-100 to-peach-100 py-14 sm:py-20"
    >
      <Sparkles />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2">
        {/* La boîte mystère */}
        <div className="order-2 lg:order-1">
          <div className="relative mx-auto aspect-square w-full max-w-sm">
            <div className="absolute inset-6 rounded-full bg-white/50 blur-2xl" />
            <ProductVisual
              product={mysteryProduct}
              label="Boîte Doudou Mystère Doudoumimi"
              sizes="(max-width: 1024px) 80vw, 384px"
              priority
              className="h-full w-full animate-float"
              imageClassName="drop-shadow-[0_20px_30px_rgba(111,76,56,0.28)]"
            />
            {/* Pastille prix cousue sur le visuel */}
            <span className="absolute bottom-3 right-3 flex h-20 w-20 rotate-[-8deg] items-center justify-center rounded-full bg-white text-center font-[family-name:var(--font-display)] text-2xl font-extrabold text-pumpkin-600 shadow-cute ring-4 ring-pumpkin-300/50 sm:h-24 sm:w-24 sm:text-3xl">
              2&nbsp;€
            </span>
          </div>
        </div>

        {/* Le pitch */}
        <div className="order-1 text-center lg:order-2 lg:text-left">
          <span className="inline-flex items-center rounded-full bg-white/85 px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-lilac-500 shadow-sm">
            🎁 L&apos;offre qu&apos;on ne peut pas refuser
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-tight text-cocoa-800 sm:text-5xl">
            Ton Doudou Mystère
          </h2>
          <p className="mt-3 text-base text-cocoa-800/80 sm:text-lg">
            Pour seulement{" "}
            <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-lilac-500">
              2 €
            </span>
            , laisse-nous choisir ton petit compagnon Halloween.
          </p>
          <p className="mt-2 text-base font-bold text-cocoa-800/70">
            Tu ne sais pas lequel tu vas recevoir… 👻
          </p>

          <ul className="mx-auto mt-5 flex max-w-md flex-col gap-2 text-left text-sm text-cocoa-800/80 lg:mx-0">
            <li className="flex gap-2">🎃 <span>1 doudou surprise de la collection Halloween</span></li>
            <li className="flex gap-2">✨ <span>Aucun doublon si tu en prends plusieurs</span></li>
            <li className="flex gap-2">📦 <span>Expédié avec ta commande, sans frais en plus</span></li>
          </ul>

          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
            <AddToCartButton handle={mysteryProduct.handle} variant="mystery" size="lg">
              Je tente ma chance 🎃
            </AddToCartButton>
            <span className="text-sm font-semibold text-cocoa-800/70">
              Livraison offerte 🚚
            </span>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-10 max-w-4xl px-4">
        <MysteryReveal candidates={candidates} />
      </div>
    </section>
  );
}
