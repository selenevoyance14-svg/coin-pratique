import { getArticlesByCategorie, CATEGORIES, isFocusCategory } from "@/lib/articles";
import { notFound } from "next/navigation";
import { Lightbulb } from "lucide-react";
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
    title: `${category.label} : guides pratiques | Coin Pratique`,
    description: category.description,
    alternates: {
      canonical: `https://coin-pratique.fr/categorie/${categorie}`,
    },
    robots: {
      index: isFocusCategory(categorie),
      follow: true,
    },
  };
}

export default async function CategoriePage({ params }: Props) {
  const { categorie } = await params;
  const cat = CATEGORIES[categorie];
  if (!cat) notFound();

  const articles = getArticlesByCategorie(categorie);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-3 text-blue-500">
          <cat.Icon size={52} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          <span className="text-blue-600">{cat.label}</span>
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">{cat.description}</p>
        {(categorie === "administratif" || categorie === "budget") && (
          <p className="mt-4 text-sm text-gray-500">
            Les règles et montants peuvent évoluer. Consultez toujours
            l’organisme officiel indiqué dans le guide avant d’engager une démarche.
          </p>
        )}
      </div>

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
            <a key={article.slug} href={`/categorie/${categorie}/${article.slug}`}
              className="card-article group">
              <div className="bg-blue-50 h-40 flex items-center justify-center text-blue-300">
                <cat.Icon size={48} />
              </div>
              <div className="p-5">
                <h2 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition leading-snug">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-500 line-clamp-3 mb-4">{article.description}</p>
                <span className="text-blue-600 text-sm font-semibold">Lire le guide &rarr;</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
