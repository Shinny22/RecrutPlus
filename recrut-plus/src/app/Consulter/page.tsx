// // // app/mes-demandes/page.tsx
// // "use client";
// "use client";

// import ProfileCard from "../components/ProfilCard";
// import ProfileForm from "../components/ProfileForm";
// import Sidebar from "../components/SideBar";


// // import { useEffect, useState } from "react";
// // import HeroSection from "../components/HeroSection";
// // import NavBar from "../components/NavBar";

// // interface Demande {
// //   id_dde: number;
// //   campagne: string;
// //   diplome: string;
// //   anne_obt_dip: number;
// //   cv: string | null;
// //   etat_dde: string;
// //   reponse: string | null;
// //   date: string;
// // }

// // export default function MesDemandesPage() {
// //   const [demandes, setDemandes] = useState<Demande[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const email = "shine242@gmail.com"; // remplacer par email du candidat (ou via login)

// //   useEffect(() => {
// //     async function fetchDemandes() {
// //       try {
// //         const res = await fetch(`http://127.0.0.1:8000/mes-demandes/${email}/`);
// //         if (!res.ok) throw new Error("Erreur lors du fetch des demandes");
// //         const data = await res.json();
// //         setDemandes(data);
// //       } catch (err) {
// //         console.error(err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     fetchDemandes();
// //   }, []);

// //   if (loading) return <p className="p-6 text-gray-500">Chargement des demandes...</p>;

// //   return (
// //     <>
// //       <NavBar/>
// //       <HeroSection/>
// //     <main className="max-w-5xl mx-auto px-6 py-10">
// //       <h1 className="text-3xl font-bold text-gray-900 mb-6">Mes candidatures</h1>

// //       {demandes.length === 0 ? (
// //         <p className="text-gray-600 bg-red-500/25 w-full p-8 rounded-xl shadow hover:shadow-lg transition">Vous n'avez encore postulé à aucune offre.</p>
// //       ) : (
// //         <div className="space-y-4">
// //           {demandes.map((d) => (
// //             <div key={d.id_dde} className="p-4 bg-white rounded-xl shadow">
// //               <h2 className="text-xl font-semibold text-orange-600">{d.campagne}</h2>
// //               <p className="text-gray-700 mt-1">
// //                 Diplôme: {d.diplome} <br />
// //                 Année d'obtention: {d.anne_obt_dip} <br />
// //                 Date de candidature: {new Date(d.date).toLocaleDateString()}
// //               </p>
// //               <p
// //                 className={`mt-2 font-medium ${
// //                   d.etat_dde === "ENVOYEE"
// //                     ? "text-blue-600"
// //                     : d.etat_dde === "EN_COURS"
// //                     ? "text-yellow-600"
// //                     : d.etat_dde === "ACCEPTEE"
// //                     ? "text-green-600"
// //                     : "text-red-600"
// //                 }`}
// //               >
// //                 Statut: {d.etat_dde}
// //               </p>
// //               {d.reponse && <p className="mt-1 text-gray-500">Réponse: {d.reponse}</p>}
// //               {d.cv && (
// //                 <a href={d.cv} target="_blank" className="text-blue-500 underline mt-1 block">
// //                   Voir CV
// //                 </a>
// //               )}
// //             </div>
// //           ))}
// //         </div>
// //       )}
     
// //     </main>
// //     </>
// //   );
// // }


"use client";

import { useState, useEffect } from "react";
import { User, FileText, Settings, LogOut, Briefcase } from "lucide-react";

interface Candidature {
  id: number;
  poste: string;
  entreprise: string;
  statut: string;
  date_postule: string;
}

interface Candidat {
  id: number;
  nom: string;
  email: string;
  photo: string;
  diplome: string;
  cv: string;
}

export default function CandidateDashboard() {
  const [tab, setTab] = useState("dashboard");
  const [user, setUser] = useState<Candidat | null>(null);
  const [candidatures, setCandidatures] = useState<Candidature[]>([]);
  const [loading, setLoading] = useState(true);

  // Récupération via JWT
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    async function fetchData() {
      try {
        const res = await fetch("http://127.0.0.1:8000/candidat/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUser(data);

        const res2 = await fetch("http://127.0.0.1:8000/candidat/demandes/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const candData = await res2.json();
        setCandidatures(candData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p className="text-center text-gray-500 py-8">Chargement...</p>;

  const tabs = [
    { id: "dashboard", label: "Tableau de bord", icon: <Briefcase size={18} /> },
    { id: "candidatures", label: "Mes candidatures", icon: <FileText size={18} /> },
    { id: "profil", label: "Mon profil", icon: <User size={18} /> },
    { id: "settings", label: "Paramètres", icon: <Settings size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm p-6 flex flex-col justify-between">
        <div>
          <div className="flex flex-col items-center mb-8">
            <img
              src={user?.photo || "/default-avatar.png"}
              alt="avatar"
              className="w-20 h-20 rounded-full object-cover mb-3"
            />
            <h2 className="font-semibold text-lg text-gray-800">{user?.nom}</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>

          <nav className="space-y-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  tab === t.id
                    ? "bg-green-600 text-white"
                    : "text-gray-700 hover:bg-green-100"
                }`}
              >
                {t.icon}
                <span>{t.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg"
        >
          <LogOut size={18} /> Se déconnecter
        </button>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 p-8 overflow-y-auto">
        {tab === "dashboard" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Bienvenue, {user?.nom}</h1>
            <p className="text-gray-600">
              Voici un aperçu de vos activités et candidatures récentes.
            </p>
          </div>
        )}

        {tab === "candidatures" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Mes candidatures</h2>
            {candidatures.length === 0 ? (
              <p className="text-gray-500">Aucune candidature trouvée.</p>
            ) : (
              <div className="grid gap-4">
                {candidatures.map((c) => (
                  <div
                    key={c.id}
                    className="p-4 bg-white rounded-lg shadow hover:shadow-md transition"
                  >
                    <h3 className="font-semibold text-green-700">{c.poste}</h3>
                    <p className="text-gray-700">{c.entreprise}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Candidaté le {new Date(c.date_postule).toLocaleDateString()}
                    </p>
                    <span
                      className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
                        c.statut === "ACCEPTEE"
                          ? "bg-green-100 text-green-700"
                          : c.statut === "EN_COURS"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {c.statut}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "profil" && user && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Mon profil</h2>
            <div className="bg-white p-6 rounded-lg shadow space-y-4">
              <div className="flex gap-6">
                <img
                  src={user.photo || "/default-avatar.png"}
                  alt="profil"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <p><strong>Nom :</strong> {user.nom}</p>
                  <p><strong>Email :</strong> {user.email}</p>
                  <p><strong>Diplôme :</strong> {user.diplome}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <a href={user.cv} target="_blank" className="text-green-600 underline">
                  Voir mon CV
                </a>
                <a href={user.diplome} target="_blank" className="text-green-600 underline">
                  Voir mon diplôme
                </a>
              </div>
            </div>
          </div>
        )}

        {tab === "settings" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Paramètres</h2>
            <p className="text-gray-600">Section à venir (modification du mot de passe, langue, etc.)</p>
          </div>
        )}
      </main>
    </div>
  );
}













// DashboardCandidat.jsx


// export default function DashboardCandidat() {
//   return (
//     <div className="flex bg-gray-50 min-h-screen">
//       <Sidebar />
//       <main className="flex-1 p-8">
//         <h1 className="text-2xl font-bold text-gray-800 mb-8">
//           Mon profil candidat
//         </h1>

//         <div className="grid grid-cols-3 gap-8">
//           <div className="col-span-1">
//             <ProfileCard />
//           </div>
//           <div className="col-span-2">
//             <ProfileForm />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
