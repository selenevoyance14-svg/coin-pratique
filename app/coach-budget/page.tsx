import type { Metadata } from "next";
import { BadgeEuro, ShieldCheck } from "lucide-react";
import BudgetCoach from "@/components/BudgetCoach";

export const metadata: Metadata = {
  title: "Coach budget gratuit : calculez votre reste à vivre | Coin Pratique",
  description: "Faites le point gratuitement sur vos revenus, dépenses et reste à vivre. Obtenez un diagnostic budget immédiat, sans inscription ni données bancaires.",
  alternates: { canonical: "https://coin-pratique.fr/coach-budget" },
  openGraph: {
    title: "Mon coach budget gratuit",
    description: "Calculez votre reste à vivre et obtenez des pistes concrètes pour équilibrer votre budget.",
    url: "https://coin-pratique.fr/coach-budget",
  },
};

export default function CoachBudgetPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Coach budget gratuit Coin Pratique",
    url: "https://coin-pratique.fr/coach-budget",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Navigateur web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white px-4 py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-3xl">
        <div className="mb-9 text-center">
          <span className="badge inline-flex items-center gap-2"><BadgeEuro size={14} /> Outil gratuit</span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Votre coach budget, simple et confidentiel</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-600">Estimez votre reste à vivre et recevez un plan d’action en quelques minutes. Aucun compte ni connexion bancaire.</p>
          <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-green-700"><ShieldCheck size={16} /> Les montants restent uniquement sur votre appareil.</p>
        </div>
        <BudgetCoach />
        <div className="mt-10 rounded-2xl border border-gray-100 bg-white p-6 text-sm leading-6 text-gray-600">
          <h2 className="text-lg font-bold text-gray-900">Comment utiliser ce diagnostic ?</h2>
          <p className="mt-2">Les résultats sont des estimations pédagogiques et ne remplacent pas un conseil financier personnalisé. Si votre budget est durablement négatif, un Point Conseil Budget peut vous accompagner gratuitement et confidentiellement.</p>
        </div>
      </div>
    </div>
  );
}
