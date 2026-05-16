"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Globe, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden text-emerald-50"
      style={{
        backgroundImage:
          "linear-gradient(140deg, rgba(2,44,34,0.95), rgba(5,84,63,0.9)), url('/images/cfi_image.jpg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(251,191,36,0.2),transparent_35%)]" />

      <div className="section-shell relative z-10 py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/images/logo cfi.png"
                alt="Logo CFI"
                width={150}
                height={44}
                className="rounded-lg bg-white/85 p-1"
              />
            </Link>
            <p className="mt-4 max-w-md text-sm text-emerald-50/90">
              Le Centre de Formation en Informatique du CIRAS est un établissement
              d’enseignement supérieur public à Brazzaville, dédié à la formation en
              technologies de l’information, en gestion et en innovation numérique.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Navigation</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/" className="text-emerald-50/90 hover:text-white">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/Offres" className="text-emerald-50/90 hover:text-white">
                  Offres d’emploi
                </Link>
              </li>
              <li>
                <Link href="/Register" className="text-emerald-50/90 hover:text-white">
                  Inscription
                </Link>
              </li>
              <li>
                <Link href="/Login" className="text-emerald-50/90 hover:text-white">
                  Connexion
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-emerald-50/90">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>Immeuble CFI-CIRAS, rue Lamothe, B.P. 1542, Brazzaville</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                +242 06 403 85 36
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                contact@cfi-ciras.cg
              </li>
            </ul>

            <div className="mt-5 flex gap-3">
              <Link href="https://www.linkedin.com/company/cfi-ciras" target="_blank" className="rounded-lg border border-white/30 p-2 hover:bg-white/10">
                <Linkedin size={18} />
              </Link>
              <Link href="https://www.facebook.com/CFI-CIRAS" target="_blank" className="rounded-lg border border-white/30 p-2 hover:bg-white/10">
                <Facebook size={18} />
              </Link>
              <Link href="https://cfi-ciras.cg/" target="_blank" className="rounded-lg border border-white/30 p-2 hover:bg-white/10">
                <Globe size={18} />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <NewsletterForm />
        </div>

        <div className="mt-10 border-t border-white/20 pt-6 text-center text-xs text-emerald-50/80 sm:text-sm">
          © {new Date().getFullYear()} CFI-CIRAS. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
