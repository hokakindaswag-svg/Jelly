"use client";

/**
 * Récapitulatif de la commande qui vient d'être payée.
 *
 * Le panier est vidé au moment du paiement : on ne peut donc plus le relire
 * ici. Le nombre d'articles et le montant transitent par l'URL, écrits par
 * le checkout (le site est exporté en HTML statique, ces paramètres sont
 * résolus côté navigateur).
 */

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { formatPrice } from "@/lib/products";
import { site } from "@/lib/site";

export default function ConfirmationClient() {
  const params = useSearchParams();
  const count = Math.max(0, Number.parseInt(params.get("n") ?? "0", 10) || 0);
  const total = Math.max(0, Number.parseInt(params.get("t") ?? "0", 10) || 0);

  return (
    <>
      <div className="mx-auto grid h-32 w-32 animate-float place-items-center rounded-full bg-gradient-to-br from-peach-100 to-bubble-100 text-6xl">
        🧸
      </div>

      <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold text-cocoa-800 sm:text-5xl">
        Merci ! 💕
      </h1>
      <p className="mt-3 text-base text-cocoa-600/85 sm:text-lg">
        {count > 0 ? (
          <>
            Ton colis de <strong className="text-cocoa-800">{count} doudou{count > 1 ? "s" : ""}</strong>{" "}
            est en préparation.
          </>
        ) : (
          "Ta commande est confirmée."
        )}
      </p>

      {total > 0 && (
        <dl className="mx-auto mt-6 max-w-sm rounded-[var(--radius-cute)] bg-white p-5 text-left text-sm shadow-sm">
          <div className="flex justify-between py-1">
            <dt className="text-cocoa-600/85">Livraison</dt>
            <dd className="font-extrabold text-bubble-500">Offerte 🚚</dd>
          </div>
          <div className="mt-1 flex justify-between border-t border-cocoa-800/10 pt-2 font-[family-name:var(--font-display)] text-lg font-extrabold text-cocoa-800">
            <dt>Total payé</dt>
            <dd className="text-pumpkin-600">{formatPrice(total)}</dd>
          </div>
        </dl>
      )}

      <p className="mt-6 text-sm text-cocoa-600/80">
        Un e-mail de confirmation arrive dans quelques minutes, avec le numéro de
        suivi dès l&apos;expédition. Une question ?{" "}
        <a href={`mailto:${site.email}`} className="font-bold underline hover:text-bubble-600">
          {site.email}
        </a>
      </p>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/doudous"
          className="rounded-full bg-pumpkin-500 px-7 py-4 font-[family-name:var(--font-display)] text-sm font-extrabold uppercase tracking-wide text-white shadow-cute transition-transform hover:-translate-y-0.5 active:scale-95"
        >
          Continuer mes achats
        </Link>
        <Link
          href="/"
          className="rounded-full bg-white px-7 py-4 font-[family-name:var(--font-display)] text-sm font-extrabold uppercase tracking-wide text-cocoa-800 ring-2 ring-cocoa-800/10 transition-transform hover:-translate-y-0.5 active:scale-95"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </>
  );
}
