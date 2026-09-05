import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Livraison",
  description: "Délais, frais et suivi des colis Doudoumimi.",
};

export default function LivraisonPage() {
  return (
    <InfoPage
      emoji="📦"
      title="Livraison"
      intro="Ton doudou part vite, et tu sais toujours où il en est."
      blocks={[
        {
          title: "Préparation",
          body: [
            "Ta commande est préparée dans notre entrepôt européen sous 24 à 48 h ouvrées après le paiement.",
            "Les commandes passées le week-end partent le lundi.",
          ],
        },
        {
          title: "Délais de livraison",
          body: [
            "France métropolitaine : 3 à 6 jours ouvrés après expédition.",
            "Belgique, Suisse, Luxembourg : 4 à 8 jours ouvrés après expédition.",
            "Ces délais sont indicatifs et dépendent du transporteur.",
          ],
        },
        {
          title: "Frais de port",
          body: [
            "2,90 € en livraison suivie, quel que soit le nombre de doudous.",
            "Livraison offerte à partir de 30 € de commande.",
          ],
        },
        {
          title: "Suivi",
          body: [
            "Un e-mail contenant ton numéro de suivi t'est envoyé dès l'expédition du colis.",
            "Si le suivi n'évolue plus pendant plus de 7 jours, écris-nous : on relance le transporteur pour toi.",
          ],
        },
      ]}
    />
  );
}
