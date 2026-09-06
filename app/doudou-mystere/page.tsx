import type { Metadata } from "next";
import MysteryBox from "@/components/MysteryBox";
import ProductGrid from "@/components/ProductGrid";
import AddToCartButton from "@/components/AddToCartButton";
import SectionHeading from "@/components/ui/SectionHeading";
import TrustBadges from "@/components/TrustBadges";
import { getByCollection, mysteryProduct } from "@/lib/products";

export const metadata: Metadata = {
  title: "Doudou Mystère — 2 €",
  description:
    "2 € et découvre un doudou surprise de la collection Halloween. Tu ne sais pas lequel tu vas recevoir.",
};

const steps = [
  { emoji: "🛒", title: "1. Tu paies 2 €", text: "Un clic sur « Je tente ma chance », puis le paiement. Pas de panier." },
  { emoji: "🎲", title: "2. On pioche pour toi", text: "On choisit un doudou dans la collection Halloween au moment de préparer ton colis." },
  { emoji: "📦", title: "3. Tu ouvres", text: "Tu découvres ton doudou surprise en ouvrant le colis. C'est tout l'intérêt." },
];

export default function MysteryPage() {
  const candidates = getByCollection("halloween");

  return (
    <>
      <MysteryBox />

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="Comment ça marche"
            title={<>🎃 Trois étapes, deux euros</>}
          />
          <ol className="mt-8 grid gap-4 sm:grid-cols-3">
            {steps.map((s) => (
              <li
                key={s.title}
                className="rounded-[var(--radius-cute)] bg-cream p-6 text-center transition-transform hover:-translate-y-1"
              >
                <span className="text-4xl" aria-hidden="true">{s.emoji}</span>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg font-extrabold text-cocoa-800">
                  {s.title}
                </h3>
                <p className="mt-1 text-sm text-cocoa-600/80">{s.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 text-center">
            <AddToCartButton handle={mysteryProduct.handle} variant="mystery" size="lg">
              Je tente ma chance 🎃
            </AddToCartButton>
          </div>
        </div>
      </section>

      <section className="bg-cream py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title={<>👀 Les doudous qui peuvent tomber</>}
            subtitle="Ton Doudou Mystère sera l'un de ceux-là. Impossible de savoir lequel."
          />
          <div className="mt-8">
            <ProductGrid products={candidates} />
          </div>
          <p className="mt-6 text-center text-sm font-semibold text-cocoa-600/70">
            Tu préfères choisir toi-même ? Prends-le directement à 9,99 €.
          </p>
        </div>
      </section>

      <TrustBadges />
    </>
  );
}
