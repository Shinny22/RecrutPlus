
// "use client";

// import { useEffect, useState } from "react";
// import PostulerForm from "../components/ApplyForm";
// import NavBar from "../components/NavBar";
// import HeroSection from "../components/HeroSection";


// type Campagne = {
//   cod_anne: string;
//   description: string;
//   dat_debut: string;
//   dat_fin: string;
//   etat: string;
// };

// export default function OffresList() {
//   const [offres, setOffres] = useState<Campagne[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [selectedCampagne, setSelectedCampagne] = useState<Campagne | null>(null);

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
//       <div className="flex flex-col items-center justify-center py-20 ">
//         <img
//           src="/images/loading.gif" // mettre une image GIF amusante ou SVG animé
//           alt="Chargement..."
//           className="w-24 h-24 mb-4"
//         />
//         <p className="text-lg text-gray-500 text-center">Chargement des offres... Veillez patienter</p>
//       </div>
//     );

//   return (
//     <>
  
//     <main className="max-w-5xl mx-auto px-6 py-10">
//       <h1 className="text-3xl font-bold text-gray-900 mb-10 text-center">Offres disponibles</h1>

//       {showForm && selectedCampagne ? (
//         <div>
//           <button
//             onClick={() => setShowForm(false)}
//             className="mb-4 px-4 py-2 rounded-md bg-green-300 hover:bg-gray-400"
//           >
//             ← Retour aux offres
//           </button>
//           <PostulerForm campagnes={[selectedCampagne]} />
//         </div>
//       ) : (
//         <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center ">
//          {offres.length === 0 ? (
//   <div className="flex flex-col items-center justify-center py-20 ">
//       <img
//         src="/images/no-data.png"
//         alt="Aucune campagne"
//         className="w-64 h-64 mb-4  "
//       />
//     <p className="text-gray-600 text-xl text-center">
//       Aucune offre n’est disponible pour l’instant.
//     </p>
//   </div>
// ) : (
//             offres.map((offre) => (
//               <div
//                 key={offre.cod_anne}
//                 className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
//               >
//                 <h2 className="text-xl font-bold text-green-600">
//                   {offre.cod_anne}
//                 </h2>
//                 <p className="text-gray-700 mt-2 line-clamp-3">{offre.description}</p>
//                 <p className="text-sm text-gray-500 mt-2">
//                   Début : {new Date(offre.dat_debut).toLocaleDateString()} <br />
//                   Fin : {new Date(offre.dat_fin).toLocaleDateString()}
//                 </p>
//                 <p
//                   className={`mt-2 text-sm font-medium ${
//                     offre.etat === "Ouvert" ? "text-green-600" : "text-red-600"
//                   }`}
//                 >
//                   {offre.etat}
//                 </p>

//                 <button
//                   disabled={offre.etat !== "Ouvert"}
//                   onClick={() => {
//                     setSelectedCampagne(offre);
//                     setShowForm(true);
//                   }}
//                   className={`mt-4 w-full px-4 py-2 rounded-md text-white font-semibold ${
//                     offre.etat === "Ouvert"
//                       ? "bg-green-600 hover:bg-green-700"
//                       : "bg-gray-400 cursor-not-allowed"
//                   }`}
//                 >
//                   Postuler
//                 </button>
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </main>
//     </>
//   );
// }

// version 2 ----------------------------------------------



"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import PostulerForm from "./ApplyForm";

type Campagne = {
  cod_anne: string;
  description: string;
  dat_debut: string;
  dat_fin: string;
  etat: string;
};

export default function OffresList() {
  const [offres, setOffres] = useState<Campagne[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedCampagne, setSelectedCampagne] = useState<Campagne | null>(null);

  useEffect(() => {
    async function fetchOffres() {
      try {
        const res = await fetch("https://recrutplus-back.onrender.com/api/campagnes/");
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
      <div className="flex flex-col items-center justify-center py-20">
        <Image
          src="/images/loading.gif"
          alt="Chargement..."
          width={96}
          height={96}
          className="w-24 h-24 mb-4"
        />
        <p className="text-lg text-gray-500 text-center">Chargement des offres... Veillez patienter</p>
      </div>
    );

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-10 text-center">
        Offres disponibles
      </h1>

      {showForm && selectedCampagne ? (
        <div>
          <Button
            variant="outline"
            className="mb-6 bg-green-500"
            onClick={() => setShowForm(false)}
          >
            ← Retour aux offres
          </Button>
          <PostulerForm campagnes={[selectedCampagne]} />
        </div>
      ) : offres.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Image
            src="/images/no-data.png"
            alt="Aucune campagne"
            width={256}
            height={256}
            className="w-64 h-64 mb-4"
          />
          <p className="text-gray-600 text-xl text-center">
            Aucune offre n’est disponible pour l’instant.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {offres.map((offre) => (
            <motion.div
              key={offre.cod_anne}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="h-full flex flex-col justify-between">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg text-green-600 font-bold">
                      {offre.cod_anne}
                    </CardTitle>
                    <Badge
                      variant={offre.etat === "Ouvert" ? "success" : "destructive"}
                    >
                      {offre.etat}
                    </Badge>
                  </div>
                  <p className="text-gray-700 mt-2 line-clamp-3">
                    {offre.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Début : {new Date(offre.dat_debut).toLocaleDateString()} <br />
                    Fin : {new Date(offre.dat_fin).toLocaleDateString()}
                  </p>
                </CardHeader>
                <CardContent className="mt-4">
                  <Button
                    disabled={offre.etat !== "Ouvert"}
                    onClick={() => {
                      setSelectedCampagne(offre);
                      setShowForm(true);
                    }}
                    className={`w-full ${
                      offre.etat === "Ouvert"
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-gray-400 cursor-not-allowed text-gray-100"
                    }`}
                  >
                    Postuler
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}
