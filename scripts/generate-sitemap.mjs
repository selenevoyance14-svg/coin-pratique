import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BASE_URL = "https://coin-pratique.fr";
const contentDir = path.join(process.cwd(), "content");

const CATEGORIES = [
  "menus", "budget", "menage", "jardin", "bricolage", "enfants",
  "sante", "animaux", "vacances", "administratif", "fetes", "auto",
];

function getAllArticles() {
  const articles = [];
  for (const cat of CATEGORIES) {
    const catDir = path.join(contentDir, cat);
    if (!fs.existsSync(catDir)) continue;
    const files = fs.readdirSync(catDir).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      const slug = file.replace(".mdx", "");
      const raw = fs.readFileSync(path.join(catDir, file), "utf-8");
      const { data } = matter(raw);
      articles.push({ slug, categorie: cat, date: data.date });
    }
  }
  return articles;
}

const articles = getAllArticles();

const urls = [
  `  <url><loc>${BASE_URL}</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>`,
  ...CATEGORIES.map(
    (cat) => `  <url><loc>${BASE_URL}/categorie/${cat}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`
  ),
  ...articles.map(
    (a) => `  <url><loc>${BASE_URL}/categorie/${a.categorie}/${a.slug}</loc><lastmod>${a.date}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`
  ),
  `  <url><loc>${BASE_URL}/mentions-legales</loc><changefreq>yearly</changefreq><priority>0.2</priority></url>`,
  `  <url><loc>${BASE_URL}/confidentialite</loc><changefreq>yearly</changefreq><priority>0.2</priority></url>`,
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), sitemap);
console.log(`Sitemap generated: ${urls.length} URLs`);
