
"use client";
// /components/HowItWorks.tsx
import { Search, FileText, CheckCircle } from "lucide-react";


export default function HowItWorks() {
  return (
    <section className="relative py-20 bg-gray-50 overflow-hidden">
      {/* Image de fond subtile */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-6 pointer-events-none"
        // style={{ backgroundImage: "url('/images/logo cfi.png')" }}
        style={{
          backgroundImage: "url('/images/cfi_image.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="absolute p-35 rounded-t-full  ml-247 mt-70 bg-green-800/45"></div>
      {/* <div className="absolute p-35 rounded-t-full  ml-250  bg-green-800/25"></div> */}
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
            <button
              type="button"
              // onClick={() => window.location.href = "/Offres"}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700  transition"
            >
              Rechercher un emploi
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}



// "use client";
// import { useState } from "react";
// import { Search, FileText, CheckCircle } from "lucide-react";

// export default function HowItWorks() {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);

//   const handleSearch = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!query.trim()) return;

//     try {
//       const res = await fetch(`http://localhost:8000/campagnes/search/?q=${query}`);
//       const data = await res.json();
//       setResults(data);
//     } catch (error) {
//       console.error("Erreur lors de la recherche :", error);
//     }
//   };

//   return (
//     <section className="relative py-20 bg-gray-50 overflow-hidden">
//       {/* ✅ Image de fond */}
//       <div
//         className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-10 pointer-events-none"
//         style={{ backgroundImage: "url('/images/cfi_image.jpg')" }}
//       ></div>

//       <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
//         {/* --- CÔTÉ GAUCHE --- */}
//         <div>
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//             Comment rejoindre le CFI-CIRAS ? <br />
//             <span className="text-green-600">Trouvez un emploi rapidement</span>
//           </h2>

//           <ul className="space-y-6">
//             {[
//               {
//                 icon: <Search className="text-orange-600" size={28} />,
//                 title: "Rechercher un emploi",
//                 desc: "Trouvez l’offre adaptée à vos compétences.",
//               },
//               {
//                 icon: <FileText className="text-orange-600" size={28} />,
//                 title: "Postuler à une offre",
//                 desc: "Postulez facilement avec votre CV et votre diplôme.",
//               },
//               {
//                 icon: <CheckCircle className="text-orange-600" size={28} />,
//                 title: "Être recruté",
//                 desc: "Démarrez votre carrière avec le CFI-CIRAS.",
//               },
//             ].map((step, i) => (
//               <li key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
//                 <div className="bg-green-100 p-4 rounded-full flex-shrink-0">{step.icon}</div>
//                 <div>
//                   <h3 className="text-xl font-semibold">{step.title}</h3>
//                   <p className="text-gray-600">{step.desc}</p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* --- CÔTÉ DROIT --- */}
//         <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md mx-auto md:mx-0">
//           <h3 className="text-2xl text-center font-bold mb-6">Trouvez votre carrière</h3>
//           <form onSubmit={handleSearch} className="space-y-4">
//             <input
//               type="text"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Intitulé du poste ou mot-clé"
//               className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
//             />
//             <button
//               type="submit"
//               className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
//             >
//               Rechercher un emploi
//             </button>
//           </form>

//           {/* ✅ Résultats affichés */}
//           {results.length > 0 && (
//             <div className="mt-6 space-y-4">
//               <h4 className="font-semibold text-gray-800 text-lg">Résultats :</h4>
//               <ul className="space-y-3">
//                 {results.map((campagne: any) => (
//                   <li key={campagne.cod_anne} className="border rounded-lg p-3">
//                     <h5 className="font-bold text-green-700">{campagne.cod_anne}</h5>
//                     <p className="text-gray-600">{campagne.description}</p>
//                     <p className="text-sm text-gray-500">
//                       Du {campagne.dat_debut} au {campagne.dat_fin} ({campagne.etat})
//                     </p>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }
