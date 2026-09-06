"use client";

/**
 * Bouton d'ajout au panier.
 *
 * Il n'annonce jamais les paliers dégressifs : la boutique communique le prix
 * unitaire, la mécanique de quantité se découvre dans le panier. Le clic ouvre
 * le tiroir, ce qui rend l'offre visible au bon moment sans changer de page.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { useCart } from "./CartProvider";

type Props = {
  handle: string;
  quantity?: number;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "mystery";
  size?: "sm" | "md" | "lg";
  full?: boolean;
  className?: string;
};

const VARIANTS = {
  primary:
    "bg-pumpkin-500 text-white shadow-cute hover:bg-pumpkin-600 focus-visible:outline-pumpkin-600",
  secondary:
    "bg-white text-cocoa-800 ring-2 ring-cocoa-800/10 shadow-sm hover:ring-bubble-300 focus-visible:outline-bubble-400",
  mystery:
    "bg-lilac-400 text-white shadow-pop hover:bg-lilac-500 focus-visible:outline-lilac-500",
} as const;

const SIZES = {
  sm: "px-4 py-2.5 text-xs",
  md: "px-5 py-3 text-sm",
  lg: "px-7 py-4 text-base",
} as const;

export default function AddToCartButton({
  handle,
  quantity = 1,
  children = "Ajouter au panier",
  variant = "primary",
  size = "md",
  full,
  className = "",
}: Props) {
  const { add, isFull } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const onClick = useCallback(() => {
    add(handle, quantity);
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1400);
  }, [add, handle, quantity]);

  const blocked = isFull && handle !== "doudou-mystere";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={blocked}
      className={`relative isolate inline-flex items-center justify-center gap-2 rounded-full font-[family-name:var(--font-display)] font-extrabold uppercase tracking-wide transition-transform duration-150 hover:-translate-y-0.5 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 ${
        VARIANTS[variant]
      } ${SIZES[size]} ${full ? "w-full" : ""} ${className}`}
    >
      <span className={added ? "invisible" : undefined}>
        {blocked ? "Panier complet (10 max)" : children}
      </span>
      {added && (
        <span className="absolute inset-0 grid place-items-center animate-pop-in">
          Ajouté ✓
        </span>
      )}
    </button>
  );
}
