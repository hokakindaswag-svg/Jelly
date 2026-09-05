import ProductCard from "./ProductCard";
import type { Product } from "@/lib/products";

/** Grille produit : 2 colonnes sur mobile (règle mobile-first), 4 en desktop. */
export default function ProductGrid({
  products,
  columns = 4,
}: {
  products: Product[];
  columns?: 3 | 4;
}) {
  const desktop = columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";
  return (
    <div className={`grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 ${desktop}`}>
      {products.map((p, i) => (
        <ProductCard key={p.handle} product={p} priority={i < 4} />
      ))}
    </div>
  );
}
