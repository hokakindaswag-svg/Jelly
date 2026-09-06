"use client";

/**
 * Panier Doudoumimi.
 *
 * Stocké dans le navigateur (localStorage) : le site est exporté en statique,
 * il n'y a pas de session serveur. Le panier ne contient que des handles et des
 * quantités — les prix sont toujours recalculés depuis `lib/pricing`, jamais
 * persistés, pour qu'un panier gardé plusieurs jours ne fige pas un vieux tarif.
 *
 * Le Doudou Mystère est compté à part : il ne rentre pas dans la grille de
 * paliers ni dans le plafond de 10 doudous.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { MAX_DOUDOUS, doudouTotal, orderTotal, savingsFor } from "@/lib/pricing";
import { MYSTERY_PRICE, getProduct, mysteryProduct, type Product } from "@/lib/products";

const STORAGE_KEY = "doudoumimi.cart.v1";

export type CartLine = { handle: string; quantity: number };

type CartState = {
  lines: CartLine[];
  /** Ligne + produit résolu, dans l'ordre d'ajout. Les handles inconnus sont ignorés. */
  items: { product: Product; quantity: number }[];
  /** Doudous à 9,99 € uniquement (hors Doudou Mystère). */
  doudouCount: number;
  mysteryCount: number;
  /** Vrai dès que le plafond de 10 doudous est atteint. */
  isFull: boolean;
  doudousTotal: number;
  savings: number;
  total: number;
  /** Le panier n'est lu qu'après hydratation : évite un flash de panier vide. */
  ready: boolean;
  isOpen: boolean;
  add: (handle: string, quantity?: number) => void;
  setQuantity: (handle: string, quantity: number) => void;
  remove: (handle: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartState | null>(null);

function readStored(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((entry) => {
      if (typeof entry !== "object" || entry === null) return [];
      const { handle, quantity } = entry as Record<string, unknown>;
      if (typeof handle !== "string" || typeof quantity !== "number") return [];
      const q = Math.floor(quantity);
      return q > 0 && getProduct(handle) ? [{ handle, quantity: q }] : [];
    });
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setLines(readStored());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Navigation privée ou stockage plein : le panier reste valable pour la session.
    }
  }, [lines, ready]);

  const items = useMemo(
    () =>
      lines.flatMap((line) => {
        const product = getProduct(line.handle);
        return product ? [{ product, quantity: line.quantity }] : [];
      }),
    [lines],
  );

  const doudouCount = items
    .filter((i) => i.product.handle !== mysteryProduct.handle)
    .reduce((n, i) => n + i.quantity, 0);
  const mysteryCount =
    items.find((i) => i.product.handle === mysteryProduct.handle)?.quantity ?? 0;

  /** Applique le plafond global : on n'ajoute que ce qui reste de place. */
  const capacityFor = useCallback(
    (handle: string, current: CartLine[]) => {
      if (handle === mysteryProduct.handle) return Infinity;
      const others = current
        .filter((l) => l.handle !== handle && l.handle !== mysteryProduct.handle)
        .reduce((n, l) => n + l.quantity, 0);
      return Math.max(0, MAX_DOUDOUS - others);
    },
    [],
  );

  const add = useCallback(
    (handle: string, quantity = 1) => {
      if (!getProduct(handle)) return;
      setLines((prev) => {
        const cap = capacityFor(handle, prev);
        const existing = prev.find((l) => l.handle === handle);
        const wanted = (existing?.quantity ?? 0) + quantity;
        const next = Math.min(wanted, cap);
        if (next <= 0) return prev;
        return existing
          ? prev.map((l) => (l.handle === handle ? { ...l, quantity: next } : l))
          : [...prev, { handle, quantity: next }];
      });
      setIsOpen(true);
    },
    [capacityFor],
  );

  const setQuantity = useCallback(
    (handle: string, quantity: number) => {
      setLines((prev) => {
        if (quantity <= 0) return prev.filter((l) => l.handle !== handle);
        const next = Math.min(quantity, capacityFor(handle, prev));
        return prev.map((l) => (l.handle === handle ? { ...l, quantity: next } : l));
      });
    },
    [capacityFor],
  );

  const remove = useCallback((handle: string) => {
    setLines((prev) => prev.filter((l) => l.handle !== handle));
  }, []);

  const value: CartState = {
    lines,
    items,
    doudouCount,
    mysteryCount,
    isFull: doudouCount >= MAX_DOUDOUS,
    doudousTotal: doudouTotal(doudouCount),
    savings: savingsFor(doudouCount),
    total: orderTotal(doudouCount, mysteryCount),
    ready,
    isOpen,
    add,
    setQuantity,
    remove,
    clear: useCallback(() => setLines([]), []),
    open: useCallback(() => setIsOpen(true), []),
    close: useCallback(() => setIsOpen(false), []),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartState {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé dans <CartProvider>");
  return ctx;
}

export { MYSTERY_PRICE };
