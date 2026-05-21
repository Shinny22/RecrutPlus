"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Clock3, Search, Users2 } from "lucide-react";
import { motion } from "framer-motion";
import { KeenSliderInstance, useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const slides = [
  {
    src: "/images/cfi_image.jpg",
    alt: "Campus CFI-CIRAS",
    title: "Trouvez l’opportunité qui accélère votre carrière",
    subtitle:
      "Une plateforme claire pour consulter les offres, déposer votre dossier et suivre votre progression.",
  },
  {
    src: "/images/Teamwork.jpg",
    alt: "Travail d’équipe",
    title: "Rejoignez une équipe ambitieuse et engagée",
    subtitle:
      "Intégrez des projets à fort impact dans le numérique, la sécurité et l’administration.",
  },
  {
    src: "/images/office.jpg",
    alt: "Espace de travail moderne",
    title: "Un environnement de travail structuré et moderne",
    subtitle:
      "Des processus fluides, un accompagnement humain et des parcours lisibles.",
  },
];

const heroStats = [
  { icon: BriefcaseBusiness, value: "120+", label: "offres publiées" },
  { icon: Users2, value: "4 000+", label: "candidats inscrits" },
  { icon: Clock3, value: "72h", label: "délai moyen de réponse" },
];

function autoplayPlugin(slider: KeenSliderInstance) {
  let timeout: NodeJS.Timeout;
  let mouseOver = false;

  const clearNextTimeout = () => clearTimeout(timeout);
  const nextTimeout = () => {
    clearTimeout(timeout);
    if (mouseOver) return;
    timeout = setTimeout(() => slider.next(), 5000);
  };

  slider.on("created", () => {
    slider.container.addEventListener("mouseover", () => {
      mouseOver = true;
      clearNextTimeout();
    });

    slider.container.addEventListener("mouseout", () => {
      mouseOver = false;
      nextTimeout();
    });

    nextTimeout();
  });

  slider.on("dragStarted", clearNextTimeout);
  slider.on("animationEnded", nextTimeout);
  slider.on("updated", nextTimeout);
}

export default function HeroSection() {
  const [search, setSearch] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      renderMode: "performance",
      defaultAnimation: { duration: 850 },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      slides: { perView: 1 },
    },
    [autoplayPlugin]
  );

  const offersHref = search.trim() ? `/Offres?q=${encodeURIComponent(search.trim())}` : "/Offres";

  return (
    <section className="relative overflow-hidden pt-24 md:pt-28" aria-label="Bannière principale">
      <div ref={sliderRef} className="keen-slider relative min-h-[78vh] overflow-hidden">
        {slides.map((slide, index) => (
          <div key={slide.title} className="keen-slider__slide relative min-h-[78vh]">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/82 via-[#052e27]/74 to-slate-900/46" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.28),transparent_38%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_78%,rgba(251,191,36,0.22),transparent_42%)]" />
          </div>
        ))}
      </div>

      <div className="hero-orb pointer-events-none absolute -left-24 top-18 h-72 w-72 rounded-full" />
      <div className="hero-orb pointer-events-none absolute -right-24 bottom-6 h-72 w-72 rounded-full" />

      <div className="pointer-events-none absolute inset-0 flex items-center">
        <div className="section-shell pointer-events-auto w-full">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <span className="section-kicker border-emerald-300/60 bg-emerald-100/85 text-emerald-900">
              CFI-Recrute
            </span>

            <h1 className="text-balance text-4xl font-semibold text-white drop-shadow-md sm:text-5xl lg:text-6xl">
              {slides[currentSlide]?.title}
            </h1>

            <p className="mt-5 max-w-2xl text-pretty text-base text-emerald-50/95 sm:text-lg">
              {slides[currentSlide]?.subtitle}
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {heroStats.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="hero-stat-chip">
                    <Icon className="h-3.5 w-3.5 text-emerald-200" />
                    <span className="text-emerald-50">{item.value}</span>
                    <span className="text-emerald-100/85">{item.label}</span>
                  </div>
                );
              })}
            </div>

            <div className="glass-panel mt-8 flex max-w-3xl flex-col gap-3 p-3 shadow-2xl sm:flex-row">
              <div className="flex flex-1 items-center gap-2 px-2">
                <Search className="h-5 w-5 text-emerald-700" />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Intitulé de poste, domaine, mot-clé..."
                  className="w-full bg-transparent py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 sm:text-base"
                />
              </div>

              <div className="flex gap-2">
                <Link href={offersHref} className="brand-btn w-full justify-center sm:w-auto">
                  Rechercher
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/Register" className="brand-btn-secondary w-full justify-center sm:w-auto">
                  S’inscrire
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((slide, index) => (
          <span
            key={slide.title}
            className={`h-1.5 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-emerald-300" : "w-2 bg-white/55"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
