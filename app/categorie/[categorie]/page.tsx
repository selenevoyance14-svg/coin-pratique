import { getArticlesByCategorie, CATEGORIES } from "@/lib/articles";
import { notFound } from "next/navigation";
import { ArrowRight, Lightbulb, PiggyBank } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

type Props = { params: Promise<{ categorie: string }> };

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((categorie) => ({ categorie }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorie } = await params;
  const category = CATEGORIES[categorie];
  if (!category) return { title: "Catégorie introuvable" };

  return {
    title: `${category.label} : guides pratiques`,
    description: category.description,
    alternates: {
      canonical: `https://coin-pratique.fr/categorie/${categorie}`,
    },
    openGraph: {
      title: `${category.label} : conseils et guides pratiques`,
      description: category.description,
      url: `/categorie/${categorie}`,
      images: [{ url: category.image, width: 1200, height: 900, alt: category.label }],
    },
    twitter: { card: "summary_large_image", images: [category.image] },
  };
}

export default async function CategoriePage({ params }: Props) {
  const { categorie } = await params;
  const cat = CATEGORIES[categorie];
  if (!cat) notFound();

  const articles = getArticlesByCategorie(categorie);
  const pageUrl = `https://coin-pratique.fr/categorie/${categorie}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", name: cat.label, description: cat.description, url: pageUrl, inLanguage: "fr-FR" },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://coin-pratique.fr" },
        { "@type": "ListItem", position: 2, name: cat.label, item: pageUrl },
      ] },
      { "@type": "ItemList", numberOfItems: articles.length, itemListElement: articles.map((article, index) => ({
        "@type": "ListItem", position: index + 1, name: article.title,
        url: `${pageUrl}/${article.slug}`,
      })) },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="text-center mb-12">
        <div className="relative mx-auto mb-7 h-64 max-w-4xl overflow-hidden rounded-3xl shadow-lg shadow-blue-100">
          <Image src={cat.image} alt={`Conseils pratiques : ${cat.label}`} fill priority sizes="(max-width: 768px) 100vw, 896px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 to-transparent" />
          <div className="absolute bottom-5 left-5 grid h-14 w-14 place-items-center rounded-2xl bg-white text-blue-600 shadow-lg">
            <cat.Icon size={30} />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          <span className="text-blue-600">{cat.label}</span>
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">{cat.description}</p>
        <p className="mt-3 text-sm leading-6 text-gray-500 max-w-2xl mx-auto">
          Retrouvez {articles.length} guides concrets, organisés pour aller rapidement à l’essentiel,
          comparer les solutions et vérifier les points importants avant d’agir.
        </p>
        {(categorie === "administratif" || categorie === "budget") && (
          <p className="mt-4 text-sm text-gray-500">
            Les règles et montants peuvent évoluer. Consultez toujours
            l’organisme officiel indiqué dans le guide avant d’engager une démarche.
          </p>
        )}
      </div>

      {categorie === "budget" ? (
        <Link href="/coach-budget" className="group mb-10 flex flex-col items-start justify-between gap-5 rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-700 p-7 text-white shadow-lg shadow-blue-200 sm:flex-row sm:items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-100"><PiggyBank size={16} /> Nouvel outil gratuit</span>
            <h2 className="mt-2 text-2xl font-bold">Calculez votre reste à vivre</h2>
            <p className="mt-2 max-w-2xl text-sm text-blue-100">Faites le point sur votre budget et obtenez des pistes personnalisées, sans inscription ni connexion bancaire.</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 font-bold text-blue-700 transition group-hover:-translate-y-0.5">Essayer le coach <ArrowRight size={17} /></span>
        </Link>
      ) : null}

      {articles.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <div className="flex justify-center mb-4 text-blue-200">
            <Lightbulb size={48} />
          </div>
          <p>Guides en cours de redaction — revenez bientot !</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link key={article.slug} href={`/categorie/${categorie}/${article.slug}`}
              className="card-article group">
              <div className="relative h-44 overflow-hidden bg-blue-50">
                <Image src={article.image ?? cat.image} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <h2 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition leading-snug">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-500 line-clamp-3 mb-4">{article.description}</p>
                <span className="text-blue-600 text-sm font-semibold">Lire le guide &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
