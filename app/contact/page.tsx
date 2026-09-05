import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contacter l'équipe Doudoumimi.",
};

export default function ContactPage() {
  return (
    <InfoPage
      emoji="💌"
      title="Contact"
      intro="Une question, un doute, une commande à suivre : on est là."
      blocks={[
        {
          title: "Par e-mail",
          body: [
            `Écris-nous à ${site.email}. On répond en général sous 24 h, du lundi au vendredi.`,
            "Pense à indiquer ton numéro de commande si tu en as un : ça nous fait gagner un aller-retour.",
          ],
        },
        {
          title: "Sur les réseaux",
          body: [
            "On est aussi en DM sur Instagram et TikTok. C'est souvent le plus rapide pour une petite question.",
          ],
        },
        {
          title: "Avant d'écrire",
          body: [
            "La FAQ répond déjà aux questions les plus fréquentes : prix unique, Doudou Mystère, délais de livraison, retours.",
          ],
        },
      ]}
    />
  );
}
