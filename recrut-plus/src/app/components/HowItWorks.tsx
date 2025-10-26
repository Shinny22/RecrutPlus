// // /components/HowItWorks.tsx
// import { Search, FileText, CheckCircle } from "lucide-react";

// export default function HowItWorks() {
//   return (
//     <section
//       className="relative py-20 bg-gray-50 overflow-hidden"
//       >
//         {/* ✅ Image de fond subtile */}
//         <div
//           className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-5  pointer-events-none"
//           style={{
//             backgroundImage: "url('/images/logo cfi.png')",
//           }}
//         ></div>
//     <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      
        
//          {/* CÔTÉ GAUCHE - Étapes */}
//          <div>
//            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//              Comment rejoindre le CFI-CIRAS? <br /> 
//              <span className="text-green-600">Trouvez un emploi rapidement</span>
//            </h2>
//            <ul className="space-y-6">
//              <li className="flex items-center gap-4">
//                <div className="bg-green-100 p-4 rounded-full">
//                  <Search className="text-orange-600" size={28} />
//                </div>
//                <div>
//                  <h3 className="text-xl font-semibold">Rechercher un emploi</h3>
//                  <p className="text-gray-600">Trouvez l’offre adaptée à vos compétences.</p>
//                </div>
//              </li>
//              <li className="flex items-center gap-4">
//                <div className="bg-green-100 p-4 rounded-full">
//                  <FileText className="text-orange-600" size={28} />
//                </div>
//                <div>
//                  <h3 className="text-xl font-semibold">Postuler à une offre</h3>
//                  <p className="text-gray-600">Postulez en ligne facilement avec votre CV et votre diplome.</p>
//                </div>
//              </li>
//              <li className="flex items-center gap-4">
//                <div className="bg-green-100 p-4 rounded-full">
//                  <CheckCircle className="text-orange-600" size={28} />
//                </div>
//                <div>
//                  <h3 className="text-xl font-semibold">Être recruté</h3>
//                  <p className="text-gray-600">Démarrez votre carrière avec le CFI-CIRAS.</p>
//                </div>
//              </li>
//            </ul>
//          </div>

//          {/* CÔTÉ DROIT - Carte */}
//         <div className="bg-white shadow-xl rounded-2xl p-8 w-lg">
//            <h3 className="text-2xl text-center font-bold mb-6">Trouvez votre carrière</h3>
//          <form className="space-y-4">
//             <input
//               type="text"
//               placeholder="Intitulé du poste ou mot-clé"
//               className="w-md px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
//             />
           
//             <button className="w-md bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700">
//               Rechercher un emploi
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }




// /components/HowItWorks.tsx
import { Search, FileText, CheckCircle } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="relative py-20 bg-gray-50 overflow-hidden">
      {/* Image de fond subtile */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-5 pointer-events-none"
        style={{ backgroundImage: "url('/images/logo cfi.png')" }}
      ></div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* CÔTÉ GAUCHE - Étapes */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Comment rejoindre le CFI-CIRAS? <br />
            <span className="text-green-600">Trouvez un emploi rapidement</span>
          </h2>
          <ul className="space-y-6">
            {[
              {
                icon: <Search className="text-orange-600" size={28} />,
                title: "Rechercher un emploi",
                desc: "Trouvez l’offre adaptée à vos compétences.",
              },
              {
                icon: <FileText className="text-orange-600" size={28} />,
                title: "Postuler à une offre",
                desc: "Postulez en ligne facilement avec votre CV et votre diplôme.",
              },
              {
                icon: <CheckCircle className="text-orange-600" size={28} />,
                title: "Être recruté",
                desc: "Démarrez votre carrière avec le CFI-CIRAS.",
              },
            ].map((step, i) => (
              <li key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="bg-green-100 p-4 rounded-full flex-shrink-0">{step.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* CÔTÉ DROIT - Carte */}
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md mx-auto md:mx-0">
          <h3 className="text-2xl text-center font-bold mb-6">Trouvez votre carrière</h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Intitulé du poste ou mot-clé"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
              Rechercher un emploi
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
