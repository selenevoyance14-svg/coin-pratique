"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, ChevronLeft, LockKeyhole } from "lucide-react";

type Budget = {
  income: number;
  housing: number;
  fixed: number;
  loans: number;
  groceries: number;
  transport: number;
  leisure: number;
  other: number;
};

const initialBudget: Budget = {
  income: 0,
  housing: 0,
  fixed: 0,
  loans: 0,
  groceries: 0,
  transport: 0,
  leisure: 0,
  other: 0,
};

const euro = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const fields: Record<1 | 2 | 3, Array<{ key: keyof Budget; label: string; help: string }>> = {
  1: [{ key: "income", label: "Revenus nets du foyer", help: "Salaires, retraites, allocations et autres revenus réguliers" }],
  2: [
    { key: "housing", label: "Logement", help: "Loyer ou mensualité de crédit immobilier" },
    { key: "fixed", label: "Factures et abonnements", help: "Énergie, eau, téléphone, internet, assurances…" },
    { key: "loans", label: "Autres crédits", help: "Auto, consommation et paiements mensualisés" },
  ],
  3: [
    { key: "groceries", label: "Courses", help: "Alimentation et produits du quotidien" },
    { key: "transport", label: "Transport", help: "Carburant, transports en commun, entretien…" },
    { key: "leisure", label: "Loisirs et sorties", help: "Restaurants, activités, achats plaisir…" },
    { key: "other", label: "Autres dépenses", help: "Santé, vêtements et dépenses non classées" },
  ],
};

function track(name: string) {
  const analyticsWindow = window as Window & { dataLayer?: Array<Record<string, string>> };
  analyticsWindow.dataLayer?.push({ event: name });
}

export default function BudgetCoach() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [budget, setBudget] = useState<Budget>(initialBudget);

  const result = useMemo(() => {
    const expenses = budget.housing + budget.fixed + budget.loans + budget.groceries + budget.transport + budget.leisure + budget.other;
    const remaining = budget.income - expenses;
    const expenseRate = budget.income > 0 ? Math.round((expenses / budget.income) * 100) : 0;
    const housingRate = budget.income > 0 ? Math.round((budget.housing / budget.income) * 100) : 0;
    const safetyTarget = Math.round(expenses * 3);
    return { expenses, remaining, expenseRate, housingRate, safetyTarget };
  }, [budget]);

  const update = (key: keyof Budget, value: string) => {
    const parsed = Math.max(0, Number(value.replace(",", ".")) || 0);
    setBudget((current) => ({ ...current, [key]: parsed }));
  };

  const next = () => {
    if (step === 1 && budget.income <= 0) return;
    if (step === 3) track("budget_coach_completed");
    setStep((current) => Math.min(4, current + 1) as 1 | 2 | 3 | 4);
  };

  const restart = () => {
    setBudget(initialBudget);
    setStep(1);
    track("budget_coach_restarted");
  };

  return (
    <section className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-xl shadow-blue-100/50">
      <div className="border-b border-blue-100 bg-blue-50 px-5 py-4 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-bold text-blue-700">Étape {step} sur 4</span>
          <span className="inline-flex items-center gap-1 text-xs text-gray-500"><LockKeyhole size={13} /> Données non enregistrées</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-blue-100" aria-hidden="true">
          <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${step * 25}%` }} />
        </div>
      </div>

      <div className="p-5 sm:p-8">
        {step < 4 ? (
          <>
            <h2 className="text-2xl font-bold text-gray-900">
              {step === 1 ? "Vos revenus mensuels" : step === 2 ? "Vos charges fixes" : "Vos dépenses courantes"}
            </h2>
            <p className="mt-2 text-sm text-gray-500">Indiquez des montants approximatifs. Vous pourrez recommencer à tout moment.</p>
            <div className="mt-7 space-y-5">
              {fields[step as 1 | 2 | 3].map((field) => (
                <label key={field.key} className="block">
                  <span className="font-semibold text-gray-800">{field.label}</span>
                  <span className="mt-1 block text-xs text-gray-500">{field.help}</span>
                  <span className="relative mt-2 block">
                    <input
                      type="number"
                      min="0"
                      inputMode="decimal"
                      value={budget[field.key] || ""}
                      onChange={(event) => update(field.key, event.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 text-lg outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      placeholder="0"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-semibold text-gray-400">€</span>
                  </span>
                </label>
              ))}
            </div>
            {step === 1 && budget.income <= 0 ? <p className="mt-3 text-sm text-amber-700">Renseignez vos revenus pour continuer.</p> : null}
            <div className="mt-8 flex items-center justify-between gap-3">
              {step > 1 ? (
                <button type="button" onClick={() => setStep((step - 1) as 1 | 2 | 3)} className="inline-flex items-center gap-1 rounded-full px-4 py-3 font-semibold text-gray-600 hover:bg-gray-50">
                  <ChevronLeft size={17} /> Retour
                </button>
              ) : <span />}
              <button type="button" onClick={next} disabled={step === 1 && budget.income <= 0} className="btn-primary inline-flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-40">
                {step === 3 ? "Voir mon diagnostic" : "Continuer"} <ArrowRight size={17} />
              </button>
            </div>
          </>
        ) : (
          <div aria-live="polite">
            <div className="flex items-center gap-3 text-green-700"><CheckCircle2 size={28} /><span className="font-bold">Votre diagnostic est prêt</span></div>
            <h2 className="mt-4 text-3xl font-bold text-gray-900">Il vous reste {euro.format(result.remaining)} par mois</h2>
            <p className="mt-2 text-gray-600">Sur {euro.format(budget.income)} de revenus, vos dépenses estimées représentent {euro.format(result.expenses)}, soit {result.expenseRate}%.</p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-blue-50 p-4"><span className="text-xs text-gray-500">Reste à vivre</span><strong className={`mt-1 block text-xl ${result.remaining < 0 ? "text-red-600" : "text-blue-700"}`}>{euro.format(result.remaining)}</strong></div>
              <div className="rounded-2xl bg-blue-50 p-4"><span className="text-xs text-gray-500">Part du logement</span><strong className="mt-1 block text-xl text-blue-700">{result.housingRate}%</strong></div>
              <div className="rounded-2xl bg-blue-50 p-4"><span className="text-xs text-gray-500">Épargne de sécurité cible</span><strong className="mt-1 block text-xl text-blue-700">{euro.format(result.safetyTarget)}</strong></div>
            </div>

            <div className="mt-8 rounded-2xl border border-green-100 bg-green-50 p-5">
              <h3 className="font-bold text-gray-900">Votre priorité</h3>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                {result.remaining < 0
                  ? `Votre budget dépasse vos revenus de ${euro.format(Math.abs(result.remaining))}. Commencez par les dépenses modulables et contactez rapidement un Point Conseil Budget si la situation persiste.`
                  : result.remaining < budget.income * 0.1
                    ? "Votre marge est étroite. Cherchez d’abord une petite économie régulière sur les courses, l’énergie ou les abonnements avant de fixer un objectif d’épargne."
                    : `Votre budget dégage une marge. Vous pourriez mettre de côté environ ${euro.format(Math.max(20, Math.round(result.remaining * 0.4)))} par mois tout en conservant une réserve pour les imprévus.`}
              </p>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Link href="/categorie/budget/gerer-budget-familial" className="rounded-2xl border border-blue-100 p-4 font-semibold text-blue-700 hover:bg-blue-50">Organiser mon budget <ArrowRight size={15} className="inline" /></Link>
              <Link href="/categorie/budget/economies-courses-supermarche" className="rounded-2xl border border-blue-100 p-4 font-semibold text-blue-700 hover:bg-blue-50">Réduire mes courses <ArrowRight size={15} className="inline" /></Link>
            </div>
            <button type="button" onClick={restart} className="mt-7 text-sm font-semibold text-gray-500 underline decoration-gray-300 underline-offset-4 hover:text-blue-700">Refaire le calcul</button>
          </div>
        )}
      </div>
    </section>
  );
}
