// // // app/offres/page.tsx
// // "use client";

// // import { useEffect, useState } from "react";

// // type Campagne = {
// //   cod_anne: string;
// //   description: string;
// //   dat_debut: string;
// //   dat_fin: string;
// //   etat: string;
// // };

// // export default function OffresPage() {
// //   const [offres, setOffres] = useState<Campagne[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     async function fetchOffres() {
// //       try {
// //         const res = await fetch("http://127.0.0.1:8000/api/campagnes/"); // ton endpoint DRF
// //         if (!res.ok) throw new Error("Erreur lors du fetch des offres");
// //         const data = await res.json();
// //         setOffres(data);
// //       } catch (error) {
// //         console.error(error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     }
// //     fetchOffres();
// //   }, []);

// //   if (loading) return <p className="p-6 text-gray-500">Chargement des offres...</p>;

// //   return (
// //     <main className="max-w-5xl mx-auto px-6 py-10">
// //       <h1 className="text-3xl font-bold text-gray-900 mb-6">Offres disponibles</h1>

// //       {offres.length === 0 ? (
// //         <p className="text-gray-600">Aucune campagne n’est disponible pour l’instant.</p>
// //       ) : (
// //         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
// //           {offres.map((offre) => (
// //             <div
// //               key={offre.cod_anne}
// //               className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
// //             >
// //               <h2 className="text-xl font-semibold text-orange-600">
// //                 {offre.cod_anne}
// //               </h2>
// //               <p className="text-gray-700 mt-2 line-clamp-3">{offre.description}</p>
// //               <p className="text-sm text-gray-500 mt-2">
// //                 Début : {new Date(offre.dat_debut).toLocaleDateString()} <br />
// //                 Fin : {new Date(offre.dat_fin).toLocaleDateString()}
// //               </p>
// //               <p
// //                 className={`mt-2 text-sm font-medium ${
// //                   offre.etat === "Ouverte" ? "text-green-600" : "text-red-600"
// //                 }`}
// //               >
// //                 {offre.etat}
// //               </p>

// //               <button
// //                 disabled={offre.etat !== "Ouverte"}
// //                 className={`mt-4 w-full px-4 py-2 rounded-md text-white font-semibold ${
// //                   offre.etat === "Ouverte"
// //                     ? "bg-orange-600 hover:bg-orange-700"
// //                     : "bg-gray-400 cursor-not-allowed"
// //                 }`}
// //               >
// //                 Postuler
// //               </button>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </main>
// //   );
// // }



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

// export default function OffresPage() {
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
//     <NavBar/>
//     <HeroSection/>
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
//         <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-2 items-center justify-center ">
//          {offres.length === 0 ? (
//   <div className="flex flex-col items-center justify-center py-20 ">
//     <img
//       src="/images/no-data.png"
//       alt="Aucune campagne"
//       className="w-64 h-64 mb-4  "
//     />
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



// // "use client";

// // import { useEffect, useState } from "react";
// // import PostulerForm from "../components/ApplyForm";
// // import NavBar from "../components/NavBar";
// // import HeroSection from "../components/HeroSection";
// // import { motion, AnimatePresence } from "framer-motion";

// // type Campagne = {
// //   cod_anne: string;
// //   description: string;
// //   dat_debut: string;
// //   dat_fin: string;
// //   etat: string;
// // };

// // export default function OffresPage() {
// //   const [offres, setOffres] = useState<Campagne[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [showForm, setShowForm] = useState(false);
// //   const [selectedCampagne, setSelectedCampagne] = useState<Campagne | null>(null);
// //   const [expanded, setExpanded] = useState<string | null>(null);

// //   useEffect(() => {
// //     async function fetchOffres() {
// //       try {
// //         const res = await fetch("http://127.0.0.1:8000/api/campagnes/");
// //         if (!res.ok) throw new Error("Erreur lors du fetch des offres");
// //         const data = await res.json();
// //         setOffres(data);
// //       } catch (error) {
// //         console.error(error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     }
// //     fetchOffres();
// //   }, []);

// //   if (loading)
// //     return (
// //       <p className="p-6 text-lg text-gray-500 text-center items-center justify-center">
// //         Chargement des offres...
// //       </p>
// //     );

// //   return (
// //     <>
// //       <NavBar />
// //       <HeroSection />
// //       <main className="max-w-6xl mx-auto px-6 py-10">
// //         <h1 className="text-3xl font-bold text-gray-900 mb-10 text-center">
// //           Offres disponibles
// //         </h1>

// //         {showForm && selectedCampagne ? (
// //           <div>
// //             <button
// //               onClick={() => setShowForm(false)}
// //               className="mb-6 px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
// //             >
// //               ← Retour aux offres
// //             </button>
// //             <PostulerForm campagnes={[selectedCampagne]} />
// //           </div>
// //         ) : (
// //           <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
// //             {offres.length === 0 ? (
// //               <p className="text-gray-600 bg-red-50 w-full p-8 rounded-xl shadow-md text-center">
// //                 Aucune campagne n’est disponible pour l’instant.
// //               </p>
// //             ) : (
// //               offres.map((offre) => {
// //                 const isExpanded = expanded === offre.cod_anne;
// //                 return (
// //                   <motion.div
// //                     key={offre.cod_anne}
// //                     initial={{ opacity: 0, y: 20 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     transition={{ duration: 0.4 }}
// //                     className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 flex flex-col justify-between transition"
// //                   >
// //                     <div>
// //                       <h2 className="text-xl font-semibold text-orange-600">
// //                         {offre.cod_anne}
// //                       </h2>

// //                       <p className={`text-gray-700 mt-3 ${isExpanded ? "" : "line-clamp-3"}`}>
// //                         {offre.description}
// //                       </p>

// //                       <button
// //                         onClick={() =>
// //                           setExpanded(isExpanded ? null : offre.cod_anne)
// //                         }
// //                         className="mt-2 text-sm font-medium text-orange-600 hover:underline"
// //                       >
// //                         {isExpanded ? "Voir moins" : "Voir plus"}
// //                       </button>

// //                       <p className="text-sm text-gray-500 mt-3">
// //                         Début : {new Date(offre.dat_debut).toLocaleDateString()} <br />
// //                         Fin : {new Date(offre.dat_fin).toLocaleDateString()}
// //                       </p>

// //                       <span
// //                         className={`mt-3 inline-block px-3 py-1 rounded-full text-sm font-semibold ${
// //                           offre.etat === "Ouverte"
// //                             ? "bg-green-100 text-green-700"
// //                             : "bg-red-100 text-red-700"
// //                         }`}
// //                       >
// //                         {offre.etat}
// //                       </span>
// //                     </div>

// //                     <button
// //                       disabled={offre.etat !== "Ouverte"}
// //                       onClick={() => {
// //                         setSelectedCampagne(offre);
// //                         setShowForm(true);
// //                       }}
// //                       className={`mt-6 w-full px-4 py-2 rounded-md text-white font-semibold transition ${
// //                         offre.etat === "Ouverte"
// //                           ? "bg-orange-600 hover:bg-orange-700"
// //                           : "bg-gray-400 cursor-not-allowed"
// //                       }`}
// //                     >
// //                       Postuler
// //                     </button>
// //                   </motion.div>
// //                 );
// //               })
// //             )}
// //           </div>
// //         )}
// //       </main>
// //     </>
// //   );
// // }


"use client";

import { useState, useEffect } from "react";
import PostulerForm from "../components/ApplyForm";
import { Briefcase, User, Inbox, Settings, LogOut } from "lucide-react";
import HeroSection from "../components/HeroSection";

type Campagne = {
  cod_anne: string;
  description: string;
  dat_debut: string;
  dat_fin: string;
  etat: string;
};

type Diplome = {
  id: number;
  nom: string;
};

type Candidat = {
  id_candidat: number;
  nom_cand: string;
  pren_cand: string;
  genre: "M" | "F";
  dat_nais: string;
  lieu_nais: string;
  telephone1: string;
  telephone2?: string | null;
  email: string;
  photo?: string | null;
  sitmat?: string | null;
  diplome?: Diplome | null;
};

export default function DashboardCandidatePro() {
  const [activeTab, setActiveTab] = useState("offres");
  const [offres, setOffres] = useState<Campagne[]>([]);
  const [loadingOffres, setLoadingOffres] = useState(true);

  const [candidat, setCandidat] = useState<Candidat | null>(null);
  const [loadingCandidat, setLoadingCandidat] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [selectedCampagne, setSelectedCampagne] = useState<Campagne | null>(null);

  // Tabs
  const tabs = [
    { id: "offres", label: "Offres", icon: Briefcase },
    { id: "profil", label: "Profil", icon: User },
    { id: "messages", label: "Messages", icon: Inbox },
    { id: "settings", label: "Paramètres", icon: Settings },
  ];

  useEffect(() => {
    async function fetchOffres() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/campagnes/");
        const data = await res.json();
        setOffres(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingOffres(false);
      }
    }

    async function fetchCandidat() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/candidats/1/");
        const data = await res.json();
        setCandidat(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingCandidat(false);
      }
    }

    fetchOffres();
    fetchCandidat();
  }, []);

  const handleLogout = () => {
    alert("Déconnexion réussie !");
    // Ici tu peux supprimer token/session
  };

  const handleUpdateCandidat = async () => {
    if (!candidat) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/candidats/${candidat.id_candidat}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(candidat),
      });
      if (!res.ok) throw new Error("Erreur lors de la mise à jour");
      alert("Informations mises à jour !");
    } catch (err) {
      console.error(err);
    }
  };

  if (loadingCandidat || loadingOffres)
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-gray-600 text-lg">Chargement du dashboard...</p>
      </div>
    );

  return (
    <>
    <HeroSection/>
    <div
      className="min-h-screen bg-cover bg-center text-gray-900"
      style={{ backgroundImage: "url('/images/cfi_image.jpg')" }}
    >
      {/* Sidebar horizontal */}
      <header className="w-full bg-white bg-opacity-80 backdrop-blur-md shadow-md flex justify-around items-center py-4 sticky top-0 z-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setShowForm(false); }}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-md font-semibold transition ${
              activeTab === tab.id ? "bg-orange-600 text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <tab.icon className="w-6 h-6" />
            {tab.label}
          </button>
        ))}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 px-4 py-2 rounded-md font-semibold text-red-600 hover:bg-red-100 transition"
        >
          <LogOut className="w-6 h-6" />
          Déconnexion
        </button>
      </header>

      <main className="p-8 max-w-7xl mx-auto space-y-8">
        {/* OFFRES */}
        {activeTab === "offres" && (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Offres disponibles</h1>
            {showForm && selectedCampagne ? (
              <div>
                <button
                  onClick={() => setShowForm(false)}
                  className="mb-4 px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                >
                  ← Retour aux offres
                </button>
                <PostulerForm campagnes={[selectedCampagne]} />
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {offres.length === 0 ? (
                  <p className="text-gray-600 text-center">Aucune offre disponible.</p>
                ) : (
                  offres.map((offre) => (
                    <div
                      key={offre.cod_anne}
                      className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition flex flex-col justify-between"
                    >
                      <h2 className="text-xl font-semibold text-orange-600">{offre.cod_anne}</h2>
                      <p className="text-gray-700 mt-2 line-clamp-3">{offre.description}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Début : {new Date(offre.dat_debut).toLocaleDateString()} <br />
                        Fin : {new Date(offre.dat_fin).toLocaleDateString()}
                      </p>
                      <span
                        className={`mt-2 inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          offre.etat === "Ouvert" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {offre.etat}
                      </span>
                      <button
                        disabled={offre.etat !== "Ouvert"}
                        onClick={() => { setSelectedCampagne(offre); setShowForm(true); }}
                        className={`mt-4 w-full px-4 py-2 rounded-md text-white font-semibold ${
                          offre.etat === "Ouvert" ? "bg-orange-600 hover:bg-orange-700" : "bg-gray-400 cursor-not-allowed"
                        }`}
                      >
                        Postuler
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}

        {/* PROFIL */}
        {activeTab === "profil" && candidat && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-white rounded-2xl shadow flex flex-col items-center">
              <img
                src={candidat.photo}
                alt="Photo candidat"
                className="w-32 h-32 rounded-full mb-4 object-cover bg-black/25"
              />
              <h2 className="text-lg font-semibold">{candidat.nom_cand} {candidat.pren_cand}</h2>
              <p>{candidat.genre === "M" ? "Masculin" : "Féminin"}</p>
              <p>Né le {new Date(candidat.dat_nais).toLocaleDateString()} à {candidat.lieu_nais}</p>
              <p>Sit. matrimoniale : {candidat.sitmat || "Non renseignée"}</p>
              <p>Diplôme : {candidat.diplome?.nom || "Non renseigné"}</p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow">
              <h2 className="text-lg font-semibold">Contact</h2>
              <p>Email : {candidat.email}</p>
              <p>Téléphone 1 : {candidat.telephone1}</p>
              {candidat.telephone2 && <p>Téléphone 2 : {candidat.telephone2}</p>}
            </div>
          </div>
        )}

        {/* MESSAGES */}
        {activeTab === "messages" && (
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-2xl shadow">
              <p><strong>RH CFI:</strong> Bonjour, votre candidature est en cours de traitement.</p>
              <span className="text-sm text-gray-500">2 jours ago</span>
            </div>
            <div className="p-4 bg-white rounded-2xl shadow">
              <p><strong>Admin:</strong> N’oubliez pas de mettre à jour vos documents.</p>
              <span className="text-sm text-gray-500">5 jours ago</span>
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {activeTab === "settings" && candidat && (
          <div className="p-6 bg-white rounded-2xl shadow space-y-6 max-w-xl">
            <h2 className="text-2xl font-semibold mb-4">Mes informations personnelles</h2>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                value={candidat.nom_cand}
                onChange={(e) => setCandidat({ ...candidat, nom_cand: e.target.value })}
                className="input"
              />
              <input
                type="text"
                value={candidat.pren_cand}
                onChange={(e) => setCandidat({ ...candidat, pren_cand: e.target.value })}
                className="input"
              />
              <input
                type="email"
                value={candidat.email}
                onChange={(e) => setCandidat({ ...candidat, email: e.target.value })}
                className="input"
              />
              <input
                type="text"
                value={candidat.telephone1}
                onChange={(e) => setCandidat({ ...candidat, telephone1: e.target.value })}
                className="input"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleUpdateCandidat}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Mettre à jour
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
    </>
  );
}
