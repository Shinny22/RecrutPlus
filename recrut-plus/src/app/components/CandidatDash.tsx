"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { User, FileText, Settings, LogOut, Briefcase, RefreshCw } from "lucide-react";
import NavBar from "../components/NavBar";

interface Candidature {
  id_dde: number;
  date_depot: string;
  etat: string;
  reponse: string;
  campagne: {
    code: string;
    description: string;
    etat: string;
  };
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
  const [error, setError] = useState<string | null>(null);

  const apiBase = "http://127.0.0.1:8000";

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Vous n'êtes pas connecté.");
      setLoading(false);
      return;
    }

    try {
      setError(null);
      setLoading(true);

      const profileRes = await fetch(`${apiBase}/api/candidat/profile/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!profileRes.ok) throw new Error("Profil non disponible");
      const profile = await profileRes.json();
      setUser(profile);

      const candidaturesRes = await fetch(`${apiBase}/candidat/candidatures/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!candidaturesRes.ok) throw new Error("Impossible de charger vos candidatures");
      const candData = await candidaturesRes.json();
      setCandidatures(candData.demandes || []);
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : "Une erreur est survenue.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [apiBase]);

  // Récupération via JWT
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const statusClass = (statut: string) => {
    switch (statut) {
      case "Acceptée":
        return "bg-green-100 text-green-700";
      case "En cours":
        return "bg-yellow-100 text-yellow-700";
      case "Refusée":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 ">
      <img
        src="/images/loading.gif" // mettre une image GIF amusante ou SVG animé
        alt="Chargement..."
        className="w-24 h-24 mb-4"
      />
      <p className="text-lg text-gray-500 text-center">Chargement... Veillez patienter</p>
    </div>
    );
  }

  const tabs = [
    { id: "dashboard", label: "Tableau de bord", icon: <Briefcase size={18} /> },
    { id: "candidatures", label: "Mes candidatures", icon: <FileText size={18} /> },
    { id: "offres", label: "Voir les autres offres", icon: <FileText size={18} /> },
    { id: "profil", label: "Mon profil", icon: <User size={18} /> },
    { id: "settings", label: "Paramètres", icon: <Settings size={18} /> },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <NavBar/>
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-white border-r shadow-sm p-6 flex flex-col justify-between sticky top-0 lg:static z-10">
        <div>
          <div className="flex flex-col items-center mb-8 text-center">
            <Image
              src={user?.photo || "/images/default_user.png"}
              alt="avatar"
              width={80}
              height={80}
              className="w-20 h-20 rounded-full object-cover mb-3"
            />
            <h2 className="font-semibold text-lg text-gray-800">{user?.nom_cand  || "Candidat"}{" "}{user?.pren_cand || "Candidat"}</h2>
            <p className="text-sm text-gray-500">{user?.email || "Email non renseigné"}</p>
          </div>

          <nav className="space-y-2 grid grid-cols-2 sm:grid-cols-3 lg:block gap-2">
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
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto space-y-6">
        {error && (
          <div className="flex items-start gap-3 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100">
            <span className="font-semibold">Oups :</span>
            <span>{error}</span>
          </div>
        )}

        <div className="flex flex-wrap gap-3 justify-end">
          <button
            onClick={fetchData}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border hover:bg-gray-50 text-gray-700"
          >
            <RefreshCw size={16} /> Actualiser
          </button>
        </div>

        {tab === "dashboard" && (
          <section className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">Bienvenue, {user?.nom_cand || "Candidat"}{" "}{user?.pren_cand || "Candidat"}</h1>
              <p className="text-gray-600">
                Retrouvez en un coup d&apos;œil vos informations et vos candidatures.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-sm border">
                <p className="text-sm text-gray-500">Candidatures totales</p>
                <p className="text-2xl font-semibold text-green-700">{candidatures.length}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm border">
                <p className="text-sm text-gray-500">En cours</p>
                <p className="text-2xl font-semibold text-yellow-600">
                 
                  
                  {candidatures.filter((c) => c.etat=== "EN COURS").length}
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm border">
                <p className="text-sm text-gray-500">Acceptées</p>
                <p className="text-2xl font-semibold text-green-600">
                  {candidatures.filter((c) => c.etat=== "ACCEPTEE").length}
                </p>
              </div>
            </div>
          </section>
        )}

        {tab === "candidatures" && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Mes candidatures</h2>
          
            
            {candidatures.length === 0 ? (
              <p className="text-gray-500">Aucune candidature trouvée.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
               {candidatures.map((c) => (
  <article
    key={c.id_dde}
    className="p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition"
  >
    <h3 className="font-semibold text-green-700">
      {c.campagne?.description}
    </h3>

    <p className="text-gray-700">
      {c.etat}
    </p>

    <p className="text-sm text-gray-500 mt-1">
      Déposé le {new Date(c.date_depot).toLocaleDateString()}
    </p>

    <span
      className={`inline-block mt-3 px-3 py-1 rounded-full text-sm ${statusClass(
        c.etat
      )}`}
    >
      {c.etat}
    </span>
  </article>
))}

              </div>
            )}
          </section>
        )}

        {tab === "profil" && user && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Mon profil</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
              <div className="flex flex-col sm:flex-row gap-6">
                <Image
                  src={user?.photo || "/images/default_user.png"}
                  alt="profil"
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="space-y-1">
                  <p><strong>Nom :</strong> {user.nom_cand}</p>
                  <p><strong>Email :</strong> {user.email}</p>
                  <p><strong>Téléphone :</strong> {user.telephone1}</p>
                  <p><strong>Domaine :</strong> {user?.diplome?.domaine}</p>
                  <p><strong>Diplôme :</strong>  {user?.diplome?.designation}</p>
                  <p><strong>Ville :</strong> {user.lieu_nais}</p>
                  <p><strong>Date de naissance :</strong> {user.dat_nais}</p>
                  <p><strong>Genre :</strong> {user.genre}</p>
                  <p><strong>Situation matrimonial :</strong> {user.sitmat}</p>
                 
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                {user.cv && (
                  <a href={user.cv} target="_blank" className="text-green-600 underline">
                    Voir mon CV
                  </a>
                )}
                {user.diplome && (
                  <a href={user.diplome} target="_blank" className="text-green-600 underline">
                    Voir mon diplôme
                  </a>
                )}
              </div>
            </div>
          </section>
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
