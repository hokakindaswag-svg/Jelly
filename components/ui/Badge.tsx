import type { Badge as BadgeType } from "@/lib/products";

const STYLES: Record<BadgeType, { label: string; className: string }> = {
  halloween: {
    label: "🎃 HALLOWEEN",
    className: "bg-pumpkin-500 text-white",
  },
  limited: {
    label: "✨ LIMITED",
    className: "bg-lilac-400 text-white",
  },
  new: {
    label: "👻 NEW",
    className: "bg-white text-cocoa-800 ring-1 ring-cocoa-800/15",
  },
  bestseller: {
    label: "🔥 BESTSELLER",
    className: "bg-bubble-500 text-white",
  },
};

export default function Badge({ type }: { type: BadgeType }) {
  const { label, className } = STYLES[type];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-extrabold tracking-wide shadow-sm ${className}`}
    >
      {label}
    </span>
  );
}
