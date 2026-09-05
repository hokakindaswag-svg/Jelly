import Link from "next/link";
import Plushie from "@/components/Plushie";

export default function NotFound() {
  return (
    <section className="bg-cream py-20 text-center">
      <div className="mx-auto max-w-lg px-4">
        <div className="mx-auto h-40 w-40 animate-float">
          <Plushie
            art="ghost"
            palette={{ body: "#fffdfb", accent: "#e3d6ff", blush: "#ffa8c8" }}
            label="fantôme perdu"
            className="h-full w-full"
          />
        </div>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-extrabold text-cocoa-800 sm:text-4xl">
          Oups, ce doudou s&apos;est caché 👻
        </h1>
        <p className="mt-2 text-base text-cocoa-600/85">
          La page que tu cherches n&apos;existe pas (ou plus, si c&apos;était une édition limitée).
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/doudous"
            className="rounded-full bg-pumpkin-500 px-7 py-4 font-[family-name:var(--font-display)] text-sm font-extrabold uppercase tracking-wide text-white shadow-cute transition-transform hover:-translate-y-0.5"
          >
            Voir tous les doudous
          </Link>
          <Link
            href="/"
            className="rounded-full bg-white px-7 py-4 font-[family-name:var(--font-display)] text-sm font-extrabold uppercase tracking-wide text-cocoa-800 ring-2 ring-cocoa-800/10 transition-transform hover:-translate-y-0.5"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </section>
  );
}
