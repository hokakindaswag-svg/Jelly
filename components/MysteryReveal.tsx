"use client";

/**
 * Mini gamification du Doudou Mystère : les silhouettes des doudous possibles
 * sont floutées. Le bouton « tire au sort » fait défiler la sélection puis
 * s'arrête sur une silhouette — sans jamais révéler le modèle. L'objectif est
 * la curiosité, pas la promesse d'un produit précis.
 */

import { useEffect, useRef, useState } from "react";
import Plushie from "./Plushie";
import type { Product } from "@/lib/products";

export default function MysteryReveal({ candidates }: { candidates: Product[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [spinning, setSpinning] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    [],
  );

  function spin() {
    if (spinning) return;
    setSpinning(true);
    timers.current.forEach(clearTimeout);
    timers.current = [];

    const steps = 14;
    for (let i = 0; i < steps; i++) {
      timers.current.push(
        setTimeout(() => {
          setActive(Math.floor(Math.random() * candidates.length));
          if (i === steps - 1) setSpinning(false);
        }, 70 * i + i * i * 3),
      );
    }
  }

  return (
    <div className="rounded-[var(--radius-cute)] bg-white/70 p-4 backdrop-blur sm:p-5">
      <p className="text-center font-[family-name:var(--font-display)] text-lg font-extrabold text-cocoa-800">
        Quel doudou vas-tu recevoir ? 👀
      </p>

      <ul className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
        {candidates.map((p, i) => (
          <li
            key={p.handle}
            className={`relative aspect-square rounded-2xl bg-gradient-to-br from-lilac-100 to-bubble-100 p-1.5 transition-all duration-200 ${
              active === i ? "scale-110 ring-2 ring-lilac-400" : "opacity-80"
            }`}
          >
            <Plushie
              art={p.art}
              palette={{ body: "#cbb4ff", accent: "#b191ff", blush: "#b191ff" }}
              className="h-full w-full opacity-70 blur-[3px]"
            />
            <span className="absolute inset-0 grid place-items-center text-xl" aria-hidden="true">
              ❓
            </span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={spin}
        className="mx-auto mt-4 block rounded-full bg-white px-5 py-2.5 text-sm font-extrabold text-lilac-500 shadow-sm ring-1 ring-lilac-200 transition hover:-translate-y-0.5 active:scale-95"
      >
        {spinning ? "🔮 Ça tourne…" : "🔮 Tirer au sort pour voir"}
      </button>
      <p className="mt-2 text-center text-xs text-cocoa-600/70">
        Simulation pour le fun — le vrai doudou est choisi au moment de la préparation du colis.
      </p>
    </div>
  );
}
