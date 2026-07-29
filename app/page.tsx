import Link from "next/link";
import {
  ArrowRight,
  BadgeEuro,
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
  const secondaryCategories = Object.entries(CATEGORIES).filter(
    ([slug]) => slug !== "administratif" && slug !== "budget",
  );

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

      <section className="bg-blue-50 px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-2 text-center text-2xl font-bold text-gray-900">Les autres sujets pratiques</h2>
          <p className="mb-7 text-center text-gray-500">Toujours disponibles, mais séparés des démarches prioritaires.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {secondaryCategories.map(([slug, category]) => (
              <Link key={slug} href={`/categorie/${slug}`} className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm hover:text-blue-600">
                {category.label}
              </Link>
            ))}
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
