import type { NextConfig } from "next";

/**
 * Le site est exporté en HTML statique pour être hébergé sur GitHub Pages.
 *
 * Le site vit à la racine de son domaine (doudoumimi.site, cf. public/CNAME),
 * donc `NEXT_PUBLIC_BASE_PATH` reste vide. La variable n'existe que pour un
 * déploiement dans un sous-dossier (github.io/<repo>/) : la renseigner
 * préfixe alors liens et assets. Une valeur erronée sert un site sans style,
 * toutes les URLs pointant à côté.
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
