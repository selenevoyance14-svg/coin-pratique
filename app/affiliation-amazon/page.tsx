import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Affiliation Amazon et transparence — Coin Pratique",
  description: "Informations sur les liens affiliés Amazon présents sur Coin Pratique.",
  alternates: { canonical: "https://coin-pratique.fr/affiliation-amazon" },
};

export default function AffiliationAmazonPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <p className="mb-6"><Link href="/" className="text-blue-600">← Retour à l’accueil</Link></p>
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Affiliation Amazon et transparence</h1>
      <div className="prose prose-blue max-w-none prose-p:text-gray-600 prose-headings:text-gray-900">
        <p><strong>En tant que Partenaire Amazon, je réalise un bénéfice sur les achats remplissant les conditions requises.</strong></p>

        <h2>Comment fonctionnent les liens affiliés ?</h2>
        <p>
          Certains liens vers Amazon sont affiliés. Si vous effectuez un achat après avoir utilisé
          l’un de ces liens, Coin Pratique peut recevoir une commission, sans coût supplémentaire
          pour vous.
        </p>

        <h2>Prix et disponibilité</h2>
        <p>
          Coin Pratique n’affiche pas de prix Amazon présenté comme étant actualisé en temps réel.
          Les fourchettes éventuellement mentionnées dans les guides sont des repères éditoriaux et
          peuvent évoluer. Le prix, la disponibilité et les conditions applicables sont ceux
          affichés sur Amazon au moment de votre visite.
        </p>

        <h2>Choix éditoriaux</h2>
        <p>
          La présence d’un lien affilié n’augmente pas le prix payé et ne garantit pas qu’un produit
          conviendra à votre situation. Vérifiez ses caractéristiques et les conditions du marchand
          avant toute commande.
        </p>
      </div>
    </div>
  );
}
