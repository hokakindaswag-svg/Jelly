import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Traitement des données personnelles chez Doudoumimi.",
};

export default function ConfidentialitePage() {
  return (
    <InfoPage
      emoji="🔒"
      title="Politique de confidentialité"
      intro="À compléter avec l'identité du responsable de traitement et la liste réelle des sous-traitants avant la mise en ligne."
      blocks={[
        {
          title: "Données collectées",
          body: [
            "Pour traiter une commande, nous collectons : nom, prénom, adresse e-mail, adresse de livraison et contenu de la commande.",
            "Les données bancaires sont traitées directement par notre prestataire de paiement et ne transitent jamais par nos serveurs.",
          ],
        },
        {
          title: "Finalités",
          body: [
            "Ces données servent à préparer et expédier ta commande, à te tenir informé de son suivi et à répondre à tes demandes.",
            "Aucune inscription à une newsletter n'est faite sans ton accord explicite.",
          ],
        },
        {
          title: "Conservation",
          body: [
            "Les données de commande sont conservées le temps nécessaire au traitement, puis pendant la durée légale applicable en matière comptable.",
          ],
        },
        {
          title: "Destinataires",
          body: [
            "Tes données sont transmises uniquement aux prestataires nécessaires à l'exécution de la commande : [prestataire de paiement], [transporteur], [hébergeur].",
            "Elles ne sont jamais vendues.",
          ],
        },
        {
          title: "Tes droits",
          body: [
            "Tu disposes d'un droit d'accès, de rectification, d'effacement, de limitation et de portabilité de tes données, ainsi que d'un droit d'opposition.",
            `Pour exercer ces droits, écris à ${site.email}.`,
          ],
        },
        {
          title: "Cookies",
          body: [
            "Le site utilise uniquement les cookies nécessaires à son fonctionnement. Tout cookie de mesure d'audience ou publicitaire sera soumis à ton consentement préalable.",
          ],
        },
      ]}
    />
  );
}
