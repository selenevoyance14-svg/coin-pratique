import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { FileText, Lightbulb, Mail, PiggyBank } from "lucide-react";
import { MERCI_FACTEUR_RECOMMANDE } from "@/components/MerciFacteurCta";

export const metadata: Metadata = {
  title: "Coin Pratique — Aides, démarches et économies",
  description: "Des guides simples sur les aides, les démarches administratives, les droits et les économies du quotidien.",
  metadataBase: new URL("https://coin-pratique.fr"),
  alternates: {
    canonical: "https://coin-pratique.fr",
  },
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Coin Pratique — Aides, démarches et économies",
    description: "Des explications simples pour vos démarches et votre budget.",
    type: "website",
    locale: "fr_FR",
    url: "https://coin-pratique.fr",
    siteName: "Coin Pratique",
  },
  twitter: {
    card: "summary",
    title: "Coin Pratique — Aides, démarches et économies",
    description: "Des explications simples pour vos démarches et votre budget.",
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
              description: "Des guides simples sur les aides, les démarches administratives et les économies.",
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
            <Link href="/" className="flex items-center gap-2">
              <Lightbulb size={22} className="text-blue-500" />
              <span className="text-xl font-bold text-blue-600">Coin</span>
              <span className="text-xl font-bold text-gray-800">Pratique</span>
            </Link>
            <nav className="flex items-center gap-3 text-sm font-medium md:gap-6">
              <Link href="/categorie/administratif" className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition">
                <FileText size={15} /> <span className="hidden sm:inline">Aides & démarches</span>
              </Link>
              <Link href="/categorie/budget" className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition">
                <PiggyBank size={14} /> Budget
              </Link>
              <a href={MERCI_FACTEUR_RECOMMANDE} target="_blank" rel="sponsored noopener noreferrer" className="header-mail-cta">
                <Mail size={14} /> <span className="hidden md:inline">Envoyer un recommandé</span><span className="md:hidden">Envoyer</span>
              </a>
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
                  Des guides simples pour comprendre vos démarches, vos aides et votre budget.
                </p>
                <p className="text-xs text-gray-400 mt-3 italic">
                  Certains liens partenaires peuvent rémunérer Coin Pratique, sans surcoût ajouté par notre site.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Maison</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li><Link href="/categorie/menus" className="hover:text-blue-600 transition">Menus & Repas</Link></li>
                  <li><Link href="/categorie/budget" className="hover:text-blue-600 transition">Budget & Economies</Link></li>
                  <li><Link href="/categorie/menage" className="hover:text-blue-600 transition">Menage & Maison</Link></li>
                  <li><Link href="/categorie/bricolage" className="hover:text-blue-600 transition">Bricolage & DIY</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Famille</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li><Link href="/categorie/enfants" className="hover:text-blue-600 transition">Enfants & Famille</Link></li>
                  <li><Link href="/categorie/sante" className="hover:text-blue-600 transition">Sante & Bien-etre</Link></li>
                  <li><Link href="/categorie/animaux" className="hover:text-blue-600 transition">Animaux</Link></li>
                  <li><Link href="/categorie/fetes" className="hover:text-blue-600 transition">Fetes & Evenements</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Exterieur</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li><Link href="/categorie/jardin" className="hover:text-blue-600 transition">Jardin & Potager</Link></li>
                  <li><Link href="/categorie/vacances" className="hover:text-blue-600 transition">Vacances & Voyages</Link></li>
                  <li><Link href="/categorie/auto" className="hover:text-blue-600 transition">Auto & Mobilite</Link></li>
                  <li><Link href="/categorie/administratif" className="hover:text-blue-600 transition">Administratif</Link></li>
                </ul>
                <div className="mt-4">
                  <Link href="/a-propos" className="text-xs text-gray-400 hover:text-blue-600 transition">À propos</Link>
                  <span className="text-xs text-gray-300 mx-1">|</span>
                  <a href="/mentions-legales" className="text-xs text-gray-400 hover:text-blue-600 transition">Mentions legales</a>
                  <span className="text-xs text-gray-300 mx-1">|</span>
                  <a href="/confidentialite" className="text-xs text-gray-400 hover:text-blue-600 transition">Confidentialite</a>
                  <span className="text-xs text-gray-300 mx-1">|</span>
                  <a href="/affiliation" className="text-xs text-gray-400 hover:text-blue-600 transition">Affiliation</a>
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
