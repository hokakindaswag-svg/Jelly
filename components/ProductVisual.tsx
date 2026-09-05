import Image from "next/image";
import Plushie from "./Plushie";
import { assetUrl } from "@/lib/assets";
import type { Product } from "@/lib/products";

/**
 * Visuel produit unifié.
 *
 * Si le produit a une vraie photo (`product.image`), on l'affiche ; sinon on
 * retombe sur l'illustration SVG <Plushie>. Ajouter une photo à un doudou se
 * résume donc à déposer le fichier dans `public/produits/` et à renseigner
 * `image` dans `lib/products.ts` — aucun composant à modifier.
 */
export default function ProductVisual({
  product,
  className = "",
  imageClassName = "",
  label,
  sizes = "(max-width: 768px) 50vw, 320px",
  priority,
}: {
  product: Pick<Product, "art" | "palette" | "name" | "image">;
  className?: string;
  /** Classes appliquées à la photo seule (cadrage, ombre portée…). */
  imageClassName?: string;
  /** Texte alternatif ; `null` pour un visuel purement décoratif. */
  label?: string | null;
  sizes?: string;
  priority?: boolean;
}) {
  if (product.image) {
    return (
      <div className={`relative ${className}`}>
        <Image
          src={assetUrl(product.image)}
          alt={label === null ? "" : (label ?? product.name)}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-contain ${imageClassName}`}
        />
      </div>
    );
  }

  return (
    <Plushie
      art={product.art}
      palette={product.palette}
      label={label === null ? undefined : (label ?? product.name)}
      className={className}
    />
  );
}
