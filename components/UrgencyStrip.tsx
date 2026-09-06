/**
 * Rareté honnête : on communique uniquement sur ce qui est vrai
 * (séries produites une seule fois), jamais de faux compteur.
 */
export default function UrgencyStrip() {
  const points = [
    { emoji: "🎃", text: "Édition limitée Halloween" },
    { emoji: "📉", text: "Stock limité, non réapprovisionné" },
    { emoji: "🌙", text: "Disponible uniquement pendant la spooky season" },
    { emoji: "👻", text: "Une fois épuisé, il disparaît" },
  ];

  return (
    <section className="border-y border-cocoa-800/10 bg-cream py-5 text-cocoa-600/80">
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-center">
        {points.map((p) => (
          <li key={p.text} className="flex items-center gap-2 text-xs font-bold sm:text-sm">
            <span aria-hidden="true">{p.emoji}</span>
            {p.text}
          </li>
        ))}
      </ul>
    </section>
  );
}
