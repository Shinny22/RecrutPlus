// "use client";

// import React, { useState } from "react";
// import { Lock, Mail } from "lucide-react";

// export default function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Email:", email, "Password:", password);
//     // 👉 Ici tu feras appel à ton API d’authentification (ex: Django JWT, etc.)
//   };

//   return (
//     <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
//         <h2 className="text-3xl font-bold text-center mb-6">Se connecter</h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Champ email */}
//           <div>
//             <label className="block text-gray-700 mb-1">Email</label>
//             <div className="flex items-center border rounded-xl px-3">
//               <Mail className="w-5 h-5 text-gray-400" />
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="exemple@email.com"
//                 className="w-full px-3 py-2 outline-none rounded-xl"
//                 required
//               />
//             </div>
//           </div>

//           {/* Champ mot de passe */}
//           <div>
//             <label className="block text-gray-700 mb-1">Mot de passe</label>
//             <div className="flex items-center border rounded-xl px-3">
//               <Lock className="w-5 h-5 text-gray-400" />
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="********"
//                 className="w-full px-3 py-2 outline-none rounded-xl"
//                 required
//               />
//             </div>
//           </div>

//           {/* Se souvenir + Mot de passe oublié */}
//           <div className="flex items-center justify-between text-sm">
//             <label className="flex items-center space-x-2">
//               <input type="checkbox" className="form-checkbox" />
//               <span>Se souvenir de moi</span>
//             </label>
//             <a href="#" className="text-indigo-600 hover:underline">
//               Mot de passe oublié ?
//             </a>
//           </div>

//           {/* Bouton */}
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
//           >
//             Se connecter
//           </button>
//         </form>

//         {/* Lien créer un compte */}
//         <p className="text-center text-gray-600 mt-6">
//           Pas encore de compte ?{" "}
//           <a href="/register" className="text-indigo-600 font-semibold hover:underline">
//             Créer un compte
//           </a>
//         </p>
//       </div>
//     </section>
//   );
// }



"use client";

import React, { useState } from "react";
import { Lock, Mail } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // http://localhost:8000/api/candidats/login/

    try {
      const response = await fetch("http://localhost:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Stockage des tokens JWT côté client
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);

        // Tu peux aussi stocker les infos du candidat si nécessaire
        localStorage.setItem("candidat", JSON.stringify(data.candidat));

        alert("Connexion réussie !");
        // Redirection vers le dashboard candidat
        window.location.href = "/dashboard"; // ou router.push("/dashboard") si Next.js
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
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Se connecter</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Champ email */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <div className="flex items-center border rounded-xl px-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemple@email.com"
                className="w-full px-3 py-2 outline-none rounded-xl"
                required
              />
            </div>
          </div>

          {/* Champ mot de passe */}
          <div>
            <label className="block text-gray-700 mb-1">Mot de passe</label>
            <div className="flex items-center border rounded-xl px-3">
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full px-3 py-2 outline-none rounded-xl"
                required
              />
            </div>
          </div>

          {/* Se souvenir + Mot de passe oublié */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Se souvenir de moi</span>
            </label>
            <a href="#" className="text-indigo-600 hover:underline">
              Mot de passe oublié ?
            </a>
          </div>

          {/* Bouton */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        {/* Lien créer un compte */}
        <p className="text-center text-gray-600 mt-6">
          Pas encore de compte ?{" "}
          <a href="/register" className="text-indigo-600 font-semibold hover:underline">
            Créer un compte
          </a>
        </p>
      </div>
    </section>
  );
}
