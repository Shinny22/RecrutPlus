// import { Card, CardContent } from "@/components/ui/card";

// export default function Testimonials() {
//   const testimonials = [
//     {
//       name: "Jean M.",
//       role: "Développeur embauché",
//       message: "Grâce à ce site, j’ai trouvé un emploi en moins d’un mois !",
//     },
//     {
//       name: "Aline K.",
//       role: "Recruteuse",
//       message: "Un vivier de talents incroyable, j’ai trouvé plusieurs profils adaptés.",
//     },
//   ];

//   return (
//     <section className="py-20 bg-white">
//       <div className="max-w-6xl mx-auto px-6 text-center">
//         <h2 className="text-3xl font-bold mb-12">Témoignages</h2>
//         <div className="grid md:grid-cols-2 gap-8">
//           {testimonials.map((t, i) => (
//             <Card key={i} className="p-6 shadow rounded-2xl">
//               <CardContent>
//                 <p className="italic text-gray-600 mb-4">“{t.message}”</p>
//                 <h4 className="font-semibold">{t.name}</h4>
//                 <span className="text-sm text-gray-500">{t.role}</span>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Jean M.",
      role: "Développeur embauché",
      message: "Grâce à CFI-Recrute, j’ai trouvé un emploi en moins d’un mois ! Une plateforme fluide et efficace.",
    },
    {
      name: "Aline K.",
      role: "Recruteuse RH",
      message: "Un vivier de talents exceptionnel. J’ai pu recruter plusieurs profils qualifiés sans perte de temps.",
    },
    {
      name: "Patrick L.",
      role: "Étudiant en informatique",
      message: "CFI-CIRAS m’a permis de découvrir des opportunités incroyables et de perfectionner mes compétences techniques.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Titre section */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-12 text-gray-800"
        >
          Ce qu’ils disent du <span className="text-green-600">CFI-CIRAS</span>
        </motion.h2>

        {/* Grille de témoignages */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent>
                  <p className="italic text-gray-600 mb-6 text-lg leading-relaxed">
                    “{t.message}”
                  </p>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mb-2">
                      {t.name[0]}
                    </div>
                    <h4 className="font-semibold text-green-800">{t.name}</h4>
                    <span className="text-sm text-gray-500">{t.role}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Animation subtile de fond */}
        <motion.div
          className="absolute inset-0 -z-10 blur-3xl opacity-10"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, #3b82f6, #0ea5e9, #2563eb)",
          }}
        />
      </div>
    </section>
  );
}
