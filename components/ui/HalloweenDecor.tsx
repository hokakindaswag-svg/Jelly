/**
 * Décors Halloween — cute, jamais horrifiques.
 *
 * Tout est dessiné en SVG inline dans la palette de la marque (pêche, rose,
 * lilas, cacao) plutôt qu'en noir : c'est ce qui garde l'ambiance « boutique
 * kawaii » au lieu de « maison hantée ». Purement décoratif, donc masqué aux
 * lecteurs d'écran, non cliquable et effacé si l'utilisateur réduit les
 * animations.
 */

/** Toile d'araignée d'angle, avec sa petite araignée souriante. */
export function SpiderWeb({
  className = "",
  corner = "left",
}: {
  className?: string;
  corner?: "left" | "right";
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={`pointer-events-none absolute ${corner === "right" ? "-scale-x-100" : ""} ${className}`}
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M0 0 0 108M0 0 108 0M0 0 76 76M0 0 30 96M0 0 96 30" />
        <path d="M22 0a22 22 0 0 1-22 22M42 0a42 42 0 0 1-42 42M64 0a64 64 0 0 1-64 64M88 0a88 88 0 0 1-88 88" />
      </g>
      {/* fil + araignée */}
      <g stroke="currentColor" strokeWidth="1.4">
        <path d="M74 12v22" />
      </g>
      <g transform="translate(74 42)">
        <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <path d="M-8-4-14-9M-8 0-15 0M-8 4-14 9M8-4 14-9M8 0 15 0M8 4 14 9" />
        </g>
        <ellipse rx="8" ry="7" fill="currentColor" />
        <circle cx="-3" cy="-2" r="1.6" fill="#fffdfb" />
        <circle cx="3" cy="-2" r="1.6" fill="#fffdfb" />
      </g>
    </svg>
  );
}

/** Petite citrouille souriante. */
export function Pumpkin({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={`pointer-events-none absolute ${className}`} aria-hidden="true">
      <path d="M24 12c-2 0-3-4-1-6" stroke="#8fbf7a" strokeWidth="3" strokeLinecap="round" fill="none" />
      <ellipse cx="24" cy="28" rx="18" ry="15" fill="#ff9d4d" />
      <ellipse cx="14" cy="28" rx="7" ry="15" fill="#f97d1c" opacity=".35" />
      <ellipse cx="34" cy="28" rx="7" ry="15" fill="#f97d1c" opacity=".35" />
      <path d="M18 24l3 4h-6zM30 24l3 4h-6z" fill="#6f4c38" />
      <path d="M17 33q7 6 14 0" stroke="#6f4c38" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <ellipse cx="13" cy="31" rx="3" ry="2" fill="#ff7fae" opacity=".55" />
      <ellipse cx="35" cy="31" rx="3" ry="2" fill="#ff7fae" opacity=".55" />
    </svg>
  );
}

/** Petit fantôme aux joues roses. */
export function Ghost({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 48" className={`pointer-events-none absolute ${className}`} aria-hidden="true">
      <path
        d="M20 4c-8 0-14 6-14 14v22c0 2 2.5 3 4 1l2-2.5c1-1.2 2.8-1.2 3.8 0l1.6 2c1 1.2 2.8 1.2 3.8 0l1.6-2c1-1.2 2.8-1.2 3.8 0l2 2.5c1.5 2 4 1 4-1V18c0-8-6-14-14-14z"
        fill="#fffdfb"
        stroke="#e3d6ff"
        strokeWidth="1.5"
      />
      <circle cx="14.5" cy="19" r="2.2" fill="#33211a" />
      <circle cx="25.5" cy="19" r="2.2" fill="#33211a" />
      <ellipse cx="10" cy="24" rx="3" ry="2" fill="#ffa8c8" opacity=".75" />
      <ellipse cx="30" cy="24" rx="3" ry="2" fill="#ffa8c8" opacity=".75" />
      <path d="M17 24q3 3 6 0" stroke="#33211a" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/** Chauve-souris arrondie, dans les violets de la marque. */
export function Bat({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 32" className={`pointer-events-none absolute ${className}`} aria-hidden="true">
      <path
        d="M28 8c-4-6-10-6-14-2-1-3-4-4-6-2 2 4 0 8 2 12 4 6 12 10 18 10s14-4 18-10c2-4 0-8 2-12-2-2-5-1-6 2-4-4-10-4-14 2z"
        fill="currentColor"
      />
      <circle cx="24.5" cy="14" r="1.8" fill="#fffdfb" />
      <circle cx="31.5" cy="14" r="1.8" fill="#fffdfb" />
    </svg>
  );
}

const STAR_PATH =
  "M12 2l2.2 6.2L20.5 10l-5.4 3.6L16.6 20 12 16.3 7.4 20l1.5-6.4L3.5 10l6.3-1.8z";

export function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`pointer-events-none absolute ${className}`} aria-hidden="true">
      <path d={STAR_PATH} fill="currentColor" />
    </svg>
  );
}

/**
 * Guirlande de séparation entre deux sections : un fil festonné avec
 * fanions Halloween. Remplace une simple bordure sans alourdir la page.
 */
export function Garland({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none relative h-10 w-full overflow-hidden ${className}`} aria-hidden="true">
      <svg viewBox="0 0 400 40" preserveAspectRatio="none" className="h-full w-full">
        <path d="M0 6q100 16 200 8t200-8" fill="none" stroke="#e6c9b4" strokeWidth="2" />
      </svg>
      <div className="absolute inset-x-0 top-2 flex justify-around px-6 text-lg">
        {["🎃", "👻", "🕸️", "🌙", "🍬", "🦇", "🍂", "✨"].map((e, i) => (
          <span key={e} className="animate-float" style={{ animationDelay: `${i * 0.3}s` }}>
            {e}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Nappe de décor pour une section : quelques éléments dispersés en fond.
 * `tone` ajuste l'opacité selon que le fond est clair ou coloré.
 */
export function SectionDecor({ tone = "light" }: { tone?: "light" | "strong" }) {
  const o = tone === "strong" ? "opacity-40" : "opacity-25";
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <SpiderWeb className={`left-0 top-0 h-24 w-24 text-cocoa-600 ${o}`} />
      <SpiderWeb corner="right" className={`right-0 top-0 h-20 w-20 text-cocoa-600 ${o}`} />
      <Pumpkin className={`left-[6%] top-[28%] h-8 w-8 animate-float ${o}`} />
      <Ghost className={`right-[7%] top-[18%] h-10 w-10 animate-float ${o}`} />
      <Bat className={`left-[18%] top-[8%] h-6 w-10 text-lilac-400 animate-wiggle ${o}`} />
      <Bat className={`right-[22%] bottom-[12%] h-5 w-8 text-lilac-400 animate-float ${o}`} />
      <Star className={`left-[42%] top-[6%] h-5 w-5 text-pumpkin-300 animate-wiggle ${o}`} />
      <Star className={`right-[36%] bottom-[8%] h-4 w-4 text-bubble-300 animate-float ${o}`} />
      <span className={`absolute bottom-[6%] left-[8%] text-2xl animate-float ${o}`}>🍂</span>
      <span className={`absolute right-[10%] bottom-[24%] text-xl animate-wiggle ${o}`}>🍬</span>
    </div>
  );
}
