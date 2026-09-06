/**
 * Visuel de la fiche produit : une seule photo, celle du doudou.
 *
 * La galerie proposait auparavant quatre « vues » (studio, décor, zoom,
 * chambre) fabriquées à partir du même fichier en changeant le fond et
 * l'échelle. Ça donnait quatre vignettes pour une seule vraie photo, ce qui
 * promet des angles qui n'existent pas. Une photo, une vignette : ce qu'on
 * montre correspond à ce qu'on a.
 */

import ProductVisual from "./ProductVisual";
import type { Product } from "@/lib/products";

export default function ProductGallery({ product }: { product: Product }) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-[var(--radius-cute)] bg-gradient-to-br from-peach-50 to-bubble-50">
      <ProductVisual
        product={product}
        priority
        sizes="(max-width: 1024px) 92vw, 520px"
        className="h-full w-full p-8"
      />
    </div>
  );
}
