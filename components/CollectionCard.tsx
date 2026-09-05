import Link from "next/link";
import Plushie from "./Plushie";
import type { Collection } from "@/lib/site";

export default function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <Link
      href={`/collections/${collection.handle}`}
      className="group relative flex flex-col overflow-hidden rounded-[var(--radius-cute)] p-4 shadow-[0_2px_14px_-8px_rgba(111,76,56,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-cute"
      style={{
        backgroundImage: `linear-gradient(160deg, ${collection.colors.from}, ${collection.colors.to})`,
      }}
    >
      <span className="text-xs font-extrabold uppercase tracking-widest text-cocoa-800/60">
        {collection.subtitle}
      </span>
      <h3 className="mt-1 font-[family-name:var(--font-display)] text-xl font-extrabold text-cocoa-800">
        {collection.emoji} {collection.title}
      </h3>
      <p className="mt-1 line-clamp-2 text-sm text-cocoa-800/70">{collection.blurb}</p>

      <div className="mt-3 flex items-end justify-between gap-2">
        <span className="rounded-full bg-white/85 px-3 py-1.5 text-xs font-extrabold text-cocoa-800 transition group-hover:bg-white">
          Découvrir →
        </span>
        <Plushie
          art={collection.art}
          palette={{ body: "#fffdfb", accent: "#ffc7dc", blush: "#ff7fae" }}
          className="h-20 w-20 shrink-0 drop-shadow-md transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
        />
      </div>
    </Link>
  );
}
