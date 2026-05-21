"use client";

import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import OffresList from "../components/OffreList";

export default function OffresPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="page-hero">
          <div className="page-hero-inner">
            <span className="section-kicker border-emerald-200/40 bg-white/18 text-white">
              Recrutement
            </span>
            <h1 className="page-hero-title">Offres et campagnes disponibles</h1>
            <p className="page-hero-subtitle">
              Consultez les campagnes ouvertes, vérifiez les dates limites et déposez votre
              candidature en ligne en quelques étapes.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <span className="hero-stat-chip">Publication continue</span>
              <span className="hero-stat-chip">Suivi de dossier transparent</span>
              <span className="hero-stat-chip">Candidature 100% en ligne</span>
            </div>
          </div>
        </section>

        <div className="section-band-soft section-divider-top section-divider-bottom">
          <OffresList />
        </div>
      </main>
      <Footer />
    </>
  );
}
