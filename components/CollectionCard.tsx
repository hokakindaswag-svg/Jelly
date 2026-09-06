import Link from "next/link";
import type { Collection } from "@/lib/site";

/**
 * Carte d'univers.
 *
 * Sur fond blanc, un aplat dégradé plein cadre par carte donnait cinq blocs
 * de couleur qui se disputaient l'attention. La couleur ne sert donc plus que
 * de pastille : c'est le texte qui porte la carte.
 */
export default function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <Link
      href={`/collections/${collection.handle}`}
      className="group flex items-start gap-4 rounded-3xl bg-white p-5 ring-1 ring-cocoa-800/10 transition duration-300 hover:ring-cocoa-800/25"
    >
      <span
        className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-xl"
        style={{ backgroundImage: `linear-gradient(150deg, ${collection.colors.from}, ${collection.colors.to})` }}
        aria-hidden="true"
      >
        {collection.emoji}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[11px] font-extrabold uppercase tracking-widest text-cocoa-600/60">
          {collection.subtitle}
        </span>
        <span className="mt-0.5 block font-[family-name:var(--font-display)] text-lg font-extrabold text-cocoa-800">
          {collection.title}
        </span>
        <span className="mt-1 block line-clamp-2 text-sm text-cocoa-600/75">{collection.blurb}</span>
        <span className="mt-2 inline-block text-sm font-extrabold text-pumpkin-600">
          Découvrir <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </span>
      </span>
    </Link>
  );
}
