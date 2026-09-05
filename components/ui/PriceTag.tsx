import { formatPrice } from "@/lib/products";

/**
 * Le prix est un élément d'identité chez Doudoumimi : il doit toujours être
 * gros, lisible et impossible à rater.
 */
export default function PriceTag({
  price,
  size = "md",
  className = "",
}: {
  price: number;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const sizes = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-3xl",
    xl: "text-5xl sm:text-6xl",
  } as const;

  return (
    <span
      className={`whitespace-nowrap font-[family-name:var(--font-display)] font-extrabold text-pumpkin-600 ${sizes[size]} ${className}`}
    >
      {formatPrice(price)}
    </span>
  );
}
