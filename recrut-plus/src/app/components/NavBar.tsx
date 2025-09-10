// app/components/Navbar.tsx
"use client";

import { useState, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

type User = {
  name: string;
  role?: string;
  avatar?: string; // url optionnel
};

export default function Navbar({ user }: { user?: User | null }) {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="w-full bg-white/90 backdrop-blur-sm ring-1 ring-black/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-md overflow-hidden bg-orange-600 flex items-center justify-center">
                {/* Remplace par ton logo */}
                <span className="text-white font-bold">CR</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">CFI-Recrute</span>
            </Link>
          </div>

          {/* Middle: Links (desktop) */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link href="/offres" className="text-gray-700 hover:text-gray-900 transition">
              Offres
            </Link>
            <Link href="/postuler" className="text-gray-700 hover:text-gray-900 transition">
              Postuler
            </Link>
            <Link href="/entreprise/contact" className="text-gray-700 hover:text-gray-900 transition">
              Contact
            </Link>
          </div>

          {/* Right: Auth buttons / profile */}
          <div className="flex items-center gap-3">
            {!user ? (
              // visitor
              <>
                <Link
                  href="/inscription"
                  className="hidden sm:inline-block px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition"
                >
                  Créer un compte
                </Link>

                <Link
                  href="/connexion"
                  className="inline-flex items-center px-4 py-2 rounded-md text-sm font-semibold bg-orange-600 text-white hover:bg-orange-700 transition"
                >
                  Se connecter
                </Link>
              </>
            ) : (
              // user signed in
              <div className="relative">
                <button
                  onClick={() => setProfileOpen((s) => !s)}
                  aria-expanded={profileOpen}
                  aria-label="Ouvrir le menu profil"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-md ring-1 ring-black/5 hover:shadow-sm transition"
                >
                  {user.avatar ? (
                    <Image src={user.avatar} alt={user.name} width={32} height={32} className="rounded-full" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-700">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-800 hidden sm:inline">{user.name}</span>
                  <ChevronDown size={16} className="text-gray-600" />
                </button>

                {/* Dropdown */}
                {profileOpen && (
                  <div
                    role="menu"
                    aria-orientation="vertical"
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black/5 z-20"
                  >
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Mon profil
                    </Link>
                    <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Espace admin
                    </Link>
                    <Link href="/deconnexion" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Se déconnecter
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
              aria-label="Menu mobile"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div className="md:hidden bg-white/95 border-t ring-1 ring-black/5">
          <div className="px-4 py-4 space-y-2">
            <Link href="/offres" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
              Offres
            </Link>
            <Link href="/postuler" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
              Postuler
            </Link>
            <Link href="/entreprise/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
              Contact
            </Link>

            {!user ? (
              <>
                <Link href="/inscription" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
                  Créer un compte
                </Link>
                <Link href="/connexion" className="block px-3 py-2 rounded-md font-semibold bg-orange-600 text-white text-center rounded">
                  Se connecter
                </Link>
              </>
            ) : (
              <>
                <div className="border-t pt-3">
                  <Link href="/profile" className="block px-3 py-2 text-base text-gray-700 hover:bg-gray-50">Mon profil</Link>
                  <Link href="/deconnexion" className="block px-3 py-2 text-base text-gray-700 hover:bg-gray-50">Se déconnecter</Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
