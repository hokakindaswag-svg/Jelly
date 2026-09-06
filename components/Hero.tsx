import Image from "next/image";
import Link from "next/link";
import Sparkles from "./ui/Sparkles";
import { assetUrl } from "@/lib/assets";
import { getProduct } from "@/lib/products";

const HERO_PRODUCT = "boubou-lourson";

/**
 * Hero : la scène d'automne. En 3 secondes on doit comprendre
 * c'est quoi, combien ça coûte, et pourquoi acheter maintenant.
 */
export default function Hero() {
  const hero = getProduct(HERO_PRODUCT);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-peach-100 via-bubble-50 to-cream">
      <Sparkles />
      {/* feuilles d'automne décoratives */}
      <div className="deco absolute -left-10 top-10 text-6xl opacity-30 animate-wiggle" aria-hidden="true">🍂</div>
      <div className="deco absolute -right-4 bottom-24 text-5xl opacity-30 animate-float" aria-hidden="true">🍁</div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:py-14 lg:grid-cols-2 lg:gap-6 lg:py-20">
        <div className="animate-pop-in text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-pumpkin-600 shadow-sm backdrop-blur">
            🎃 Spooky season · édition limitée
          </span>

          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.05] text-cocoa-800 sm:text-5xl lg:text-6xl">
            Les doudous d&apos;Halloween
            <span className="block text-bubble-500">sont arrivés 👻</span>
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-base text-cocoa-600/90 sm:text-lg lg:mx-0">
            Des petits monstres beaucoup trop mignons à adopter avant qu&apos;ils
            disparaissent.
          </p>

          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-cocoa-800 px-5 py-2.5 font-[family-name:var(--font-display)] text-lg font-extrabold text-white shadow-cute sm:text-xl">
            🧸 Tous les doudous : 9,99 €
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/doudous"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-pumpkin-500 px-8 py-4 font-[family-name:var(--font-display)] text-base font-extrabold uppercase tracking-wide text-white shadow-cute transition-transform hover:-translate-y-0.5 hover:bg-pumpkin-600 active:scale-95"
            >
              Adopter mon doudou
            </Link>
            <Link
              href="/collections/halloween"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-white px-8 py-4 font-[family-name:var(--font-display)] text-base font-extrabold uppercase tracking-wide text-cocoa-800 shadow-sm ring-2 ring-cocoa-800/10 transition-transform hover:-translate-y-0.5 hover:ring-bubble-300 active:scale-95"
            >
              🎃 Découvrir Halloween
            </Link>
          </div>

          <p className="mt-4 text-sm font-semibold text-cocoa-600/75">
            👻 Ou tente le <Link href="/doudou-mystere" className="text-lilac-500 underline decoration-wavy underline-offset-4">Doudou Mystère à 2 €</Link>
          </p>
        </div>

        {/* Photo vedette : le doudou best-seller, tel quel */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] animate-pop-in">
            <div className="absolute inset-4 rounded-[2.5rem] bg-gradient-to-br from-pumpkin-300/40 to-bubble-200/50 blur-2xl" />
            {hero?.image ? (
              <Link
                href={`/produit/${hero.handle}`}
                aria-label={hero.name}
                className="group relative block h-full w-full overflow-hidden rounded-[var(--radius-cute)] shadow-cute ring-4 ring-white transition-transform duration-300 hover:-translate-y-1"
              >
                <Image
                  src={assetUrl(hero.image)}
                  alt={hero.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 font-[family-name:var(--font-display)] text-sm font-extrabold text-cocoa-800 shadow-cute backdrop-blur">
                  🧸 {hero.name} · 9,99 €
                </span>
              </Link>
            ) : null}
            <span className="deco absolute -right-2 -top-2 text-4xl opacity-80 animate-wiggle" aria-hidden="true">
              ✨
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
