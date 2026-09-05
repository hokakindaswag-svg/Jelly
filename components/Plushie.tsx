/**
 * Plushie — l'illustration produit de Doudoumimi.
 *
 * Chaque doudou est dessiné en SVG inline plutôt qu'en photo : zéro requête
 * réseau, net sur tous les écrans, et l'univers reste cohérent. Au moment de
 * brancher Shopify, il suffit de remplacer ce composant par une <Image> et de
 * garder la même API (`art`, `palette`).
 */

import type { PlushieArt, Product } from "@/lib/products";

type Palette = Product["palette"];

type Props = {
  art: PlushieArt;
  palette: Palette;
  className?: string;
  /** Petite étiquette cousue, affichée en bas du doudou. */
  label?: string;
};

type Face = { x: number; y: number; scale?: number };

function Eyes({ x, y, scale = 1, blush }: Face & { blush: string }) {
  const s = scale;
  return (
    <g>
      {/* joues */}
      <ellipse cx={x - 22 * s} cy={y + 10 * s} rx={9 * s} ry={6 * s} fill={blush} opacity="0.75" />
      <ellipse cx={x + 22 * s} cy={y + 10 * s} rx={9 * s} ry={6 * s} fill={blush} opacity="0.75" />
      {/* yeux */}
      <ellipse cx={x - 14 * s} cy={y} rx={4.6 * s} ry={5.6 * s} fill="#33211a" />
      <ellipse cx={x + 14 * s} cy={y} rx={4.6 * s} ry={5.6 * s} fill="#33211a" />
      <circle cx={x - 15.5 * s} cy={y - 2 * s} r={1.7 * s} fill="#fff" />
      <circle cx={x + 12.5 * s} cy={y - 2 * s} r={1.7 * s} fill="#fff" />
      {/* sourire */}
      <path
        d={`M ${x - 6 * s} ${y + 10 * s} Q ${x} ${y + 16 * s} ${x + 6 * s} ${y + 10 * s}`}
        stroke="#33211a"
        strokeWidth={2.2 * s}
        strokeLinecap="round"
        fill="none"
      />
    </g>
  );
}

function Bow({ x, y, color, scale = 1 }: { x: number; y: number; color: string; scale?: number }) {
  const s = scale;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0 L-16 -9 L-16 9 Z" fill={color} />
      <path d="M0 0 L16 -9 L16 9 Z" fill={color} />
      <circle cx="0" cy="0" r="5" fill={color} />
      <circle cx="-1.5" cy="-1.5" r="1.6" fill="#fff" opacity="0.6" />
    </g>
  );
}

/** Corps de chaque doudou + position du visage. */
function body(art: PlushieArt, p: Palette): { shape: React.ReactNode; face: Face } {
  switch (art) {
    case "ghost":
      return {
        face: { x: 100, y: 96 },
        shape: (
          <>
            <path
              d="M100 24c-30 0-52 23-52 53v72c0 8 9 12 14 6l10-11c3-4 9-4 12 0l8 10c3 4 9 4 12 0l8-10c3-4 9-4 12 0l10 11c5 6 14 2 14-6V77c0-30-22-53-48-53z"
              fill={p.body}
            />
            <ellipse cx="100" cy="64" rx="34" ry="26" fill="#fff" opacity="0.35" />
            <path d="M74 44c6-10 18-16 30-16" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity="0.7" fill="none" />
          </>
        ),
      };
    case "pumpkin":
      return {
        face: { x: 100, y: 112 },
        shape: (
          <>
            <path d="M100 44c-4-14 4-22 14-24-2 12-6 18-8 24z" fill="#7bb26a" />
            <rect x="94" y="38" width="12" height="20" rx="6" fill="#6f4c38" />
            <ellipse cx="100" cy="118" rx="70" ry="58" fill={p.body} />
            <ellipse cx="58" cy="118" rx="24" ry="56" fill={p.accent} opacity="0.16" />
            <ellipse cx="142" cy="118" rx="24" ry="56" fill={p.accent} opacity="0.16" />
            <path d="M100 62v112" stroke={p.accent} strokeWidth="3" opacity="0.18" />
            <ellipse cx="78" cy="86" rx="18" ry="10" fill="#fff" opacity="0.3" transform="rotate(-25 78 86)" />
          </>
        ),
      };
    case "bat":
      return {
        face: { x: 100, y: 112 },
        shape: (
          <>
            <path d="M42 84c-14-14-30-16-30-16 10 8 8 20 4 30 10-2 20 2 26 8z" fill={p.accent} />
            <path d="M158 84c14-14 30-16 30-16-10 8-8 20-4 30-10-2-20 2-26 8z" fill={p.accent} />
            <path d="M46 78c-18 4-32 18-34 34 16-6 30-2 40 6z" fill={p.accent} opacity="0.85" />
            <path d="M154 78c18 4 32 18 34 34-16-6-30-2-40 6z" fill={p.accent} opacity="0.85" />
            <path d="M74 70l6 24 18-12z" fill={p.body} />
            <path d="M126 70l-6 24-18-12z" fill={p.body} />
            <ellipse cx="100" cy="114" rx="52" ry="48" fill={p.body} />
            <ellipse cx="100" cy="132" rx="30" ry="22" fill="#fff" opacity="0.28" />
          </>
        ),
      };
    case "cat":
      return {
        face: { x: 100, y: 108 },
        shape: (
          <>
            <path d="M62 74l2-32 28 20z" fill={p.body} />
            <path d="M138 74l-2-32-28 20z" fill={p.body} />
            <path d="M70 66l1-16 14 11z" fill={p.blush} opacity="0.7" />
            <path d="M130 66l-1-16-14 11z" fill={p.blush} opacity="0.7" />
            <ellipse cx="100" cy="112" rx="56" ry="52" fill={p.body} />
            <path d="M150 148c22 4 30-14 22-28" stroke={p.body} strokeWidth="14" strokeLinecap="round" fill="none" />
            <path d="M56 108h-22M56 116h-22M144 108h22M144 116h22" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" opacity="0.55" />
            <Bow x={140} y={70} color={p.accent} scale={0.9} />
          </>
        ),
      };
    case "bunny":
      return {
        face: { x: 100, y: 116 },
        shape: (
          <>
            <ellipse cx="74" cy="52" rx="15" ry="42" fill={p.body} transform="rotate(-8 74 52)" />
            <ellipse cx="126" cy="52" rx="15" ry="42" fill={p.body} transform="rotate(8 126 52)" />
            <ellipse cx="74" cy="54" rx="7" ry="30" fill={p.accent} transform="rotate(-8 74 54)" />
            <ellipse cx="126" cy="54" rx="7" ry="30" fill={p.accent} transform="rotate(8 126 54)" />
            <ellipse cx="100" cy="120" rx="54" ry="50" fill={p.body} />
            <ellipse cx="100" cy="128" rx="4.5" ry="3.6" fill={p.blush} />
            <Bow x={138} y={82} color={p.accent} scale={0.85} />
          </>
        ),
      };
    case "bear":
      return {
        face: { x: 100, y: 112 },
        shape: (
          <>
            <circle cx="58" cy="72" r="22" fill={p.body} />
            <circle cx="142" cy="72" r="22" fill={p.body} />
            <circle cx="58" cy="72" r="11" fill={p.blush} opacity="0.6" />
            <circle cx="142" cy="72" r="11" fill={p.blush} opacity="0.6" />
            <ellipse cx="100" cy="114" rx="58" ry="54" fill={p.body} />
            <ellipse cx="100" cy="130" rx="26" ry="20" fill={p.accent} opacity="0.35" />
            <ellipse cx="100" cy="124" rx="6" ry="4.6" fill="#33211a" />
          </>
        ),
      };
    case "frog":
      return {
        face: { x: 100, y: 122 },
        shape: (
          <>
            <ellipse cx="100" cy="124" rx="64" ry="50" fill={p.body} />
            <circle cx="68" cy="76" r="24" fill={p.body} />
            <circle cx="132" cy="76" r="24" fill={p.body} />
            <circle cx="68" cy="76" r="16" fill="#fff" />
            <circle cx="132" cy="76" r="16" fill="#fff" />
            <circle cx="68" cy="78" r="7" fill="#33211a" />
            <circle cx="132" cy="78" r="7" fill="#33211a" />
            <circle cx="65" cy="74" r="2.6" fill="#fff" />
            <circle cx="129" cy="74" r="2.6" fill="#fff" />
            <ellipse cx="100" cy="140" rx="34" ry="20" fill={p.accent} opacity="0.28" />
          </>
        ),
      };
    case "star":
      return {
        face: { x: 100, y: 106 },
        shape: (
          <>
            <path
              d="M100 26l21 44 48 7-35 33 8 47-42-22-42 22 8-47-35-33 48-7z"
              fill={p.body}
              stroke={p.accent}
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <path d="M78 66c6-10 14-16 22-18" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity="0.6" fill="none" />
          </>
        ),
      };
    case "spider":
      return {
        face: { x: 100, y: 116 },
        shape: (
          <>
            {[-1, 1].map((dir) =>
              [0, 1, 2, 3].map((i) => (
                <path
                  key={`${dir}-${i}`}
                  d={`M${100 + dir * 40} ${96 + i * 14} q ${dir * 30} ${-6 + i * 4} ${dir * 40} ${14 + i * 8}`}
                  stroke={p.accent}
                  strokeWidth="7"
                  strokeLinecap="round"
                  fill="none"
                />
              )),
            )}
            <ellipse cx="100" cy="118" rx="48" ry="44" fill={p.body} />
            <ellipse cx="100" cy="104" rx="26" ry="16" fill="#fff" opacity="0.25" />
            <Bow x={132} y={80} color={p.blush} scale={0.8} />
          </>
        ),
      };
    case "mushroom":
      return {
        face: { x: 100, y: 128 },
        shape: (
          <>
            <path d="M56 108h88v34a26 26 0 0 1-26 26H82a26 26 0 0 1-26-26z" fill={p.body} />
            <path d="M100 26c-38 0-64 30-64 58 0 12 8 18 22 18h84c14 0 22-6 22-18 0-28-26-58-64-58z" fill={p.accent} />
            <circle cx="66" cy="72" r="11" fill={p.body} opacity="0.9" />
            <circle cx="132" cy="64" r="9" fill={p.body} opacity="0.9" />
            <circle cx="100" cy="48" r="7" fill={p.body} opacity="0.9" />
          </>
        ),
      };
    case "candy":
      return {
        face: { x: 100, y: 108 },
        shape: (
          <>
            <path d="M40 74l-22-18 6 26-6 26 22-18z" fill={p.accent} />
            <path d="M160 74l22-18-6 26 6 26-22-18z" fill={p.accent} />
            <rect x="38" y="56" width="124" height="98" rx="42" fill={p.body} />
            <path d="M62 62l-14 90M92 58l-14 98M162 92l-8 54" stroke="#fff" strokeWidth="9" strokeLinecap="round" opacity="0.35" />
          </>
        ),
      };
    case "moon":
      return {
        face: { x: 108, y: 112 },
        shape: (
          <>
            <path
              d="M132 26a78 78 0 1 0 30 132 62 62 0 0 1-30-132z"
              fill={p.body}
              stroke={p.accent}
              strokeWidth="5"
            />
            <circle cx="64" cy="86" r="7" fill={p.accent} opacity="0.5" />
            <circle cx="52" cy="122" r="5" fill={p.accent} opacity="0.4" />
          </>
        ),
      };
    case "skull":
      return {
        face: { x: 100, y: 104 },
        shape: (
          <>
            <path d="M100 30c-36 0-62 26-62 60 0 22 12 34 24 40v18a10 10 0 0 0 10 10h56a10 10 0 0 0 10-10v-18c12-6 24-18 24-40 0-34-26-60-62-60z" fill={p.body} />
            <rect x="86" y="146" width="8" height="14" rx="3" fill={p.accent} opacity="0.5" />
            <rect x="106" y="146" width="8" height="14" rx="3" fill={p.accent} opacity="0.5" />
            <ellipse cx="100" cy="126" rx="6" ry="5" fill="#33211a" opacity="0.8" />
            <Bow x={142} y={56} color={p.accent} scale={0.85} />
          </>
        ),
      };
    case "witch":
      return {
        face: { x: 100, y: 116 },
        shape: (
          <>
            <path d="M100 16l30 56H70z" fill={p.accent} />
            <rect x="52" y="66" width="96" height="14" rx="7" fill={p.accent} />
            <rect x="84" y="52" width="32" height="12" rx="6" fill="#ffd67a" />
            <ellipse cx="100" cy="124" rx="56" ry="52" fill={p.body} />
            <path d="M62 150c14 12 62 12 76 0" stroke={p.accent} strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.4" />
            <path d="M74 100l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill={p.accent} opacity="0.7" />
            <path d="M132 142l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill={p.accent} opacity="0.7" />
          </>
        ),
      };
    case "duck":
      return {
        face: { x: 100, y: 108 },
        shape: (
          <>
            <path d="M100 34c-4-10 2-16 10-18-2 8-4 12-5 16z" fill="#7bb26a" />
            <ellipse cx="100" cy="46" rx="30" ry="18" fill="#ff9d4d" />
            <path d="M74 46h52" stroke="#e26404" strokeWidth="3" opacity="0.5" />
            <ellipse cx="100" cy="118" rx="56" ry="52" fill={p.body} />
            <path d="M78 124h44a8 8 0 0 1 0 16H78a8 8 0 0 1 0-16z" fill={p.accent} />
            <path d="M78 132h44" stroke="#e26404" strokeWidth="2" opacity="0.5" />
          </>
        ),
      };
    case "cloud":
      return {
        face: { x: 100, y: 112 },
        shape: (
          <>
            <path
              d="M56 148a34 34 0 0 1-4-68 40 40 0 0 1 76-14 34 34 0 0 1 18 82z"
              fill={p.body}
            />
            <circle cx="70" cy="96" r="26" fill={p.body} />
            <circle cx="130" cy="100" r="28" fill={p.body} />
            <ellipse cx="100" cy="120" rx="50" ry="32" fill={p.body} />
            <ellipse cx="80" cy="98" rx="20" ry="12" fill="#fff" opacity="0.5" />
          </>
        ),
      };
  }
}

export default function Plushie({ art, palette, className, label }: Props) {
  const { shape, face } = body(art, palette);

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label={label ? `Illustration du doudou ${label}` : "Illustration de doudou"}
    >
      {/* ombre au sol */}
      <ellipse cx="100" cy="182" rx="52" ry="9" fill="#6f4c38" opacity="0.1" />
      {shape}
      <Eyes x={face.x} y={face.y} scale={face.scale} blush={palette.blush} />
    </svg>
  );
}
