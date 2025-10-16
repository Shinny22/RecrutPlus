

"use client";

import Image from "next/image";

export default function Companies() {
  const partners = [
    {
      name: "African University of Management",
      logo: "/images/partenaires/african_university_management.png",
      href: "https://site-of-partner.example", 
    },
    {
      name: "Académie Cisco",
      logo: "/images/partenaires/academie_cisco.png",
      href: "https://www.cisco.com",
    },
    {
      name: "Université de Reims",
      logo: "/images/partenaires/universite_reims.png",
      href: "https://www.univ-reims.fr",
    },
    {
      name: "Université de Versailles",
      logo: "/images/partenaires/universite_versailles.png",
      href: "https://www.universite-versailles.fr",
    },
    {
      name: "HP IVENT",
      logo: "/images/partenaires/hp_ivent.png",
      href: "https://www.hp.com",
    },
    {
      name: "Institut Africain d’Informatique (IAI)",
      logo: "/images/partenaires/iai.png",
      href: "https://www.iai.org",  // hypothétique
    },
    {
      name: "Université Marien Ngouabi",
      logo: "/images/partenaires/univ_marien_ngouabi.png",
      href: "https://www.univ‐marien‐ngouabi.cg",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Ils nous font confiance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
          {partners.map((p, i) => (
            <a
              key={i}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              <div className="relative h-20 w-full max-w-xs p-4 bg-white rounded-xl shadow hover:scale-105 transition transform">
                <Image
                  src={p.logo}
                  alt={`${p.name} logo`}
                  fill
                  style={{ objectFit: "contain" }}
                  className="opacity-80 hover:opacity-100 transition"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
