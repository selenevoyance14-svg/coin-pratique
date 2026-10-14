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
  updated?: string;
  image?: string;
  featured?: boolean;
  content: string;
}

export type ArticleMeta = Omit<Article, "content">;

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
        updated: data.updated,
        image: data.image,
        featured: data.featured ?? false,
      });
    }
  }

  return articles.sort((a, b) => new Date(b.updated ?? b.date).getTime() - new Date(a.updated ?? a.date).getTime());
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
        updated: data.updated,
    image: data.image,
    featured: data.featured ?? false,
    content,
  };
}

export function getArticlesByCategorie(categorie: string): ArticleMeta[] {
  return getAllArticles().filter((a) => a.categorie === categorie);
}

export const CATEGORIES: Record<string, { label: string; Icon: LucideIcon; description: string; image: string }> = {
  menus:          { label: "Menus & Repas",       Icon: UtensilsCrossed, description: "Menus de la semaine, batch cooking, repas rapides et cuisine économique.", image: "/images/categories/menus.webp" },
  budget:         { label: "Budget & Économies",  Icon: PiggyBank,       description: "Gérer son budget, réduire ses factures et économiser au quotidien.", image: "/images/categories/budget.webp" },
  menage:         { label: "Ménage & Maison",     Icon: SprayCan,        description: "Organisation, rangement et entretien de la maison avec des méthodes simples.", image: "/images/categories/menage.webp" },
  jardin:         { label: "Jardin & Potager",    Icon: Flower2,         description: "Potager débutant, calendrier des semis et entretien du jardin.", image: "/images/categories/jardin.webp" },
  bricolage:      { label: "Bricolage & DIY",     Icon: Wrench,          description: "Réparations, peinture et outils essentiels expliqués pas à pas.", image: "/images/categories/bricolage.webp" },
  enfants:        { label: "Enfants & Famille",   Icon: GraduationCap,   description: "Routines, devoirs, activités et organisation de la vie familiale.", image: "/images/categories/enfants.webp" },
  sante:          { label: "Santé & Bien-être",   Icon: Heart,           description: "Sommeil, activité physique et habitudes de bien-être au quotidien.", image: "/images/categories/sante.webp" },
  animaux:        { label: "Animaux",             Icon: PawPrint,        description: "Chiens, chats, alimentation, soins courants et budget animal.", image: "/images/categories/animaux.webp" },
  vacances:       { label: "Vacances & Voyages",  Icon: Palmtree,        description: "Préparer ses vacances, maîtriser son budget et ne rien oublier.", image: "/images/categories/vacances.webp" },
  administratif:  { label: "Administratif",       Icon: FileText,        description: "Aides, droits, impôts et démarches administratives expliqués clairement.", image: "/images/categories/administratif.webp" },
  fetes:          { label: "Fêtes & Événements",  Icon: PartyPopper,     description: "Anniversaires, Noël et fêtes conviviales à organiser simplement.", image: "/images/categories/fetes.webp" },
  auto:           { label: "Auto & Mobilité",     Icon: Car,             description: "Entretien automobile, carburant, vélo et mobilité du quotidien.", image: "/images/categories/auto.webp" },
};
