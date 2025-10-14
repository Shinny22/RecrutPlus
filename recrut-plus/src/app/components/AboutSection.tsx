
// "use client";

// import React, { useState, useEffect } from "react";
// import { useKeenSlider } from "keen-slider/react";
// import "keen-slider/keen-slider.min.css";
// import { Award, Users, Briefcase, GraduationCap, Lightbulb, Handshake, TrendingUp, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
// import { useInView } from "react-intersection-observer";
// import { motion, animate } from "framer-motion";
// import Image from "next/image"; // Import Image for optimized images

// const teamMembers = [
//   { name: "Alain EKONDZI", role: "Docteur en informatique, Directeur du CFI-CIRAS", photo: "/images/agent1.jpg" },
//   { name: "ILOKI-NGATSONGO Alphonse", role: "Ingénieur en informatique", photo: "/images/agent2.jpg" },
//   { name: "OBAMI YALLA Christ", role: "Docteur en droit", photo: "/images/agent3.jpg" },
//   { name: "David Kamanzi", role: "Chef de Projet du CFI-CIRAS", photo: "/images/agent4.jpg" },
//   { name: "Emma Nsimba", role: "Responsable Pédagogique du CFI-CIRAS", photo: "/images/agent5.jpg" },
// ];

// const trainings = [
//   { title: "Génie Logiciel", description: "Acquérez les compétences clés pour réussir votre insertion professionnelle et évoluer.", icon: <Briefcase className="text-orange-600" size={28} /> },
//   { title: "Système et Réseaux", description: "Maîtrisez les outils et technologies numériques essentiels pour le marché du travail actuel.", icon: <BookOpen className="text-orange-600" size={28} /> },
//   { title: "Ingénierie Logicielle & Cybersécurité", description: "Formez-vous aux méthodes de développement logiciel et aux meilleures pratiques de cybersécurité.", icon: <Lightbulb className="text-orange-600" size={28} /> },
//   { title: "Gestion de Projets Innovants", description: "Apprenez à piloter des projets complexes, de l'idéation à la réalisation, avec agilité.", icon: <TrendingUp className="text-orange-600" size={28} /> },
//   { title: "Administration Publique", description: "Participez à des projets de recherche concrets et innovants pour résoudre des défis réels.", icon: <GraduationCap className="text-orange-600" size={28} /> },
//   { title: "Réseaux et télécomunications", description: "Participez à des projets de recherche concrets et innovants pour résoudre des défis réels.", icon: <GraduationCap className="text-orange-600" size={28} /> },
// ];

// const values = [
//   { title: "Engagement", description: "Nous nous engageons pour la réussite de chaque talent et la qualité de nos services.", icon: <Handshake className="text-green-600" size={28} /> },
//   { title: "Innovation", description: "Nous encourageons la créativité et l’adoption de nouvelles approches pour un impact maximal.", icon: <Lightbulb className="text-green-600" size={28} /> },
//   { title: "Intégrité", description: "Nous agissons avec éthique, transparence et respect dans toutes nos interactions.", icon: <Award className="text-green-600" size={28} /> },
//   { title: "Développement Continu", description: "Nous investissons dans l'apprentissage et l'amélioration constante de nos programmes et de nos équipes.", icon: <TrendingUp className="text-green-600" size={28} /> },
// ];

// const stats = [
//   { icon: <Users className="w-8 h-8 text-orange-600" />, value: 250, label: "Candidats Recrutés" },
//   { icon: <GraduationCap className="w-8 h-8 text-orange-600" />, value: 150, label: "Formations Dispensées" },
//   { icon: <Handshake className="w-8 h-8 text-orange-600" />, value: 75, label: "Partenaires Entreprises" },
//   { icon: <Award className="w-8 h-8 text-orange-600" />, value: 90, label: "Taux d'Insertion (%)" },
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

//   return <span>{value}{target === 90 ? "%" : "+"}</span>;
// }

// export default function AboutSection() {
//   const [teamSliderRef] = useKeenSlider<HTMLDivElement>({
//     loop: true,
//     slides: {
//       perView: 1,
//       spacing: 20,
//     },
//     breakpoints: {
//       "(min-width: 640px)": {
//         slides: { perView: 2, spacing: 20 },
//       },
//       "(min-width: 1024px)": {
//         slides: { perView: 3, spacing: 20 },
//       },
//     },
//   });

//   const [trainingSliderRef] = useKeenSlider<HTMLDivElement>({
//     loop: true,
//     slides: {
//       perView: 1,
//       spacing: 20,
//     },
//     breakpoints: {
//       "(min-width: 640px)": {
//         slides: { perView: 2, spacing: 20 },
//       },
//       "(min-width: 1024px)": {
//         slides: { perView: 3, spacing: 20 },
//       },
//     },
//   });

//   const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

//   return (
//     <section className="py-16 bg-gray-50" id="about">
//       <div className="container mx-auto px-6 lg:px-20">
//         {/* Présentation */}
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold mb-4 text-gray-900">À Propos du <span className="text-orange-600">CFI-CIRAS</span></h2>
//           <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
//             Le CFI-CIRAS est un centre d'excellence dédié à la formation, à l'insertion professionnelle et à la recherche appliquée.
//             Notre mission est de développer les compétences de demain, d'accompagner les talents vers l'emploi et de stimuler l'innovation pour un avenir durable.
//             Nous bâtissons des ponts entre l'éducation et le monde professionnel, en offrant des opportunités uniques de croissance et de réussite.
//           </p>
//         </div>

//         {/* Équipe */}
//         <div className="mb-12">
//           <h3 className="text-3xl font-semibold text-center mb-8 text-gray-900">Notre Équipe <span className="text-orange-600">d'Experts</span></h3>
//           <div ref={teamSliderRef} className="keen-slider">
//             {teamMembers.map((member) => (
//               <div
//                 key={member.name}
//                 className="keen-slider__slide bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transform transition duration-500 hover:scale-[1.02] hover:shadow-xl"
//               >
//                 <div className="relative w-full h-48">
//                   <Image src={member.photo} alt={member.name} fill style={{ objectFit: "cover" }} className="transition duration-300 hover:brightness-90" />
//                 </div>
//                 <div className="p-6 text-center">
//                   <h4 className="text-xl font-semibold text-gray-800">{member.name}</h4>
//                   <p className="text-orange-600 font-medium">{member.role}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Formations */}
//         <div className="mb-16">
//           <h3 className="text-3xl font-semibold text-center mb-8 text-gray-900">Nos Programmes de <span className="text-green-600">Formation</span></h3>
//           <div ref={trainingSliderRef} className="keen-slider">
//             {trainings.map((training) => (
//               <div
//                 key={training.title}
//                 className="keen-slider__slide bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex flex-col items-center text-center transform transition duration-500 hover:scale-[1.02] hover:shadow-xl"
//               >
//                 <div className="bg-orange-100 p-3 rounded-full mb-4">
//                   {training.icon}
//                 </div>
//                 <h4 className="text-xl font-semibold mb-2 text-gray-800">{training.title}</h4>
//                 <p className="text-gray-600 leading-relaxed">{training.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Valeurs & Chiffres Clés */}
//         <div ref={ref}>
//           <h3 className="text-3xl font-semibold text-center mb-8 text-gray-900">Nos <span className="text-orange-600">Valeurs</span> Fondamentales</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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

import React, { useState, useEffect } from "react";
import { useKeenSlider, KeenSliderInstance } from "keen-slider/react";
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
  { name: "Alain EKONDZI", role: "Docteur en informatique, Directeur du CFI-CIRAS", photo: "/images/agent1.jpg" },
  { name: "ILOKI-NGATSONGO Alphonse", role: "Ingénieur en informatique", photo: "/images/agent2.jpg" },
  { name: "OBAMI YALLA Christ", role: "Docteur en droit", photo: "/images/agent3.jpg" },
  { name: "David Kamanzi", role: "Chef de Projet du CFI-CIRAS", photo: "/images/agent4.jpg" },
  { name: "Emma Nsimba", role: "Responsable Pédagogique du CFI-CIRAS", photo: "/images/agent5.jpg" },
];

const trainings = [
  { title: "Génie Logiciel", description: "Acquérez les compétences clés pour réussir votre insertion professionnelle et évoluer.", icon: <Briefcase className="text-orange-600" size={28} /> },
  { title: "Système et Réseaux", description: "Maîtrisez les outils et technologies numériques essentiels pour le marché du travail actuel.", icon: <BookOpen className="text-orange-600" size={28} /> },
  { title: "Ingénierie Logicielle & Cybersécurité", description: "Formez-vous aux méthodes de développement logiciel et aux meilleures pratiques de cybersécurité.", icon: <Lightbulb className="text-orange-600" size={28} /> },
  { title: "Gestion de Projets Innovants", description: "Apprenez à piloter des projets complexes, de l'idéation à la réalisation, avec agilité.", icon: <TrendingUp className="text-orange-600" size={28} /> },
  { title: "Administration Publique", description: "Formation en gestion publique, politiques, institutions, etc.", icon: <GraduationCap className="text-orange-600" size={28} /> },
  { title: "Réseaux & Télécommunications", description: "Devenez un expert en connectivité, protocoles et infrastructures télécom.", icon: <GraduationCap className="text-orange-600" size={28} /> },
];

const values = [
  { title: "Engagement", description: "Nous nous engageons pour la réussite de chaque talent et la qualité de nos services.", icon: <Handshake className="text-green-600" size={28} /> },
  { title: "Innovation", description: "Nous encourageons la créativité et l’adoption de nouvelles approches pour un impact maximal.", icon: <Lightbulb className="text-green-600" size={28} /> },
  { title: "Intégrité", description: "Nous agissons avec éthique, transparence et respect dans toutes nos interactions.", icon: <Award className="text-green-600" size={28} /> },
  { title: "Développement Continu", description: "Nous investissons dans l'apprentissage et l'amélioration constante de nos programmes et de nos équipes.", icon: <TrendingUp className="text-green-600" size={28} /> },
];

const stats = [
  { icon: <Users className="w-8 h-8 text-orange-600" />, value: 250, label: "Candidats Recrutés" },
  { icon: <GraduationCap className="w-8 h-8 text-orange-600" />, value: 150, label: "Formations Dispenses" },
  { icon: <Handshake classNumber="w-8 h-8 text-orange-600" />, value: 75, label: "Partenaires Entreprises" },
  { icon: <Award className="w-8 h-8 text-orange-600" />, value: 90, label: "Taux d’Insertion (%)" },
];

function AnimatedNumber({ target }: { target: number }) {
  const [value, setValue] = useState(0);
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
  // On stocke aussi l’instance du slider pour manipuler avec les boutons
  const [teamSlider, teamApi] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
      spacing: 20,
    },
    breakpoints: {
      "(min-width: 640px)": { slides: { perView: 2, spacing: 20 } },
      "(min-width: 1024px)": { slides: { perView: 3, spacing: 20 } },
    },
  });

  const [trainingSlider, trainingApi] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
      spacing: 20,
    },
    breakpoints: {
      "(min-width: 640px)": { slides: { perView: 2, spacing: 20 } },
      "(min-width: 1024px)": { slides: { perView: 3, spacing: 20 } },
    },
  });

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="py-16 bg-gray-50" id="about">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Titre + intro */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            À Propos du <span className="text-orange-600">CFI-CIRAS</span>
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
  Le CFI-CIRAS est le Centre de Formation en Informatique du CIRAS, un établissement d’enseignement supérieur public.
  <br />
  Adresse : Immeuble CFI-CIRAS, rue Lamothe, B.P. 1542, Brazzaville
  <br />
  Contact : +242 06 403 85 36 • contact@cfi-ciras.cg
</p>
        </div>

        {/* Équipe avec navigation */}
        <div className="mb-12 relative">
          <h3 className="text-3xl font-semibold text-center mb-8 text-gray-900">
            Notre Équipe <span className="text-orange-600">d’Experts</span>
          </h3>
          {/* Boutons navigation */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-gray-100 z-10"
            onClick={() => teamApi?.prev()}
            aria-label="Slide précédent"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-gray-100 z-10"
            onClick={() => teamApi?.next()}
            aria-label="Slide suivant"
          >
            <ChevronRight size={24} />
          </button>

          <div ref={teamSlider} className="keen-slider">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="keen-slider__slide bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transform transition duration-500 hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition duration-300 hover:brightness-90"
                  />
                </div>
                <div className="p-6 text-center">
                  <h4 className="text-xl font-semibold text-gray-800">{member.name}</h4>
                  <p className="text-orange-600 font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formations avec navigation */}
        <div className="mb-16 relative">
          <h3 className="text-3xl font-semibold text-center mb-8 text-gray-900">
            Nos Programmes de <span className="text-green-600">Formation</span>
          </h3>
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-gray-100 z-10"
            onClick={() => trainingApi?.prev()}
            aria-label="Slide précédent formation"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-gray-100 z-10"
            onClick={() => trainingApi?.next()}
            aria-label="Slide suivant formation"
          >
            <ChevronRight size={24} />
          </button>

          <div ref={trainingSlider} className="keen-slider">
            {trainings.map((training) => (
              <div
                key={training.title}
                className="keen-slider__slide bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex flex-col items-center text-center transform transition duration-500 hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="bg-orange-100 p-3 rounded-full mb-4">
                  {training.icon}
                </div>
                <h4 className="text-xl font-semibold mb-2 text-gray-800">{training.title}</h4>
                <p className="text-gray-600 leading-relaxed">{training.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Valeurs & Chiffres Clés */}
        <div ref={ref}>
          <h3 className="text-3xl font-semibold text-center mb-8 text-gray-900">
            Nos <span className="text-orange-600">Valeurs</span> Fondamentales
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-xl shadow p-6 text-center border border-gray-100 hover:shadow-lg transition duration-300 hover:scale-[1.02]"
              >
                <div className="bg-green-100 p-3 rounded-full mb-4 mx-auto w-fit">
                  {value.icon}
                </div>
                <h4 className="text-xl font-semibold mb-2 text-gray-800">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>

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
                <h3 className="text-4xl font-bold text-gray-900">
                  {inView ? <AnimatedNumber target={stat.value} /> : "0"}
                </h3>
                <p className="text-gray-600 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
