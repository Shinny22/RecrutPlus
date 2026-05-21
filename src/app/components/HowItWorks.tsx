"use client";

import Link from "next/link";
import { CheckCircle2, FileText, Search } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Explorez les offres",
    description: "Filtrez les campagnes selon votre profil et vos objectifs.",
  },
  {
    icon: FileText,
    title: "Déposez votre dossier",
    description: "Envoyez CV, diplôme et informations en quelques étapes.",
  },
  {
    icon: CheckCircle2,
    title: "Suivez votre statut",
    description: "Consultez l’avancement de vos candidatures en temps réel.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <span className="section-kicker">Parcours candidat</span>
            <h2 className="section-title">Comment rejoindre le CFI-CIRAS</h2>
            <p className="section-subtitle mx-0 mt-4">
              Le processus a été simplifié pour aller droit au but: comprendre les offres,
              postuler rapidement et garder une vision claire de votre dossier.
            </p>

            <ul className="mt-9 space-y-4">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <li key={step.title} className="surface-card-soft flex gap-4">
                    <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                      <p className="mt-1 text-sm text-slate-600 sm:text-base">{step.description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="surface-card relative overflow-hidden">
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-emerald-100/80 blur-2xl" />
            <div className="absolute -bottom-6 left-0 h-28 w-28 rounded-full bg-amber-100/80 blur-2xl" />

            <h3 className="text-2xl font-semibold text-slate-900">Prêt à commencer ?</h3>
            <p className="mt-2 text-slate-600">
              Accédez aux campagnes ouvertes et démarrez votre candidature aujourd’hui.
            </p>

            <div className="mt-6 space-y-3">
              <Link href="/Offres" className="brand-btn w-full justify-center">
                Voir les offres
              </Link>
              <Link href="/Register" className="brand-btn-secondary w-full justify-center">
                Créer un compte candidat
              </Link>
            </div>

            <p className="mt-5 text-xs text-slate-500">
              Conseil: préparez votre CV et votre diplôme en PDF pour aller plus vite.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
