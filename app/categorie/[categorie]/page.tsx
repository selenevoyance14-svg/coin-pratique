import { getArticlesByCategorie, CATEGORIES } from "@/lib/articles";
import { notFound } from "next/navigation";
import { Lightbulb } from "lucide-react";

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((categorie) => ({ categorie }));
}

export default async function CategoriePage({ params }: { params: Promise<{ categorie: string }> }) {
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
