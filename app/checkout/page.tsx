import type { Metadata } from "next";
import { Suspense } from "react";
import CheckoutClient from "@/components/CheckoutClient";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Paiement",
  description: "Paiement direct Doudoumimi.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <Logo />
          <p className="text-sm font-bold text-cocoa-600/75">
            Achat direct · aucun panier, aucune étape en trop
          </p>
        </div>

        <Suspense
          fallback={
            <p className="text-center text-sm font-bold text-cocoa-600/70">
              Préparation de ta commande… 🧸
            </p>
          }
        >
          <CheckoutClient />
        </Suspense>
      </div>
    </div>
  );
}
