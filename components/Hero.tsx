import Image from "next/image";
import Link from "next/link";
import ProductVisual from "./ProductVisual";
import { Bat, Ghost, Pumpkin, SpiderWeb, Star } from "./ui/HalloweenDecor";
import { assetUrl } from "@/lib/assets";
import { featuredProducts, getProduct } from "@/lib/products";

/**
 * Le trio de tête : l'ourson cocooning, la lapine, le petit dragon.
 * Uniquement des photos détourées — une photo d'ambiance rectangulaire
 * jurerait au milieu des silhouettes posées sur le décor.
 */
const CAST = ["vanille-lourson-cocooning", "guimauve-le-lapin", "dino-le-petit-dragon"];

/**
 * Hero pleine largeur.
 *
 * Les doudous sont détourés et posés directement sur le décor, sans cadre :
 * la scène occupe tout l'écran et ce sont les produits qu'on voit en premier,
 * pas une photo d'ambiance agrandie. Le doudou central est plus grand que les
 * deux autres pour créer une hiérarchie immédiate.
 */
export default function Hero() {
  const cast = CAST.map(getProduct).filter((p) => p !== undefined);
  const [left, center, right] = cast.length === 3 ? cast : featuredProducts.slice(0, 3);

  return (
    <section className="relative isolate w-full overflow-hidden bg-cream">
      {/* Photo d'ambiance en fond, très atténuée : elle pose la matière
          (peluche, carton d'ouverture) sans jamais concurrencer le texte
          ni les doudous détourés posés par-dessus. */}
      <div className="pointer-events-none absolute inset-0 -z-20" aria-hidden="true">
        <Image
          src={assetUrl("/brand/hero-bg.webp")}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-25 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/70 via-cream/40 to-cream" />
      </div>

      {/* Halos colorés : redonnent de la profondeur par-dessus la photo */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-pumpkin-300/25 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-bubble-200/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-lilac-200/30 blur-3xl" />
      </div>

      {/* Décor Halloween cute */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <SpiderWeb className="left-0 top-0 h-28 w-28 text-cocoa-600/25 sm:h-40 sm:w-40" />
        <SpiderWeb corner="right" className="right-0 top-0 h-24 w-24 text-cocoa-600/20 sm:h-32 sm:w-32" />
        <Bat className="left-[14%] top-[10%] h-6 w-10 animate-float text-lilac-400/55 sm:h-8 sm:w-14" />
        <Bat className="right-[20%] top-[16%] h-5 w-8 animate-wiggle text-lilac-400/40" />
        <Ghost className="right-[6%] top-[42%] h-12 w-10 animate-float opacity-60 sm:h-16 sm:w-14" />
        <Pumpkin className="bottom-[10%] left-[4%] h-10 w-10 animate-wiggle opacity-70 sm:h-14 sm:w-14" />
        <Star className="left-[46%] top-[8%] h-5 w-5 animate-wiggle text-pumpkin-300/70" />
        <Star className="right-[38%] bottom-[22%] h-4 w-4 animate-float text-bubble-300/70" />
        <span className="absolute right-[14%] bottom-[6%] animate-float text-3xl opacity-40">🍂</span>
        <span className="absolute left-[9%] top-[34%] animate-wiggle text-2xl opacity-35">🍁</span>
      </div>

      {/* minmax(0,…) : sans ça les pistes se dimensionnent sur le contenu
          (libellés en nowrap) et débordent de l'écran sur mobile. */}
      <div className="mx-auto grid min-h-[86svh] max-w-7xl grid-cols-[minmax(0,1fr)] items-center gap-6 px-4 py-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-4 lg:py-16">
        <div className="min-w-0 text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-[11px] font-extrabold uppercase tracking-widest text-pumpkin-600 shadow-sm backdrop-blur sm:text-xs">
            🎃 Spooky season · édition limitée
          </span>

          <h1 className="mt-4 font-[family-name:var(--font-display)] text-[2.7rem] font-extrabold leading-[1.02] text-cocoa-800 sm:text-6xl lg:text-7xl">
            Des doudous
            <span className="block text-bubble-500">trop mignons 👻</span>
          </h1>

          <p className="mx-auto mt-4 max-w-md text-base text-cocoa-800/85 sm:text-lg lg:mx-0">
            Une collection Halloween à croquer, à adopter avant qu&apos;elle ne disparaisse.
          </p>

          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-cocoa-800 px-6 py-3 font-[family-name:var(--font-display)] text-lg font-extrabold text-white shadow-cute sm:text-xl">
            🧸 Tous les doudous : 9,99 €
          </p>
          <p className="mt-2 text-sm font-extrabold text-bubble-500">🚚 Livraison offerte</p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/doudous"
              className="inline-flex items-center justify-center rounded-full bg-pumpkin-500 px-6 py-4 sm:whitespace-nowrap sm:px-8 font-[family-name:var(--font-display)] text-base font-extrabold uppercase tracking-wide text-white shadow-cute transition-transform hover:-translate-y-0.5 hover:bg-pumpkin-600 active:scale-95"
            >
              Voir les doudous
            </Link>
            <Link
              href="/collections/halloween"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-4 sm:whitespace-nowrap sm:px-8 font-[family-name:var(--font-display)] text-base font-extrabold uppercase tracking-wide text-cocoa-800 shadow-sm ring-2 ring-cocoa-800/10 transition-transform hover:-translate-y-0.5 hover:ring-bubble-300 active:scale-95"
            >
              🎃 Collection Halloween
            </Link>
          </div>
        </div>

        {/* Scène produit : le doudou central domine, les deux autres l'encadrent */}
        <div className="relative flex items-end justify-center gap-1 sm:gap-3 lg:h-[72svh]">
          {[
            { p: left, cls: "w-[27%] translate-y-4 -rotate-6", z: "z-10" },
            { p: center, cls: "w-[38%]", z: "z-20" },
            { p: right, cls: "w-[27%] translate-y-4 rotate-6", z: "z-10" },
          ].map(({ p, cls, z }, i) => (
            <Link
              key={p.handle}
              href={`/produit/${p.handle}`}
              aria-label={p.name}
              // min-w-0 : sans ça, le libellé en `truncate` impose sa largeur
              // au conteneur et fait déborder toute la rangée sur mobile.
              className={`group relative min-w-0 ${z} ${cls} transition-transform duration-300 hover:-translate-y-2 hover:rotate-0`}
            >
              <ProductVisual
                product={p}
                priority={i === 1}
                sizes="(max-width: 640px) 45vw, 380px"
                className="aspect-square w-full animate-float"
                imageClassName="drop-shadow-[0_22px_30px_rgba(111,76,56,0.26)]"
              />
              <span className="mt-1 block truncate rounded-full bg-white/85 px-2 py-1 text-center text-[10px] font-extrabold text-cocoa-800 opacity-0 shadow-sm backdrop-blur transition group-hover:opacity-100 sm:text-xs">
                {p.name} · 9,99 €
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
