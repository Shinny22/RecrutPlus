"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

type User = {
  id: number;
  name: string;
  avatar?: string;
  role?: "candidat" | "admin";
};

function safeParse<T>(value: string | null): T | null {
  try {
    return value ? (JSON.parse(value) as T) : null;
  } catch {
    return null;
  }
}

const publicLinks = [
  { href: "#about", label: "À propos" },
  { href: "/Offres", label: "Nos offres" },
  { href: "#contact", label: "Contact" },
];

const userLinks = [
  { href: "/Consulter", label: "Tableau de bord" },
  { href: "/Offres", label: "Offres" },
  { href: "#about", label: "À propos" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUser = safeParse<User>(localStorage.getItem("candidat"));
    if (storedUser) setUser(storedUser);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (mobileRef.current && !mobileRef.current.contains(event.target as Node)) {
        setMobileOpen(false);
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProfileOpen(false);
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("candidat");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    window.location.href = "/";
  };

  const handleNavClick = () => {
    setMobileOpen(false);
    setProfileOpen(false);
  };

  const links = user ? userLinks : publicLinks;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "px-2 pt-2 sm:px-4" : "px-3 pt-3 sm:px-6"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl border border-white/75 backdrop-blur-md transition-all duration-300 ${
          scrolled
            ? "rounded-xl bg-white/92 shadow-[0_18px_35px_-24px_rgba(15,23,42,0.62)]"
            : "rounded-2xl bg-white/82 shadow-[0_16px_35px_-24px_rgba(15,23,42,0.6)]"
        }`}
      >
        <nav className="flex h-16 items-center justify-between px-4 sm:px-6">
          <Link href="/" className="group flex items-center gap-3">
            <Image
              src="/images/logo cfi.png"
              alt="Logo CFI"
              width={140}
              height={40}
              className="rounded-lg object-contain transition group-hover:scale-[1.02]"
              priority
            />
            <span className="hidden text-xs font-semibold uppercase tracking-[0.24em] text-emerald-900/80 lg:block">
              CFI-Recrute
            </span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {!user ? (
              <>
                <button
                  onClick={() => setShowRegister(true)}
                  className="hidden rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-900 transition hover:-translate-y-0.5 hover:bg-emerald-100 sm:inline-flex"
                >
                  Créer un compte
                </button>
                <button
                  onClick={() => setShowLogin(true)}
                  className="brand-btn px-4 py-2 text-sm"
                >
                  Se connecter
                </button>
              </>
            ) : (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen((open) => !open)}
                  className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-white/95 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50"
                  aria-expanded={profileOpen}
                  aria-haspopup="menu"
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
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  )}
                  <span className="hidden sm:inline">{user.name}</span>
                  <ChevronDown size={16} className="text-slate-500" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-xl border border-emerald-100 bg-white p-2 shadow-xl">
                    <Link href="/Consulter" className="dropdown-item" onClick={handleNavClick}>
                      Mon espace
                    </Link>
                    <Link href="/Offres" className="dropdown-item" onClick={handleNavClick}>
                      Voir les offres
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="dropdown-item w-full text-left text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                    >
                      Se déconnecter
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => setMobileOpen((open) => !open)}
              className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
              aria-expanded={mobileOpen}
              aria-label="Menu principal"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {mobileOpen && (
          <div ref={mobileRef} className="border-t border-emerald-100 px-4 pb-4 pt-3 md:hidden">
            <div className="space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="mobile-link"
                  onClick={handleNavClick}
                >
                  {link.label}
                </Link>
              ))}

              {user ? (
                <button
                  onClick={handleLogout}
                  className="mobile-link w-full text-left text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                >
                  Se déconnecter
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      setShowRegister(true);
                    }}
                    className="mobile-link w-full text-left"
                  >
                    Créer un compte
                  </button>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      setShowLogin(true);
                    }}
                    className="brand-btn mt-2 w-full justify-center"
                  >
                    Se connecter
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterForm onClose={() => setShowRegister(false)} />}
    </header>
  );
}
