"use client";

import { useState } from "react";

type Unit = "g" | "kg" | "ml" | "cl" | "l" | "piece";
type Offer = { price: string; quantity: string; packs: string; unit: Unit };
const UNITS: Record<Unit, { label: string; family: string; base: string; factor: number }> = {
  g: { label: "grammes", family: "mass", base: "kg", factor: .001 },
  kg: { label: "kilogrammes", family: "mass", base: "kg", factor: 1 },
  ml: { label: "millilitres", family: "volume", base: "L", factor: .001 },
  cl: { label: "centilitres", family: "volume", base: "L", factor: .01 },
  l: { label: "litres", family: "volume", base: "L", factor: 1 },
  piece: { label: "pièces", family: "count", base: "pièce", factor: 1 },
};
const EXAMPLES: [Offer, Offer] = [{ price: "2.40", quantity: "500", packs: "1", unit: "g" }, { price: "3.30", quantity: "750", packs: "1", unit: "g" }];
const money = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 6 });

function calculate(offer: Offer) {
  const price = Number(offer.price), quantity = Number(offer.quantity), packs = Number(offer.packs);
  if ([offer.price, offer.quantity, offer.packs].some(value => !value.trim()) || !Number.isFinite(price) || price < 0 || !Number.isFinite(quantity) || quantity <= 0 || !Number.isInteger(packs) || packs <= 0 || (offer.unit === "piece" && !Number.isInteger(quantity))) return null;
  const total = quantity * packs * UNITS[offer.unit].factor;
  const unitPrice = price / total;
  return Number.isFinite(total) && total > 0 && Number.isFinite(unitPrice) ? { price, total, unitPrice, ...UNITS[offer.unit] } : null;
}

export default function UnitPriceComparator() {
  const [offers, setOffers] = useState<[Offer, Offer]>(EXAMPLES);
  const results = offers.map(calculate);
  const [a, b] = results;
  function change(index: number, field: keyof Offer, value: string) {
    setOffers(current => current.map((offer, item) => item === index ? { ...offer, [field]: value } : offer) as [Offer, Offer]);
  }
  let comparison = "Renseignez deux prix positifs ou nuls, des quantités supérieures à zéro et un nombre entier de paquets pour chaque offre.";
  if (a && b) {
    if (a.family !== b.family) comparison = "Ces unités ne sont pas comparables : choisissez deux masses, deux volumes ou deux quantités en pièces. Aucune conversion entre kilogrammes et litres n’est effectuée.";
    else if (Math.abs(a.unitPrice - b.unitPrice) < 1e-9) comparison = "Les deux offres ont le même coût unitaire selon vos saisies.";
    else {
      const lower = Math.min(a.unitPrice, b.unitPrice), higher = Math.max(a.unitPrice, b.unitPrice);
      const percent = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 2 }).format((higher - lower) / higher * 100);
      comparison = `L’offre ${a.unitPrice < b.unitPrice ? "A" : "B"} a le coût unitaire le plus bas : ${percent} % de moins que l’autre offre, soit un écart de ${money.format(higher - lower)} par ${a.base}.`;
    }
  }
  return <section aria-labelledby="comparison-title">
    <h2 id="comparison-title" className="text-2xl font-bold text-gray-900">Comparez deux formats</h2>
    <p className="mt-3 text-gray-600">Les valeurs de départ sont un exemple fictif. Saisissez le prix total payé pour le lot entier et la quantité de chaque paquet. Un crédit fidélité futur ne se déduit pas du montant payé aujourd’hui.</p>
    <div className="mt-6 grid gap-5 md:grid-cols-2">
      {offers.map((offer, index) => <fieldset key={index} className="min-w-0 rounded-2xl border border-blue-200 bg-white p-5 sm:p-6">
        <legend className="px-2 text-xl font-bold text-gray-900">Offre {index === 0 ? "A" : "B"}</legend>
        <div className="grid gap-4">
          {[
            { field: "price" as const, label: "Prix total du lot (€)", min: "0", step: "any" },
            { field: "quantity" as const, label: "Quantité dans chaque paquet", min: "0", step: offer.unit === "piece" ? "1" : "any" },
            { field: "packs" as const, label: "Nombre de paquets dans le lot", min: "1", step: "1" },
          ].map(input => <label key={input.field} htmlFor={`offer-${index}-${input.field}`} className="block text-sm font-semibold text-gray-700">{input.label}<input id={`offer-${index}-${input.field}`} type="number" min={input.min} step={input.step} inputMode={input.field === "packs" ? "numeric" : "decimal"} value={offer[input.field]} onChange={event => change(index, input.field, event.target.value)} className="mt-2 block w-full rounded-lg border border-gray-400 p-3 text-base font-normal focus:outline-none focus:ring-2 focus:ring-blue-600" /></label>)}
          <label htmlFor={`offer-${index}-unit`} className="block text-sm font-semibold text-gray-700">Unité de la quantité<select id={`offer-${index}-unit`} value={offer.unit} onChange={event => change(index, "unit", event.target.value)} className="mt-2 block w-full rounded-lg border border-gray-400 bg-white p-3 text-base font-normal focus:outline-none focus:ring-2 focus:ring-blue-600">{Object.entries(UNITS).map(([key, unit]) => <option key={key} value={key}>{unit.label}</option>)}</select></label>
        </div>
        <p className="mt-5 text-lg font-bold text-blue-800" aria-live="polite" aria-atomic="true">{results[index] ? `${money.format(results[index]!.unitPrice)} / ${results[index]!.base}` : "Vérifiez les montants et quantités. Pour les pièces, indiquez un entier."}</p>
        {results[index] ? <p className="mt-2 text-sm text-gray-600">Quantité totale : {new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 6 }).format(results[index]!.total)} {results[index]!.base}.</p> : null}
      </fieldset>)}
    </div>
    <div role="status" aria-live="polite" aria-atomic="true" className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-5 font-semibold leading-relaxed text-blue-950">{comparison}</div>
    <p className="mt-4 text-sm leading-relaxed text-gray-600">Le coût unitaire ne compare ni la qualité, ni la concentration, ni la quantité que vous utiliserez réellement. Aucun prix n’est recherché en ligne. Vos saisies ne sont ni envoyées ni sauvegardées par cet outil.</p>
    <button type="button" onClick={() => setOffers(EXAMPLES)} className="mt-5 rounded-lg border border-gray-400 px-5 py-3 font-semibold text-gray-800">Recharger l’exemple</button>
  </section>;
}
