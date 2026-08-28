import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliation et partenaires — Coin Pratique",
  description: "Transparence sur les liens affiliés présents sur Coin Pratique.",
  alternates: { canonical: "/affiliation" },
};

export default function AffiliationPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Affiliation et partenaires</h1>
      <div className="prose prose-blue max-w-none prose-p:text-gray-600 prose-headings:text-gray-900">
        <p>
          Certains liens clairement signalés sont affiliés. Une commande réalisée après
          un clic peut rémunérer Coin Pratique, sans surcoût ajouté par notre site.
        </p>
        <h2>Merci Facteur</h2>
        <p>
          Les boutons « Envoyer un recommandé » conduisent vers Merci Facteur, un service
          tiers payant d’impression, de mise sous pli, d’affranchissement et d’envoi postal.
          Ses prix et conditions sont à vérifier directement sur son site.
        </p>
        <h2>Amazon</h2>
        <p>
          En tant que Partenaire Amazon, nous réalisons un bénéfice sur les achats
          remplissant les conditions requises. Les prix et disponibilités relèvent d’Amazon.
        </p>
        <h2>Indépendance éditoriale</h2>
        <p>
          Les partenariats ne modifient pas l’accès gratuit aux guides et ne remplacent
          jamais la vérification des informations auprès des organismes compétents.
        </p>
      </div>
    </div>
  );
}
