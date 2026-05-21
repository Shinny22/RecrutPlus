"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowLeft, BriefcaseBusiness, Calendar, FileText } from "lucide-react";
import { motion } from "framer-motion";
import PostulerForm from "./ApplyForm";

type Campagne = {
  cod_anne: string;
  description: string;
  dat_debut: string;
  dat_fin: string;
  etat: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://recrutplus-back.onrender.com";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function OffresList() {
  const [offres, setOffres] = useState<Campagne[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedCampagne, setSelectedCampagne] = useState<Campagne | null>(null);

  const stats = useMemo(() => {
    const total = offres.length;
    const open = offres.filter((offre) => offre.etat === "Ouvert").length;
    return { total, open, closed: total - open };
  }, [offres]);

  useEffect(() => {
    async function fetchOffres() {
      try {
        const res = await fetch(`${API_BASE}/api/campagnes/`);
        if (!res.ok) throw new Error("Erreur lors du chargement des offres");
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

  if (loading) {
    return (
      <div className="loading-shell">
        <Image
          src="/images/loading.gif"
          alt="Chargement..."
          width={96}
          height={96}
          className="h-24 w-24"
          unoptimized
        />
        <p>Chargement des offres… Veuillez patienter.</p>
      </div>
    );
  }

  return (
    <section className="section-shell !pt-0">
      {showForm && selectedCampagne ? (
        <div className="mx-auto max-w-3xl">
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="brand-btn-secondary mb-6 inline-flex gap-2"
          >
            <ArrowLeft size={16} />
            Retour aux offres
          </button>
          <PostulerForm campagnes={[selectedCampagne]} />
        </div>
      ) : offres.length === 0 ? (
        <div className="loading-shell">
          <Image
            src="/images/no-data.png"
            alt="Aucune campagne"
            width={256}
            height={256}
            className="h-56 w-56 opacity-90"
          />
          <p className="text-base text-slate-600">
            Aucune offre n’est disponible pour l’instant.
          </p>
        </div>
      ) : (
        <div>
          <div className="mb-7 grid gap-3 sm:grid-cols-3">
            <div className="surface-card-soft flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                  Total
                </p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">{stats.total}</p>
              </div>
              <BriefcaseBusiness className="h-5 w-5 text-emerald-700" />
            </div>
            <div className="surface-card-soft flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                  Ouvertes
                </p>
                <p className="mt-1 text-2xl font-semibold text-emerald-700">{stats.open}</p>
              </div>
              <span className="status-badge-open">Actives</span>
            </div>
            <div className="surface-card-soft flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                  Fermées
                </p>
                <p className="mt-1 text-2xl font-semibold text-slate-700">{stats.closed}</p>
              </div>
              <span className="status-badge-closed">Terminées</span>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {offres.map((offre, index) => {
              const isOpen = offre.etat === "Ouvert";
              return (
                <motion.article
                  key={offre.cod_anne}
                  className="surface-card group relative flex h-full flex-col overflow-hidden"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-emerald-600 to-amber-400 opacity-0 transition group-hover:opacity-100" />

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                      <FileText size={20} />
                    </div>
                    <span className={isOpen ? "status-badge-open" : "status-badge-closed"}>
                      {offre.etat}
                    </span>
                  </div>

                  <h2 className="mt-4 text-xl font-semibold text-slate-900">{offre.cod_anne}</h2>
                  <p className="mt-2 line-clamp-3 text-sm text-slate-600">{offre.description}</p>

                  <div className="mt-4 space-y-2 text-sm text-slate-500">
                    <p className="flex items-center gap-2">
                      <Calendar size={15} className="text-emerald-600" />
                      Début : {formatDate(offre.dat_debut)}
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar size={15} className="text-amber-500" />
                      Fin : {formatDate(offre.dat_fin)}
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled={!isOpen}
                    onClick={() => {
                      setSelectedCampagne(offre);
                      setShowForm(true);
                    }}
                    className={`brand-btn mt-6 w-full justify-center ${
                      !isOpen ? "cursor-not-allowed opacity-50 hover:translate-y-0" : ""
                    }`}
                  >
                    {isOpen ? "Postuler" : "Campagne fermée"}
                  </button>
                </motion.article>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
