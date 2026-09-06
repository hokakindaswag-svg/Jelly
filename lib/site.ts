/**
 * Contenu éditorial de Doudoumimi : navigation, collections, réassurance,
 * avis et FAQ. Tout est centralisé ici pour qu'un futur portage Shopify
 * n'ait qu'à remplacer la source des données, pas les composants.
 *
 * Rappel produit : le prix unitaire (9,99 €) est le seul affiché en boutique.
 * La grille dégressive par quantité ne se dévoile que dans le panier.
 */

import type { CollectionHandle, PlushieArt } from "./products";

export const site = {
  name: "Doudoumimi",
  tagline: "Des doudous beaucoup trop mignons à adopter.",
  baseline: "Des doudous beaucoup trop mignons.",
  description:
    "Boutique française de doudous et peluches trop mignons. Tous les doudous à 9,99 € et le Doudou Mystère Halloween à 2 €.",
  email: "coucou@doudoumimi.fr",
  instagram: "https://instagram.com/doudoumimi",
  tiktok: "https://tiktok.com/@doudoumimi",
} as const;

export const mainNav = [
  { label: "Accueil", href: "/" },
  { label: "Doudous", href: "/doudous" },
  { label: "Halloween 🎃", href: "/collections/halloween" },
  { label: "Doudou Mystère", href: "/doudou-mystere" },
  { label: "Best-sellers", href: "/best-sellers" },
  { label: "FAQ", href: "/faq" },
];

export const announcements = [
  "🎃 Édition Halloween limitée — jusqu'à épuisement des stocks",
  "👻 Doudou Mystère : 2 € seulement",
  "💌 Expédition depuis l'Europe",
  "🚚 Livraison offerte sur toute la boutique",
];

export type Collection = {
  handle: CollectionHandle;
  emoji: string;
  title: string;
  subtitle: string;
  blurb: string;
  art: PlushieArt;
  colors: { from: string; to: string };
};

export const collections: Collection[] = [
  {
    handle: "halloween",
    emoji: "🎃",
    title: "Halloween",
    subtitle: "Édition limitée",
    blurb: "Des petits monstres beaucoup trop mignons, disponibles seulement pendant la spooky season.",
    art: "pumpkin",
    colors: { from: "#ffe6d5", to: "#ffb877" },
  },
  {
    handle: "classiques",
    emoji: "🧸",
    title: "Doudous classiques",
    subtitle: "Les valeurs sûres",
    blurb: "Ours, lapins, nuages : les doudous qu'on garde toute la vie.",
    art: "bear",
    colors: { from: "#fff4ec", to: "#e5c6ae" },
  },
  {
    handle: "spooky",
    emoji: "👻",
    title: "Doudous spooky",
    subtitle: "Spooky mais adorable",
    blurb: "Fantômes, chats noirs et araignées câlines. Zéro cauchemar garanti.",
    art: "ghost",
    colors: { from: "#f2ebff", to: "#cbb4ff" },
  },
  {
    handle: "cute",
    emoji: "🎀",
    title: "Doudous cute",
    subtitle: "Overdose de mignon",
    blurb: "Nœuds, joues roses et pastels. La catégorie dangereuse pour ton portefeuille.",
    art: "bunny",
    colors: { from: "#fff1f6", to: "#ffc7dc" },
  },
  {
    handle: "editions-limitees",
    emoji: "✨",
    title: "Éditions limitées",
    subtitle: "Une fois épuisé, il disparaît",
    blurb: "Des séries produites une seule fois. Quand c'est fini, c'est vraiment fini.",
    art: "star",
    colors: { from: "#fff7ef", to: "#ffd67a" },
  },
];

export const trustBadges = [
  {
    emoji: "🧸",
    title: "Doudous sélectionnés à la main",
    text: "Chaque modèle est testé par l'équipe avant d'entrer dans la collection.",
  },
  {
    emoji: "💌",
    title: "Expédition depuis l'Europe",
    text: "Colis préparé et posté depuis notre entrepôt européen.",
  },
  {
    emoji: "🔒",
    title: "Paiement sécurisé",
    text: "Carte bancaire, Apple Pay et Google Pay via un paiement chiffré.",
  },
  {
    emoji: "🚚",
    title: "Livraison offerte",
    text: "Sur toutes les commandes, sans minimum d'achat. Colis suivi.",
  },
  {
    emoji: "💕",
    title: "Support client",
    text: `Une question ? Écris-nous à ${site.email}, on répond vite.`,
  },
];

export type Review = {
  name: string;
  handle: string;
  rating: number;
  title: string;
  text: string;
  product: string;
  emoji: string;
};

export const reviews: Review[] = [
  {
    name: "Léa",
    handle: "@leaaa.png",
    rating: 5,
    title: "J'en ai pris 3 d'un coup",
    text: "À 9,99 € j'ai pas réfléchi. Mimi le Fantôme est encore plus doux qu'en photo, il dort avec moi depuis.",
    product: "Mimi le Fantôme",
    emoji: "👻",
  },
  {
    name: "Camille",
    handle: "@cam.miille",
    rating: 5,
    title: "Le Doudou Mystère c'est trop bien",
    text: "J'ai tenté à 2 € pour rigoler et j'ai reçu Sorcia. Franchement je l'aurais jamais choisie et c'est ma préférée.",
    product: "Doudou Mystère",
    emoji: "🎃",
  },
  {
    name: "Inès",
    handle: "@ines.rvr",
    rating: 5,
    title: "Cadeau parfait",
    text: "Offert à ma petite sœur pour Halloween, elle a crié. Emballage trop mignon en plus.",
    product: "Pompom la Citrouille",
    emoji: "🧡",
  },
  {
    name: "Manon",
    handle: "@manonx3",
    rating: 4,
    title: "Trop mignon, arrivé vite",
    text: "Batou est minuscule mais parfait sur mon sac. Je retire une étoile juste parce que je le voulais plus grand.",
    product: "Batou la Chauve-Souris",
    emoji: "🦇",
  },
  {
    name: "Jade",
    handle: "@jadeee.co",
    rating: 5,
    title: "Vue sur TikTok, achetée en 30 sec",
    text: "Le site est trop simple, j'ai cliqué sur acheter et c'était réglé. Nuagette est ultra douce.",
    product: "Nuagette",
    emoji: "☁️",
  },
  {
    name: "Sarah",
    handle: "@sarahhh.b",
    rating: 5,
    title: "Attention c'est addictif",
    text: "J'ai commencé par un doudou. J'en ai 5. Je ne compte pas m'arrêter là.",
    product: "Guimauve le Lapin",
    emoji: "🎀",
  },
];

export const faq = [
  {
    q: "Pourquoi tous les doudous sont à 9,99 € ?",
    a: "Parce qu'on préfère un prix unique, simple et clair plutôt que de te faire comparer 40 étiquettes. Tu choisis avec le cœur, pas avec une calculatrice. Tous les doudous du site sont à 9,99 €, sans exception.",
  },
  {
    q: "C'est quoi exactement le Doudou Mystère ?",
    a: "Pour 2 €, on choisit un doudou à ta place dans la collection Halloween et on te l'envoie. Tu ne sais pas lequel tu vas recevoir avant d'ouvrir le colis. Si tu en commandes plusieurs, on évite les doublons.",
  },
  {
    q: "Je peux choisir mon Doudou Mystère ?",
    a: "Non, sinon ce ne serait plus un mystère 👻 Si tu veux un modèle précis, prends-le directement dans la boutique.",
  },
  {
    q: "Je peux commander plusieurs doudous ?",
    a: "Oui, jusqu'à 10 doudous par commande. Ajoute-les à ton panier : plus tu en prends, plus le prix total devient intéressant. Le détail s'affiche directement dans le panier.",
  },
  {
    q: "La livraison est-elle payante ?",
    a: "Non. La livraison est offerte sur toutes les commandes, sans minimum d'achat.",
  },
  {
    q: "Comment se passe la livraison ?",
    a: "Ton colis part de notre entrepôt européen et tu reçois un numéro de suivi par e-mail dès l'expédition.",
  },
  {
    q: "Les éditions limitées reviennent-elles en stock ?",
    a: "Non. Les séries Halloween sont produites une seule fois. Quand un modèle est épuisé, il disparaît du site.",
  },
  {
    q: "Les doudous conviennent aux enfants ?",
    a: "Nos doudous sont conçus comme des peluches à collectionner. Pour les tout-petits (moins de 3 ans), vérifie toujours les indications présentes sur l'étiquette du produit reçu.",
  },
  {
    q: "Comment laver mon doudou ?",
    a: "Lavage à la main à l'eau tiède avec un peu de savon doux, puis séchage à l'air libre. Pas de sèche-linge : il n'aimerait pas.",
  },
  {
    q: "Une question qui n'est pas ici ?",
    a: `Écris-nous à ${site.email}, on répond en général sous 24 h.`,
  },
];
