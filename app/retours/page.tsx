import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Retours & remboursements",
  description: "Conditions de retour et de remboursement Doudoumimi.",
};

export default function RetoursPage() {
  return (
    <InfoPage
      emoji="↩️"
      title="Retours & remboursements"
      intro="Un doudou qui ne te plaît pas, ça arrive. On règle ça simplement."
      blocks={[
        {
          title: "Droit de rétractation",
          body: [
            "Conformément au droit européen de la consommation, tu disposes de 14 jours à compter de la réception pour changer d'avis, sans avoir à te justifier.",
            "Le doudou doit être retourné dans son état d'origine, non lavé et non abîmé.",
          ],
        },
        {
          title: "Comment retourner un doudou",
          body: [
            "Écris-nous avec ton numéro de commande : on te transmet la procédure et l'adresse de retour.",
            "Les frais de retour sont à ta charge, sauf en cas d'erreur de notre part ou de produit défectueux.",
          ],
        },
        {
          title: "Remboursement",
          body: [
            "Le remboursement est effectué sur le moyen de paiement d'origine sous 14 jours après réception du retour.",
            "Il comprend le prix du produit et, en cas de rétractation totale, les frais de livraison standard.",
          ],
        },
        {
          title: "Doudou Mystère",
          body: [
            "Le Doudou Mystère bénéficie des mêmes droits que les autres produits.",
            "En revanche, il ne peut pas être échangé contre un modèle précis : c'est le principe de l'offre.",
          ],
        },
        {
          title: "Colis abîmé",
          body: [
            "Prends une photo du colis et du doudou et envoie-la-nous dans les 48 h suivant la réception. On te renvoie un doudou ou on te rembourse.",
          ],
        },
      ]}
    />
  );
}
