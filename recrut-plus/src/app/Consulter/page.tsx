// app/mes-demandes/page.tsx
"use client";

import { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import NavBar from "../components/NavBar";

interface Demande {
  id_dde: number;
  campagne: string;
  diplome: string;
  anne_obt_dip: number;
  cv: string | null;
  etat_dde: string;
  reponse: string | null;
  date: string;
}

export default function MesDemandesPage() {
  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [loading, setLoading] = useState(true);
  const nom = "OYERE"; // remplacer par email du candidat (ou via login)

  useEffect(() => {
    async function fetchDemandes() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/mes-demandes/${nom}/`);
        if (!res.ok) throw new Error("Erreur lors du fetch des demandes");
        const data = await res.json();
        setDemandes(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchDemandes();
  }, []);

  if (loading) return <p className="p-6 text-gray-500">Chargement des demandes...</p>;

  return (
    <>
      <NavBar/>
      <HeroSection/>
    <main className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Mes candidatures</h1>

      {demandes.length === 0 ? (
        <p className="text-gray-600 bg-red-500/25 w-full p-8 rounded-xl shadow hover:shadow-lg transition">Vous n'avez encore postulé à aucune offre.</p>
      ) : (
        <div className="space-y-4">
          {demandes.map((d) => (
            <div key={d.id_dde} className="p-4 bg-white rounded-xl shadow">
              <h2 className="text-xl font-semibold text-orange-600">{d.campagne}</h2>
              <p className="text-gray-700 mt-1">
                Diplôme: {d.diplome} <br />
                Année d'obtention: {d.anne_obt_dip} <br />
                Date de candidature: {new Date(d.date).toLocaleDateString()}
              </p>
              <p
                className={`mt-2 font-medium ${
                  d.etat_dde === "ENVOYEE"
                    ? "text-blue-600"
                    : d.etat_dde === "EN_COURS"
                    ? "text-yellow-600"
                    : d.etat_dde === "ACCEPTEE"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                Statut: {d.etat_dde}
              </p>
              {d.reponse && <p className="mt-1 text-gray-500">Réponse: {d.reponse}</p>}
              {d.cv && (
                <a href={d.cv} target="_blank" className="text-blue-500 underline mt-1 block">
                  Voir CV
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
    </>
  );
}
