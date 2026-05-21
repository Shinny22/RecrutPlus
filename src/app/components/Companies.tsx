"use client";

import Image from "next/image";

const partners = [
  {
    name: "African University of Management",
    logo: "/images/AUM.jpeg",
    href: "https://site-of-partner.example",
  },
  {
    name: "Académie Cisco",
    logo: "/images/IAI.jpeg",
    href: "https://www.cisco.com",
  },
  {
    name: "Université de Reims",
    logo: "/images/MTN.jpeg",
    href: "https://www.univ-reims.fr",
  },
  {
    name: "Université de Versailles",
    logo: "/images/UV.jpeg",
    href: "https://www.universite-versailles.fr",
  },
  {
    name: "HP IVENT",
    logo: "/images/URC.jpeg",
    href: "https://www.hp.com",
  },
  {
    name: "Institut Africain d’Informatique (IAI)",
    logo: "/images/HP.png",
    href: "https://www.iai.org",
  },
  {
    name: "Université Marien Ngouabi",
    logo: "/images/PV.png",
    href: "https://www.univ-marien-ngouabi.cg",
  },
];

export default function Companies() {
  return (
    <section className="relative">
      <div className="section-shell">
        <div className="text-center">
          <span className="section-kicker">Partenaires</span>
          <h2 className="section-title">Ils nous font confiance</h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="surface-card-soft flex min-h-28 items-center justify-center transition hover:-translate-y-1"
              aria-label={partner.name}
            >
              <div className="relative h-14 w-full max-w-[160px]">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
