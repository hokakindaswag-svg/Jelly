import Image from "next/image";
import Link from "next/link";
import HalloweenPattern from "./ui/HalloweenPattern";
import { Bat, Ghost, Pumpkin, SpiderWeb } from "./ui/HalloweenDecor";
import { assetUrl } from "@/lib/assets";

/**
 * Hero pleine largeur.
 *
 * Le trio de doudous détourés qui flottait ici partait du bon principe —
 * montrer le produit d'emblée — mais trois photos posées sur rien, sans sol
 * ni cadre, se lisaient comme des vignettes en lévitation, et la grille de
 * produits juste dessous les montrait déjà. Le hero ne garde donc que
 * l'annonce, et c'est le décor qui porte la saison : le motif Halloween en
 * fond, quelques repères posés autour du texte.
 */
export default function Hero() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-cream">
      {/* Photo d'ambiance, très atténuée : elle pose la matière (peluche,
          carton d'ouverture) sans concurrencer le texte. */}
      <div className="pointer-events-none absolute inset-0 -z-30" aria-hidden="true">
        <Image
          src={assetUrl("/brand/hero-bg.webp")}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-[0.10]"
        />
      </div>

      {/* Le motif Halloween par-dessus la photo, puis un voile crème qui
          l'éclaircit vers le centre : le décor se voit sur les bords, le
          titre reste posé sur du calme. */}
      <div className="pointer-events-none absolute inset-0 -z-20" aria-hidden="true">
        <HalloweenPattern className="opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/55 via-cream/30 to-cream" />
        <div className="absolute left-1/2 top-1/2 h-[28rem] w-[min(96%,54rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream/90 blur-3xl" />
      </div>

      {/* Repères posés autour du texte, jamais dessus. */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <SpiderWeb className="left-0 top-0 h-28 w-28 text-cocoa-600/20 sm:h-40 sm:w-40" />
        <SpiderWeb corner="right" className="right-0 top-0 h-24 w-24 text-cocoa-600/15 sm:h-32 sm:w-32" />
        <Bat className="left-[6%] top-[24%] h-7 w-10 animate-float text-lilac-400/70 sm:h-9 sm:w-14" />
        <Bat className="right-[10%] top-[16%] h-5 w-8 animate-float text-lilac-400/50 [animation-delay:1.2s] sm:h-7 sm:w-11" />
        <Ghost className="right-[7%] top-[46%] h-12 w-10 animate-float opacity-50 [animation-delay:0.6s] sm:h-16 sm:w-12" />
        <Pumpkin className="bottom-[8%] left-[9%] h-10 w-10 animate-float opacity-70 [animation-delay:1.8s] sm:h-14 sm:w-14" />
        <Pumpkin className="bottom-[14%] right-[13%] hidden h-8 w-8 animate-float opacity-50 [animation-delay:2.4s] sm:block" />
      </div>

      <div className="mx-auto flex min-h-[64svh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:py-20">
        <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-pumpkin-600 sm:text-xs">
          🎃 Spooky season · édition limitée
        </span>

        <h1 className="mt-4 font-[family-name:var(--font-display)] text-[2.7rem] font-extrabold leading-[1.02] text-cocoa-800 sm:text-6xl lg:text-7xl">
          Des doudous
          <span className="block text-bubble-500">trop mignons</span>
        </h1>

        <p className="mt-4 max-w-md text-base text-cocoa-800/85 sm:text-lg">
          Une collection Halloween à croquer, à adopter avant qu&apos;elle ne
          disparaisse.
        </p>

        <p className="mt-6 font-[family-name:var(--font-display)] text-2xl font-extrabold text-cocoa-800 sm:text-3xl">
          Tous les doudous : <span className="text-pumpkin-600">9,99 €</span>
        </p>
        <p className="mt-1 text-sm font-bold text-cocoa-600/70">Livraison offerte</p>

        <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center">
          <Link
            href="/doudous"
            className="inline-flex items-center justify-center rounded-full bg-pumpkin-500 px-6 py-4 font-[family-name:var(--font-display)] text-base font-extrabold uppercase tracking-wide text-white shadow-cute transition-transform hover:-translate-y-0.5 hover:bg-pumpkin-600 active:scale-95 sm:whitespace-nowrap sm:px-8"
          >
            Voir les doudous
          </Link>
          <Link
            href="/collections/halloween"
            className="inline-flex items-center justify-center rounded-full px-6 py-4 font-[family-name:var(--font-display)] text-base font-extrabold uppercase tracking-wide text-cocoa-800 ring-1 ring-cocoa-800/15 transition hover:bg-cocoa-800/5 sm:whitespace-nowrap sm:px-8"
          >
            Collection Halloween
          </Link>
        </div>
      </div>
    </section>
  );
}
