// "use client";

// import React, { useState } from "react";
// import { User, Lock, Mail } from "lucide-react";
// import Image from "next/image";

// export default function RegisterForm() {
//   const [form, setForm] = useState({
//     nom_cand: "",
//     pren_cand: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (form.password !== form.confirmPassword) {
//       alert("Les mots de passe ne correspondent pas !");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch("http://localhost:8000/register/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           nom_cand: form.nom_cand,
//           pren_cand: form.pren_cand,
//           email: form.email,
//           password: form.password,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert(data.message);
//         window.location.href = "/login";
//       } else {
//         alert(data.message || "Erreur lors de la création du compte");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Erreur réseau, veuillez réessayer plus tard");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-yellow-50 to-red-100 px-4 relative overflow-hidden">
//       {/* Décorations visuelles */}
//       <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-400/20 rounded-full blur-3xl"></div>
//       <div className="absolute bottom-10 -right-10 w-52 h-52 bg-red-400/20 rounded-full blur-3xl"></div>

//       <div className="relative bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md border-t-4 border-red-600">
//         {/* Logo */}
//         <div className="flex justify-center mb-6">
//           <Image
//             src="/logo cfi.png" // place ton logo dans /public
//             alt="CFI-CIRAS"
//             width={90}
//             height={90}
//             className="object-contain"
//           />
//         </div>

//         <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
//           Créer un compte
//         </h2>
//         <p className="text-center text-gray-500 mb-8">
//           Rejoignez la plateforme CFI-CIRAS
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Nom */}
//           <div>
//             <label className="block text-gray-700 mb-1 font-medium">Nom</label>
//             <div className="flex items-center border rounded-xl px-3 bg-gray-50 focus-within:ring-2 focus-within:ring-green-500">
//               <User className="w-5 h-5 text-gray-400" />
//               <input
//                 type="text"
//                 name="nom_cand"
//                 value={form.nom_cand}
//                 onChange={handleChange}
//                 placeholder="Nom"
//                 className="w-full px-3 py-2 outline-none bg-transparent"
//                 required
//               />
//             </div>
//           </div>

//           {/* Prénom */}
//           <div>
//             <label className="block text-gray-700 mb-1 font-medium">Prénom</label>
//             <div className="flex items-center border rounded-xl px-3 bg-gray-50 focus-within:ring-2 focus-within:ring-green-500">
//               <User className="w-5 h-5 text-gray-400" />
//               <input
//                 type="text"
//                 name="pren_cand"
//                 value={form.pren_cand}
//                 onChange={handleChange}
//                 placeholder="Prénom"
//                 className="w-full px-3 py-2 outline-none bg-transparent"
//                 required
//               />
//             </div>
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-gray-700 mb-1 font-medium">Email</label>
//             <div className="flex items-center border rounded-xl px-3 bg-gray-50 focus-within:ring-2 focus-within:ring-yellow-500">
//               <Mail className="w-5 h-5 text-gray-400" />
//               <input
//                 type="email"
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 placeholder="exemple@email.com"
//                 className="w-full px-3 py-2 outline-none bg-transparent"
//                 required
//               />
//             </div>
//           </div>

//           {/* Mot de passe */}
//           <div>
//             <label className="block text-gray-700 mb-1 font-medium">Mot de passe</label>
//             <div className="flex items-center border rounded-xl px-3 bg-gray-50 focus-within:ring-2 focus-within:ring-red-500">
//               <Lock className="w-5 h-5 text-gray-400" />
//               <input
//                 type="password"
//                 name="password"
//                 value={form.password}
//                 onChange={handleChange}
//                 placeholder="********"
//                 className="w-full px-3 py-2 outline-none bg-transparent"
//                 required
//               />
//             </div>
//           </div>

//           {/* Confirmer mot de passe */}
//           <div>
//             <label className="block text-gray-700 mb-1 font-medium">Confirmer le mot de passe</label>
//             <div className="flex items-center border rounded-xl px-3 bg-gray-50 focus-within:ring-2 focus-within:ring-red-500">
//               <Lock className="w-5 h-5 text-gray-400" />
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 value={form.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="********"
//                 className="w-full px-3 py-2 outline-none bg-transparent"
//                 required
//               />
//             </div>
//           </div>

//           {/* Bouton */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-green-600 to-red-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-50"
//           >
//             {loading ? "Création en cours..." : "Créer un compte"}
//           </button>
//         </form>

//         <p className="text-center text-gray-600 mt-6">
//           Déjà un compte ?{" "}
//           <a href="/login" className="text-red-600 font-semibold hover:underline">
//             Se connecter
//           </a>
//         </p>
//       </div>
//     </section>
//   );
// }

"use client";

import React, { useState } from "react";
import { User, Lock, Mail, Phone } from "lucide-react";

export default function RegisterFormWizard() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    nom_cand: "",
    pren_cand: "",
    genre: "",
    dat_nais: "",
    lieu_nais: "",
    telephone1: "",
    telephone2: "",
    email: "",
    password: "",
    confirmPassword: "",
    sitmat: "",
    diplome: null as File | null,
    photo: null as File | null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target.name === "photo" || e.target.name === "diplome") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setForm({ ...form, [e.target.name]: file });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null) formData.append(key, value as any);
      });

      const response = await fetch("http://localhost:8000/register/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Compte créé avec succès !");
        // window.location.href = "/Lo";
        <LoginForm/>
      } else {
        alert(data.error || "Erreur lors de la création du compte");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur réseau, veuillez réessayer plus tard");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-8">
        {/* Progress bar */}
        <div className="flex mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex-1 text-center">
              <div className={`mx-auto w-8 h-8 rounded-full mb-2 ${s <= step ? "bg-red-600 text-white" : "bg-gray-300 text-gray-600"}`}>
                {s}
              </div>
              <div className="text-xs">{["Infos persos", "Contact", "Fichiers", "Mot de passe"][s - 1]}</div>
            </div>
          ))}
        </div>

        {/* Step 1: Infos personnelles */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label>Nom</label>
              <input type="text" name="nom_cand" value={form.nom_cand} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label>Prénom</label>
              <input type="text" name="pren_cand" value={form.pren_cand} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label>Genre</label>
              <select name="genre" value={form.genre} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
                <option value="">Sélectionnez</option>
                <option value="M">Masculin</option>
                <option value="F">Féminin</option>
              </select>
            </div>
            <div>
              <label>Date de naissance</label>
              <input type="date" name="dat_nais" value={form.dat_nais} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label>Lieu de naissance</label>
              <input type="text" name="lieu_nais" value={form.lieu_nais} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            </div>
          </div>
        )}

        {/* Step 2: Contact */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label>Téléphone 1</label>
              <input type="text" name="telephone1" value={form.telephone1} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label>Téléphone 2</label>
              <input type="text" name="telephone2" value={form.telephone2} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label>Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            </div>
          </div>
        )}

        {/* Step 3: Fichiers */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label>Diplôme (fichier)</label>
              <input type="file" name="diplome" accept=".pdf,.jpg,.jpeg,.png" onChange={handleChange} className="w-full" required />
            </div>
            <div>
              <label>Photo (optionnelle)</label>
              <input type="file" name="photo" accept="image/*" onChange={handleChange} className="w-full" />
            </div>
            <div>
              <label>Situation matrimoniale</label>
              <input type="text" name="sitmat" value={form.sitmat} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
          </div>
        )}

        {/* Step 4: Mot de passe */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <label>Mot de passe</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label>Confirmer le mot de passe</label>
              <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            </div>
          </div>
        )}

        {/* Navigation boutons */}
        <div className="flex justify-between mt-6">
          {step > 1 && <button type="button" onClick={prevStep} className="px-4 py-2 bg-gray-300 rounded">Précédent</button>}
          {step < 4 && <button type="button" onClick={nextStep} className="px-4 py-2 bg-red-600 text-white rounded">Suivant</button>}
          {step === 4 && <button type="submit" disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded">{loading ? "Création..." : "Créer un compte"}</button>}
        </div>
      </form>
    </section>
  );
}
