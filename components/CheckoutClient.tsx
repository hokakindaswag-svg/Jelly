"use client";

/**
 * Le checkout lit désormais le panier (localStorage) et non plus des paramètres
 * d'URL : il n'a donc plus besoin de résoudre quoi que ce soit ici.
 */

import Link from "next/link";
import CheckoutFlow from "./CheckoutFlow";

export default function CheckoutClient() {
  return (
    <>
      <CheckoutFlow />
      <p className="mt-10 text-center text-xs text-cocoa-600/60">
        <Link href="/doudous" className="underline hover:text-bubble-600">
          ← Continuer mes achats
        </Link>
      </p>
    </>
  );
}
