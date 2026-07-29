import type { Metadata } from "next";
import Link from "next/link";
import { FileCheck2, RefreshCw, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "À propos et méthode éditoriale | Coin Pratique",
  description:
    "Découvrez comment Coin Pratique simplifie les démarches, les aides et les sujets de budget.",
  alternates: { canonical: "https://coin-pratique.fr/a-propos" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-5 text-3xl font-bold text-gray-900">
        À propos de Coin Pratique
      </h1>
      <p className="mb-10 text-lg leading-relaxed text-gray-600">
        Coin Pratique aide à comprendre plus rapidement une démarche, une aide
        ou une dépense du quotidien. Le site présente l’essentiel en langage
        simple et oriente vers les organismes à consulter pour confirmer sa
        situation personnelle.
      </p>

      <div className="space-y-6">
        <section className="rounded-2xl border border-blue-100 p-6">
          <FileCheck2 className="mb-3 text-blue-500" />
          <h2 className="mb-2 text-xl font-bold text-gray-900">Notre méthode</h2>
          <p className="text-gray-600">
            Nous organisons les informations par étapes, documents nécessaires,
            délais et points de vigilance. Pour les démarches administratives,
            les sites publics restent la référence.
          </p>
        </section>
        <section className="rounded-2xl border border-blue-100 p-6">
          <RefreshCw className="mb-3 text-blue-500" />
          <h2 className="mb-2 text-xl font-bold text-gray-900">Informations évolutives</h2>
          <p className="text-gray-600">
            Les lois, plafonds, montants, prix et conditions peuvent changer.
            Vérifiez toujours les informations datées auprès de l’organisme
            compétent avant de prendre une décision.
          </p>
        </section>
        <section className="rounded-2xl border border-blue-100 p-6">
          <ShieldCheck className="mb-3 text-blue-500" />
          <h2 className="mb-2 text-xl font-bold text-gray-900">Transparence</h2>
          <p className="text-gray-600">
            Le site est gratuit. Certains guides peuvent contenir des liens
            affiliés : une commission peut alors être versée au site, sans coût
            supplémentaire pour le lecteur.
          </p>
        </section>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/categorie/administratif" className="btn-primary">
          Aides et démarches
        </Link>
        <Link href="/categorie/budget" className="btn-primary">
          Budget et économies
        </Link>
      </div>
    </div>
  );
}
