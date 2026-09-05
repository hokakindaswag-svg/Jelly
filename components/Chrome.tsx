"use client";

/**
 * Masque l'en-tête et le pied de page pendant le checkout.
 * Moins de sorties possibles = moins d'abandons au moment de payer.
 */

import { usePathname } from "next/navigation";

export default function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/checkout") && pathname !== "/checkout/confirmation") return null;
  return <>{children}</>;
}
