import Image from "next/image";
import Link from "next/link";
import { assetUrl } from "@/lib/assets";

/**
 * Logo Doudoumimi.
 *
 * `full` affiche le logo complet (mascotte + mot-symbole) : réservé aux
 * emplacements larges, footer et page de paiement. Par défaut on montre la
 * mascotte seule accompagnée du nom en typo de marque, car le mot-symbole du
 * fichier devient illisible à la hauteur d'un header mobile.
 */
export default function Logo({
  className = "",
  full = false,
}: {
  className?: string;
  full?: boolean;
}) {
  if (full) {
    return (
      <Link href="/" aria-label="Doudoumimi — accueil" className={`inline-block ${className}`}>
        <Image
          src={assetUrl("/brand/logo.webp")}
          alt="Doudoumimi"
          width={640}
          height={353}
          className="h-auto w-full max-w-[15rem]"
        />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      aria-label="Doudoumimi — accueil"
      className={`group inline-flex items-center gap-2 ${className}`}
    >
      <Image
        src={assetUrl("/brand/mascotte.webp")}
        alt=""
        width={256}
        height={221}
        priority
        className="h-10 w-auto shrink-0 transition-transform duration-300 group-hover:-rotate-6 sm:h-11"
      />
      <span className="font-[family-name:var(--font-display)] text-xl font-extrabold tracking-tight text-cocoa-800 sm:text-2xl">
        Doudou<span className="text-bubble-500">mimi</span>
      </span>
    </Link>
  );
}
