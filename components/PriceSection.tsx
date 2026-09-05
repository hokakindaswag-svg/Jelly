import Link from "next/link";
import Plushie from "./Plushie";
import { getProduct } from "@/lib/products";

const SHOWCASE = ["guimauve-le-lapin", "citrouillette", "nuagette", "etoilette", "kaki-la-grenouille"];

/** Le prix unique est un pilier de la marque : il a sa propre section. */
export default function PriceSection() {
  const showcase = SHOWCASE.map(getProduct).filter(Boolean);

  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-[1.1fr_1fr]">
        <div className="text-center lg:text-left">
          <span className="text-sm font-extrabold uppercase tracking-widest text-bubble-500">
            Prix unique
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-tight text-cocoa-800 sm:text-5xl">
            🧸 Tous les doudous
          </h2>
          <p className="mt-1 font-[family-name:var(--font-display)] text-6xl font-extrabold text-pumpkin-600 sm:text-7xl">
            9,99 €
          </p>
          <p className="mx-auto mt-4 max-w-md text-base text-cocoa-600/85 sm:text-lg lg:mx-0">
            Pas besoin de réfléchir pendant des heures. Tu choisis ton nouveau
            doudou préféré pour seulement 9,99 €.
          </p>
          <Link
            href="/doudous"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-cocoa-800 px-7 py-4 font-[family-name:var(--font-display)] text-base font-extrabold uppercase tracking-wide text-white shadow-cute transition-transform hover:-translate-y-0.5 hover:bg-cocoa-600 active:scale-95"
          >
            Voir tous les doudous →
          </Link>
          <p className="mt-3 text-sm font-semibold text-cocoa-600/70">
            Petits prix, gros câlins. 💕
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {showcase.map((p, i) => (
            <Link
              key={p!.handle}
              href={`/produit/${p!.handle}`}
              className={`group relative aspect-square rounded-[var(--radius-cute)] bg-gradient-to-br from-peach-50 to-bubble-50 p-3 transition-transform hover:-translate-y-1 ${
                i === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <Plushie
                art={p!.art}
                palette={p!.palette}
                label={p!.name}
                className="h-full w-full transition-transform duration-500 group-hover:scale-110"
              />
              <span className="absolute bottom-2 right-2 rounded-full bg-white px-2 py-0.5 text-[10px] font-extrabold text-pumpkin-600 shadow-sm sm:text-xs">
                9,99 €
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
