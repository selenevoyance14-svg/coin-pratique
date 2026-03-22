import { getArticle, getAllArticles, CATEGORIES } from "@/lib/articles";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Link2 } from "lucide-react";
import type { MDXComponents } from "mdx/types";

export function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({ categorie: a.categorie, slug: a.slug }));
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

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ categorie: string; slug: string }>;
}) {
  const { categorie, slug } = await params;
  const article = getArticle(categorie, slug);
  if (!article) notFound();

  const cat = CATEGORIES[categorie];

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
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

      <div className="mt-12 pt-8 border-t border-gray-100">
        <a href={`/categorie/${categorie}`} className="text-blue-600 font-semibold hover:underline">
          &larr; Voir tous les guides {cat?.label}
        </a>
      </div>
    </div>
  );
}
