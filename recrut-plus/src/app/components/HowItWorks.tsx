// /components/HowItWorks.tsx
import { Search, FileText, CheckCircle } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* CÔTÉ GAUCHE - Étapes */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Comment ça marche ? <br /> 
            <span className="text-orange-600">Trouvez un emploi rapidement</span>
          </h2>
          <ul className="space-y-6">
            <li className="flex items-center gap-4">
              <div className="bg-green-100 p-4 rounded-full">
                <Search className="text-orange-600" size={28} />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Rechercher un emploi</h3>
                <p className="text-gray-600">Trouvez l’offre adaptée à vos compétences.</p>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <div className="bg-green-100 p-4 rounded-full">
                <FileText className="text-orange-600" size={28} />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Postuler à une offre</h3>
                <p className="text-gray-600">Postulez en ligne facilement avec votre CV.</p>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle className="text-orange-600" size={28} />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Être recruté</h3>
                <p className="text-gray-600">Démarrez votre carrière avec les meilleures entreprises.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* CÔTÉ DROIT - Carte */}
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <h3 className="text-xl font-semibold mb-6">Trouvez votre carrière</h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Intitulé du poste ou mot-clé"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
            <input
              type="text"
              placeholder="Localisation"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
            <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700">
              Rechercher un emploi
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
