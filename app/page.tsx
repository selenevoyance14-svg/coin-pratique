import { getAllArticles, CATEGORIES } from "@/lib/articles";
import { Lightbulb, TrendingUp, Clock, ThumbsUp } from "lucide-react";

export default function HomePage() {
  const articles = getAllArticles();
  const recent = articles.slice(0, 9);

  return (
    <div>
      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Lightbulb size={48} className="text-blue-500 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Votre <span className="text-blue-600">Coin Pratique</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Menus de la semaine, gestion de budget, astuces menage, jardin, bricolage...
            Tout pour simplifier votre quotidien et celui de votre famille.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(CATEGORIES).slice(0, 6).map(([slug, cat]) => (
              <a key={slug} href={`/categorie/${slug}`} className="btn-primary flex items-center gap-2 text-sm">
                <cat.Icon size={16} /> {cat.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { Icon: Lightbulb, number: `${articles.length}+`, label: "Guides pratiques" },
            { Icon: TrendingUp, number: "12", label: "Thematiques" },
            { Icon: Clock, number: "5 min", label: "Temps de lecture moyen" },
            { Icon: ThumbsUp, number: "100%", label: "Gratuit" },
          ].map((s) => (
            <div key={s.label} className="bg-blue-50 rounded-2xl p-5 text-center">
              <s.Icon size={24} className="text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{s.number}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Toutes nos thematiques</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
          {Object.entries(CATEGORIES).map(([slug, cat]) => {
            const count = articles.filter((a) => a.categorie === slug).length;
            return (
              <a key={slug} href={`/categorie/${slug}`}
                className="card-article p-6 text-center group">
                <div className="flex justify-center mb-3 text-blue-500">
                  <cat.Icon size={36} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition">
                  {cat.label}
                </h3>
                <p className="text-xs text-gray-500 mb-3">{cat.description}</p>
                <span className="badge">{count} guide{count > 1 ? "s" : ""}</span>
              </a>
            );
          })}
        </div>
      </section>

      {/* DERNIERS ARTICLES */}
      {recent.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Derniers guides</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recent.map((article) => {
              const cat = CATEGORIES[article.categorie];
              return (
                <a key={article.slug} href={`/categorie/${article.categorie}/${article.slug}`}
                  className="card-article group">
                  <div className="bg-blue-50 h-36 flex items-center justify-center text-blue-300">
                    {cat ? <cat.Icon size={44} /> : <Lightbulb size={44} />}
                  </div>
                  <div className="p-5">
                    <span className="badge mb-2 inline-flex items-center gap-1 text-xs">
                      {cat && <cat.Icon size={10} />} {cat?.label}
                    </span>
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{article.description}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      )}

      {/* POURQUOI */}
      <section className="bg-blue-50 py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Pourquoi Coin Pratique ?</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              { Icon: ThumbsUp,  title: "100% gratuit",       desc: "Tous nos guides sont gratuits et le resteront. Pas d'abonnement, pas de piege." },
              { Icon: Clock,     title: "Rapide et concret",  desc: "Des conseils actionables en 5 minutes. Pas de blabla, du pratique." },
              { Icon: Lightbulb, title: "Teste et approuve",  desc: "On teste tout avant de recommander. Nos astuces marchent vraiment." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex justify-center mb-3 text-blue-500">
                  <item.Icon size={32} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
