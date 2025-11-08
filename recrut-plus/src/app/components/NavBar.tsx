
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

type User = {
  id: number;
  name: string;
  avatar?: string;
  role?: "candidat" | "admin";
};

// --- Utilitaire sécurisé pour parser le localStorage ---
function safeParse<T>(value: string | null): T | null {
  try {
    return value ? JSON.parse(value) : null;
  } catch {
    console.warn("Données JSON invalides dans localStorage:", value);
    return null;
  }
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // 🧠 Charger le candidat connecté depuis le localStorage
  useEffect(() => {
    const storedUser = safeParse<User>(localStorage.getItem("candidat"));
    if (storedUser) setUser(storedUser);
  }, []);

  // 🚪 Déconnexion
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("candidat");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <header className="w-full fixed top-0 z-50 bg-white/55 backdrop-blur-sm  shadow-md border-b border-green-800/25">
      <nav className="max-w-7xl h-20 mx-auto  px-6 sm:px-6 lg:px-8">
        <div className="flex items-center m-6 justify-between h-16">
          {/* Logo */}
          <Link href="/" className="block items-center m-0">
            <Image
              src="/images/logo cfi.png"
              alt="Logo CFI"
              width={180}
              height={10}
              className="rounded-md"
              priority
            />
            {/* <span className="text-lg font-bold mt-[-5] pl-15 text-green-800">CFI-Recrute</span> */}
          </Link>

          {/* Liens Desktop */}
          <div className="hidden md:flex space-x-8">
            {user ? (
              <>
                <Link href="/dashboard" className="nav-link">Dashboard</Link>
                <Link href="/mes-demandes" className="nav-link">Mes candidatures</Link>
                <Link href="/offres" className="nav-link">Offres</Link>
                <Link href="/contact" className="nav-link">Contact</Link>
              </>
            ) : (
              <>
                <Link href="/Offres" className="nav-link text-lg">Offres</Link>
                <Link href="/Consulter" className="nav-link text-lg">Postuler</Link>
                <Link href="#contact" className="nav-link text-lg">Contact</Link>
              </>
            )}
          </div>

          {/* Zone droite */}
          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <button
                  onClick={() => setShowRegister(true)}
                  className="hidden sm:inline-block px-4 py-2 text-md font-semibold rounded-lg bg-green-800/25 border border-green-600/25 text-gray-100 hover:bg-green-700 transition"
                >
                  Créer un compte
                </button>
                <button
                  onClick={() => setShowLogin(true)}
                  className="px-4 py-2 text-md rounded-lg bg-green-700 text-white hover:bg-green-800 transition shadow-sm"
                >
                  Se connecter
                </button>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
                >
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-700">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="hidden sm:inline text-sm font-medium">{user.name}</span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-100 z-20">
                    <Link href="/profile" className="dropdown-item">Mon profil</Link>
                    <Link href="/dashboard" className="dropdown-item">Mon tableau de bord</Link>
                    <button
                      onClick={handleLogout}
                      className="dropdown-item text-red-600 w-full text-left"
                    >
                      Se déconnecter
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Burger Mobile */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Menu Mobile */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-2">
            {user ? (
              <>
                <Link href="/dashboard" className="mobile-link">Dashboard</Link>
                <Link href="/mes-demandes" className="mobile-link">Mes candidatures</Link>
                <Link href="/offres" className="mobile-link">Offres</Link>
                <Link href="/profile" className="mobile-link">Mon profil</Link>
                <button
                  onClick={handleLogout}
                  className="mobile-link text-red-600 w-full text-left"
                >
                  Se déconnecter
                </button>
              </>
            ) : (
              <>
                <Link href="/Offres" className="mobile-link">Offres</Link>
                <Link href="/Consulter" className="mobile-link">Postuler</Link>
                <Link href="#contact" className="mobile-link">Contact</Link>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setShowRegister(true);
                  }}
                  className="mobile-link text-left"
                >
                  Créer un compte
                </button>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setShowLogin(true);
                  }}
                  className="w-full py-2 rounded-lg bg-green-700 text-white hover:bg-green-800 transition"
                >
                  Se connecter
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Modals Login / Register */}
      {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterForm onClose={() => setShowRegister(false)} />}
    </header>
  );
}
