/**
 * Tarification Doudoumimi.
 *
 * Le prix affiché partout dans la boutique est le prix unitaire : 9,99 €.
 * Les paliers dégressifs ne sont JAMAIS annoncés sur la home, les cartes ou
 * les fiches produit — ils se découvrent dans le panier. C'est le moment
 * « ah, si j'en prends plusieurs… » sur lequel repose toute la conversion.
 *
 * Le Doudou Mystère à 2 € vit hors de cette grille : il s'ajoute au total
 * sans compter dans le palier ni dans le plafond de 10 doudous.
 */

import { DOUDOU_PRICE, MYSTERY_PRICE } from "./products";

/** Au-delà, la grille tarifaire n'a plus de sens : la commande est plafonnée. */
export const MAX_DOUDOUS = 10;

/** Prix total (en centimes) d'un lot de N doudous, index = quantité. */
const TIER_TOTALS = [0, 999, 1999, 1999, 1999, 4999, 4999, 4999, 7999, 7999, 9999];

export type Tier = {
  /** Quantité minimale pour déclencher ce palier. */
  min: number;
  /** Quantité maximale couverte par ce palier. */
  max: number;
  /** Prix total du palier, en centimes. */
  total: number;
};

/** La grille telle qu'elle est présentée dans le panier. */
export const TIERS: Tier[] = [
  { min: 1, max: 1, total: 999 },
  { min: 2, max: 4, total: 1999 },
  { min: 5, max: 7, total: 4999 },
  { min: 8, max: 9, total: 7999 },
  { min: 10, max: 10, total: 9999 },
];

/** Prix total des doudous pour une quantité donnée, plafonné à 10. */
export function doudouTotal(quantity: number): number {
  const q = Math.max(0, Math.min(MAX_DOUDOUS, Math.floor(quantity)));
  return TIER_TOTALS[q] ?? 0;
}

/** Ce que la même quantité coûterait sans les paliers — sert à chiffrer l'économie. */
export function undiscountedTotal(quantity: number): number {
  return Math.max(0, Math.min(MAX_DOUDOUS, Math.floor(quantity))) * DOUDOU_PRICE;
}

export function savingsFor(quantity: number): number {
  return Math.max(0, undiscountedTotal(quantity) - doudouTotal(quantity));
}

export function tierFor(quantity: number): Tier | undefined {
  return TIERS.find((t) => quantity >= t.min && quantity <= t.max);
}

export type NextTierHint = {
  /** Nombre de doudous à ajouter pour atteindre le palier suivant. */
  missing: number;
  /** Quantité une fois le palier atteint. */
  target: number;
  /** Prix total à ce palier. */
  total: number;
};

/**
 * Le meilleur argument à afficher dans le panier : soit « encore N doudous pour
 * le palier suivant », soit « tu peux en ajouter N sans payer un centime de plus »
 * quand le palier courant n'est pas encore rempli.
 */
export function nextTierHint(quantity: number): NextTierHint | null {
  if (quantity >= MAX_DOUDOUS) return null;
  const current = tierFor(quantity);
  // Palier courant pas encore saturé : les doudous suivants sont offerts.
  if (current && quantity < current.max) {
    return { missing: current.max - quantity, target: current.max, total: current.total };
  }
  const next = TIERS.find((t) => t.min > quantity);
  if (!next) return null;
  return { missing: next.min - quantity, target: next.min, total: next.total };
}

/** Total de la commande, Doudous Mystère compris. La livraison est toujours offerte. */
export function orderTotal(doudouCount: number, mysteryCount: number): number {
  return doudouTotal(doudouCount) + mysteryCount * MYSTERY_PRICE;
}
