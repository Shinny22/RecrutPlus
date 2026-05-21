"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lock, LogIn, Mail, X } from "lucide-react";

type LoginFormProps = {
  onClose?: () => void;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://recrutplus-back.onrender.com";

export default function LoginForm({ onClose }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClose = () => {
    if (onClose) {
      onClose();
      return;
    }
    window.location.href = "/";
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Email ou mot de passe incorrect.");
        return;
      }

      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("candidat", JSON.stringify(data.candidat));
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = "/Consulter";
    } catch (error) {
      console.error("Erreur réseau:", error);
      alert("Impossible de se connecter pour le moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      className="fixed inset-0 z-[70] flex min-h-screen w-screen flex-col overflow-y-auto bg-white md:flex-row"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <button
        onClick={handleClose}
        className="absolute right-4 top-4 z-20 rounded-full border border-white/60 bg-white/90 p-2 text-slate-700 transition hover:bg-slate-100"
        aria-label="Fermer la fenêtre de connexion"
      >
        <X className="h-5 w-5" />
      </button>

      <div
        className="relative flex min-h-[260px] w-full items-center justify-center px-6 py-12 text-white md:min-h-screen md:w-[45%]"
        style={{
          backgroundImage:
            "linear-gradient(130deg, rgba(6,78,59,0.88), rgba(5,150,105,0.75)), url('/images/Teamwork.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-md text-center">
          <Image
            src="/images/logo cfi.png"
            alt="CFI-CIRAS"
            width={130}
            height={130}
            className="mx-auto rounded-full bg-white p-2"
          />
          <h2 className="mt-5 text-3xl font-semibold sm:text-4xl">Bienvenue</h2>
          <p className="mt-3 text-emerald-50/95">
            Connectez-vous pour gérer vos candidatures et suivre vos opportunités.
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center px-5 py-10 md:w-[55%]">
        <motion.div
          className="surface-card w-full max-w-xl p-8 sm:p-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.08 }}
        >
          <h3 className="text-3xl font-semibold text-slate-900">Se connecter</h3>
          <p className="mt-2 text-sm text-slate-600">Accédez à votre espace candidat.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Adresse e-mail</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-emerald-700/80" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="exemple@email.com"
                  className="input-shell pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Mot de passe</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-emerald-700/80" />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Votre mot de passe"
                  className="input-shell pl-10"
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="brand-btn mt-2 w-full justify-center">
              <LogIn size={16} />
              {loading ? "Connexion..." : "Connexion"}
            </button>
          </form>

          <p className="mt-5 text-sm text-slate-600">
            Vous n’avez pas de compte ?{" "}
            <a href="/Register" className="font-semibold text-emerald-700 hover:text-emerald-800">
              Inscrivez-vous
            </a>
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
