"use client";

/**
 * BuyNowButton — le seul bouton d'achat du site.
 *
 * Il n'existe pas d'« ajouter au panier » sur Doudoumimi : ce bouton envoie
 * directement l'utilisateur au checkout du produit concerné. Une micro-animation
 * (petits cœurs qui s'envolent) confirme le clic avant la navigation.
 */

import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { buildCheckoutUrl, type CheckoutIntent } from "@/lib/checkout";

type Props = CheckoutIntent & {
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

export default function BuyNowButton({
  handle,
  quantity = 1,
  mystery,
  children = "ACHETER MAINTENANT",
  variant = "primary",
  size = "md",
  full,
  className = "",
}: Props) {
  const router = useRouter();
  const [bursting, setBursting] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onClick = useCallback(() => {
    setBursting(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      router.push(buildCheckoutUrl({ handle, quantity, mystery }));
    }, 260);
  }, [router, handle, quantity, mystery]);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-busy={bursting}
      className={`relative isolate inline-flex items-center justify-center gap-2 overflow-visible rounded-full font-[family-name:var(--font-display)] font-extrabold uppercase tracking-wide transition-transform duration-150 hover:-translate-y-0.5 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 ${
        VARIANTS[variant]
      } ${SIZES[size]} ${full ? "w-full" : ""} ${className}`}
    >
      {children}
      {bursting && (
        <span className="deco absolute inset-0 -z-10" aria-hidden="true">
          {["-40%", "10%", "60%"].map((left, i) => (
            <span
              key={left}
              className="absolute top-0 animate-[float_0.5s_ease-out] text-lg"
              style={{ left, animationDelay: `${i * 60}ms` }}
            >
              {["💖", "✨", "🧸"][i]}
            </span>
          ))}
        </span>
      )}
    </button>
  );
}
