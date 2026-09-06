import Link from "next/link";
import ProductVisual from "./ProductVisual";
import AddToCartButton from "./AddToCartButton";
import Badge from "./ui/Badge";
import PriceTag from "./ui/PriceTag";
import type { Product } from "@/lib/products";

/**
 * Carte produit.
 *
 * Photo → nom → 9,99 € → Ajouter au panier. Le prix affiché est toujours le
 * prix unitaire : la grille par quantité ne se dévoile que dans le panier.
 */
export default function ProductCard({
  product,
  priority,
}: {
  product: Product;
  priority?: boolean;
}) {
  const href = `/produit/${product.handle}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-cocoa-800/10 transition duration-300 hover:ring-cocoa-800/25">
      <Link href={href} className="relative block" prefetch={priority}>
        <div className="relative aspect-square overflow-hidden bg-cream-deep">
          <ProductVisual
            product={product}
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
            className="h-full w-full p-5 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-2.5 top-2.5 flex flex-col items-start gap-1.5">
            {product.badges.slice(0, 2).map((b) => (
              <Badge key={b} type={b} />
            ))}
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-3 sm:p-4">
        <Link href={href} className="min-w-0">
          <h3 className="truncate font-[family-name:var(--font-display)] text-sm font-extrabold text-cocoa-800 sm:text-base">
            {product.name}
          </h3>
        </Link>
        <p className="line-clamp-2 text-xs text-cocoa-600/75 sm:text-[13px]">{product.tagline}</p>

        <div className="mt-1">
          <PriceTag price={product.price} size="md" />
        </div>

        <AddToCartButton handle={product.handle} size="sm" full className="mt-2">
          Ajouter au panier
        </AddToCartButton>
      </div>
    </article>
  );
}
