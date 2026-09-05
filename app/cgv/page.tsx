import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: "CGV de la boutique Doudoumimi.",
};

export default function CgvPage() {
  return (
    <InfoPage
      emoji="📄"
      title="Conditions générales de vente"
      intro="À compléter avec les informations légales de l'entreprise avant la mise en ligne."
      blocks={[
        {
          title: "1. Vendeur",
          body: [
            "La boutique Doudoumimi est éditée par [raison sociale], [forme juridique] au capital de [montant], immatriculée sous le numéro [SIREN/SIRET], dont le siège social est situé [adresse].",
            `Contact : ${site.email}`,
          ],
        },
        {
          title: "2. Produits et prix",
          body: [
            "Tous les doudous sont proposés au prix unique de 9,99 € TTC. Le Doudou Mystère est proposé au prix de 2,00 € TTC.",
            "Les prix sont indiqués toutes taxes comprises, hors frais de livraison indiqués avant le paiement.",
          ],
        },
        {
          title: "3. Commande",
          body: [
            "La boutique fonctionne sans panier : la commande porte sur le produit et la quantité sélectionnés au moment du clic sur « Acheter maintenant », auxquels peut s'ajouter un Doudou Mystère si l'option est cochée au paiement.",
            "La commande est ferme une fois le paiement validé.",
          ],
        },
        {
          title: "4. Paiement",
          body: [
            "Le paiement s'effectue en ligne par carte bancaire ou portefeuille électronique, via un prestataire de paiement sécurisé. Doudoumimi ne conserve aucune donnée bancaire.",
          ],
        },
        {
          title: "5. Livraison",
          body: [
            "Les modalités et délais sont détaillés sur la page Livraison, qui fait partie intégrante des présentes conditions.",
          ],
        },
        {
          title: "6. Rétractation et garanties",
          body: [
            "Le droit de rétractation de 14 jours s'applique dans les conditions décrites sur la page Retours.",
            "Les garanties légales de conformité et des vices cachés s'appliquent conformément au droit en vigueur.",
          ],
        },
        {
          title: "7. Litiges",
          body: [
            "En cas de litige, une solution amiable sera recherchée en priorité. À défaut, les tribunaux compétents sont ceux prévus par la loi applicable au siège de [raison sociale].",
          ],
        },
      ]}
    />
  );
}
