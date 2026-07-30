import type { Metadata } from "next";
import Link from "next/link";
import {
  Calculator,
  CheckSquare2,
  FileCheck2,
  Landmark,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Modèles, checklists et outils gratuits",
  description:
    "Modèles de lettres, listes de documents et checklists budget à consulter gratuitement, sans compte.",
  alternates: { canonical: "https://coin-pratique.fr/outils" },
};

const tools = [
  {
    icon: FileCheck2,
    title: "Lettres de résiliation",
    description:
      "Des modèles simples pour résilier un abonnement ou un contrat et conserver une preuve de votre demande.",
    href: "/categorie/administratif/lettres-resiliation-modeles",
    label: "Voir les modèles",
  },
  {
    icon: Landmark,
    title: "Demande de rupture conventionnelle",
    description:
      "Une trame de courrier et les points à préparer avant d’ouvrir la discussion avec votre employeur.",
    href: "/categorie/administratif/rupture-conventionnelle-lettre-demande-modele",
    label: "Préparer la demande",
  },
  {
    icon: CheckSquare2,
    title: "Checklist carte d’identité et passeport",
    description:
      "Les pièces, étapes et vérifications pour limiter les dossiers incomplets et les déplacements inutiles.",
    href: "/categorie/administratif/carte-identite-passeport-demarches",
    label: "Voir la checklist",
  },
  {
    icon: Calculator,
    title: "Organiser son budget familial",
    description:
      "Une méthode claire pour classer les dépenses fixes, variables et occasionnelles avant d’arbitrer.",
    href: "/categorie/budget/gerer-budget-familial",
    label: "Construire son budget",
  },
];

export default function ToolsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <span className="badge mb-5 inline-flex items-center gap-2">
            <CheckSquare2 size={14} /> Gratuit et sans inscription
          </span>
          <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
            Modèles et checklists pratiques
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
            Des trames à copier, des documents à préparer et des étapes à
            vérifier avant d’envoyer une demande ou de prendre une décision.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-4 py-14 md:grid-cols-2">
        {tools.map((tool) => (
          <article key={tool.href} className="card-article p-7">
            <tool.icon className="mb-4 text-blue-500" size={32} />
            <h2 className="text-xl font-bold text-gray-900">{tool.title}</h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              {tool.description}
            </p>
            <Link
              href={tool.href}
              className="mt-5 inline-flex font-semibold text-blue-600 hover:underline"
            >
              {tool.label} →
            </Link>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-14">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm leading-relaxed text-amber-950">
          <strong>À savoir :</strong> adaptez toujours un modèle à votre
          situation et vérifiez les règles auprès de l’organisme concerné.
          Coin Pratique ne remplace pas un conseil juridique individualisé.
        </div>
      </section>
    </>
  );
}
