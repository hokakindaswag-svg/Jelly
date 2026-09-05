"use client";

/**
 * Header Doudoumimi.
 *
 * À droite : recherche et compte uniquement. Il n'y a pas de panier sur ce
 * site, donc pas d'icône panier ni de compteur d'articles.
 */

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { mainNav } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Referme les panneaux à chaque navigation.
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Empêche le scroll de l'arrière-plan quand le menu mobile est ouvert.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q) router.push(`/recherche?q=${encodeURIComponent(q)}`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-cocoa-800/5 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-4 sm:h-16 sm:gap-4">
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Ouvrir le menu"
          aria-expanded={menuOpen}
          className="grid h-10 w-10 place-items-center rounded-full text-cocoa-800 transition hover:bg-bubble-100 lg:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        <Logo />

        <nav className="ml-6 hidden flex-1 items-center gap-1 lg:flex">
          {mainNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3.5 py-2 text-sm font-bold transition ${
                  active
                    ? "bg-bubble-100 text-bubble-600"
                    : "text-cocoa-600 hover:bg-bubble-50 hover:text-bubble-600"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Rechercher un doudou"
            aria-expanded={searchOpen}
            className="grid h-10 w-10 place-items-center rounded-full text-cocoa-800 transition hover:bg-bubble-100"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
          </button>
          <Link
            href="/compte"
            aria-label="Mon compte"
            className="grid h-10 w-10 place-items-center rounded-full text-cocoa-800 transition hover:bg-bubble-100"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <circle cx="12" cy="8.5" r="3.8" />
              <path d="M4.5 20c1.2-4 4-6 7.5-6s6.3 2 7.5 6" />
            </svg>
          </Link>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-cocoa-800/5 bg-white/95 px-4 py-3">
          <form onSubmit={submitSearch} className="mx-auto flex max-w-3xl gap-2">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Fantôme, citrouille, lapin…"
              aria-label="Rechercher un doudou"
              className="w-full rounded-full bg-cream px-5 py-3 text-sm text-cocoa-800 outline-none ring-1 ring-cocoa-800/10 placeholder:text-cocoa-400 focus:ring-2 focus:ring-bubble-300"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-cocoa-800 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-cocoa-600"
            >
              OK
            </button>
          </form>
        </div>
      )}

      {/* Menu mobile plein écran */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-cocoa-800/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <nav className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm animate-pop-in flex-col gap-1 bg-cream p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Fermer le menu"
                className="grid h-10 w-10 place-items-center rounded-full text-cocoa-800 hover:bg-bubble-100"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl px-4 py-3.5 font-[family-name:var(--font-display)] text-lg font-extrabold text-cocoa-800 transition hover:bg-bubble-100"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/doudou-mystere"
              className="mt-4 rounded-[var(--radius-cute)] bg-lilac-400 p-4 text-white shadow-pop"
            >
              <span className="block text-xs font-bold uppercase tracking-widest opacity-90">
                Offre du moment
              </span>
              <span className="font-[family-name:var(--font-display)] text-xl font-extrabold">
                🎁 Doudou Mystère — 2 €
              </span>
            </Link>

            <p className="mt-auto pt-6 text-center text-sm font-bold text-cocoa-600/70">
              Tous les doudous : 9,99 € 🎀
            </p>
          </nav>
        </div>
      )}
    </header>
  );
}
