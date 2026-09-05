import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales de la boutique Doudoumimi.",
};

export default function MentionsLegalesPage() {
  return (
    <InfoPage
      emoji="⚖️"
      title="Mentions légales"
      intro="À compléter avec les informations réelles de l'entreprise avant la mise en ligne."
      blocks={[
        {
          title: "Éditeur du site",
          body: [
            "[Raison sociale] — [forme juridique] au capital de [montant].",
            "Siège social : [adresse]. Immatriculation : [SIREN/SIRET]. TVA intracommunautaire : [numéro].",
            `Contact : ${site.email}`,
          ],
        },
        {
          title: "Directeur de la publication",
          body: ["[Nom du directeur de la publication]"],
        },
        {
          title: "Hébergeur",
          body: ["[Nom de l'hébergeur] — [adresse de l'hébergeur]"],
        },
        {
          title: "Propriété intellectuelle",
          body: [
            "L'ensemble des contenus du site (marque Doudoumimi, textes, illustrations, mise en page) est protégé. Toute reproduction sans autorisation est interdite.",
          ],
        },
      ]}
    />
  );
}
