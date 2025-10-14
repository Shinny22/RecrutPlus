// export default function Footer() {
//     return (
//       <footer className="bg-gray-900 text-gray-300 py-10">
//         <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
//           <div>
//             <h3 className="font-bold text-white mb-4">CFI-Recrute</h3>
//             <p>Votre plateforme pour trouver les meilleurs talents et opportunités.</p>
//           </div>
//           <div>
//             <h3 className="font-bold text-white mb-4">Liens utiles</h3>
//             <ul className="space-y-2">
//               <li><a href="#" className="hover:text-white">Offres</a></li>
//               <li><a href="#" className="hover:text-white">Candidats</a></li>
//               <li><a href="#" className="hover:text-white">Recruteurs</a></li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="font-bold text-white mb-4">Contact</h3>
//             <p>Email : contact@CFI-Recrute.com</p>
//             <p>Téléphone : +242 06 000 0000</p>
//           </div>
//         </div>
//         <div className="text-center text-gray-500 mt-10">
//           © 2025 CFI-Recrute - Tous droits réservés <br></br>
//           <span className="text-sm">By ShineTech </span>
//         </div>
//       </footer>
//     );
//   }
  

"use client";

import { Mail, Phone, MapPin, Globe, Facebook, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        {/* Colonne 1 */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">CFI-CIRAS</h3>
          <p className="leading-relaxed">
            Le Centre de Formation en Informatique du CIRAS est un établissement
            d’enseignement supérieur public à Brazzaville, dédié à la formation
            en technologies de l’information, en gestion et en innovation
            numérique.
          </p>
        </div>

        {/* Colonne 2 */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Liens utiles</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-white transition">Accueil</Link></li>
            <li><Link href="/offres" className="hover:text-white transition">Offres d’emploi</Link></li>
            <li><Link href="/formations" className="hover:text-white transition">Formations</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* Colonne 3 */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <MapPin size={18} /> Immeuble CFI-CIRAS, rue Lamothe, B.P. 1542, Brazzaville
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} /> +242 06 403 85 36
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} /> contact@cfi-ciras.cg
            </li>
          </ul>

          {/* Réseaux sociaux */}
          <div className="flex gap-4 mt-5">
            <Link
              href="https://www.linkedin.com/company/cfi-ciras"
              target="_blank"
              className="hover:text-white transition"
            >
              <Linkedin size={22} />
            </Link>
            <Link
              href="https://www.facebook.com/CFI-CIRAS"
              target="_blank"
              className="hover:text-white transition"
            >
              <Facebook size={22} />
            </Link>
            <Link
              href="https://www.cfi-ciras.cg"
              target="_blank"
              className="hover:text-white transition"
            >
              <Globe size={22} />
            </Link>
            <Link
              href="https://www.ciras.cg"
              target="_blank"
              className="hover:text-white transition"
            >
              <Globe size={22} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bas du footer */}
      <div className="text-center text-gray-500 mt-12 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} CFI-CIRAS — Tous droits réservés
        <br />
        <span className="text-sm text-gray-400">
          Conçu avec ❤️ par <strong>ShineTech</strong>
        </span>
      </div>
    </footer>
  );
}
