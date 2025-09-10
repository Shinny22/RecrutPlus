
"use client";

import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Award, Users, Briefcase, GraduationCap } from "lucide-react";

const teamMembers = [
  { name: "Alice Dupont", role: "CEO", photo: "/team/alice.jpg" },
  { name: "Bob Martin", role: "CTO", photo: "/team/bob.jpg" },
  { name: "Clara N’Goma", role: "HR Manager", photo: "/team/clara.jpg" },
  { name: "David Kamanzi", role: "Developer", photo: "/team/david.jpg" },
  { name: "Emma Nsimba", role: "Designer", photo: "/team/emma.jpg" },
];

const trainings = [
  { title: "Leadership et management", description: "Formation pour développer vos compétences en management." },
  { title: "Développement Web", description: "Apprenez les dernières technologies front-end et back-end." },
  { title: "Data Science & IA", description: "Formation pour maîtriser Python, ML et visualisation de données." },
  { title: "Marketing Digital", description: "Apprenez à optimiser vos campagnes et vos réseaux sociaux." },
  { title: "Communication", description: "Développez vos compétences en communication professionnelle." },
];

const values = [
  { title: "Innovation", description: "Nous encourageons la créativité et l’adoption de nouvelles technologies." },
  { title: "Excellence", description: "Nous visons la qualité dans tous nos projets et recrutements." },
  { title: "Transparence", description: "Une communication claire et honnête avec nos collaborateurs." },
  { title: "Croissance", description: "Nous investissons dans le développement continu de nos talents." },
];

const stats = [
  { icon: <Users className="w-8 h-8 text-indigo-600" />, value: "200+", label: "Collaborateurs" },
  { icon: <Briefcase className="w-8 h-8 text-indigo-600" />, value: "120+", label: "Projets Réalisés" },
  { icon: <GraduationCap className="w-8 h-8 text-indigo-600" />, value: "50+", label: "Formations Données" },
  { icon: <Award className="w-8 h-8 text-indigo-600" />, value: "10+", label: "Prix & Distinctions" },
];

export default function AboutSection() {
  const [teamSliderRef] = useKeenSlider<HTMLDivElement>({
    slidesPerView: 1,
    spacing: 20,
    loop: true,
    breakpoints: {
      "(min-width: 640px)": { slidesPerView: 2 },
      "(min-width: 1024px)": { slidesPerView: 3 },
    },
  });

  const [trainingSliderRef] = useKeenSlider<HTMLDivElement>({
    slidesPerView: 1,
    spacing: 20,
    loop: true,
    breakpoints: {
      "(min-width: 640px)": { slidesPerView: 2 },
      "(min-width: 1024px)": { slidesPerView: 3 },
    },
  });

  return (
    <section className="py-16 bg-gray-50" id="about">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Présentation de la structure */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Notre Entreprise</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Nous sommes une entreprise dédiée à l’innovation et au développement des talents. 
            Notre mission est de recruter, former et accompagner nos collaborateurs pour qu’ils réussissent dans un environnement dynamique et stimulant.
          </p>
        </div>

        {/* Membres de l'équipe */}
        <div className="mb-12">
          <h3 className="text-3xl font-semibold text-center mb-8">Notre Équipe</h3>
          <div ref={teamSliderRef} className="keen-slider">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="keen-slider__slide bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105"
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 text-center">
                  <h4 className="text-xl font-semibold">{member.name}</h4>
                  <p className="text-gray-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formations offertes */}
        <div className="mb-16">
          <h3 className="text-3xl font-semibold text-center mb-8">Formations Offertes</h3>
          <div ref={trainingSliderRef} className="keen-slider">
            {trainings.map((training) => (
              <div
                key={training.title}
                className="keen-slider__slide bg-white rounded-xl shadow-lg p-6 transform transition duration-500 hover:scale-105"
              >
                <h4 className="text-xl font-semibold mb-2">{training.title}</h4>
                <p className="text-gray-600">{training.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Nos Valeurs & Chiffres Clés */}
        <div>
          <h3 className="text-3xl font-semibold text-center mb-8">Nos Valeurs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition"
              >
                <h4 className="text-xl font-semibold mb-2">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="mb-2">{stat.icon}</div>
                <h3 className="text-3xl font-bold">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
