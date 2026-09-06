/**
 * Fond Halloween en motif répété.
 *
 * Un dégradé orange plein cadre écrasait le texte posé dessus. Ici la couleur
 * reste très pâle et c'est le motif — citrouilles, fantômes, chauves-souris,
 * étoiles — qui porte l'ambiance. Tout est dessiné dans la palette de la
 * marque et jamais en noir, pour rester du côté mignon.
 *
 * Le motif est un `<pattern>` SVG : une seule tuile décrite une fois, répétée
 * par le navigateur, donc rien à télécharger et net à tous les zooms.
 */
export default function HalloweenPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    >
      <defs>
        <pattern id="ddm-halloween" width="160" height="160" patternUnits="userSpaceOnUse">
          {/* citrouille */}
          <g transform="translate(24 28)">
            <path d="M10 3c-1 0-1.6-2-.4-3" stroke="#8fbf7a" strokeWidth="2" strokeLinecap="round" fill="none" />
            <ellipse cx="10" cy="12" rx="10" ry="8.5" fill="#ff9d4d" />
            <path d="M6.5 10l1.8 2.4H4.7zM13.5 10l1.8 2.4h-3.6z" fill="#6f4c38" />
            <path d="M6 15.5q4 3.4 8 0" stroke="#6f4c38" strokeWidth="1.6" strokeLinecap="round" fill="none" />
          </g>

          {/* fantôme */}
          <g transform="translate(104 18)">
            <path
              d="M9 0C4.6 0 1 3.6 1 8v12c0 1.2 1.4 1.7 2.2.6l1-1.4c.6-.7 1.6-.7 2.1 0l.9 1.1c.6.7 1.6.7 2.1 0l.9-1.1c.6-.7 1.6-.7 2.1 0l1 1.4c.8 1.1 2.2.6 2.2-.6V8c0-4.4-3.6-8-8-8z"
              fill="#fffdfb"
              stroke="#e3d6ff"
              strokeWidth="1.2"
            />
            <circle cx="6.2" cy="8.5" r="1.3" fill="#33211a" />
            <circle cx="11.8" cy="8.5" r="1.3" fill="#33211a" />
            <ellipse cx="3.8" cy="11" rx="1.7" ry="1.1" fill="#ffa8c8" />
            <ellipse cx="14.2" cy="11" rx="1.7" ry="1.1" fill="#ffa8c8" />
          </g>

          {/* chauve-souris */}
          <g transform="translate(96 104)" fill="#b191ff">
            <path d="M14 4c-2-3-5-3-7-1-.5-1.5-2-2-3-1 1 2 0 4 1 6 2 3 6 5 9 5s7-2 9-5c1-2 0-4 1-6-1-1-2.5-.5-3 1-2-2-5-2-7 1z" />
            <circle cx="12.2" cy="7" r="0.9" fill="#fffdfb" />
            <circle cx="15.8" cy="7" r="0.9" fill="#fffdfb" />
          </g>

          {/* étoiles */}
          <path
            d="M40 96l1.5 4.2 4.3 1.2-3.7 2.5 1 4.4-3.1-2.5-3.1 2.5 1-4.4-3.7-2.5 4.3-1.2z"
            fill="#ffb877"
          />
          <path
            d="M138 66l1 2.8 2.9.8-2.5 1.7.7 3-2.1-1.7-2.1 1.7.7-3-2.5-1.7 2.9-.8z"
            fill="#ffa8c8"
          />
          <path d="M12 118l1 2.8 2.9.8-2.5 1.7.7 3-2.1-1.7-2.1 1.7.7-3-2.5-1.7 2.9-.8z" fill="#cbb4ff" />

          {/* petit bonbon */}
          <g transform="translate(58 134)">
            <ellipse cx="9" cy="5" rx="5.5" ry="4.5" fill="#ffa8c8" />
            <path d="M3.5 5L0 1.5v7zM14.5 5L18 1.5v7z" fill="#ff7fae" />
          </g>

          {/* feuille d'automne */}
          <path
            d="M132 128c5-5 12-4 14-2s1 9-4 13-9 3-11 1-1-8 1-12z"
            fill="#f7b26a"
            opacity="0.9"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ddm-halloween)" />
    </svg>
  );
}
