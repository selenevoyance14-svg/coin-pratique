import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  UtensilsCrossed, PiggyBank, SprayCan, Flower2, Wrench,
  GraduationCap, Heart, PawPrint, Palmtree, FileText,
  PartyPopper, Car, type LucideIcon
} from "lucide-react";

const contentDir = path.join(process.cwd(), "content");

export interface Article {
  slug: string;
  categorie: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  featured?: boolean;
  content: string;
}

export interface ArticleMeta extends Omit<Article, "content"> {}

export function getAllArticles(): ArticleMeta[] {
  const categories = fs.readdirSync(contentDir).filter((f) =>
    fs.statSync(path.join(contentDir, f)).isDirectory()
  );

  const articles: ArticleMeta[] = [];

  for (const categorie of categories) {
    const catDir = path.join(contentDir, categorie);
    const files = fs.readdirSync(catDir).filter((f) => f.endsWith(".mdx"));

    for (const file of files) {
      const slug = file.replace(".mdx", "");
      const raw = fs.readFileSync(path.join(catDir, file), "utf-8");
      const { data } = matter(raw);

      articles.push({
        slug,
        categorie,
        title: data.title,
        description: data.description,
        date: data.date,
        image: data.image,
        featured: data.featured ?? false,
      });
    }
  }

  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticle(categorie: string, slug: string): Article | null {
  const filePath = path.join(contentDir, categorie, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    categorie,
    title: data.title,
    description: data.description,
    date: data.date,
    image: data.image,
    featured: data.featured ?? false,
    content,
  };
}

export function getArticlesByCategorie(categorie: string): ArticleMeta[] {
  return getAllArticles().filter((a) => a.categorie === categorie);
}

export const CATEGORIES: Record<string, { label: string; Icon: LucideIcon; description: string }> = {
  menus:          { label: "Menus & Repas",      Icon: UtensilsCrossed, description: "Menus semaine, batch cooking, recettes rapides et pas cheres" },
  budget:         { label: "Budget & Economies", Icon: PiggyBank,       description: "Gerer son budget, astuces economies, bons plans au quotidien" },
  menage:         { label: "Menage & Maison",    Icon: SprayCan,        description: "Planning menage, produits naturels, organisation, rangement" },
  jardin:         { label: "Jardin & Potager",   Icon: Flower2,         description: "Potager debutant, calendrier semis, entretien jardin" },
  bricolage:      { label: "Bricolage & DIY",    Icon: Wrench,          description: "Reparations, peinture, outils essentiels, tutos pas a pas" },
  enfants:        { label: "Enfants & Famille",  Icon: GraduationCap,   description: "Devoirs, activites, routine, gestion des ecrans" },
  sante:          { label: "Sante & Bien-etre",  Icon: Heart,           description: "Sport maison, sommeil, remedes naturels, routine sante" },
  animaux:        { label: "Animaux",            Icon: PawPrint,        description: "Chiens, chats, alimentation, sante animale, budget" },
  vacances:       { label: "Vacances & Voyages", Icon: Palmtree,        description: "Voyages pas cher, checklist valise, camping, bons plans" },
  administratif:  { label: "Administratif",      Icon: FileText,        description: "Modeles lettres, aides sociales, impots, demarches" },
  fetes:          { label: "Fetes & Evenements", Icon: PartyPopper,     description: "Anniversaires, Noel, Halloween, organisation de fetes" },
  auto:           { label: "Auto & Mobilite",    Icon: Car,             description: "Entretien voiture, economies carburant, velo, mobilite" },
};
