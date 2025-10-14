// /components/JobCategories.tsx
import { Briefcase, Code, Megaphone, PenTool, BarChart3, Users } from "lucide-react";

const categories = [
  { name: "Système et Réseaux", icon: PenTool },
  { name: "Développement Logiciel", icon: Code },
  { name: "Communication", icon: Megaphone },
  { name: "Gestion Financière", icon: Briefcase },
  { name: "Mathématiques et Sciences", icon: BarChart3 },
  { name: "Administratives Publiques", icon: Users },
];

export default function JobCategories() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        {/* Titre */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Catégories d&apos;emplois populaires
        </h2>
        <p className="text-gray-600 mb-12">
          Le CFI-CIRAS recrute dans différentes catégories d'emplois.
        </p>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <div
                key={index}
                className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center justify-center gap-3 border hover:shadow-xl transition duration-300 cursor-pointer"
              >
                <div className="bg-orange-100 p-4 rounded-full">
                  <Icon className="text-orange-600" size={28} />
                </div>
                <h3 className="font-semibold text-gray-800">{cat.name}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
