"use client";

/**
 * Galerie produit : plusieurs mises en scène du même doudou (fond, cadrage,
 * décor saisonnier). <ProductVisual> affiche la vraie photo quand le produit
 * en a une, et l'illustration SVG sinon.
 */

import { useState } from "react";
import ProductVisual from "./ProductVisual";
import type { Product } from "@/lib/products";

const VIEWS = [
  { key: "studio", label: "Studio", bg: "from-peach-50 to-bubble-50", zoom: "scale-100", deco: [] as string[] },
  { key: "halloween", label: "Décor 🎃", bg: "from-pumpkin-300/40 to-lilac-100", zoom: "scale-95", deco: ["🎃", "🍂", "🕸️"] },
  { key: "zoom", label: "Détail", bg: "from-bubble-100 to-cream", zoom: "scale-150", deco: [] },
  { key: "cosy", label: "Chambre 🌙", bg: "from-lilac-100 to-bubble-50", zoom: "scale-90", deco: ["🌙", "⭐", "🎀"] },
];

export default function ProductGallery({ product }: { product: Product }) {
  const [index, setIndex] = useState(0);
  const view = VIEWS[index];

  return (
    <div className="flex flex-col gap-3">
      <div
        className={`relative aspect-square overflow-hidden rounded-[var(--radius-cute)] bg-gradient-to-br ${view.bg}`}
      >
        {view.deco.map((emoji, i) => (
          <span
            key={emoji}
            className="deco absolute animate-float text-4xl opacity-70 sm:text-5xl"
            style={{
              left: `${8 + i * 34}%`,
              top: i % 2 === 0 ? "8%" : "72%",
              animationDelay: `${i * 0.5}s`,
            }}
            aria-hidden="true"
          >
            {emoji}
          </span>
        ))}
        <ProductVisual
          product={product}
          priority
          sizes="(max-width: 1024px) 92vw, 520px"
          className={`h-full w-full p-8 transition-transform duration-500 ${view.zoom}`}
        />
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {VIEWS.map((v, i) => (
          <button
            key={v.key}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Vue ${v.label}`}
            aria-pressed={i === index}
            className={`relative aspect-square w-20 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br ${v.bg} transition ${
              i === index ? "ring-2 ring-bubble-400" : "opacity-70 hover:opacity-100"
            }`}
          >
            <ProductVisual product={product} label={null} sizes="80px" className="h-full w-full p-2" />
          </button>
        ))}
      </div>
    </div>
  );
}
