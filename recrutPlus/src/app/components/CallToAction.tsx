import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="relative overflow-hidden">
      <div className="section-shell">
        <div
          className="relative overflow-hidden rounded-3xl border border-white/60 px-6 py-14 text-center text-white shadow-2xl sm:px-10"
          style={{
            backgroundImage:
              "linear-gradient(120deg, rgba(6,78,59,0.88), rgba(5,150,105,0.78)), url('/images/cfi_image.jpg')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(251,191,36,0.2),transparent_35%)]" />
          <div className="relative z-10 mx-auto max-w-3xl">
            <span className="section-kicker border-emerald-200/50 bg-white/15 text-white">
              Passez à l’action
            </span>
            <h2 className="mt-3 text-balance text-3xl font-semibold sm:text-4xl">
              Prêt à booster votre carrière ?
            </h2>
            <p className="mt-4 text-emerald-50/95">
              Inscrivez-vous, consultez les campagnes ouvertes et envoyez votre dossier
              en quelques minutes.
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/Register" className="brand-btn border-white bg-white text-emerald-900 hover:bg-emerald-50">
                S’inscrire maintenant
              </Link>
              <Link href="/Offres" className="brand-btn-secondary border-white/50 bg-transparent text-white hover:bg-white/10">
                Voir les offres
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
