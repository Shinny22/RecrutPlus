
// // "use client";

// // import React, { useState } from "react";
// // import { Lock, Mail } from "lucide-react";
// // import Image from "next/image";

// // export default function LoginForm() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     try {
// //       const response = await fetch("http://localhost:8000/login/", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ email, password }),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         localStorage.setItem("accessToken", data.access);
// //         localStorage.setItem("refreshToken", data.refresh);
// //         localStorage.setItem("candidat", JSON.stringify(data.candidat));

// //         alert("Connexion réussie !");
// //         window.location.href = "/Offres";
// //       } else {
// //         alert(data.message || "Email ou mot de passe incorrect");
// //       }
// //     } catch (error) {
// //       console.error("Erreur réseau :", error);
// //       alert("Impossible de se connecter pour le moment");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-yellow-50 to-red-100 px-4">
// //       <div className="relative bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-5xl">
// //         {/* Partie gauche : Logo + texte */}
// //         <div className="md:w-1/2 flex flex-col items-center justify-center p-10 bg-gradient-to-br from-green-600 to-red-600 text-white">
// //           <Image
// //             src="/images/logo cfi.png"
// //             alt="CFI-CIRAS"
// //             width={120}
// //             height={120}
// //             className="object-contain mb-6"
// //           />
// //           <h2 className="text-4xl font-bold mb-3">Bienvenue</h2>
// //           <p className="text-center text-lg opacity-90 max-w-sm">
// //             Connectez-vous pour accéder à votre espace candidat et gérer vos
// //             candidatures en toute simplicité.
// //           </p>
// //         </div>

// //         {/* Partie droite : Formulaire */}
// //         <div className="md:w-1/2 p-10 flex flex-col justify-center">
// //           <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
// //             Connexion
// //           </h3>

// //           <form onSubmit={handleSubmit} className="space-y-5">
// //             {/* Email */}
// //             <div>
// //               <label className="block text-gray-700 mb-1 font-medium">
// //                 Email
// //               </label>
// //               <div className="flex items-center border rounded-xl px-3 bg-gray-50 focus-within:ring-2 focus-within:ring-green-500">
// //                 <Mail className="w-5 h-5 text-gray-400" />
// //                 <input
// //                   type="email"
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                   placeholder="exemple@email.com"
// //                   className="w-full px-3 py-2 outline-none bg-transparent"
// //                   required
// //                 />
// //               </div>
// //             </div>

// //             {/* Mot de passe */}
// //             <div>
// //               <label className="block text-gray-700 mb-1 font-medium">
// //                 Mot de passe
// //               </label>
// //               <div className="flex items-center border rounded-xl px-3 bg-gray-50 focus-within:ring-2 focus-within:ring-red-500">
// //                 <Lock className="w-5 h-5 text-gray-400" />
// //                 <input
// //                   type="password"
// //                   value={password}
// //                   onChange={(e) => setPassword(e.target.value)}
// //                   placeholder="********"
// //                   className="w-full px-3 py-2 outline-none bg-transparent"
// //                   required
// //                 />
// //               </div>
// //             </div>

// //             {/* Se souvenir + oublié */}
// //             <div className="flex items-center justify-between text-sm">
// //               <label className="flex items-center space-x-2">
// //                 <input
// //                   type="checkbox"
// //                   className="form-checkbox text-green-600"
// //                 />
// //                 <span>Se souvenir de moi</span>
// //               </label>
// //               <a href="#" className="text-green-600 hover:underline">
// //                 Mot de passe oublié ?
// //               </a>
// //             </div>

// //             {/* Bouton */}
// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="w-full bg-gradient-to-r from-green-600 to-red-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-50"
// //             >
// //               {loading ? "Connexion..." : "Se connecter"}
// //             </button>
// //           </form>

// //           {/* Créer un compte */}
// //           <p className="text-center text-gray-600 mt-6">
// //             Pas encore de compte ?{" "}
// //             <a
// //               href="/RegisterForm"
// //               className="text-red-600 font-semibold hover:underline"
// //             >
// //               Créer un compte
// //             </a>
// //           </p>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }



"use client";

import React, { useState, useEffect } from "react";
import { Lock, Mail, LogIn, X } from "lucide-react";
import Image from "next/image";

export default function LoginFormCFI() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔒 Bloque le scroll + masque la navbar
  useEffect(() => {
    document.body.style.overflow = "hidden"; // empêche le scroll
    const navbar = document.querySelector("nav");
    if (navbar) navbar.style.display = "none"; // cache la navbar

    return () => {
      document.body.style.overflow = "auto"; // rétablit le scroll
      if (navbar) navbar.style.display = ""; // réaffiche la navbar
    };
  }, []);

  // 🔚 Fermer la page de connexion
  const handleClose = () => {
    // Restaure le scroll et la navbar avant de partir
    document.body.style.overflow = "auto";
    const navbar = document.querySelector("nav");
    if (navbar) navbar.style.display = "";
    window.location.href = "/"; // redirige vers la page d’accueil
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

        alert("Connexion réussie !");
        window.location.href = "/Offres";
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
    <section className="fixed inset-0 h-screen w-screen flex flex-col md:flex-row overflow-hidden bg-white z-50">
      {/* Bouton de fermeture */}
      <button
        onClick={handleClose}
        className="absolute top-5 right-5 bg-gray-100 hover:bg-gray-200 p-2 rounded-full shadow-md z-50"
        aria-label="Fermer la page de connexion"
      >
        <X className="w-6 h-6 text-gray-700" />
      </button>

      {/* Partie gauche : Image + texte */}
      <div className="relative md:w-1/2 w-full h-1/2 md:h-full bg-[url('/images/Teamwork.jpg')] bg-cover bg-center flex items-center justify-center text-white">
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
      </div>

      {/* Partie droite : Formulaire */}
      <div className="md:w-1/2 w-full h-1/2 md:h-full bg-[#F9FAFB] flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md bg-white p-10 rounded-2xl  border border-gray-100">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">
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
              href="/RegisterForm"
              className="text-[#16A34A] font-semibold hover:underline"
            >
              Inscrivez-vous
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
