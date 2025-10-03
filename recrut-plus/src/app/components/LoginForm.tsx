
// "use client";

// import React, { useState } from "react";
// import { Lock, Mail } from "lucide-react";
// import Image from "next/image";

// export default function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch("http://localhost:8000/login/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         localStorage.setItem("accessToken", data.access);
//         localStorage.setItem("refreshToken", data.refresh);
//         localStorage.setItem("candidat", JSON.stringify(data.candidat));

//         alert("Connexion réussie !");
//         window.location.href = "/Offres";
//       } else {
//         alert(data.message || "Email ou mot de passe incorrect");
//       }
//     } catch (error) {
//       console.error("Erreur réseau :", error);
//       alert("Impossible de se connecter pour le moment");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-yellow-50 to-red-100 px-4">
//       <div className="relative bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-5xl">
//         {/* Partie gauche : Logo + texte */}
//         <div className="md:w-1/2 flex flex-col items-center justify-center p-10 bg-gradient-to-br from-green-600 to-red-600 text-white">
//           <Image
//             src="/images/logo cfi.png"
//             alt="CFI-CIRAS"
//             width={120}
//             height={120}
//             className="object-contain mb-6"
//           />
//           <h2 className="text-4xl font-bold mb-3">Bienvenue</h2>
//           <p className="text-center text-lg opacity-90 max-w-sm">
//             Connectez-vous pour accéder à votre espace candidat et gérer vos
//             candidatures en toute simplicité.
//           </p>
//         </div>

//         {/* Partie droite : Formulaire */}
//         <div className="md:w-1/2 p-10 flex flex-col justify-center">
//           <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
//             Connexion
//           </h3>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Email */}
//             <div>
//               <label className="block text-gray-700 mb-1 font-medium">
//                 Email
//               </label>
//               <div className="flex items-center border rounded-xl px-3 bg-gray-50 focus-within:ring-2 focus-within:ring-green-500">
//                 <Mail className="w-5 h-5 text-gray-400" />
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="exemple@email.com"
//                   className="w-full px-3 py-2 outline-none bg-transparent"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Mot de passe */}
//             <div>
//               <label className="block text-gray-700 mb-1 font-medium">
//                 Mot de passe
//               </label>
//               <div className="flex items-center border rounded-xl px-3 bg-gray-50 focus-within:ring-2 focus-within:ring-red-500">
//                 <Lock className="w-5 h-5 text-gray-400" />
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="********"
//                   className="w-full px-3 py-2 outline-none bg-transparent"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Se souvenir + oublié */}
//             <div className="flex items-center justify-between text-sm">
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   className="form-checkbox text-green-600"
//                 />
//                 <span>Se souvenir de moi</span>
//               </label>
//               <a href="#" className="text-green-600 hover:underline">
//                 Mot de passe oublié ?
//               </a>
//             </div>

//             {/* Bouton */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-green-600 to-red-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-50"
//             >
//               {loading ? "Connexion..." : "Se connecter"}
//             </button>
//           </form>

//           {/* Créer un compte */}
//           <p className="text-center text-gray-600 mt-6">
//             Pas encore de compte ?{" "}
//             <a
//               href="/RegisterForm"
//               className="text-red-600 font-semibold hover:underline"
//             >
//               Créer un compte
//             </a>
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import React, { useState } from "react";
import { Lock, Mail, X } from "lucide-react";
import Image from "next/image";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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

  if (!visible) return null;

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="relative bg-white shadow-xl rounded-xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden border border-gray-200">
        {/* Bouton fermer */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Partie gauche : Logo + texte */}
        <div className="md:w-1/2 flex flex-col items-center justify-center p-10 bg-gray-50">
          <Image
            src="/images/logo cfi.png"
            alt="CFI-CIRAS"
            width={150}
            height={150}
            className="object-contain mb-6"
          />
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Bienvenue</h2>
          <p className="text-center text-gray-600 max-w-sm">
            Connectez-vous à votre espace candidat pour gérer vos candidatures
            et suivre leur évolution.
          </p>
        </div>

        {/* Partie droite : Formulaire */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <h3 className="text-2xl font-semibold item-center text-gray-800 mb-6 text-center md:text-left">
            Connexion
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Email
              </label>
              <div className="flex items-center border rounded-lg px-3 bg-gray-50 focus-within:ring-2 focus-within:ring-gray-400">
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
              <div className="flex items-center border rounded-lg px-3 bg-gray-50 focus-within:ring-2 focus-within:ring-gray-400">
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

            {/* Se souvenir + oublié */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox text-gray-600"
                />
                <span>Se souvenir de moi</span>
              </label>
              <a href="#" className="text-gray-600 hover:underline">
                Mot de passe oublié ?
              </a>
            </div>

            {/* Bouton */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold shadow hover:bg-gray-700 transition disabled:opacity-50"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          {/* Créer un compte */}
          <p className="text-center text-gray-600 mt-6">
            Pas encore de compte ?{" "}
            <a
              href="/RegisterForm"
              className="text-gray-900 font-semibold hover:underline"
            >
              Créer un compte
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
