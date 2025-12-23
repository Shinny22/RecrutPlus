

"use client";

import React, { useState, useEffect } from "react";
import { Lock, Mail, LogIn, X } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LoginFormCFI() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔒 Bloque le scroll + masque la navbar
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const navbar = document.querySelector("nav");
    if (navbar) navbar.style.display = "none";

    return () => {
      document.body.style.overflow = "auto";
      if (navbar) navbar.style.display = "";
    };
  }, []);

  // 🔚 Fermer la page de connexion
  const handleClose = () => {
    document.body.style.overflow = "auto";
    const navbar = document.querySelector("nav");
    if (navbar) navbar.style.display = "";
    window.location.href = "/";
  };

  // ✅ Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        localStorage.setItem("candidat", JSON.stringify(data.candidat));
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);


        alert("Connexion réussie !");
        window.location.href = "/Consulter";
      } else {
        alert(data.message || "Email ou mot de passe incorrect");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Impossible de se connecter pour le moment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      className="fixed inset-0 min-h-screen w-screen flex flex-col md:flex-row overflow-y-auto bg-white z-50"
      initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Bouton de fermeture */}
      <button
        onClick={handleClose}
        className="absolute top-5 right-5 bg-gray-100 hover:bg-green-100 p-2 rounded-full z-50"
        aria-label="Fermer la page de connexion"
      >
        <X className="w-6 h-6 text-gray-700" />
      </button>

      {/* Partie gauche : Image + texte */}
      <motion.div
        className="relative w-full md:w-1/2 min-h-[260px] md:min-h-full bg-[url('/images/Teamwork.jpg')] bg-cover bg-center flex items-center justify-center text-white"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-[#16A34A]/80"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <Image
            src="/images/logo cfi.png"
            alt="CFI-CIRAS"
            width={130}
            height={130}
            className="object-contain mb-5 bg-white p-2 rounded-full"
          />
          <h2 className="text-4xl font-bold mb-2">Bienvenue</h2>
          <p className="text-lg mb-4 max-w-md opacity-90">
            Nous sommes ravis de vous revoir sur la plateforme{" "}
            <span className="font-semibold">CFI-Recrute</span>.
          </p>
          <ul className="space-y-2 text-sm opacity-90">
            <li>🌿 Des offres adaptées à votre profil</li>
            <li>📊 Suivi personnalisé de vos candidatures</li>
            <li>📚 Des ressources exclusives pour votre parcours</li>
          </ul>
        </div>
      </motion.div>

      {/* Partie droite : Formulaire */}
      <motion.div
        className="w-full md:w-1/2 min-h-[320px] md:min-h-full bg-[#F9FAFB] flex items-center justify-center px-6 py-10"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.div
          className="w-full max-w-md bg-white p-10 rounded-2xl border border-gray-100 "
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h3 className="text-4xl font-bold text-center text-gray-800 mb-2">
            Se connecter
          </h3>
          <p className="text-center text-gray-500 mb-8">
            Accédez à votre espace personnel
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Adresse e-mail
              </label>
              <div className="flex items-center border rounded-lg px-3 bg-green-50 focus-within:ring-2 focus-within:ring-[#16A34A]">
                <Mail className="w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemple@email.com"
                  className="w-full px-3 py-2 outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Mot de passe
              </label>
              <div className="flex items-center border rounded-lg px-3 bg-gray-50 focus-within:ring-2 focus-within:ring-[#16A34A]">
                <Lock className="w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="w-full px-3 py-2 outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox text-[#16A34A]" />
                <span>Se souvenir de moi</span>
              </label>
              <a href="#" className="text-[#16A34A] hover:underline">
                Mot de passe oublié ?
              </a>
            </div>

            {/* Bouton */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#16A34A] text-white py-3 rounded-lg font-semibold shadow-md hover:bg-[#15803D] transition disabled:opacity-50"
            >
              <LogIn className="w-5 h-5" />
              {loading ? "Connexion..." : "Connexion"}
            </button>
          </form>

          {/* Inscription */}
          <p className="text-center text-gray-600 mt-6">
            Vous n’avez pas de compte ?{" "}
            <a
              href="/Register"
              className="text-[#16A34A] font-semibold hover:underline"
            >
              Inscrivez-vous
            </a>
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
