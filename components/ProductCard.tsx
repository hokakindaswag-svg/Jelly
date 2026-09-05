import Link from "next/link";
import Plushie from "./Plushie";
import Badge from "./ui/Badge";
import PriceTag from "./ui/PriceTag";
import Stars from "./ui/Stars";
import BuyNowButton from "./BuyNowButton";
import { isLowStock, type Product } from "@/lib/products";

/**
 * Carte produit Doudoumimi.
 * Image → nom → prix → bouton ACHETER MAINTENANT. Jamais d'ajout au panier.
 */
export default function ProductCard({
  product,
  priority,
}: {
  product: Product;
  priority?: boolean;
}) {
  const href = `/produit/${product.handle}`;
  const low = isLowStock(product);

  return (
    <article className="group flex flex-col overflow-hidden rounded-[var(--radius-cute)] bg-white shadow-[0_2px_14px_-8px_rgba(111,76,56,0.35)] ring-1 ring-cocoa-800/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-cute">
      <Link href={href} className="relative block" prefetch={priority}>
        <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-peach-50 to-bubble-50">
          <Plushie
            art={product.art}
            palette={product.palette}
            label={product.name}
            className="h-full w-full p-5 transition-transform duration-500 group-hover:scale-[1.07] group-hover:rotate-2"
          />
          <div className="absolute left-2.5 top-2.5 flex flex-col items-start gap-1.5">
            {product.badges.slice(0, 2).map((b) => (
              <Badge key={b} type={b} />
            ))}
          </div>
          {low && (
            <span className="absolute bottom-2.5 left-2.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-extrabold text-pumpkin-600 backdrop-blur">
              Plus que {product.stock} en stock
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-3 sm:p-4">
        <Link href={href} className="min-w-0">
          <h3 className="truncate font-[family-name:var(--font-display)] text-sm font-extrabold text-cocoa-800 sm:text-base">
            {product.name}
          </h3>
        </Link>
        <p className="line-clamp-2 text-xs text-cocoa-600/75 sm:text-[13px]">{product.tagline}</p>

        <div className="mt-1 flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
          <PriceTag price={product.price} size="md" />
          <Stars rating={product.rating} count={product.reviewCount} />
        </div>

        <BuyNowButton handle={product.handle} size="sm" full className="mt-2">
          Acheter maintenant
        </BuyNowButton>
      </div>
    </article>
  );
}
