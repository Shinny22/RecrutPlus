


// "use client";

// import React, { useState, useEffect } from "react";
// import { useKeenSlider } from "keen-slider/react";
// import "keen-slider/keen-slider.min.css";
// import {
//   Award,
//   Users,
//   Briefcase,
//   GraduationCap,
//   Lightbulb,
//   Handshake,
//   TrendingUp,
//   BookOpen,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { useInView } from "react-intersection-observer";
// import { motion, animate } from "framer-motion";
// import Image from "next/image";

// const teamMembers = [
//   { name: "Alain EKONDZI", role: "Docteur en informatique, Directeur du CFI-CIRAS", photo: "/images/agent1.jpg" },
//   { name: "ILOKI-NGATSONGO Alphonse", role: "Ingénieur en informatique", photo: "/images/agent2.jpg" },
//   { name: "OBAMI YALLA Christ", role: "Docteur en droit", photo: "/images/agent3.jpg" },
//   { name: "David Kamanzi", role: "Chef de Projet du CFI-CIRAS", photo: "/images/agent4.jpg" },
//   { name: "Emma Nsimba", role: "Responsable Pédagogique du CFI-CIRAS", photo: "/images/agent5.jpg" },
// ];

// const trainings = [
//   {
//     title: "Génie Logiciel",
//     description: "Acquérez les compétences clés pour réussir votre insertion professionnelle et évoluer.",
//     icon: <Briefcase className="text-green-600" size={28} />,
//   },
//   {
//     title: "Système et Réseaux",
//     description: "Maîtrisez les outils et technologies numériques essentiels pour le marché du travail actuel.",
//     icon: <BookOpen className="text-green-600" size={28} />,
//   },
//   {
//     title: "Ingénierie Logicielle & Cybersécurité",
//     description: "Formez-vous aux méthodes de développement logiciel et aux meilleures pratiques de cybersécurité.",
//     icon: <Lightbulb className="text-green-600" size={28} />,
//   },
//   {
//     title: "Gestion de Projets Innovants",
//     description: "Apprenez à piloter des projets complexes, de l'idéation à la réalisation, avec agilité.",
//     icon: <TrendingUp className="text-green-600" size={28} />,
//   },
//   {
//     title: "Administration Publique",
//     description: "Formation en gestion publique, politiques et institutions.",
//     icon: <GraduationCap className="text-green-600" size={28} />,
//   },
//   {
//     title: "Réseaux & Télécommunications",
//     description: "Devenez un expert en connectivité, protocoles et infrastructures télécom.",
//     icon: <GraduationCap className="text-green-600" size={28} />,
//   },
// ];

// const values = [
//   {
//     title: "Engagement",
//     description: "Nous nous engageons pour la réussite de chaque talent et la qualité de nos services.",
//     icon: <Handshake className="text-green-600" size={28} />,
//   },
//   {
//     title: "Innovation",
//     description: "Nous encourageons la créativité et l’adoption de nouvelles approches pour un impact maximal.",
//     icon: <Lightbulb className="text-green-600" size={28} />,
//   },
//   {
//     title: "Intégrité",
//     description: "Nous agissons avec éthique, transparence et respect dans toutes nos interactions.",
//     icon: <Award className="text-green-600" size={28} />,
//   },
//   {
//     title: "Développement Continu",
//     description: "Nous investissons dans l'apprentissage et l'amélioration constante de nos programmes et équipes.",
//     icon: <TrendingUp className="text-green-600" size={28} />,
//   },
// ];

// const stats = [
//   { icon: <Users className="w-8 h-8 text-green-600" />, value: 250, label: "Candidats Recrutés" },
//   { icon: <GraduationCap className="w-8 h-8 text-green-600" />, value: 150, label: "Formations Dispensées" },
//   { icon: <Handshake className="w-8 h-8 text-green-600" />, value: 75, label: "Partenaires Entreprises" },
//   { icon: <Award className="w-8 h-8 text-green-600" />, value: 90, label: "Taux d'Insertion (%)" },
// ];

// function AnimatedNumber({ target }: { target: number }) {
//   const [value, setValue] = useState(0);
//   useEffect(() => {
//     const controls = animate(0, target, {
//       duration: 2,
//       onUpdate: (v) => setValue(Math.floor(v)),
//     });
//     return () => controls.stop();
//   }, [target]);
//   return (
//     <span>
//       {value}
//       {target === 90 ? "%" : "+"}
//     </span>
//   );
// }

// export default function AboutSection() {
//   const [teamSliderRef, teamApi] = useKeenSlider<HTMLDivElement>({
//     loop: true,
//     slides: { perView: 1, spacing: 20 },
//     breakpoints: {
//       "(min-width: 640px)": { slides: { perView: 2, spacing: 20 } },
//       "(min-width: 1024px)": { slides: { perView: 3, spacing: 20 } },
//     },
//   });

//   const [trainingSliderRef, trainingApi] = useKeenSlider<HTMLDivElement>({
//     loop: true,
//     slides: { perView: 1, spacing: 20 },
//     breakpoints: {
//       "(min-width: 640px)": { slides: { perView: 2, spacing: 20 } },
//       "(min-width: 1024px)": { slides: { perView: 3, spacing: 20 } },
//     },
//   });

//   const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

//   return (
//     <section className="py-16 bg-gray-50" id="about">
//       <div className="container mx-auto px-6 lg:px-20">
//         {/* Présentation */}
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold mb-4 text-gray-900">
//             À Propos du <span className="text-green-600">CFI-CIRAS</span>
//           </h2>
//           <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
//             Le CFI-CIRAS est le Centre de Formation en Informatique du CIRAS, un établissement d’enseignement supérieur public.
//             <br />
//             <strong>Adresse :</strong> Immeuble CFI-CIRAS, rue Lamothe, B.P. 1542, Brazzaville
//             <br />
//             <strong>Contact :</strong> +242 06 403 85 36 • contact@cfi-ciras.cg
//           </p>
//         </div>

//         {/* Équipe */}
//         <div className="mb-12 relative">
//           <h3 className="text-3xl font-semibold text-center mb-8 text-gray-900">
//             Notre Équipe <span className="text-green-600">d'Experts</span>
//           </h3>

//           <div ref={teamSliderRef} className="keen-slider">
//             {teamMembers.map((member) => (
//               <div
//                 key={member.name}
//                 className="keen-slider__slide bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transform transition duration-500 hover:scale-[1.02] hover:shadow-xl"
//               >
//                 <div className="relative w-full h-48">
//                   <Image
//                     src={member.photo}
//                     alt={member.name}
//                     fill
//                     style={{ objectFit: "cover" }}
//                     className="transition duration-300 hover:brightness-90"
//                   />
//                 </div>
//                 <div className="p-6 text-center">
//                   <h4 className="text-xl font-semibold text-gray-800">{member.name}</h4>
//                   <p className="text-green-600 font-medium">{member.role}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Navigation */}
//           <div className="flex justify-center gap-4 mt-4">
//             <button
//               onClick={() => teamApi.current?.prev()}
//               className="p-2 rounded-full bg-green-600 text-white hover:bg-orange-700 transition"
//             >
//               <ChevronLeft />
//             </button>
//             <button
//               onClick={() => teamApi.current?.next()}
//               className="p-2 rounded-full bg-green-600 text-white hover:bg-orange-700 transition"
//             >
//               <ChevronRight />
//             </button>
//           </div>
//         </div>

//         {/* Formations */}
//         <div className="mb-16 relative">
//           <h3 className="text-3xl font-semibold text-center mb-8 text-gray-900">
//             Nos Programmes de <span className="text-green-600">Formation</span>
//           </h3>

//           <div ref={trainingSliderRef} className="keen-slider">
//             {trainings.map((training) => (
//               <div
//                 key={training.title}
//                 className="keen-slider__slide bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex flex-col items-center text-center transform transition duration-500 hover:scale-[1.02] hover:shadow-xl"
//               >
//                 <div className="bg-green-100 p-3 rounded-full mb-4">{training.icon}</div>
//                 <h4 className="text-xl font-semibold mb-2 text-gray-800">{training.title}</h4>
//                 <p className="text-gray-600 leading-relaxed">{training.description}</p>
//               </div>
//             ))}
//           </div>

//           {/* Navigation */}
//           <div className="flex justify-center gap-4 mt-4">
//             <button
//               onClick={() => trainingApi.current?.prev()}
//               className="p-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition"
//             >
//               <ChevronLeft />
//             </button>
//             <button
//               onClick={() => trainingApi.current?.next()}
//               className="p-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition"
//             >
//               <ChevronRight />
//             </button>
//           </div>
//         </div>

//         {/* Valeurs & Chiffres clés */}
//         <div ref={ref}>
//           <h3 className="text-3xl font-semibold text-center mb-8 text-gray-900">
//             Nos <span className="text-green-600">Valeurs</span> Fondamentales
//           </h3>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
//             {values.map((value) => (
//               <div
//                 key={value.title}
//                 className="bg-white rounded-xl shadow p-6 text-center border border-gray-100 hover:shadow-lg transition duration-300 hover:scale-[1.02]"
//               >
//                 <div className="bg-green-100 p-3 rounded-full mb-4 mx-auto w-fit">
//                   {value.icon}
//                 </div>
//                 <h4 className="text-xl font-semibold mb-2 text-gray-800">{value.title}</h4>
//                 <p className="text-gray-600 leading-relaxed">{value.description}</p>
//               </div>
//             ))}
//           </div>

//           {/* Statistiques */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
//             {stats.map((stat, index) => (
//               <motion.div
//                 key={index}
//                 className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition duration-300"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={inView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ delay: index * 0.2 }}
//               >
//                 <div className="mb-3">{stat.icon}</div>
//                 <h3 className="text-4xl font-bold text-gray-900">
//                   {inView ? <AnimatedNumber target={stat.value} /> : "0"}
//                 </h3>
//                 <p className="text-gray-600 mt-1">{stat.label}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";

import React, { useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import {
  Award,
  Users,
  Briefcase,
  GraduationCap,
  Lightbulb,
  Handshake,
  TrendingUp,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useInView } from "react-intersection-observer";
import { motion, animate } from "framer-motion";
import Image from "next/image";

const teamMembers = [
  { name: "Alain EKONDZI", role: "Docteur en informatique, Directeur du CFI-CIRAS", photo: "/images/Dcfi.jpg" },
  { name: "ILOKI-NGATSONGO Alphonse", role: "Ingénieur en informatique", photo: "/images/iloki.jpg" },
  { name: "OBAMI YALLA Christ", role: "Docteur en droit", photo: "/images/yala.jpg" },
  { name: "David Kamanzi", role: "Chef de Projet du CFI-CIRAS", photo: "/images/agent5.jpg" },
  { name: "Emma Nsimba", role: "Responsable Pédagogique du CFI-CIRAS", photo: "/images/agent4.jpg" },
];

const trainings = [
  {
    title: "Génie Logiciel",
    description: "Acquérez les compétences clés pour réussir votre insertion professionnelle et évoluer.",
    icon: <Briefcase className="text-green-600" size={28} />,
  },
  {
    title: "Système et Réseaux",
    description: "Maîtrisez les outils et technologies numériques essentiels pour le marché du travail actuel.",
    icon: <BookOpen className="text-green-600" size={28} />,
  },
  {
    title: "Ingénierie Logicielle & Cybersécurité",
    description: "Formez-vous aux méthodes de développement logiciel et aux meilleures pratiques de cybersécurité.",
    icon: <Lightbulb className="text-green-600" size={28} />,
  },
  {
    title: "Gestion de Projets Innovants",
    description: "Apprenez à piloter des projets complexes, de l'idéation à la réalisation, avec agilité.",
    icon: <TrendingUp className="text-green-600" size={28} />,
  },
  {
    title: "Administration Publique",
    description: "Formation en gestion publique, politiques et institutions.",
    icon: <GraduationCap className="text-green-600" size={28} />,
  },
  {
    title: "Réseaux & Télécommunications",
    description: "Devenez un expert en connectivité, protocoles et infrastructures télécom.",
    icon: <GraduationCap className="text-green-600" size={28} />,
  },
];

const values = [
  { title: "Engagement", description: "Nous nous engageons pour la réussite de chaque talent et la qualité de nos services.", icon: <Handshake className="text-green-600" size={28} /> },
  { title: "Innovation", description: "Nous encourageons la créativité et l’adoption de nouvelles approches pour un impact maximal.", icon: <Lightbulb className="text-green-600" size={28} /> },
  { title: "Intégrité", description: "Nous agissons avec éthique, transparence et respect dans toutes nos interactions.", icon: <Award className="text-green-600" size={28} /> },
  { title: "Développement Continu", description: "Nous investissons dans l'apprentissage et l'amélioration constante de nos programmes et équipes.", icon: <TrendingUp className="text-green-600" size={28} /> },
];

const stats = [
  { icon: <Users className="w-8 h-8 text-green-600" />, value: 250, label: "Candidats Recrutés" },
  { icon: <GraduationCap className="w-8 h-8 text-green-600" />, value: 150, label: "Formations Dispensées" },
  { icon: <Handshake className="w-8 h-8 text-green-600" />, value: 75, label: "Partenaires Entreprises" },
  { icon: <Award className="w-8 h-8 text-green-600" />, value: 90, label: "Taux d'Insertion (%)" },
];

function AnimatedNumber({ target }: { target: number }) {
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    const controls = animate(0, target, {
      duration: 2,
      onUpdate: (v) => setValue(Math.floor(v)),
    });
    return () => controls.stop();
  }, [target]);
  return <span>{value}{target === 90 ? "%" : "+"}</span>;
}

export default function AboutSection() {
  // KeenSlider pour l'équipe
  const [teamSliderRef, teamApi] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1, spacing: 20 },
    breakpoints: {
      "(min-width: 640px)": { slides: { perView: 2, spacing: 20 } },
      "(min-width: 1024px)": { slides: { perView: 3, spacing: 20 } },
    },
  });

  // KeenSlider pour les formations
  const [trainingSliderRef, trainingApi] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1, spacing: 20 },
    breakpoints: {
      "(min-width: 640px)": { slides: { perView: 2, spacing: 20 } },
      "(min-width: 1024px)": { slides: { perView: 3, spacing: 20 } },
    },
  });

  // Auto-scroll pour équipe
  useEffect(() => {
    const interval = setInterval(() => {
      teamApi.current?.next();
    }, 4000); // défile toutes les 4s
    return () => clearInterval(interval);
  }, [teamApi]);

  // Auto-scroll pour formations
  useEffect(() => {
    const interval = setInterval(() => {
      trainingApi.current?.next();
    }, 4500); // défile toutes les 4,5s
    return () => clearInterval(interval);
  }, [trainingApi]);

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="relative py-16 bg-gray-50" id="about">
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-5 pointer-events-none"
        // style={{ backgroundImage: "url('/images/logo cfi.png')" }}
        style={{
          backgroundImage: "url('/images/cfi_image.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="container mx-auto px-6 lg:px-20">
        {/* Présentation */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            À Propos du <span className="text-green-600">CFI-CIRAS</span>
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Le CFI-CIRAS est le Centre de Formation en Informatique du CIRAS, un établissement d’enseignement supérieur public.
            <br />
            <strong>Adresse :</strong> Immeuble CFI-CIRAS, rue Lamothe, B.P. 1542, Brazzaville
            <br />
            <strong>Contact :</strong> +242 06 403 85 36 • contact@cfi-ciras.cg
          </p>
        </div>

        {/* Équipe */}
        <div className="mb-12 relative">
          <h3 className="text-3xl font-semibold text-center mb-8 text-gray-900">
            Notre Équipe <span className="text-green-600">d&apos;Experts</span>
          </h3>
          <div ref={teamSliderRef} className="keen-slider">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="keen-slider__slide bg-white  rounded-xl shadow-lg overflow-hidden border border-gray-100 transform transition duration-500 hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="relative w-full h-90">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition duration-300 hover:brightness-90 "
                  />
                </div>
                <div className="p-10 text-center bg-gray-800/10">
                  <h4 className="text-xl font-semibold text-gray-800">{member.name}</h4>
                  <p className="text-green-600 font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-4">
            <button onClick={() => teamApi.current?.prev()} className="p-2 rounded-full bg-green-600 text-white hover:bg-orange-700 transition">
              <ChevronLeft />
            </button>
            <button onClick={() => teamApi.current?.next()} className="p-2 rounded-full bg-green-600 text-white hover:bg-orange-700 transition">
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* Formations */}
        <div className="mb-16 relative">
          <h3 className="text-3xl font-semibold text-center mb-8 text-gray-900">
            Nos Programmes de <span className="text-green-600">Formation</span>
          </h3>
          <div ref={trainingSliderRef} className="keen-slider">
            {trainings.map((training) => (
              <div
                key={training.title}
                className="keen-slider__slide bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex flex-col items-center text-center transform transition duration-500 hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="bg-green-100 p-3 rounded-full mb-4">{training.icon}</div>
                <h4 className="text-xl font-semibold mb-2 text-gray-800">{training.title}</h4>
                <p className="text-gray-600 leading-relaxed">{training.description}</p>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-4">
            <button onClick={() => trainingApi.current?.prev()} className="p-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition">
              <ChevronLeft />
            </button>
            <button onClick={() => trainingApi.current?.next()} className="p-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition">
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* Valeurs & Statistiques */}
        <div ref={ref}>
          <h3 className="text-3xl font-semibold text-center mb-8 text-gray-900">
            Nos <span className="text-green-600">Valeurs</span> Fondamentales
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-xl shadow p-6 text-center border border-gray-100 hover:shadow-lg transition duration-300 hover:scale-[1.02]"
              >
                <div className="bg-green-100 p-3 rounded-full mb-4 mx-auto w-fit">{value.icon}</div>
                <h4 className="text-xl font-semibold mb-2 text-gray-800">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2 }}
              >
                <div className="mb-3">{stat.icon}</div>
                <h3 className="text-4xl font-bold text-gray-900">{inView ? <AnimatedNumber target={stat.value} /> : "0"}</h3>
                <p className="text-gray-600 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
