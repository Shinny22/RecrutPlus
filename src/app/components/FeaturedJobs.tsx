import Link from "next/link";
import { Briefcase, MapPin } from "lucide-react";

const jobs = [
  {
    title: "Développeur Fullstack",
    company: "CFI-CIRAS",
    location: "Brazzaville, Congo",
    type: "Temps plein",
  },
  {
    title: "Administrateur Système et Réseaux",
    company: "CFI-CIRAS",
    location: "Pointe-Noire, Congo",
    type: "Temps plein",
  },
  {
    title: "Chargé de Communication Digitale",
    company: "CFI-CIRAS",
    location: "À distance",
    type: "Contrat",
  },
  {
    title: "Analyste Financier",
    company: "CFI-CIRAS",
    location: "Brazzaville, Congo",
    type: "Temps plein",
  },
];

export default function FeaturedJobs() {
  return (
    <section className="relative">
      <div className="section-shell">
        <div className="mb-8 flex flex-col gap-4 text-center sm:mb-10">
          <span className="section-kicker self-center">Opportunités</span>
          <h2 className="section-title">Offres d’emploi en vedette</h2>
          <p className="section-subtitle">
            Une sélection d’offres actives pour vous permettre de candidater rapidement.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {jobs.map((job) => (
            <article
              key={job.title}
              className="surface-card group relative overflow-hidden transition hover:-translate-y-1"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-emerald-600 to-amber-400 opacity-0 transition group-hover:opacity-100" />

              <h3 className="text-xl font-semibold text-slate-900">{job.title}</h3>
              <p className="mt-1 text-sm font-medium text-emerald-700">{job.company}</p>

              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <p className="flex items-center gap-2">
                  <MapPin size={16} className="text-emerald-600" />
                  {job.location}
                </p>
                <p className="flex items-center gap-2">
                  <Briefcase size={16} className="text-amber-500" />
                  {job.type}
                </p>
              </div>

              <div className="mt-6">
                <Link href="/Offres" className="brand-btn w-full justify-center">
                  Postuler maintenant
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
