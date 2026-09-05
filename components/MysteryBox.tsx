import BuyNowButton from "./BuyNowButton";
import MysteryReveal from "./MysteryReveal";
import Sparkles from "./ui/Sparkles";
import { getByCollection, mysteryProduct } from "@/lib/products";

/**
 * Section Doudou Mystère — la mécanique marketing centrale du site.
 * Achat direct à 2 €, sans passer par un panier.
 */
export default function MysteryBox() {
  const candidates = getByCollection("halloween").slice(0, 6);

  return (
    <section
      id="doudou-mystere"
      className="relative overflow-hidden bg-gradient-to-br from-lilac-200 via-bubble-100 to-peach-100 py-14 sm:py-20"
    >
      <Sparkles />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2">
        {/* La boîte mystère */}
        <div className="order-2 lg:order-1">
          <div className="relative mx-auto aspect-square w-full max-w-sm">
            <div className="absolute inset-8 rounded-full bg-white/40 blur-2xl" />
            <svg viewBox="0 0 200 200" className="relative h-full w-full animate-float" role="img" aria-label="Boîte mystère Doudoumimi">
              <ellipse cx="100" cy="180" rx="56" ry="9" fill="#6f4c38" opacity="0.12" />
              {/* corps de la boîte */}
              <rect x="36" y="78" width="128" height="92" rx="14" fill="#ff9d4d" />
              <rect x="36" y="78" width="128" height="92" rx="14" fill="url(#mysteryShade)" opacity="0.25" />
              {/* couvercle */}
              <rect x="28" y="58" width="144" height="30" rx="12" fill="#f97d1c" />
              {/* ruban */}
              <rect x="90" y="58" width="20" height="112" fill="#ffe0ec" />
              <rect x="28" y="66" width="144" height="14" fill="#ffe0ec" opacity="0.9" />
              {/* nœud */}
              <path d="M100 58 L74 40 L74 58 Z" fill="#ffa8c8" />
              <path d="M100 58 L126 40 L126 58 Z" fill="#ffa8c8" />
              <circle cx="100" cy="56" r="9" fill="#ff7fae" />
              {/* petit fantôme qui dépasse */}
              <path
                d="M100 20c-13 0-22 9-22 22v16c0 3 4 5 6 2l3-4c1-2 4-2 5 0l3 4c1 2 4 2 5 0l3-4c1-2 4-2 5 0l3 4c2 3 6 1 6-2V42c0-13-9-22-22-22z"
                fill="#fffdfb"
                opacity="0.96"
              />
              <circle cx="93" cy="40" r="2.4" fill="#33211a" />
              <circle cx="107" cy="40" r="2.4" fill="#33211a" />
              <ellipse cx="87" cy="45" rx="3.4" ry="2.2" fill="#ffa8c8" />
              <ellipse cx="113" cy="45" rx="3.4" ry="2.2" fill="#ffa8c8" />
              <path d="M96 46q4 4 8 0" stroke="#33211a" strokeWidth="1.6" strokeLinecap="round" fill="none" />
              {/* prix cousu sur la boîte */}
              <circle cx="152" cy="150" r="26" fill="#fffdfb" />
              <text
                x="152"
                y="157"
                textAnchor="middle"
                fontSize="22"
                fontWeight="800"
                fill="#e26404"
                fontFamily="system-ui, sans-serif"
              >
                2 €
              </text>
              <defs>
                <linearGradient id="mysteryShade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#fff" />
                  <stop offset="1" stopColor="#6f4c38" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Le pitch */}
        <div className="order-1 text-center lg:order-2 lg:text-left">
          <span className="inline-flex items-center rounded-full bg-white/85 px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-lilac-500 shadow-sm">
            🎁 L&apos;offre qu&apos;on ne peut pas refuser
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-tight text-cocoa-800 sm:text-5xl">
            Ton Doudou Mystère
          </h2>
          <p className="mt-3 text-base text-cocoa-800/80 sm:text-lg">
            Pour seulement{" "}
            <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-lilac-500">
              2 €
            </span>
            , laisse-nous choisir ton petit compagnon Halloween.
          </p>
          <p className="mt-2 text-base font-bold text-cocoa-800/70">
            Tu ne sais pas lequel tu vas recevoir… 👻
          </p>

          <ul className="mx-auto mt-5 flex max-w-md flex-col gap-2 text-left text-sm text-cocoa-800/80 lg:mx-0">
            <li className="flex gap-2">🎃 <span>1 doudou surprise de la collection Halloween</span></li>
            <li className="flex gap-2">✨ <span>Aucun doublon si tu en prends plusieurs</span></li>
            <li className="flex gap-2">📦 <span>Expédié avec ta commande, sans frais en plus</span></li>
          </ul>

          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
            <BuyNowButton handle={mysteryProduct.handle} variant="mystery" size="lg">
              Je tente ma chance 🎃
            </BuyNowButton>
            <span className="text-sm font-semibold text-cocoa-800/70">
              Paiement direct · aucun panier
            </span>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-10 max-w-4xl px-4">
        <MysteryReveal candidates={candidates} />
      </div>
    </section>
  );
}
