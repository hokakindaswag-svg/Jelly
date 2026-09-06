export default function Stars({
  rating,
  count,
  className = "",
}: {
  rating: number;
  count?: number;
  className?: string;
}) {
  const full = Math.round(rating);
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <span aria-hidden="true" className="text-pumpkin-400 tracking-tight">
        {"★".repeat(full)}
        <span className="text-cocoa-400/30">{"★".repeat(5 - full)}</span>
      </span>
      <span className="sr-only">{rating} sur 5</span>
      {count !== undefined && (
        <span className="text-xs font-semibold text-cocoa-600/70">({count})</span>
      )}
    </span>
  );
}
