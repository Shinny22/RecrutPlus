"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Jean M.",
    role: "Développeur recruté",
    message:
      "Grâce à CFI-Recrute, j’ai trouvé une offre adaptée en quelques semaines. Le parcours est clair.",
  },
  {
    name: "Aline K.",
    role: "Recruteuse RH",
    message:
      "La plateforme nous fait gagner du temps: candidatures structurées et suivi simple.",
  },
  {
    name: "Patrick L.",
    role: "Étudiant en informatique",
    message:
      "J’ai pu candidater facilement et comprendre à chaque étape où en était mon dossier.",
  },
  {
    name: "Sandra B.",
    role: "Designer UI/UX",
    message:
      "L’expérience utilisateur est fluide sur mobile comme sur desktop, avec une vraie cohérence visuelle.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden">
      <div className="section-shell">
        <div className="text-center">
          <span className="section-kicker">Témoignages</span>
          <h2 className="section-title">Ce qu’ils pensent de CFI-Recrute</h2>
          <p className="section-subtitle">
            Des retours concrets de candidats et recruteurs qui utilisent la plateforme.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              className="surface-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <p className="text-base italic text-slate-700">“{testimonial.message}”</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-800">
                  {testimonial.name[0]}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
                    {testimonial.name}
                  </h3>
                  <p className="text-xs text-slate-500 sm:text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
