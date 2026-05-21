import { Briefcase, Globe, Users } from "lucide-react";

const reasons = [
  {
    icon: Briefcase,
    title: "Cadre professionnel stimulant",
    description:
      "Travaillez dans un environnement structuré avec une montée en compétence continue.",
  },
  {
    icon: Users,
    title: "Accompagnement humain",
    description:
      "Profitez d’un suivi personnalisé et d’un réseau d’experts pour avancer plus vite.",
  },
  {
    icon: Globe,
    title: "Accès simple et flexible",
    description:
      "Consultez les offres et candidatez facilement depuis mobile ou ordinateur.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative">
      <div className="section-shell">
        <div className="text-center">
          <span className="section-kicker">Valeur</span>
          <h2 className="section-title">Pourquoi nous rejoindre</h2>
          <p className="section-subtitle">
            CFI-Recrute combine simplicité d’usage et qualité de suivi pour offrir une
            expérience candidate fluide du début à la décision finale.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <article key={reason.title} className="surface-card text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <Icon size={24} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{reason.title}</h3>
                <p className="mt-2 text-sm text-slate-600 sm:text-base">{reason.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
