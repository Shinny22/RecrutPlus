import { BarChart3, Briefcase, Code, Megaphone, PenTool, Users } from "lucide-react";

const categories = [
  { name: "Système et Réseaux", icon: PenTool },
  { name: "Développement Logiciel", icon: Code },
  { name: "Communication Digitale", icon: Megaphone },
  { name: "Gestion Financière", icon: Briefcase },
  { name: "Mathématiques & Sciences", icon: BarChart3 },
  { name: "Administration Publique", icon: Users },
];

export default function JobCategories() {
  return (
    <section className="relative">
      <div className="section-shell">
        <div className="text-center">
          <span className="section-kicker">Domaines</span>
          <h2 className="section-title">Catégories d’emplois populaires</h2>
          <p className="section-subtitle">
            Explorez les spécialités les plus demandées au CFI-CIRAS et identifiez
            rapidement celles qui correspondent à vos compétences.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <article
                key={category.name}
                className="surface-card-soft group flex items-center gap-4 transition hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 transition group-hover:bg-emerald-700 group-hover:text-white">
                  <Icon size={22} />
                </div>
                <h3 className="text-base font-semibold text-slate-800">{category.name}</h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
