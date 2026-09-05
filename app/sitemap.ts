import type { MetadataRoute } from "next";
import { allProducts } from "@/lib/products";
import { collections } from "@/lib/site";

const BASE = "https://doudoumimi.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/doudous",
    "/best-sellers",
    "/doudou-mystere",
    "/faq",
    "/contact",
    "/livraison",
    "/retours",
    "/cgv",
    "/confidentialite",
    "/mentions-legales",
  ];

  return [
    ...staticPages.map((path) => ({
      url: `${BASE}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...collections.map((c) => ({
      url: `${BASE}/collections/${c.handle}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...allProducts.map((p) => ({
      url: `${BASE}/produit/${p.handle}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];
}
