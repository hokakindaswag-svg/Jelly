import Link from "next/link";
import Plushie from "./Plushie";
import Sparkles from "./ui/Sparkles";
import { getProduct } from "@/lib/products";

const CAST = ["mimi-le-fantome", "pompom-la-citrouille", "batou-la-chauve-souris", "sorcia-la-petite-sorciere"];

/**
 * Hero : la scène d'automne. En 3 secondes on doit comprendre
 * c'est quoi, combien ça coûte, et pourquoi acheter maintenant.
 */
export default function Hero() {
  const cast = CAST.map(getProduct).filter(Boolean);

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

        {/* Scène : plusieurs doudous Halloween ensemble */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-square">
            <div className="absolute inset-6 rounded-full bg-gradient-to-br from-pumpkin-300/40 to-bubble-200/50 blur-2xl" />
            {cast.map((p, i) => {
              const layout = [
                "left-[6%] top-[8%] w-[46%] animate-float",
                "right-[4%] top-[18%] w-[42%] animate-wiggle",
                "left-[18%] bottom-[4%] w-[40%] animate-wiggle",
                "right-[12%] bottom-[8%] w-[38%] animate-float",
              ][i];
              return (
                <Link
                  key={p!.handle}
                  href={`/produit/${p!.handle}`}
                  className={`absolute ${layout} drop-shadow-xl transition-transform duration-300 hover:scale-110`}
                  style={{ animationDelay: `${i * 0.4}s` }}
                  aria-label={p!.name}
                >
                  <Plushie art={p!.art} palette={p!.palette} label={p!.name} className="h-full w-full" />
                </Link>
              );
            })}
            <span className="deco absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl opacity-60" aria-hidden="true">
              ✨
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
