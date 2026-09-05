/**
 * Préfixe les fichiers de `public/` avec le basePath du déploiement.
 *
 * `next/image` ne préfixe pas les `src` bruts : sans ça, une photo servie
 * depuis https://<user>.github.io/Jelly/ pointerait sur /produits/… au lieu de
 * /Jelly/produits/… et renverrait un 404.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetUrl(path: string): string {
  if (/^(https?:)?\/\//.test(path)) return path;
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}
