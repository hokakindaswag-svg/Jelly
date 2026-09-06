import Link from "next/link";
import Logo from "./Logo";
import { site } from "@/lib/site";

const columns = [
  {
    title: "La boutique",
    links: [
      { label: "Tous les doudous", href: "/doudous" },
      { label: "Halloween 🎃", href: "/collections/halloween" },
      { label: "Doudou Mystère", href: "/doudou-mystere" },
      { label: "Best-sellers", href: "/best-sellers" },
      { label: "Éditions limitées", href: "/collections/editions-limitees" },
    ],
  },
  {
    title: "Aide",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
      { label: "Livraison", href: "/livraison" },
      { label: "Retours", href: "/retours" },
    ],
  },
  {
    title: "Infos légales",
    links: [
      { label: "CGV", href: "/cgv" },
      { label: "Politique de confidentialité", href: "/confidentialite" },
      { label: "Mentions légales", href: "/mentions-legales" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-cocoa-800/5 bg-cream-deep">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <Logo full />
            <p className="max-w-xs text-sm text-cocoa-600/85">{site.tagline}</p>
            <p className="font-[family-name:var(--font-display)] text-lg font-extrabold text-pumpkin-600">
              {site.baseline}
            </p>
            <div className="mt-1 flex gap-2">
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-4 py-2 text-sm font-bold text-cocoa-800 shadow-sm transition hover:-translate-y-0.5 hover:text-bubble-600"
              >
                Instagram
              </a>
              <a
                href={site.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-4 py-2 text-sm font-bold text-cocoa-800 shadow-sm transition hover:-translate-y-0.5 hover:text-bubble-600"
              >
                TikTok
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-3 font-[family-name:var(--font-display)] text-base font-extrabold text-cocoa-800">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-cocoa-600/85 transition hover:text-bubble-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 border-t border-cocoa-800/10 pt-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-xs text-cocoa-600/70">
            © {new Date().getFullYear()} {site.name}. Tous droits réservés.
          </p>
          <p className="text-xs text-cocoa-600/70">
            Paiement sécurisé · Carte bancaire, Apple&nbsp;Pay, Google&nbsp;Pay
          </p>
        </div>
      </div>
    </footer>
  );
}
