import type { Metadata } from "next";
import { getArticle, getAllArticles, getArticlesByCategorie, CATEGORIES } from "@/lib/articles";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Link2 } from "lucide-react";
import type { MDXComponents } from "mdx/types";

type Props = {
  params: Promise<{ categorie: string; slug: string }>;
};

export function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({ categorie: a.categorie, slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorie, slug } = await params;
  const article = getArticle(categorie, slug);
  if (!article) return { title: "Article non trouve" };

  const url = `https://coin-pratique.fr/categorie/${categorie}/${slug}`;

  return {
    title: `${article.title} — Coin Pratique`,
    description: article.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      locale: "fr_FR",
      url,
      siteName: "Coin Pratique",
      publishedTime: article.date,
    },
    twitter: {
      card: "summary",
      title: article.title,
      description: article.description,
    },
  };
}

const mdxComponents: MDXComponents = {
  a: ({ href = "", children }) => {
    if (href.includes("amazon.fr")) {
      return <a href={href} target="_blank" rel="noopener noreferrer sponsored" className="btn-amazon">{children}</a>;
    }
    if (href.startsWith("http")) {
      return <a href={href} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: "0.85rem", padding: "0.5rem 1rem" }}>{children}</a>;
    }
    return <a href={href}>{children}</a>;
  },
};

export default async function ArticlePage({ params }: Props) {
  const { categorie, slug } = await params;
  const article = getArticle(categorie, slug);
  if (!article) notFound();

  const cat = CATEGORIES[categorie];

  const relatedArticles = getArticlesByCategorie(categorie)
    .filter((a) => a.slug !== slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: {
      "@type": "Organization",
      name: "Coin Pratique",
      url: "https://coin-pratique.fr",
    },
    publisher: {
      "@type": "Organization",
      name: "Coin Pratique",
      url: "https://coin-pratique.fr",
    },
    mainEntityOfPage: `https://coin-pratique.fr/categorie/${categorie}/${slug}`,
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
        <a href="/" className="hover:text-blue-600">Accueil</a>
        <span>/</span>
        <a href={`/categorie/${categorie}`} className="hover:text-blue-600">{cat?.label}</a>
        <span>/</span>
        <span className="text-gray-600">{article.title}</span>
      </nav>

      <div className="mb-8">
        <span className="badge mb-3 inline-flex items-center gap-1">
          {cat?.Icon && <cat.Icon size={12} />} {cat?.label}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {article.title}
        </h1>
        <p className="text-lg text-gray-600">{article.description}</p>
        <p className="text-sm text-gray-400 mt-3">Mis a jour le {new Date(article.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8">
        <p className="affiliate-disclaimer flex items-start gap-2">
          <Link2 size={14} className="mt-0.5 shrink-0 text-blue-500" />
          <span><strong>Transparence :</strong> Certains liens de cet article sont des liens affilies.
          Si vous achetez via ces liens, nous percevons une petite commission, sans cout supplementaire pour vous.</span>
        </p>
      </div>

      <div className="prose prose-blue prose-lg max-w-none
        prose-headings:font-bold prose-headings:text-gray-900
        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
        prose-p:text-gray-600 prose-p:leading-relaxed
        prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-gray-900
        prose-li:text-gray-600
        prose-table:text-sm">
        <MDXRemote source={article.content} components={mdxComponents} />
      </div>

      {/* Articles similaires */}
      {relatedArticles.length > 0 && (
        <div className="mt-14 pt-8 border-t border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Dans la meme thematique</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {relatedArticles.map((related) => {
              const relCat = CATEGORIES[related.categorie];
              return (
                <a
                  key={related.slug}
                  href={`/categorie/${related.categorie}/${related.slug}`}
                  className="card-article group p-4"
                >
                  <span className="badge text-xs mb-2 inline-flex items-center gap-1">
                    {relCat?.Icon && <relCat.Icon size={10} />} {relCat?.label}
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition leading-snug mb-1">
                    {related.title}
                  </h3>
                  <span className="text-blue-600 text-xs font-semibold">Lire le guide →</span>
                </a>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-8 pt-8 border-t border-gray-100">
        <a href={`/categorie/${categorie}`} className="text-blue-600 font-semibold hover:underline">
          &larr; Voir tous les guides {cat?.label}
        </a>
      </div>
    </div>
  );
}
