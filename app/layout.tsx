import type { Metadata } from "next";
import "./globals.css";
import { Lightbulb, UtensilsCrossed, PiggyBank, SprayCan, Flower2, Wrench, GraduationCap, Heart, PawPrint, Palmtree, PartyPopper, Car } from "lucide-react";

export const metadata: Metadata = {
  title: "Coin Pratique — Astuces Maison, Budget, Cuisine & Famille",
  description: "Le guide pratique du quotidien : menus semaine, gestion budget, menage, jardin, bricolage, enfants. Astuces et bons plans pour toute la famille.",
  keywords: "menu semaine pas cher, gestion budget familial, astuces menage, potager debutant, bricolage maison",
  metadataBase: new URL("https://coin-pratique.fr"),
  alternates: {
    canonical: "https://coin-pratique.fr",
  },
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Coin Pratique — Le Guide du Quotidien Familial",
    description: "Menus, budget, menage, jardin, bricolage, enfants. Tout pour simplifier votre quotidien.",
    type: "website",
    locale: "fr_FR",
    url: "https://coin-pratique.fr",
    siteName: "Coin Pratique",
  },
  twitter: {
    card: "summary",
    title: "Coin Pratique — Le Guide du Quotidien Familial",
    description: "Menus, budget, menage, jardin, bricolage, enfants. Tout pour simplifier votre quotidien.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5064203547863113"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Coin Pratique",
              url: "https://coin-pratique.fr",
              description: "Le guide pratique du quotidien : menus, budget, menage, jardin, bricolage, enfants.",
              publisher: {
                "@type": "Organization",
                name: "Coin Pratique",
                url: "https://coin-pratique.fr",
              },
            }),
          }}
        />
      </head>
      <body>
        {/* HEADER */}
        <header className="sticky top-0 z-50 bg-white border-b border-blue-100 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <Lightbulb size={22} className="text-blue-500" />
              <span className="text-xl font-bold text-blue-600">Coin</span>
              <span className="text-xl font-bold text-gray-800">Pratique</span>
            </a>
            <nav className="hidden lg:flex items-center gap-4 text-sm font-medium">
              <a href="/categorie/menus" className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition">
                <UtensilsCrossed size={14} /> Menus
              </a>
              <a href="/categorie/budget" className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition">
                <PiggyBank size={14} /> Budget
              </a>
              <a href="/categorie/menage" className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition">
                <SprayCan size={14} /> Menage
              </a>
              <a href="/categorie/jardin" className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition">
                <Flower2 size={14} /> Jardin
              </a>
              <a href="/categorie/bricolage" className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition">
                <Wrench size={14} /> Bricolage
              </a>
              <a href="/categorie/enfants" className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition">
                <GraduationCap size={14} /> Enfants
              </a>
              <a href="/categorie/sante" className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition">
                <Heart size={14} /> Sante
              </a>
              <a href="/categorie/animaux" className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition">
                <PawPrint size={14} /> Animaux
              </a>
            </nav>
            <nav className="lg:hidden flex items-center gap-3">
              <a href="/categorie/menus" className="text-gray-600 hover:text-blue-600"><UtensilsCrossed size={20} /></a>
              <a href="/categorie/budget" className="text-gray-600 hover:text-blue-600"><PiggyBank size={20} /></a>
              <a href="/categorie/menage" className="text-gray-600 hover:text-blue-600"><SprayCan size={20} /></a>
              <a href="/categorie/enfants" className="text-gray-600 hover:text-blue-600"><GraduationCap size={20} /></a>
              <a href="/categorie/jardin" className="text-gray-600 hover:text-blue-600"><Flower2 size={20} /></a>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        {/* FOOTER */}
        <footer className="bg-gray-50 border-t border-gray-100 mt-16">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb size={18} className="text-blue-500" />
                  <span className="font-bold text-blue-600">Coin Pratique</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Le guide pratique du quotidien. Menus, budget, menage, jardin, bricolage et bien plus.
                </p>
                <p className="text-xs text-gray-400 mt-3 italic">
                  En tant que partenaire Amazon, nous percevons une commission sur les achats qualifies, sans surcout pour vous.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Maison</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li><a href="/categorie/menus" className="hover:text-blue-600 transition">Menus & Repas</a></li>
                  <li><a href="/categorie/budget" className="hover:text-blue-600 transition">Budget & Economies</a></li>
                  <li><a href="/categorie/menage" className="hover:text-blue-600 transition">Menage & Maison</a></li>
                  <li><a href="/categorie/bricolage" className="hover:text-blue-600 transition">Bricolage & DIY</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Famille</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li><a href="/categorie/enfants" className="hover:text-blue-600 transition">Enfants & Famille</a></li>
                  <li><a href="/categorie/sante" className="hover:text-blue-600 transition">Sante & Bien-etre</a></li>
                  <li><a href="/categorie/animaux" className="hover:text-blue-600 transition">Animaux</a></li>
                  <li><a href="/categorie/fetes" className="hover:text-blue-600 transition">Fetes & Evenements</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Exterieur</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li><a href="/categorie/jardin" className="hover:text-blue-600 transition">Jardin & Potager</a></li>
                  <li><a href="/categorie/vacances" className="hover:text-blue-600 transition">Vacances & Voyages</a></li>
                  <li><a href="/categorie/auto" className="hover:text-blue-600 transition">Auto & Mobilite</a></li>
                  <li><a href="/categorie/administratif" className="hover:text-blue-600 transition">Administratif</a></li>
                </ul>
                <div className="mt-4">
                  <a href="/mentions-legales" className="text-xs text-gray-400 hover:text-blue-600 transition">Mentions legales</a>
                  <span className="text-xs text-gray-300 mx-1">|</span>
                  <a href="/confidentialite" className="text-xs text-gray-400 hover:text-blue-600 transition">Confidentialite</a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 mt-8 pt-6 text-center text-xs text-gray-400">
              &copy; 2026 Coin-Pratique.fr — Tous droits reserves
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
