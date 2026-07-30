import Link from "next/link";
import {
  ArrowRight,
  BadgeEuro,
  Calculator,
  CheckSquare2,
  FileCheck2,
  Lightbulb,
  PiggyBank,
  ShieldCheck,
} from "lucide-react";
import {
  CATEGORIES,
  getAllArticles,
  getArticlesByCategorie,
} from "@/lib/articles";

const PRIORITY_ARTICLES = [
  ["administratif", "pension-reversion-guide-complet"],
  ["administratif", "rupture-conventionnelle-guide-complet"],
  ["administratif", "carte-identite-passeport-demarches"],
  ["administratif", "succession-heritage-guide-complet"],
  ["budget", "cheque-energie-2026-guide"],
  ["budget", "economies-courses-supermarche"],
] as const;

export default function HomePage() {
  const articles = getAllArticles();
  const priorityArticles = PRIORITY_ARTICLES.flatMap(([categorie, slug]) => {
    const article = articles.find(
      (item) => item.categorie === categorie && item.slug === slug,
    );
    return article ? [article] : [];
  });
  const adminCount = getArticlesByCategorie("administratif").length;
  const budgetCount = getArticlesByCategorie("budget").length;
  return (
    <div>
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <span className="badge mb-5 inline-flex items-center gap-2">
            <ShieldCheck size={14} /> Guides gratuits et liens officiels
          </span>
          <h1 className="mb-5 text-4xl font-bold text-gray-900 md:text-5xl">
            Vos démarches et votre budget,
            <span className="block text-blue-600">expliqués simplement</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            Aides, papiers, droits et économies du quotidien : des réponses
            concrètes, avec les organismes officiels à consulter avant d’agir.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/categorie/administratif" className="btn-primary flex items-center gap-2">
              <FileCheck2 size={17} /> Aides et démarches
            </Link>
            <Link href="/categorie/budget" className="btn-primary flex items-center gap-2">
              <PiggyBank size={17} /> Budget et économies
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-5 md:grid-cols-2">
          <Link href="/categorie/administratif" className="card-article group p-7">
            <FileCheck2 size={36} className="mb-4 text-blue-500" />
            <h2 className="mb-2 text-2xl font-bold text-gray-900 group-hover:text-blue-600">
              Aides et démarches administratives
            </h2>
            <p className="mb-4 text-gray-500">
              Retraite, rupture conventionnelle, succession, papiers d’identité
              et modèles de lettres.
            </p>
            <span className="font-semibold text-blue-600">{adminCount} guides <ArrowRight size={15} className="inline" /></span>
          </Link>
          <Link href="/categorie/budget" className="card-article group p-7">
            <BadgeEuro size={36} className="mb-4 text-blue-500" />
            <h2 className="mb-2 text-2xl font-bold text-gray-900 group-hover:text-blue-600">
              Budget et économies du quotidien
            </h2>
            <p className="mb-4 text-gray-500">
              Chèque énergie, courses, factures, budget familial et solutions
              pour réduire les dépenses.
            </p>
            <span className="font-semibold text-blue-600">{budgetCount} guides <ArrowRight size={15} className="inline" /></span>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">À consulter maintenant</h2>
        <p className="mb-7 text-gray-500">Les démarches et économies les plus utiles.</p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {priorityArticles.map((article) => {
            const category = CATEGORIES[article.categorie];
            return (
              <Link
                key={article.slug}
                href={`/categorie/${article.categorie}/${article.slug}`}
                className="card-article group p-6"
              >
                <span className="badge mb-3 inline-flex items-center gap-1">
                  {category ? <category.Icon size={11} /> : <Lightbulb size={11} />}
                  {category?.label}
                </span>
                <h3 className="mb-3 font-bold leading-snug text-gray-900 group-hover:text-blue-600">
                  {article.title}
                </h3>
                <p className="line-clamp-3 text-sm text-gray-500">{article.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-blue-50 px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_1.1fr]">
            <div>
              <span className="badge mb-4 inline-flex items-center gap-2">
                <CheckSquare2 size={14} /> Prêt à utiliser
              </span>
              <h2 className="text-3xl font-bold text-gray-900">
                Modèles et checklists gratuits
              </h2>
              <p className="mt-4 leading-relaxed text-gray-600">
                Lettres de demande, résiliation, pièces à préparer et listes de
                vérification : gagnez du temps sans créer de compte.
              </p>
              <Link href="/outils" className="btn-primary mt-6 inline-flex items-center gap-2">
                Voir les outils <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [FileCheck2, "Modèles de lettres", "Des trames à copier et personnaliser."],
                [Calculator, "Checklists budget", "Les postes à vérifier avant de décider."],
                [ShieldCheck, "Liens officiels", "Les organismes de référence au bon endroit."],
                [PiggyBank, "Économies concrètes", "Des méthodes simples, sans promesse magique."],
              ].map(([Icon, title, text]) => {
                const ToolIcon = Icon as typeof FileCheck2;
                return (
                  <div key={title as string} className="rounded-2xl bg-white p-5 shadow-sm">
                    <ToolIcon className="mb-3 text-blue-500" size={24} />
                    <h3 className="font-bold text-gray-900">{title as string}</h3>
                    <p className="mt-2 text-sm text-gray-500">{text as string}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-4 py-14 text-center md:grid-cols-3">
        {[
          ["Clair", "L’essentiel est présenté avant les détails."],
          ["Prudent", "Les règles et montants peuvent évoluer : nous indiquons où les vérifier."],
          ["Gratuit", "Aucun abonnement n’est nécessaire pour lire les guides."],
        ].map(([title, description]) => (
          <div key={title} className="rounded-2xl border border-blue-100 p-6">
            <h2 className="mb-2 font-bold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
