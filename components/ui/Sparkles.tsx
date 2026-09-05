/** Petites étoiles décoratives, purement esthétiques. */
export default function Sparkles({ className = "" }: { className?: string }) {
  const stars = [
    { x: "6%", y: "18%", s: 14, d: "0s" },
    { x: "88%", y: "12%", s: 20, d: "0.6s" },
    { x: "18%", y: "76%", s: 11, d: "1.2s" },
    { x: "72%", y: "82%", s: 16, d: "0.3s" },
    { x: "46%", y: "8%", s: 10, d: "1.6s" },
  ];
  return (
    <div className={`deco absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {stars.map((s, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          width={s.s}
          height={s.s}
          className="absolute animate-twinkle text-bubble-300"
          style={{ left: s.x, top: s.y, animationDelay: s.d }}
        >
          <path
            d="M12 0l2.6 8.4L23 12l-8.4 3.6L12 24l-2.6-8.4L1 12l8.4-3.6z"
            fill="currentColor"
          />
        </svg>
      ))}
    </div>
  );
}
