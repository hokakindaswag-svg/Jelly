/**
 * Catalogue Doudoumimi.
 *
 * Règle d'or de la marque : tous les doudous sont à 9,99 € et le Doudou
 * Mystère à 2 €. Les prix sont stockés en centimes pour rester compatibles
 * avec une future migration Shopify (`variant.price` en minor units).
 *
 * Chaque produit porte un `variantId` : c'est la seule chose à remplacer par
 * l'ID de variante Shopify pour brancher le checkout direct
 * (`/cart/{variantId}:{qty}` ou l'API Cart -> checkoutUrl).
 */

export const DOUDOU_PRICE = 999; // 9,99 €
export const MYSTERY_PRICE = 200; // 2,00 €

export type Badge = "halloween" | "limited" | "new" | "bestseller";

export type CollectionHandle =
  | "halloween"
  | "classiques"
  | "spooky"
  | "cute"
  | "editions-limitees";

export type PlushieArt =
  | "ghost"
  | "pumpkin"
  | "bat"
  | "cat"
  | "bunny"
  | "bear"
  | "frog"
  | "star"
  | "spider"
  | "mushroom"
  | "candy"
  | "moon"
  | "skull"
  | "witch"
  | "duck"
  | "cloud";

export type Product = {
  handle: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  variantId: string;
  art: PlushieArt;
  palette: { body: string; accent: string; blush: string };
  /**
   * Vraie photo produit, servie depuis `public/produits/`.
   * Quand elle est absente, l'illustration SVG <Plushie> prend le relais.
   */
  image?: string;
  badges: Badge[];
  collections: CollectionHandle[];
  /**
   * Rang de mise en avant : plus le nombre est petit, plus le doudou remonte
   * dans les grilles. Absent = ordre naturel du catalogue.
   */
  featured?: number;
  size: string;
  details: string[];
};

/* -------------------------------------------------------------------------- */
/*  Doudous — 9,99 €                                                          */
/* -------------------------------------------------------------------------- */

const catalog: Product[] = [
  {
    handle: "mimi-le-fantome",
    name: "Mimi le Fantôme",
    tagline: "Le fantôme le moins effrayant du monde.",
    description:
      "Mimi hante ton lit, ton canapé et surtout ton cœur. Un petit fantôme tout doux avec ses joues roses et son sourire timide. Il fait « bouh » mais très très gentiment.",
    price: DOUDOU_PRICE,
    variantId: "doudou-mimi-le-fantome",
    art: "ghost",
    palette: { body: "#fffdfb", accent: "#e3d6ff", blush: "#ffa8c8" },
    image: "/produits/ghost-pumpkin.webp",
    badges: ["halloween", "bestseller", "limited"],
    collections: ["halloween", "spooky", "editions-limitees"],
    featured: 10,
    size: "18 cm",
    details: [
      "Peluche ultra douce, garnissage moelleux",
      "Coutures renforcées pour les câlins intensifs",
      "Se glisse partout : sac, poche, table de nuit",
    ],
  },
  {
    handle: "pompom-la-citrouille",
    name: "Pompom la Citrouille",
    tagline: "Petite citrouille, grosse personnalité.",
    description:
      "Pompom a poussé dans un champ de citrouilles beaucoup trop mignon. Elle est ronde, orange et parfaitement calibrée pour tenir dans une main.",
    price: DOUDOU_PRICE,
    variantId: "doudou-pompom-la-citrouille",
    art: "pumpkin",
    image: "/produits/pumpkin.webp",
    palette: { body: "#ff9d4d", accent: "#6f4c38", blush: "#ff7fae" },
    badges: ["halloween", "bestseller"],
    collections: ["halloween", "cute"],
    featured: 12,
    size: "16 cm",
    details: [
      "Forme ronde super satisfaisante à serrer",
      "Petite tige verte cousue main",
      "La star de la spooky season",
    ],
  },
  {
    handle: "batou-la-chauve-souris",
    name: "Batou la Chauve-Souris",
    tagline: "Il dort la tête en bas, comme toi le dimanche.",
    description:
      "Batou a des ailes en velours et un regard de chaton. Il s'accroche à ton sac et te suit partout, même en plein jour.",
    price: DOUDOU_PRICE,
    variantId: "doudou-batou-la-chauve-souris",
    art: "bat",
    image: "/produits/bat.webp",
    palette: { body: "#b191ff", accent: "#9670f2", blush: "#ff7fae" },
    badges: ["halloween", "limited"],
    collections: ["halloween", "spooky", "editions-limitees"],
    size: "20 cm d'envergure",
    details: [
      "Ailes en velours tout doux",
      "Petites oreilles rembourrées",
      "Édition Halloween — jusqu'à épuisement",
    ],
  },
  {
    handle: "nocty-le-chat-noir",
    name: "Nocty le Chat Noir",
    tagline: "Un porte-bonheur qui fait semblant d'être un porte-malheur.",
    description:
      "Nocty est noir comme la nuit du 31 octobre, mais il ronronne dès qu'on le prend dans les bras. Son petit nœud rose est cousu à la main.",
    price: DOUDOU_PRICE,
    variantId: "doudou-nocty-le-chat-noir",
    art: "cat",
    palette: { body: "#4a2f22", accent: "#ffa8c8", blush: "#ff7fae" },
    badges: ["halloween", "new"],
    collections: ["halloween", "spooky"],
    size: "17 cm",
    details: [
      "Nœud rose amovible",
      "Moustaches brodées (rien à avaler)",
      "Le compagnon officiel de Mimi le Fantôme",
    ],
  },
  {
    handle: "sorcia-la-petite-sorciere",
    name: "Sorcia la Petite Sorcière",
    tagline: "Elle rate tous ses sorts, mais elle est adorable.",
    description:
      "Sorcia porte un chapeau violet un peu trop grand pour elle. Son sort préféré : transformer une mauvaise journée en soirée cocooning.",
    price: DOUDOU_PRICE,
    variantId: "doudou-sorcia-la-petite-sorciere",
    image: "/produits/pumpkin-witch.webp",
    art: "witch",
    palette: { body: "#ffe0ec", accent: "#9670f2", blush: "#f95d97" },
    badges: ["halloween", "limited", "new"],
    collections: ["halloween", "editions-limitees", "cute"],
    featured: 11,
    size: "19 cm",
    details: [
      "Chapeau de sorcière rembourré",
      "Étoiles brodées sur la robe",
      "Série limitée spooky season",
    ],
  },
  {
    handle: "arachou-la-petite-araignee",
    name: "Arachou la Petite Araignée",
    tagline: "8 pattes, 8 fois plus de câlins.",
    description:
      "Arachou est l'araignée la plus câline de la maison. Ses pattes sont molles et parfaites pour s'enrouler autour d'un poignet.",
    price: DOUDOU_PRICE,
    variantId: "doudou-arachou-la-petite-araignee",
    art: "spider",
    image: "/produits/spider.webp",
    palette: { body: "#9670f2", accent: "#33211a", blush: "#ffa8c8" },
    badges: ["halloween"],
    collections: ["halloween", "spooky"],
    size: "15 cm",
    details: [
      "Pattes souples et enroulables",
      "Grands yeux brillants (brodés)",
      "Beaucoup moins flippante qu'une vraie",
    ],
  },
  {
    handle: "creme-le-fantome-rose",
    name: "Crème le Fantôme Rose",
    tagline: "Le jumeau girly de Mimi.",
    description:
      "Crème est apparu un soir de pleine lune dans un nuage de barbe à papa. Depuis, il refuse de partir. Tant mieux.",
    price: DOUDOU_PRICE,
    variantId: "doudou-creme-le-fantome-rose",
    art: "ghost",
    palette: { body: "#ffe0ec", accent: "#ffc7dc", blush: "#f95d97" },
    badges: ["halloween", "new"],
    collections: ["halloween", "cute", "spooky"],
    size: "18 cm",
    details: [
      "Rose pastel très doux",
      "Sourire brodé fait main",
      "Se marie parfaitement avec Mimi",
    ],
  },
  {
    handle: "boubou-lourson",
    name: "Boubou l'Ourson",
    tagline: "Le classique indémodable.",
    description:
      "Boubou n'a pas besoin d'Halloween pour être irrésistible. C'est le doudou qu'on garde toute la vie.",
    price: DOUDOU_PRICE,
    variantId: "doudou-boubou-lourson",
    art: "bear",
    palette: { body: "#a97f63", accent: "#6f4c38", blush: "#ffa8c8" },
    image: "/produits/boubou-lifestyle.webp",
    badges: ["bestseller"],
    collections: ["classiques", "cute"],
    featured: 1,
    size: "22 cm",
    details: [
      "Notre doudou le plus vendu",
      "Peluche épaisse et moelleuse",
      "Le cadeau valeur sûre",
    ],
  },
  {
    handle: "guimauve-le-lapin",
    name: "Guimauve le Lapin",
    tagline: "Des oreilles qu'on ne peut pas s'empêcher de tripoter.",
    description:
      "Guimauve a de longues oreilles toutes molles et un petit nez rose. Il adore être posé sur un oreiller.",
    price: DOUDOU_PRICE,
    variantId: "doudou-guimauve-le-lapin",
    art: "bunny",
    palette: { body: "#fffdfb", accent: "#ffc7dc", blush: "#ff7fae" },
    image: "/produits/bunny-love.webp",
    badges: ["bestseller", "new"],
    collections: ["classiques", "cute"],
    featured: 2,
    size: "21 cm",
    details: [
      "Oreilles souples ultra satisfaisantes",
      "Nœud rose cousu main",
      "Parfait pour offrir",
    ],
  },
  {
    handle: "kaki-la-grenouille",
    name: "Kaki la Grenouille",
    tagline: "Elle fait « croa » mais en version mignonne.",
    description:
      "Kaki est verte, ronde et un peu bête. On l'adore pour ça. Elle tient assise toute seule sur une étagère.",
    price: DOUDOU_PRICE,
    variantId: "doudou-kaki-la-grenouille",
    art: "frog",
    palette: { body: "#9ad4a0", accent: "#5fa86c", blush: "#ff7fae" },
    badges: ["bestseller"],
    collections: ["classiques", "cute"],
    size: "17 cm",
    details: [
      "Tient assise toute seule",
      "Grands yeux tout ronds",
      "Le doudou préféré d'internet",
    ],
  },
  {
    handle: "etoilette",
    name: "Étoilette",
    tagline: "Une étoile filante qu'on peut serrer.",
    description:
      "Étoilette brille (pas vraiment, mais presque). C'est le doudou parfait pour une chambre remplie de guirlandes.",
    price: DOUDOU_PRICE,
    variantId: "doudou-etoilette",
    art: "star",
    palette: { body: "#ffd67a", accent: "#f97d1c", blush: "#ff7fae" },
    badges: ["new"],
    collections: ["cute", "classiques"],
    size: "18 cm",
    details: [
      "5 branches parfaitement rembourrées",
      "Se pose sur une étagère ou un lit",
      "Ambiance chambre cosy garantie",
    ],
  },
  {
    handle: "lunou-la-lune",
    name: "Lunou la Lune",
    tagline: "Le doudou officiel des soirées cocooning.",
    description:
      "Lunou a le sourire de quelqu'un qui a très bien dormi. Elle veille sur tes nuits, sans jamais faire de bruit.",
    price: DOUDOU_PRICE,
    variantId: "doudou-lunou-la-lune",
    art: "moon",
    palette: { body: "#f2ebff", accent: "#cbb4ff", blush: "#ffa8c8" },
    badges: ["new", "limited"],
    collections: ["cute", "editions-limitees"],
    size: "19 cm",
    details: [
      "Croissant de lune tout doux",
      "Petites étoiles brodées",
      "Série limitée nuit magique",
    ],
  },
  {
    handle: "champi-le-champignon",
    name: "Champi le Champignon",
    tagline: "Cueilli dans une forêt d'automne imaginaire.",
    description:
      "Champi a un chapeau rouge à pois crème et un petit air malicieux. Il adore les ambiances feuilles mortes et bougies.",
    price: DOUDOU_PRICE,
    variantId: "doudou-champi-le-champignon",
    art: "mushroom",
    palette: { body: "#fffdfb", accent: "#e26404", blush: "#ff7fae" },
    badges: ["new"],
    collections: ["cute", "classiques"],
    size: "16 cm",
    details: [
      "Pois crème cousus un par un",
      "Base lestée : il tient debout",
      "Vibe automne absolue",
    ],
  },
  {
    handle: "bonbec-le-bonbon",
    name: "Bonbec le Bonbon",
    tagline: "Zéro calorie, 100 % câlins.",
    description:
      "Bonbec est un bonbon géant emballé dans du tissu tout doux. Il ne fond pas et ne colle pas aux dents.",
    price: DOUDOU_PRICE,
    variantId: "doudou-bonbec-le-bonbon",
    art: "candy",
    palette: { body: "#ffa8c8", accent: "#ff9d4d", blush: "#f95d97" },
    badges: ["halloween", "new"],
    collections: ["halloween", "cute"],
    size: "20 cm",
    details: [
      "Forme papillote très satisfaisante",
      "Le cadeau parfait pour un trick-or-treat",
      "Rayures pastel",
    ],
  },
  {
    handle: "crano-le-petit-crane",
    name: "Crâno le Petit Crâne",
    tagline: "Spooky, mais il a des joues roses.",
    description:
      "Crâno est la preuve qu'un crâne peut être adorable. Le doudou qui fait sourire même les gens qui n'aiment pas Halloween.",
    price: DOUDOU_PRICE,
    variantId: "doudou-crano-le-petit-crane",
    art: "skull",
    image: "/produits/skeleton-panda.webp",
    palette: { body: "#fff7ef", accent: "#cbb4ff", blush: "#ff7fae" },
    badges: ["halloween", "limited"],
    collections: ["halloween", "spooky", "editions-limitees"],
    size: "16 cm",
    details: [
      "Nœud lilas sur le crâne",
      "Version très très mignonne",
      "Édition limitée — jusqu'à épuisement",
    ],
  },
  {
    handle: "canaou-le-canard",
    name: "Canaou le Canard",
    tagline: "Il a mis un chapeau de citrouille et il est très fier.",
    description:
      "Canaou n'est pas du tout effrayant et il assume complètement. Son mini chapeau citrouille est cousu sur la tête.",
    price: DOUDOU_PRICE,
    variantId: "doudou-canaou-le-canard",
    art: "duck",
    palette: { body: "#ffd67a", accent: "#f97d1c", blush: "#ff7fae" },
    badges: ["halloween", "new"],
    collections: ["halloween", "cute"],
    size: "15 cm",
    details: [
      "Mini chapeau citrouille cousu",
      "Bec tout plat très drôle",
      "Format mini, gros effet",
    ],
  },
  {
    handle: "nuagette",
    name: "Nuagette",
    tagline: "Le doudou le plus doux de la boutique.",
    description:
      "Nuagette, c'est un peu comme serrer un nuage. Sauf qu'elle a des yeux et qu'elle ne pleut jamais dessus.",
    price: DOUDOU_PRICE,
    variantId: "doudou-nuagette",
    art: "cloud",
    palette: { body: "#fffdfb", accent: "#e3d6ff", blush: "#ffa8c8" },
    badges: ["bestseller"],
    collections: ["classiques", "cute"],
    size: "20 cm",
    details: [
      "La peluche la plus douce de la gamme",
      "Forme nuage toute molle",
      "Best-seller depuis le premier jour",
    ],
  },
  {
    handle: "citrouillette",
    name: "Citrouillette",
    tagline: "La mini citrouille à accrocher au sac.",
    description:
      "Citrouillette est la petite sœur de Pompom. Elle tient dans une poche et fait fondre tout le monde dans le métro.",
    price: DOUDOU_PRICE,
    variantId: "doudou-citrouillette",
    art: "pumpkin",
    palette: { body: "#ffb877", accent: "#a97f63", blush: "#f95d97" },
    badges: ["halloween", "limited"],
    collections: ["halloween", "editions-limitees", "cute"],
    size: "12 cm",
    details: [
      "Format mini avec anneau",
      "S'accroche au sac ou aux clés",
      "Édition Halloween limitée",
    ],
  },
  {
    handle: "momo-la-momie",
    name: "Momo la Momie",
    tagline: "Emmailloté de bandelettes, jamais de mauvaise humeur.",
    description:
      "Momo s'est réveillé un peu enroulé mais très câlin. Ses bandelettes en tissu tout doux ne cachent qu'une chose : deux yeux tout ronds et un sourire timide.",
    price: DOUDOU_PRICE,
    variantId: "doudou-momo-la-momie",
    art: "bear",
    palette: { body: "#fffaf0", accent: "#e8dcc8", blush: "#ffa8c8" },
    image: "/produits/mummy.webp",
    badges: ["halloween", "new"],
    collections: ["halloween", "spooky"],
    size: "18 cm",
    details: [
      "Bandelettes cousues, non amovibles",
      "Aussi doux qu'un doudou classique",
      "Édition Halloween limitée",
    ],
  },
  {
    handle: "faucho-le-petit-faucheur",
    name: "Faucho le Petit Faucheur",
    tagline: "Il vient chercher... des câlins, rien de plus.",
    description:
      "Faucho porte une cape à capuche et une petite faux en velours, mais c'est le doudou le moins effrayant du cimetière. Son fantôme brodé sur l'épaule lui tient compagnie.",
    price: DOUDOU_PRICE,
    variantId: "doudou-faucho-le-petit-faucheur",
    art: "bear",
    palette: { body: "#fff3e6", accent: "#5c6470", blush: "#ffa8c8" },
    image: "/produits/grim-reaper.webp",
    badges: ["halloween", "new", "limited"],
    collections: ["halloween", "spooky", "editions-limitees"],
    size: "17 cm",
    details: [
      "Cape à capuche amovible",
      "Petite faux en velours (inoffensive)",
      "Édition Halloween — jusqu'à épuisement",
    ],
  },
  {
    handle: "jacko-le-chasseur-de-bonbons",
    name: "Jacko le Chasseur de Bonbons",
    tagline: "Prêt pour sa tournée du 31 octobre.",
    description:
      "Jacko a mis son pull citrouille, son chapeau pointu et sa petite lanterne autour du cou. Il est équipé, motivé, et il compte bien remplir son seau.",
    price: DOUDOU_PRICE,
    variantId: "doudou-jacko-le-chasseur-de-bonbons",
    art: "pumpkin",
    palette: { body: "#ffdcb0", accent: "#e2621b", blush: "#ffa8c8" },
    image: "/produits/jacko.webp",
    badges: ["halloween", "new", "limited"],
    collections: ["halloween", "editions-limitees", "cute"],
    size: "20 cm",
    details: [
      "Pull citrouille tricoté et chapeau amovibles",
      "Mini lanterne citrouille en pendentif",
      "Édition Halloween limitée",
    ],
  },
  {
    handle: "skelly-la-chauve-souris",
    name: "Skelly la Chauve-Souris",
    tagline: "Un squelette, mais en rose et avec un nœud.",
    description:
      "Skelly porte une combinaison de chauve-souris avec un squelette brodé rose bonbon. Le seul squelette au monde qu'on a envie de serrer dans ses bras.",
    price: DOUDOU_PRICE,
    variantId: "doudou-skelly-la-chauve-souris",
    art: "bat",
    palette: { body: "#5c5560", accent: "#ffa8c8", blush: "#f95d97" },
    image: "/produits/bat-skeleton.webp",
    badges: ["halloween", "new", "limited"],
    collections: ["halloween", "spooky", "editions-limitees"],
    size: "18 cm",
    details: [
      "Combinaison à capuche avec ailes",
      "Squelette brodé rose et petit nœud",
      "Édition Halloween — jusqu'à épuisement",
    ],
  },
  {
    handle: "dino-le-petit-dragon",
    name: "Dino le Petit Dragon",
    tagline: "Un dragon qui ne crache que des câlins.",
    description:
      "Dino porte une combinaison verte avec des petites dents cousues et une crête sur la tête. Il a beau rugir, il ne fait vraiment pas peur.",
    price: DOUDOU_PRICE,
    variantId: "doudou-dino-le-petit-dragon",
    art: "bear",
    palette: { body: "#cde8c4", accent: "#8fbf7a", blush: "#ffa8c8" },
    image: "/produits/dino-green.webp",
    badges: ["new"],
    collections: ["classiques", "cute"],
    featured: 3,
    size: "18 cm",
    details: [
      "Combinaison à capuche avec crête cousue",
      "Petites dents brodées (inoffensives)",
      "Zip pratique pour habiller/déshabiller",
    ],
  },
  {
    handle: "dina-la-petite-dragonne",
    name: "Dina la Petite Dragonne",
    tagline: "La cousine rose de Dino, tout aussi peu dangereuse.",
    description:
      "Dina a les mêmes petites dents et la même crête que son cousin Dino, version rose bonbon. Elle adore les câlins et les siestes.",
    price: DOUDOU_PRICE,
    variantId: "doudou-dina-la-petite-dragonne",
    art: "bear",
    palette: { body: "#ffcfe0", accent: "#f6a0c1", blush: "#f95d97" },
    image: "/produits/dino-pink.webp",
    badges: ["new"],
    collections: ["classiques", "cute"],
    featured: 4,
    size: "18 cm",
    details: [
      "Combinaison à capuche avec crête cousue",
      "Petites ailes brodées dans le dos",
      "Duo parfait avec Dino le Petit Dragon",
    ],
  },
  {
    handle: "vanille-lourson-cocooning",
    name: "Vanille l'Ourson Cocooning",
    tagline: "Toujours en pyjama, jamais pressé.",
    description:
      "Vanille porte une combinaison toute pelucheuse avec petites oreilles et pompons aux pattes. Le doudou officiel des dimanches sous plaid.",
    price: DOUDOU_PRICE,
    variantId: "doudou-vanille-lourson-cocooning",
    art: "bear",
    palette: { body: "#fbf2d9", accent: "#e8d4a0", blush: "#ffa8c8" },
    image: "/produits/bear-cream-pompom.webp",
    badges: ["new", "bestseller"],
    collections: ["classiques", "cute"],
    featured: 6,
    size: "19 cm",
    details: [
      "Combinaison ultra pelucheuse à capuche",
      "Pompons cousus aux pattes",
      "Le plus doux de toute la gamme cocooning",
    ],
  },
  {
    handle: "noisette-lourson-baroudeur",
    name: "Noisette l'Ourson Baroudeur",
    tagline: "Salopette et bonnet, prêt pour l'aventure (du canapé).",
    description:
      "Noisette porte une salopette en velours côtelé et un bonnet à oreillettes brodé. Un look de baroudeur pour un doudou qui ne bouge jamais du lit.",
    price: DOUDOU_PRICE,
    variantId: "doudou-noisette-lourson-baroudeur",
    art: "bear",
    palette: { body: "#d9b98c", accent: "#a97f63", blush: "#ffa8c8" },
    image: "/produits/bear-trapper-overalls.webp",
    badges: ["new"],
    collections: ["classiques", "cute"],
    size: "19 cm",
    details: [
      "Salopette en velours côtelé amovible",
      "Bonnet à oreillettes brodé",
      "T-shirt imprimé sous la salopette",
    ],
  },
  {
    handle: "miel-lourson-abeille",
    name: "Miel l'Ourson Abeille",
    tagline: "Il butine des câlins toute la journée.",
    description:
      "Miel porte un costume rayé jaune et marron avec deux petites antennes à pompons. Il ne pique jamais, promis.",
    price: DOUDOU_PRICE,
    variantId: "doudou-miel-lourson-abeille",
    art: "bear",
    palette: { body: "#fbe27a", accent: "#8a6144", blush: "#ffa8c8" },
    image: "/produits/bee.webp",
    badges: ["new"],
    collections: ["classiques", "cute"],
    featured: 8,
    size: "20 cm",
    details: [
      "Costume rayé avec antennes à pompons",
      "Cousu sur un ourson au visage rosé",
      "Le doudou préféré des amateurs de miel",
    ],
  },
  {
    handle: "reva-lourson-pyjama",
    name: "Rêva l'Ourson Pyjama",
    tagline: "Prête pour sa nuit de 12 heures.",
    description:
      "Rêva porte un pyjama rose avec des nuages brodés et de petits chaussons assortis. Elle ne quitte jamais son lit avant midi.",
    price: DOUDOU_PRICE,
    variantId: "doudou-reva-lourson-pyjama",
    art: "bear",
    palette: { body: "#ffd9e8", accent: "#fef6ea", blush: "#f95d97" },
    image: "/produits/pajama-pink.webp",
    badges: ["new"],
    collections: ["classiques", "cute"],
    size: "19 cm",
    details: [
      "Pyjama avec nuages brodés",
      "Petits chaussons cousus aux pieds",
      "Bonnet de nuit à volants",
    ],
  },
  {
    handle: "trompette-lourson-elephant",
    name: "Trompette l'Ourson Éléphant",
    tagline: "De grandes oreilles, surtout pour mieux t'écouter.",
    description:
      "Trompette porte une combinaison bleu-gris avec deux immenses oreilles roses à l'intérieur et deux petits badges éléphant. Un câlin XXL garanti.",
    price: DOUDOU_PRICE,
    variantId: "doudou-trompette-lourson-elephant",
    art: "bear",
    palette: { body: "#7c8ba1", accent: "#ffc7dc", blush: "#ffa8c8" },
    image: "/produits/elephant.webp",
    badges: ["new"],
    collections: ["classiques", "cute"],
    featured: 9,
    size: "20 cm",
    details: [
      "Immenses oreilles à l'intérieur rose",
      "Petits badges éléphant brodés",
      "Combinaison à capuche zippée",
    ],
  },
  {
    handle: "moumou-la-vache",
    name: "Moumou la Vache",
    tagline: "Elle ne fait pas « meuh », elle fait des câlins.",
    description:
      "Moumou porte une combinaison à taches noires et blanches avec deux petites cornes marron. Le doudou parfait pour les amoureux de la ferme.",
    price: DOUDOU_PRICE,
    variantId: "doudou-moumou-la-vache",
    art: "bear",
    palette: { body: "#f5f5f0", accent: "#2b2b2b", blush: "#ffa8c8" },
    image: "/produits/cow.webp",
    badges: ["new"],
    collections: ["classiques", "cute"],
    size: "18 cm",
    details: [
      "Combinaison à capuche imprimée vache",
      "Petites cornes cousues",
      "Zip pratique pour habiller/déshabiller",
    ],
  },
  {
    handle: "koko-lourson-koala",
    name: "Koko l'Ourson Koala",
    tagline: "Il dort 20 heures par jour, comme un vrai.",
    description:
      "Koko porte une combinaison grise avec un ventre blanc tout doux et deux rondes oreilles. Champion toutes catégories de la sieste.",
    price: DOUDOU_PRICE,
    variantId: "doudou-koko-lourson-koala",
    art: "bear",
    palette: { body: "#a9adb3", accent: "#fdfdfd", blush: "#ffa8c8" },
    image: "/produits/koala.webp",
    badges: ["new"],
    collections: ["classiques", "cute"],
    featured: 7,
    size: "19 cm",
    details: [
      "Combinaison grise avec ventre blanc",
      "Grandes oreilles rondes cousues",
      "Le plus câlin des marsupiaux",
    ],
  },
  {
    handle: "basile-lourson-baby-chic",
    name: "Basile l'Ourson Baby Chic",
    tagline: "Bonnet, écharpe et petites baskets : plus stylé que toi.",
    description:
      "Basile porte une salopette rayée, un bonnet à oreilles, une écharpe brodée et de mini baskets blanches. Le doudou le mieux habillé de la crèche.",
    price: DOUDOU_PRICE,
    variantId: "doudou-basile-lourson-baby-chic",
    art: "bear",
    palette: { body: "#fdf6ea", accent: "#a8d4e8", blush: "#ffa8c8" },
    image: "/produits/bear-streetwear.webp",
    badges: ["new"],
    collections: ["classiques", "cute"],
    size: "21 cm",
    details: [
      "Bonnet, écharpe et salopette amovibles",
      "Mini baskets à lacets cousues aux pieds",
      "Look complet, prêt à défiler",
    ],
  },
  {
    handle: "colette-lourson-retro",
    name: "Colette l'Ourson Rétro",
    tagline: "Béret, cape à carreaux : elle a du style depuis toujours.",
    description:
      "Colette porte un béret et une cape à carreaux bordeaux avec un col en dentelle, sur une petite jupe plissée marron. Chic depuis sa naissance.",
    price: DOUDOU_PRICE,
    variantId: "doudou-colette-lourson-retro",
    art: "bear",
    palette: { body: "#e8d4b0", accent: "#6b3a3a", blush: "#ffa8c8" },
    image: "/produits/bear-vintage.webp",
    badges: ["new"],
    collections: ["classiques", "cute"],
    size: "18 cm",
    details: [
      "Béret et cape à carreaux amovibles",
      "Col en dentelle et jupe plissée",
      "Un look qui ne se démode jamais",
    ],
  },
  {
    handle: "fraisette-la-lapine",
    name: "Fraisette la Lapine",
    tagline: "Toujours partante pour une sortie shopping.",
    description:
      "Fraisette porte une combinaison rose avec un cœur brodé et un petit sac à fraises assorti. Une lapine tout doux avec des goûts très sûrs.",
    price: DOUDOU_PRICE,
    variantId: "doudou-fraisette-la-lapine",
    art: "bunny",
    palette: { body: "#fffdfb", accent: "#ffc7dc", blush: "#f95d97" },
    image: "/produits/bunny-strawberry.webp",
    badges: ["new"],
    collections: ["classiques", "cute"],
    featured: 5,
    size: "22 cm",
    details: [
      "Combinaison rose avec cœur brodé",
      "Petit sac à fraises amovible",
      "Longues oreilles ultra douces",
    ],
  },
  {
    handle: "praline-la-lapine",
    name: "Praline la Lapine",
    tagline: "Elle est née dans un œuf, littéralement.",
    description:
      "Praline porte un costume d'œuf de Pâques rose à pois multicolores. Une lapine toute blanche qui adore les chasses aux œufs.",
    price: DOUDOU_PRICE,
    variantId: "doudou-praline-la-lapine",
    art: "bunny",
    palette: { body: "#fffdfb", accent: "#ffb877", blush: "#ff7fae" },
    image: "/produits/bunny-egg.webp",
    badges: ["new"],
    collections: ["classiques", "cute"],
    size: "20 cm",
    details: [
      "Costume d'œuf de Pâques amovible",
      "Motifs pois multicolores cousus",
      "Édition printemps",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Doudou Mystère — 2 €                                                      */
/* -------------------------------------------------------------------------- */

export const mysteryProduct: Product = {
  handle: "doudou-mystere",
  name: "Doudou Mystère 🎃",
  tagline: "2 € et on choisit ton petit compagnon à ta place.",
  description:
    "Tu paies 2 €, on pioche un doudou dans la collection Halloween et on te l'envoie. Impossible de savoir lequel avant d'ouvrir le colis. C'est tout l'intérêt.",
  price: MYSTERY_PRICE,
  variantId: "doudou-mystere-halloween",
  art: "ghost",
  palette: { body: "#e3d6ff", accent: "#b191ff", blush: "#ff7fae" },
  image: "/produits/doudou-mystere.webp",
  badges: ["halloween", "limited"],
  collections: ["halloween", "editions-limitees"],
  size: "12 à 20 cm selon le doudou",
  details: [
    "1 doudou surprise pioché dans la collection Halloween",
    "Impossible de choisir : c'est le principe",
    "Aucun doublon garanti si tu en prends plusieurs",
  ],
};

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Ce que la boutique expose.
 *
 * Un doudou sans photo n'est pas affiché : une carte vide ou une illustration
 * de remplacement ne vend rien et casse la grille. Il reste dans `catalog`
 * (donc dans un futur mapping Shopify) et réapparaît seul le jour où on lui
 * ajoute une image.
 *
 * L'ordre est un ordre de merchandising : `featured` d'abord (les doudous à
 * plus fort potentiel), le reste ensuite dans l'ordre du catalogue.
 */
export const products: Product[] = catalog
  .filter((p) => p.image)
  .sort((a, b) => (a.featured ?? Infinity) - (b.featured ?? Infinity));

/** Les têtes d'affiche, pour le hero et les sections « les plus mignons ». */
export const featuredProducts: Product[] = products.filter((p) => p.featured !== undefined);

export const allProducts: Product[] = [...products, mysteryProduct];

export function formatPrice(cents: number): string {
  return `${(cents / 100).toFixed(2).replace(".", ",")} €`;
}

export function getProduct(handle: string): Product | undefined {
  return allProducts.find((p) => p.handle === handle);
}

export function getByCollection(handle: CollectionHandle): Product[] {
  return products.filter((p) => p.collections.includes(handle));
}

export function getBadged(badge: Badge): Product[] {
  return products.filter((p) => p.badges.includes(badge));
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) =>
    [p.name, p.tagline, p.description, ...p.collections].join(" ").toLowerCase().includes(q),
  );
}

/** Suggestions de fin de fiche produit : même univers d'abord, puis les vedettes. */
export function getRelated(product: Product, limit = 4): Product[] {
  const others = products.filter((p) => p.handle !== product.handle);
  const sameUniverse = others.filter((p) =>
    p.collections.some((c) => product.collections.includes(c)),
  );
  return [...new Set([...sameUniverse, ...others])].slice(0, limit);
}
