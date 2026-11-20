import type { Metadata } from "next";
import Link from "next/link";
import UnitPriceComparator from "@/components/UnitPriceComparator";

export const metadata: Metadata = {
  title: "Comparateur gratuit de prix au kilo, au litre ou à la pièce",
  description: "Comparez deux formats ou lots en grammes, kilos, millilitres, litres ou pièces. Calcul gratuit du coût unitaire, sans compte et sans sauvegarde de vos saisies.",
  alternates: { canonical: "/comparer-prix" },
};

export default function ComparePricesPage() {
  const schema = { "@context": "https://schema.org", "@type": "WebApplication", name: "Comparateur de prix unitaire Coin Pratique", url: "https://coin-pratique.fr/comparer-prix", applicationCategory: "UtilitiesApplication", operatingSystem: "Navigateur web", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" } };
  return <main className="bg-gradient-to-b from-blue-50 to-white px-4 py-12 sm:py-16">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <div className="mx-auto max-w-4xl">
      <nav aria-label="Fil d’Ariane" className="text-sm text-gray-600"><Link href="/" className="underline">Accueil</Link> / Comparer les prix</nav>
      <header className="my-8"><span className="badge">Outil gratuit · Sans inscription</span><h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Quel format revient moins cher ?</h1><p className="mt-5 text-lg leading-relaxed text-gray-600">Ramenez deux offres à la même unité pour comparer leurs coûts, même si les paquets n’ont pas la même taille.</p></header>
      <UnitPriceComparator />
      <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6"><h2 className="text-xl font-bold text-gray-900">Comment le calcul fonctionne</h2><p className="mt-3 leading-relaxed text-gray-600">Quantité totale = quantité d’un paquet × nombre de paquets. Les grammes sont convertis en kilogrammes ; les millilitres et centilitres en litres. Le coût unitaire est le prix total divisé par cette quantité convertie. Les familles d’unités différentes ne sont pas comparées.</p><p className="mt-3 text-sm text-gray-600">Vérifiez les quantités et conditions de l’offre en magasin. Repères officiels : <a className="text-blue-700 underline" href="https://www.economie.gouv.fr/particuliers/mes-droits-conso/bien-consommer/affichage-des-prix-ce-que-vous-devez-savoir" target="_blank" rel="noopener noreferrer">Ministère de l’Économie — affichage des prix</a>, consulté le 20 novembre 2026.</p></section>
      <section className="mt-10"><h2 className="text-xl font-bold text-gray-900">Les guides pour décider</h2><ul className="mt-4 list-disc space-y-3 pl-5 text-blue-700"><li><Link href="/categorie/budget/lots-formats-familiaux-comparer" className="underline">Lot ou petit format : comparer ce que vous achetez</Link></li><li><Link href="/categorie/budget/remise-immediate-avantage-differe-courses" className="underline">Remise immédiate et avantage différé</Link></li><li><Link href="/categorie/budget/prix-kilo-litre-comparer-courses" className="underline">Lire un prix au kilo ou au litre</Link></li></ul></section>
    </div>
  </main>;
}
