

// "use client";

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X } from "lucide-react";
// import Image from "next/image";

// export default function RegisterFormWizard() {
//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [visible, setVisible] = useState(true);

//   const [form, setForm] = useState({
//     nom_cand: "",
//     pren_cand: "",
//     genre: "",
//     dat_nais: "",
//     lieu_nais: "",
//     telephone1: "",
//     telephone2: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     sitmat: "",
//     diplome: null as File | null,
//     photo: null as File | null,
//   });

//   // 🧭 Bloquer le scroll et cacher la navbar
//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     const navbar = document.querySelector("nav");
//     if (navbar) navbar.style.display = "none";

//     return () => {
//       document.body.style.overflow = "auto";
//       if (navbar) navbar.style.display = "";
//     };
//   }, []);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     if (e.target.name === "photo" || e.target.name === "diplome") {
//       const file = (e.target as HTMLInputElement).files?.[0] || null;
//       setForm({ ...form, [e.target.name]: file });
//     } else {
//       setForm({ ...form, [e.target.name]: e.target.value });
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (form.password !== form.confirmPassword) {
//       alert("Les mots de passe ne correspondent pas !");
//       return;
//     }

//     setLoading(true);
//     try {
//       const formData = new FormData();
//       Object.entries(form).forEach(([key, value]) => {
//         if (value !== null) formData.append(key, value as any);
//       });

//       const response = await fetch("http://localhost:8000/register/", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert("Compte créé avec succès !");
//         window.location.href = "/LoginForm";
//       } else {
//         alert(data.error || "Erreur lors de la création du compte");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Erreur réseau, veuillez réessayer plus tard");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
//   const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

//   if (!visible) return null;

//   return (
//     <section className="h-screen flex flex-col md:flex-row overflow-hidden">
//       {/* Partie gauche : Illustration */}
//       <motion.div
//         initial={{ opacity: 0, x: -50 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.8 }}
//         className="relative md:w-1/2 w-full h-1/2 md:h-full bg-cover bg-center flex items-center justify-center text-white"
//         style={{ backgroundImage: "url('/images/logo_cfi_white.png')" }}
//       >
//         <div className="absolute inset-0 bg-[#16A34A]/85"></div>
//         <div className="relative z-10 flex flex-col items-center text-center px-6">
//           <Image
//             src="/images/logo cfi.png"
//             alt="CFI-CIRAS"
//             width={120}
//             height={120}
//             className="object-contain mb-5 bg-white p-2 rounded-full shadow-md"
//           />
//           <h2 className="text-3xl font-bold mb-2">Bienvenue sur CFI-Recrute</h2>
//           <p className="text-lg mb-4 max-w-md opacity-90">
//             Rejoignez la plateforme pour découvrir :
//           </p>
//           <ul className="space-y-2 text-sm opacity-90">
//             <li>🌿 Des opportunités adaptées à votre profil</li>
//             <li>📊 Un suivi intelligent de vos candidatures</li>
//             <li>📚 Des ressources exclusives pour votre parcours</li>
//           </ul>
//         </div>
//       </motion.div>

//       {/* Partie droite : Formulaire */}
//       <motion.div
//         initial={{ opacity: 0, x: 80 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.8 }}
//         className="md:w-1/2 w-full h-1/2 md:h-full bg-[#F9FAFB] flex items-center justify-center px-6 py-10 relative"
//       >
//         <button
//           onClick={() => setVisible(false)}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
//         >
//           <X className="w-6 h-6" />
//         </button>

//         <div className="w-full max-w-lg bg-white p-10 rounded-2xl shadow-md border border-gray-100">
//           {/* Étapes */}
//           <div className="flex justify-between mb-10">
//             {[1, 2, 3, 4].map((s) => (
//               <motion.div
//                 key={s}
//                 className="flex-1 text-center"
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: s * 0.1 }}
//               >
//                 <div
//                   className={`mx-auto w-9 h-9 flex items-center justify-center rounded-full mb-2 font-semibold transition-all ${
//                     s <= step
//                       ? "bg-[#16A34A] text-white shadow-lg"
//                       : "bg-gray-300 text-gray-600"
//                   }`}
//                 >
//                   {s}
//                 </div>
//                 <p className="text-xs text-gray-500">
//                   {["Infos", "Contact", "Fichiers", "Sécurité"][s - 1]}
//                 </p>
//               </motion.div>
//             ))}
//           </div>

//           {/* Formulaire animé */}
//           <AnimatePresence mode="wait">
//             <motion.form
//               key={step}
//               onSubmit={handleSubmit}
//               className="space-y-5"
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -40 }}
//               transition={{ duration: 0.5 }}
//             >
//               {step === 1 && (
//                 <div className="space-y-4">
//                   <input name="nom_cand" onChange={handleChange} placeholder="Nom" className="input" required />
//                   <input name="pren_cand" onChange={handleChange} placeholder="Prénom" className="input" required />
//                   <select name="genre" onChange={handleChange} className="input" required>
//                     <option value="">Genre</option>
//                     <option value="M">Masculin</option>
//                     <option value="F">Féminin</option>
//                   </select>
//                   <input type="date" name="dat_nais" onChange={handleChange} className="input" required />
//                   <input name="lieu_nais" onChange={handleChange} placeholder="Lieu de naissance" className="input" required />
//                 </div>
//               )}

//               {step === 2 && (
//                 <div className="space-y-4">
//                   <input name="telephone1" onChange={handleChange} placeholder="Téléphone principal" className="input" required />
//                   <input name="telephone2" onChange={handleChange} placeholder="Téléphone secondaire (optionnel)" className="input" />
//                   <input name="email" type="email" onChange={handleChange} placeholder="Adresse e-mail" className="input" required />
//                 </div>
//               )}

//               {step === 3 && (
//                 <div className="space-y-4">
//                   <input name="diplome" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleChange} className="input" required />
//                   <input name="photo" type="file" accept="image/*" onChange={handleChange} className="input" />
//                   <input name="sitmat" onChange={handleChange} placeholder="Situation matrimoniale" className="input" />
//                 </div>
//               )}

//               {step === 4 && (
//                 <div className="space-y-4">
//                   <input name="password" type="password" onChange={handleChange} placeholder="Mot de passe" className="input" required />
//                   <input name="confirmPassword" type="password" onChange={handleChange} placeholder="Confirmer le mot de passe" className="input" required />
//                 </div>
//               )}

//               {/* Navigation */}
//               <div className="flex justify-between mt-6">
//                 {step > 1 && (
//                   <button
//                     type="button"
//                     onClick={prevStep}
//                     className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
//                   >
//                     ← Précédent
//                   </button>
//                 )}
//                 {step < 4 && (
//                   <button
//                     type="button"
//                     onClick={nextStep}
//                     className="ml-auto px-4 py-2 bg-[#16A34A] text-white rounded-lg hover:bg-[#15803D]"
//                   >
//                     Suivant →
//                   </button>
//                 )}
//                 {step === 4 && (
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="ml-auto px-4 py-2 bg-[#16A34A] text-white rounded-lg hover:bg-[#15803D] disabled:opacity-50"
//                   >
//                     {loading ? "Création..." : "Créer un compte"}
//                   </button>
//                 )}
//               </div>
//             </motion.form>
//           </AnimatePresence>

//           <p className="text-center text-gray-600 mt-6">
//             Déjà un compte ?{" "}
//             <a href="/LoginForm" className="text-[#16A34A] font-semibold hover:underline">
//               Se connecter
//             </a>
//           </p>
//         </div>
//       </motion.div>
//     </section>
//   );
// }



"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RegisterFormWizard() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);
  const router = useRouter();

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

  // 🧭 Bloquer le scroll et cacher la navbar
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const navbar = document.querySelector("nav");
    if (navbar) navbar.style.display = "none";

    return () => {
      document.body.style.overflow = "auto";
      if (navbar) navbar.style.display = "";
    };
  }, []);

  // 🔙 Fermer et revenir à l'accueil
  const handleClose = () => {
    setVisible(false);
    document.body.style.overflow = "auto";
    const navbar = document.querySelector("nav");
    if (navbar) navbar.style.display = "";
    router.push("/"); // redirige vers la page d’accueil
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
        router.push("/LoginForm");
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

  if (!visible) return null;

  return (
    <section className="h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Partie gauche */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative md:w-1/2 w-full h-1/2 md:h-full bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/images/logo_cfi_white.png')" }}
      >
        <div className="absolute inset-0 bg-[#16A34A]/85"></div>
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <Image
            src="/images/logo cfi.png"
            alt="CFI-CIRAS"
            width={120}
            height={120}
            className="object-contain mb-5 bg-white p-2 rounded-full shadow-md"
          />
          <h2 className="text-3xl font-bold mb-2">Bienvenue sur CFI-Recrute</h2>
          <p className="text-lg mb-4 max-w-md opacity-90">
            Rejoignez la plateforme pour découvrir :
          </p>
          <ul className="space-y-2 text-sm opacity-90">
            <li>🌿 Des opportunités adaptées à votre profil</li>
            <li>📊 Un suivi intelligent de vos candidatures</li>
            <li>📚 Des ressources exclusives pour votre parcours</li>
          </ul>
        </div>
      </motion.div>

      {/* Partie droite : Formulaire */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="md:w-1/2 w-full h-1/2 md:h-full bg-[#F9FAFB] flex items-center justify-center px-6 py-10 relative"
      >
        {/* Bouton fermer */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="w-full max-w-lg bg-white p-10 rounded-2xl shadow-md border border-gray-100">
          {/* Étapes */}
          <div className="flex justify-between mb-10">
            {[1, 2, 3, 4].map((s) => (
              <motion.div
                key={s}
                className="flex-1 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: s * 0.1 }}
              >
                <div
                  className={`mx-auto w-9 h-9 flex items-center justify-center rounded-full mb-2 font-semibold transition-all ${
                    s <= step
                      ? "bg-[#16A34A] text-white shadow-lg"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {s}
                </div>
                <p className="text-xs text-gray-500">
                  {["Infos", "Contact", "Fichiers", "Sécurité"][s - 1]}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Formulaire animé */}
          <AnimatePresence mode="wait">
            <motion.form
              key={step}
              onSubmit={handleSubmit}
              className="space-y-5"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
            >
              {step === 1 && (
                <div className="space-y-4">
                  <input name="nom_cand" onChange={handleChange} placeholder="Nom" className="input" required />
                  <input name="pren_cand" onChange={handleChange} placeholder="Prénom" className="input" required />
                  <select name="genre" onChange={handleChange} className="input" required>
                    <option value="">Genre</option>
                    <option value="M">Masculin</option>
                    <option value="F">Féminin</option>
                  </select>
                  <input type="date" name="dat_nais" onChange={handleChange} className="input" required />
                  <input name="lieu_nais" onChange={handleChange} placeholder="Lieu de naissance" className="input" required />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <input name="telephone1" onChange={handleChange} placeholder="Téléphone principal" className="input" required />
                  <input name="telephone2" onChange={handleChange} placeholder="Téléphone secondaire (optionnel)" className="input" />
                  <input name="email" type="email" onChange={handleChange} placeholder="Adresse e-mail" className="input" required />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <input name="diplome" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleChange} className="input" required />
                  <input name="photo" type="file" accept="image/*" onChange={handleChange} className="input" />
                  <input name="sitmat" onChange={handleChange} placeholder="Situation matrimoniale" className="input" />
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <input name="password" type="password" onChange={handleChange} placeholder="Mot de passe" className="input" required />
                  <input name="confirmPassword" type="password" onChange={handleChange} placeholder="Confirmer le mot de passe" className="input" required />
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-6">
                {step > 1 && (
                  <button type="button" onClick={prevStep} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
                    ← Précédent
                  </button>
                )}
                {step < 4 && (
                  <button type="button" onClick={nextStep} className="ml-auto px-4 py-2 bg-[#16A34A] text-white rounded-lg hover:bg-[#15803D]">
                    Suivant →
                  </button>
                )}
                {step === 4 && (
                  <button type="submit" disabled={loading} className="ml-auto px-4 py-2 bg-[#16A34A] text-white rounded-lg hover:bg-[#15803D] disabled:opacity-50">
                    {loading ? "Création..." : "Créer un compte"}
                  </button>
                )}
              </div>
            </motion.form>
          </AnimatePresence>

          <p className="text-center text-gray-600 mt-6">
            Déjà un compte ?{" "}
            <a href="/LoginForm" className="text-[#16A34A] font-semibold hover:underline">
              Se connecter
            </a>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
