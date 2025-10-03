// "use client";

// import React, { useState } from "react";
// import { User, Lock, Mail } from "lucide-react";

// export default function RegisterForm() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (form.password !== form.confirmPassword) {
//       alert("Les mots de passe ne correspondent pas !");
//       return;
//     }

//     console.log("Formulaire envoyé:", form);
//     // 👉 Ici tu connecteras ton backe


"use client";

import React, { useState } from "react";
import { User, Lock, Mail } from "lucide-react";

export default function RegisterForm() {
  const [form, setForm] = useState({
    nom_cand: "",
    pren_cand: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom_cand: form.nom_cand,
          pren_cand: form.pren_cand,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        // Redirection vers le login
        window.location.href = "/login";
      } else {
        alert(data.message || "Erreur lors de la création du compte");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur réseau, veuillez réessayer plus tard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Créer un compte</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nom */}
          <div>
            <label className="block text-gray-700 mb-1">Nom</label>
            <div className="flex items-center border rounded-xl px-3">
              <User className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="nom_cand"
                value={form.nom_cand}
                onChange={handleChange}
                placeholder="Nom"
                className="w-full px-3 py-2 outline-none rounded-xl"
                required
              />
            </div>
          </div>

          {/* Prénom */}
          <div>
            <label className="block text-gray-700 mb-1">Prénom</label>
            <div className="flex items-center border rounded-xl px-3">
              <User className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="pren_cand"
                value={form.pren_cand}
                onChange={handleChange}
                placeholder="Prénom"
                className="w-full px-3 py-2 outline-none rounded-xl"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <div className="flex items-center border rounded-xl px-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="exemple@email.com"
                className="w-full px-3 py-2 outline-none rounded-xl"
                required
              />
            </div>
          </div>

          {/* Mot de passe */}
          <div>
            <label className="block text-gray-700 mb-1">Mot de passe</label>
            <div className="flex items-center border rounded-xl px-3">
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full px-3 py-2 outline-none rounded-xl"
                required
              />
            </div>
          </div>

          {/* Confirmer le mot de passe */}
          <div>
            <label className="block text-gray-700 mb-1">Confirmer le mot de passe</label>
            <div className="flex items-center border rounded-xl px-3">
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="********"
                className="w-full px-3 py-2 outline-none rounded-xl"
                required
              />
            </div>
          </div>

          {/* Bouton */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Création en cours..." : "Créer un compte"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Déjà un compte ?{" "}
          <a href="/login" className="text-indigo-600 font-semibold hover:underline">
            Se connecter
          </a>
        </p>
      </div>
    </section>
  );
}
