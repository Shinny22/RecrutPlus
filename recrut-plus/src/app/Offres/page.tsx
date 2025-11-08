
"use client";

import { useEffect, useState } from "react";
import PostulerForm from "../components/ApplyForm";
import NavBar from "../components/NavBar";
import HeroSection from "../components/HeroSection";


type Campagne = {
  cod_anne: string;
  description: string;
  dat_debut: string;
  dat_fin: string;
  etat: string;
};

export default function OffresPage() {
  const [offres, setOffres] = useState<Campagne[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedCampagne, setSelectedCampagne] = useState<Campagne | null>(null);

  useEffect(() => {
    async function fetchOffres() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/campagnes/");
        if (!res.ok) throw new Error("Erreur lors du fetch des offres");
        const data = await res.json();
        setOffres(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchOffres();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-20 ">
        <img
          src="/images/loading.gif" // mettre une image GIF amusante ou SVG animé
          alt="Chargement..."
          className="w-24 h-24 mb-4"
        />
        <p className="text-lg text-gray-500 text-center">Chargement des offres... Veillez patienter</p>
      </div>
    );

  return (
    <>
    <NavBar/>
    <HeroSection/>
    <main className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-10 text-center">Offres disponibles</h1>

      {showForm && selectedCampagne ? (
        <div>
          <button
            onClick={() => setShowForm(false)}
            className="mb-4 px-4 py-2 rounded-md bg-green-300 hover:bg-gray-400"
          >
            ← Retour aux offres
          </button>
          <PostulerForm campagnes={[selectedCampagne]} />
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-2 items-center justify-center ">
         {offres.length === 0 ? (
  <div className="flex flex-col items-center justify-center py-20 ">
      <img
        src="/images/no-data.png"
        alt="Aucune campagne"
        className="w-64 h-64 mb-4  "
      />
    <p className="text-gray-600 text-xl text-center">
      Aucune offre n’est disponible pour l’instant.
    </p>
  </div>
) : (
            offres.map((offre) => (
              <div
                key={offre.cod_anne}
                className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
              >
                <h2 className="text-xl font-bold text-green-600">
                  {offre.cod_anne}
                </h2>
                <p className="text-gray-700 mt-2 line-clamp-3">{offre.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Début : {new Date(offre.dat_debut).toLocaleDateString()} <br />
                  Fin : {new Date(offre.dat_fin).toLocaleDateString()}
                </p>
                <p
                  className={`mt-2 text-sm font-medium ${
                    offre.etat === "Ouvert" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {offre.etat}
                </p>

                <button
                  disabled={offre.etat !== "Ouvert"}
                  onClick={() => {
                    setSelectedCampagne(offre);
                    setShowForm(true);
                  }}
                  className={`mt-4 w-full px-4 py-2 rounded-md text-white font-semibold ${
                    offre.etat === "Ouvert"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Postuler
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </main>
    </>
  );
}



// "use client";

// import { useEffect, useState } from "react";
// import PostulerForm from "../components/ApplyForm";
// import NavBar from "../components/NavBar";
// import HeroSection from "../components/HeroSection";
// import { motion, AnimatePresence } from "framer-motion";

// type Campagne = {
//   cod_anne: string;
//   description: string;
//   dat_debut: string;
//   dat_fin: string;
//   etat: string;
// };

// export default function OffresPage() {
//   const [offres, setOffres] = useState<Campagne[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [selectedCampagne, setSelectedCampagne] = useState<Campagne | null>(null);
//   const [expanded, setExpanded] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchOffres() {
//       try {
//         const res = await fetch("http://127.0.0.1:8000/api/campagnes/");
//         if (!res.ok) throw new Error("Erreur lors du fetch des offres");
//         const data = await res.json();
//         setOffres(data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchOffres();
//   }, []);

//   if (loading)
//     return (
//       <p className="p-6 text-lg text-gray-500 text-center items-center justify-center">
//          Chargement des offres...
//       </p>
//     );

//   return (
//     <>
//       <NavBar />
//      <HeroSection />
//        <main className="max-w-6xl mx-auto px-6 py-10">
//         <h1 className="text-3xl font-bold text-gray-900 mb-10 text-center">
//            Offres disponibles
//          </h1>

//          {showForm && selectedCampagne ? (
//          <div>
//             <button
//              onClick={() => setShowForm(false)}
//               className="mb-6 px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
//             >
//                ← Retour aux offres
//             </button>
//              <PostulerForm campagnes={[selectedCampagne]} />
//            </div>
//          ) : (
//          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//              {offres.length === 0 ? (
//                <p className="text-gray-600 bg-red-50 w-full p-8 rounded-xl shadow-md text-center">
//                 Aucune campagne n’est disponible pour l’instant.
//               </p>
//             ) : (
//               offres.map((offre) => {
//                 const isExpanded = expanded === offre.cod_anne;
//                 return (
//                   <motion.div
//                     key={offre.cod_anne}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.4 }}
//                     className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 flex flex-col justify-between transition"
//                   >
//                     <div>
//                      <h2 className="text-xl font-semibold text-orange-600">
//                        {offre.cod_anne}
//                      </h2>

//                       <p className={`text-gray-700 mt-3 ${isExpanded ? "" : "line-clamp-3"}`}>
//                          {offre.description}
//                       </p>

//                       <button
//                         onClick={() =>
//                           setExpanded(isExpanded ? null : offre.cod_anne)
//                         }
//                         className="mt-2 text-sm font-medium text-orange-600 hover:underline"
//                       >
//                         {isExpanded ? "Voir moins" : "Voir plus"}
//                        </button>

//                        <p className="text-sm text-gray-500 mt-3">
//                          Début : {new Date(offre.dat_debut).toLocaleDateString()} <br />
//                          Fin : {new Date(offre.dat_fin).toLocaleDateString()}
//                         </p>

//                       <span
//                          className={`mt-3 inline-block px-3 py-1 rounded-full text-sm font-semibold ${
//                           offre.etat === "Ouverte"
//                             ? "bg-green-100 text-green-700"
//                             : "bg-red-100 text-red-700"
//                         }`}>
//                         {offre.etat}
//                       </span>
//                     </div>

//                     <button
//                       disabled={offre.etat !== "Ouvert"}
//                       onClick={() => {
//                         setSelectedCampagne(offre);
//                         setShowForm(true);
//                       }}
//                       className={`mt-6 w-full px-4 py-2 rounded-md text-white font-semibold transition ${
//                         offre.etat === "Ouverte"
//                           ? "bg-orange-600 hover:bg-orange-700"
//                           : "bg-gray-400 cursor-not-allowed"
//                       }`} 
//                       >
//                       Postuler
//                     </button>
//                   </motion.div>
//                 );
//               })
//             )}
//           </div>
//         )}
//       </main>
//     </>
//   );
//  }

