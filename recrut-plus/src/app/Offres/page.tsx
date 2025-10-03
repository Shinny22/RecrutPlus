// // app/offres/page.tsx
// "use client";

// import { useEffect, useState } from "react";

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

//   useEffect(() => {
//     async function fetchOffres() {
//       try {
//         const res = await fetch("http://127.0.0.1:8000/api/campagnes/"); // ton endpoint DRF
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

//   if (loading) return <p className="p-6 text-gray-500">Chargement des offres...</p>;

//   return (
//     <main className="max-w-5xl mx-auto px-6 py-10">
//       <h1 className="text-3xl font-bold text-gray-900 mb-6">Offres disponibles</h1>

//       {offres.length === 0 ? (
//         <p className="text-gray-600">Aucune campagne n’est disponible pour l’instant.</p>
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {offres.map((offre) => (
//             <div
//               key={offre.cod_anne}
//               className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
//             >
//               <h2 className="text-xl font-semibold text-orange-600">
//                 {offre.cod_anne}
//               </h2>
//               <p className="text-gray-700 mt-2 line-clamp-3">{offre.description}</p>
//               <p className="text-sm text-gray-500 mt-2">
//                 Début : {new Date(offre.dat_debut).toLocaleDateString()} <br />
//                 Fin : {new Date(offre.dat_fin).toLocaleDateString()}
//               </p>
//               <p
//                 className={`mt-2 text-sm font-medium ${
//                   offre.etat === "Ouverte" ? "text-green-600" : "text-red-600"
//                 }`}
//               >
//                 {offre.etat}
//               </p>

//               <button
//                 disabled={offre.etat !== "Ouverte"}
//                 className={`mt-4 w-full px-4 py-2 rounded-md text-white font-semibold ${
//                   offre.etat === "Ouverte"
//                     ? "bg-orange-600 hover:bg-orange-700"
//                     : "bg-gray-400 cursor-not-allowed"
//                 }`}
//               >
//                 Postuler
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </main>
//   );
// }



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

  if (loading) return <p className="p-6 text-lg text-gray-500 text-center items-center justify-center">Chargement des offres...</p>;

  return (
    <>
    <NavBar/>
    <HeroSection/>
    <main className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Offres disponibles</h1>

      {showForm && selectedCampagne ? (
        <div>
          <button
            onClick={() => setShowForm(false)}
            className="mb-4 px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
          >
            ← Retour aux offres
          </button>
          <PostulerForm campagnes={[selectedCampagne]} />
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-center justify-center">
          {offres.length === 0 ? (
            <p className="text-gray-600 bg-red-500/25 w-full p-8 rounded-xl shadow hover:shadow-lg transition">Aucune campagne n’est disponible pour l’instant.</p>
          ) : (
            offres.map((offre) => (
              <div
                key={offre.cod_anne}
                className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-orange-600">
                  {offre.cod_anne}
                </h2>
                <p className="text-gray-700 mt-2 line-clamp-3">{offre.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Début : {new Date(offre.dat_debut).toLocaleDateString()} <br />
                  Fin : {new Date(offre.dat_fin).toLocaleDateString()}
                </p>
                <p
                  className={`mt-2 text-sm font-medium ${
                    offre.etat === "Ouverte" ? "text-green-600" : "text-red-600"
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
                    offre.etat === "Ouverte"
                      ? "bg-orange-600 hover:bg-orange-700"
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
