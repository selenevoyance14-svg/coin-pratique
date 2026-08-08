export default function MentionsLegales() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mentions legales</h1>
      <div className="prose prose-blue max-w-none prose-p:text-gray-600 prose-headings:text-gray-900">
        <h2>Editeur du site</h2>
        <p>Ce site est edite a titre personnel.</p>
        <h2>Hebergement</h2>
        <p>Ce site est heberge par Cloudflare Pages (Cloudflare, Inc.).</p>
        <h2>Liens affilies</h2>
        <p><strong>En tant que Partenaire Amazon, je réalise un bénéfice sur les achats remplissant les conditions requises.</strong></p>
        <p>Les liens vers Amazon présents sur ce site sont des liens affiliés. Un achat effectué après un clic peut générer une commission, sans coût supplémentaire pour vous. Consultez notre <a href="/affiliation-amazon">page de transparence Amazon</a>.</p>
        <h2>Responsabilite</h2>
        <p>Les informations fournies sur ce site le sont a titre indicatif.</p>
      </div>
    </div>
  );
}
