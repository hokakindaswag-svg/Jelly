import type { NextConfig } from "next";

/**
 * Le site est exporté en HTML statique pour être hébergé sur GitHub Pages.
 *
 * `NEXT_PUBLIC_BASE_PATH` vaut "/Jelly" en CI (le site vit sous
 * https://<user>.github.io/Jelly/) et reste vide en développement local,
 * où le site est servi à la racine.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  // GitHub Pages sert /route/ -> /route/index.html : il faut donc un dossier par route.
  trailingSlash: true,
  basePath,
  // L'export statique n'embarque pas d'optimiseur d'images à l'exécution.
  images: { unoptimized: true },
};

export default nextConfig;
