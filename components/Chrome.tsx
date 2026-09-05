"use client";

/**
 * Masque l'en-tête et le pied de page pendant le checkout.
 * Moins de sorties possibles = moins d'abandons au moment de payer.
 * La page de confirmation, elle, garde la navigation complète.
 */

import { usePathname } from "next/navigation";

export default function Chrome({ children }: { children: React.ReactNode }) {
  const path = usePathname().replace(/\/+$/, "") || "/";
  if (path === "/checkout") return null;
  return <>{children}</>;
}
