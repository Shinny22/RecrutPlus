"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { animate, motion } from "framer-motion";
import { Award, BookOpen, GraduationCap, Handshake, Lightbulb, Users } from "lucide-react";

const teamMembers = [
  { name: "Alain EKONDZI", role: "Directeur du CFI-CIRAS", photo: "/images/Dcfi.jpg" },
  { name: "ILOKI-NGATSONGO Alphonse", role: "Ingénieur en informatique", photo: "/images/iloki.jpg" },
  { name: "OBAMI YALLA Christ", role: "Docteur en droit", photo: "/images/yala.jpg" },
];

const trainings = [
  "Génie Logiciel",
  "Système et Réseaux",
  "Ingénierie Logicielle & Cybersécurité",
  "Gestion de Projets Innovants",
  "Administration Publique",
  "Réseaux & Télécommunications",
];

const values = [
  {
    title: "Engagement",
    description: "Nous accompagnons chaque talent avec exigence et proximité.",
    icon: Handshake,
  },
  {
    title: "Innovation",
    description: "Nous valorisons les approches nouvelles pour créer plus d’impact.",
    icon: Lightbulb,
  },
  {
    title: "Intégrité",
    description: "Nos décisions s’appuient sur la transparence et la responsabilité.",
    icon: Award,
  },
  {
    title: "Transmission",
    description: "Nous développons les compétences utiles pour le marché actuel.",
    icon: BookOpen,
  },
];

const stats = [
  { icon: Users, value: 250, label: "Candidats recrutés" },
  { icon: GraduationCap, value: 150, label: "Formations dispensées" },
  { icon: Handshake, value: 75, label: "Partenaires entreprises" },
  { icon: Award, value: 90, label: "Taux d’insertion" },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, target, {
      duration: 1.8,
      onUpdate: (currentValue) => setValue(Math.floor(currentValue)),
    });
    return () => controls.stop();
  }, [target]);

  return (
    <span>
      {value}
      {suffix}
    </span>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden">
      <div className="section-shell">
        <div className="text-center">
          <span className="section-kicker">À propos</span>
          <h2 className="section-title">Le CFI-CIRAS en quelques repères</h2>
          <p className="section-subtitle">
            Centre de Formation en Informatique du CIRAS, établissement public basé à
            Brazzaville. Nous formons, accompagnons et connectons les talents aux
            opportunités professionnelles.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {teamMembers.map((member) => (
            <article key={member.name} className="surface-card overflow-hidden p-0">
              <div className="relative h-56">
                <Image src={member.photo} alt={member.name} fill className="object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-slate-900">{member.name}</h3>
                <p className="mt-1 text-sm text-emerald-700">{member.role}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {trainings.map((training) => (
            <div key={training} className="surface-card-soft flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <BookOpen size={18} />
              </span>
              <p className="font-medium text-slate-800">{training}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.article
                key={value.title}
                className="surface-card-soft"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Icon size={20} />
                </div>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{value.title}</h3>
                <p className="mt-1 text-sm text-slate-600 sm:text-base">{value.description}</p>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const suffix = stat.value === 90 ? "%" : "+";
            return (
              <div key={stat.label} className="surface-card-soft text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Icon size={20} />
                </div>
                <h3 className="mt-3 text-3xl font-semibold text-slate-900">
                  <AnimatedNumber target={stat.value} suffix={suffix} />
                </h3>
                <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
