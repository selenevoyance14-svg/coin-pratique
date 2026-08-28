import { MailCheck } from "lucide-react";

export const MERCI_FACTEUR_RECOMMANDE =
  "https://www.merci-facteur.com/lettres/lrar/lettre-recommandee.php#p_ref=175";

export default function MerciFacteurCta({ compact = false }: { compact?: boolean }) {
  return (
    <aside className={`merci-cta ${compact ? "merci-cta-compact" : ""}`} aria-label="Service partenaire d’envoi de courrier">
      <div className="merci-cta-icon" aria-hidden="true"><MailCheck size={30} /></div>
      <div className="min-w-0">
        <span className="merci-cta-label">Service partenaire · Merci Facteur</span>
        <h2>Une lettre à envoyer&nbsp;? Faites-le directement en ligne.</h2>
        <p>
          Importez votre courrier&nbsp;: Merci Facteur se charge de l’impression,
          de la mise sous pli, de l’affranchissement et de l’envoi recommandé.
        </p>
      </div>
      <div className="merci-cta-action">
        <a href={MERCI_FACTEUR_RECOMMANDE} target="_blank" rel="sponsored noopener noreferrer">
          Envoyer un recommandé →
        </a>
        <small>Lien affilié · service payant · conditions chez Merci Facteur</small>
      </div>
    </aside>
  );
}
