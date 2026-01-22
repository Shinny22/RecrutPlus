
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Users, Calendar, MapPin, Phone, Mail, FileText, Image as ImageIcon, Heart, Lock, ChevronDown } from "lucide-react";
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
        if (value !== null) {
          if (value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, String(value));
          }
        }
      });

      const response = await fetch("https://recrutplus-back.onrender.com/register/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Compte créé avec succès !");
        router.push("/Login");
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
        <div className="absolute inset-0 bg-black/20"></div>
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
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 hover:bg-green-100 p-2 rounded-full transition"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="w-full max-w-lg bg-white p-10 rounded-2xl  border border-gray-100">
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
                <div className="space-y-2">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium text-sm">
                      Nom <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center border border-gray-300 rounded-lg px-2 bg-gray-50 focus-within:ring-2 focus-within:ring-[#16A34A]/50 focus-within:border-[#16A34A] transition">
                      <User className="text-gray-400 flex-shrink-0" size={20} />
                      <input 
                        name="nom_cand" 
                        onChange={handleChange} 
                        value={form.nom_cand}
                        placeholder="Ex: DUPONT" 
                        className="w-full px-3 py-2 outline-none bg-transparent placeholder:text-gray-400" 
                        required 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium text-sm">
                      Prénom <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center border border-gray-300 rounded-lg px-2 bg-gray-50 focus-within:ring-2 focus-within:ring-[#16A34A]/50 focus-within:border-[#16A34A] transition">
                      <User className="text-gray-400 flex-shrink-0" size={20} />
                      <input 
                        name="pren_cand" 
                        onChange={handleChange} 
                        value={form.pren_cand}
                        placeholder="Ex: Jean" 
                        className="w-full px-3 py-2 outline-none bg-transparent placeholder:text-gray-400" 
                        required 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium text-sm">
                      Genre <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center border border-gray-300 rounded-lg px-2 bg-gray-50 focus-within:ring-2 focus-within:ring-[#16A34A]/50 focus-within:border-[#16A34A] transition">
                      <Users className="text-gray-400 flex-shrink-0" size={20} />
                      <select 
                        name="genre" 
                        onChange={handleChange} 
                        value={form.genre}
                        className="w-full px-3 py-2 outline-none bg-transparent text-gray-700 appearance-none cursor-pointer pr-8" 
                        required
                      >
                        <option value="" disabled>Sélectionnez votre genre</option>
                        <option value="M">Masculin</option>
                        <option value="F">Féminin</option>
                      </select>
                      <ChevronDown className="absolute right-3 text-gray-400 pointer-events-none" size={18} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium text-sm">
                      Date de naissance <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center border border-gray-300 rounded-lg px-2 bg-gray-50 focus-within:ring-2 focus-within:ring-[#16A34A]/50 focus-within:border-[#16A34A] transition">
                      <Calendar className="text-gray-400 flex-shrink-0" size={20} />
                      <input 
                        type="date" 
                        name="dat_nais" 
                        onChange={handleChange} 
                        value={form.dat_nais}
                        max={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 outline-none bg-transparent text-gray-700" 
                        required 
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1 ml-1">Format: JJ/MM/AAAA</p>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium text-sm">
                      Lieu de naissance <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center border border-gray-300 rounded-lg px-3 bg-gray-50 focus-within:ring-2 focus-within:ring-[#16A34A]/50 focus-within:border-[#16A34A] transition">
                      <MapPin className="text-gray-400 flex-shrink-0" size={20} />
                      <input 
                        name="lieu_nais" 
                        onChange={handleChange} 
                        value={form.lieu_nais}
                        placeholder="Ex: Paris, France" 
                        className="w-full px-3 py-2.5 outline-none bg-transparent placeholder:text-gray-400" 
                        required 
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium text-sm">
                      Téléphone principal <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center border border-gray-300 rounded-lg px-2 bg-gray-50 focus-within:ring-2 focus-within:ring-[#16A34A]/50 focus-within:border-[#16A34A] transition">
                      <Phone className="text-gray-400 flex-shrink-0" size={20} />
                      <input 
                        name="telephone1" 
                        onChange={handleChange} 
                        value={form.telephone1}
                        type="tel"
                        placeholder="Ex: +33 6 12 34 56 78" 
                        className="w-full px-3 py-2 outline-none bg-transparent placeholder:text-gray-400" 
                        required 
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1 ml-1">Numéro avec indicatif pays</p>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium text-sm">
                      Téléphone secondaire <span className="text-gray-400 text-xs font-normal">(optionnel)</span>
                    </label>
                    <div className="relative flex items-center border border-gray-300 rounded-lg px-2 bg-gray-50 focus-within:ring-2 focus-within:ring-[#16A34A]/50 focus-within:border-[#16A34A] transition">
                      <Phone className="text-gray-400 flex-shrink-0" size={20} />
                      <input 
                        name="telephone2" 
                        onChange={handleChange} 
                        value={form.telephone2}
                        type="tel"
                        placeholder="Ex: +33 6 98 76 54 32" 
                        className="w-full px-2 py-2 outline-none bg-transparent placeholder:text-gray-400" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium text-sm">
                      Adresse e-mail <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center border border-gray-300 rounded-lg px-2 bg-green-50 focus-within:ring-2 focus-within:ring-[#16A34A]/50 focus-within:border-[#16A34A] transition">
                      <Mail className="text-gray-400 flex-shrink-0" size={20} />
                      <input 
                        name="email" 
                        type="email" 
                        onChange={handleChange} 
                        value={form.email}
                        placeholder="Ex: jean.dupont@email.com" 
                        className="w-full px-2 py-2 outline-none bg-transparent placeholder:text-gray-400" 
                        required 
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1 ml-1">Cette adresse sera utilisée pour vous connecter</p>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium text-sm">
                      Diplôme / Certificat <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center border border-gray-300 rounded-lg px-2 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-[#16A34A]/50 focus-within:border-[#16A34A] transition">
                      <FileText className="text-gray-400 flex-shrink-0" size={20} />
                      <input 
                        name="diplome" 
                        type="file" 
                        accept=".pdf,.jpg,.jpeg,.png" 
                        onChange={handleChange} 
                        className="w-full px-2 py-2 outline-none bg-transparent text-sm text-gray-700 file:mr-4 file:py-2 file:px-2 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#7ebd95] file:text-white hover:file:bg-[#15803D] file:cursor-pointer cursor-pointer" 
                        required 
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1 ml-1">Formats acceptés: PDF, JPG, JPEG, PNG (max 5MB)</p>
                    {form.diplome && (
                      <p className="text-xs text-[#16A34A] mt-1 ml-1 font-medium">✓ Fichier sélectionné: {form.diplome.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium text-sm">
                      Photo de profil <span className="text-gray-400 text-xs font-normal">(optionnel)</span>
                    </label>
                    <div className="relative flex items-center border border-gray-300 rounded-lg px-2 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-[#16A34A]/50 focus-within:border-[#16A34A] transition">
                      <ImageIcon className="text-gray-400 flex-shrink-0" size={20} />
                      <input 
                        name="photo" 
                        type="file" 
                        accept="image/*" 
                        onChange={handleChange} 
                        className="w-full px-2 py-2 outline-none bg-transparent text-sm text-gray-700 file:mr-4 file:py-2 file:px-2 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#7ebd95] file:text-white hover:file:bg-[#15803D] file:cursor-pointer cursor-pointer" 
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1 ml-1">Format recommandé: JPG, PNG (max 2MB, format carré)</p>
                    {form.photo && (
                      <p className="text-xs text-[#16A34A] mt-1 ml-1 font-medium">✓ Photo sélectionnée: {form.photo.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium text-sm">
                      Situation matrimoniale <span className="text-gray-400 text-xs font-normal">(optionnel)</span>
                    </label>
                    <div className="relative flex items-center border border-gray-300 rounded-lg px-3 bg-gray-50 focus-within:ring-2 focus-within:ring-[#16A34A]/50 focus-within:border-[#16A34A] transition">
                      <Heart className="text-gray-400 flex-shrink-0" size={20} />
                      <input 
                        name="sitmat" 
                        onChange={handleChange} 
                        value={form.sitmat}
                        placeholder="Ex: Célibataire, Marié(e), Divorcé(e)" 
                        className="w-full px-2 py-2 outline-none bg-transparent placeholder:text-gray-400" 
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium text-sm">
                      Mot de passe <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center border border-gray-300 rounded-lg px-3 bg-gray-50 focus-within:ring-2 focus-within:ring-[#16A34A]/50 focus-within:border-[#16A34A] transition">
                      <Lock className="text-gray-400 flex-shrink-0" size={20} />
                      <input 
                        name="password" 
                        type="password" 
                        onChange={handleChange} 
                        value={form.password}
                        placeholder="Minimum 8 caractères" 
                        className="w-full px-3 py-2.5 outline-none bg-transparent placeholder:text-gray-400" 
                        required 
                        minLength={8}
                      />
                    </div>
                    <div className="mt-2 ml-1">
                      <p className="text-xs text-gray-600 font-medium mb-1">Exigences du mot de passe:</p>
                      <ul className="text-xs text-gray-500 space-y-0.5">
                        <li className={form.password.length >= 8 ? "text-[#16A34A]" : ""}>
                          {form.password.length >= 8 ? "✓" : "•"} Au moins 8 caractères
                        </li>
                        <li className={/[A-Z]/.test(form.password) ? "text-[#16A34A]" : ""}>
                          {/[A-Z]/.test(form.password) ? "✓" : "•"} Une majuscule (recommandé)
                        </li>
                        <li className={/[0-9]/.test(form.password) ? "text-[#16A34A]" : ""}>
                          {/[0-9]/.test(form.password) ? "✓" : "•"} Un chiffre (recommandé)
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium text-sm">
                      Confirmer le mot de passe <span className="text-red-500">*</span>
                    </label>
                    <div className={`relative flex items-center border rounded-lg px-3 bg-gray-50 focus-within:ring-2 focus-within:ring-[#16A34A]/50 transition ${
                      form.confirmPassword && form.password !== form.confirmPassword 
                        ? "border-red-400 focus-within:border-red-400" 
                        : form.confirmPassword && form.password === form.confirmPassword
                        ? "border-[#16A34A] focus-within:border-[#16A34A]"
                        : "border-gray-300 focus-within:border-[#16A34A]"
                    }`}>
                      <Lock className="text-gray-400 flex-shrink-0" size={20} />
                      <input 
                        name="confirmPassword" 
                        type="password" 
                        onChange={handleChange} 
                        value={form.confirmPassword}
                        placeholder="Répétez votre mot de passe" 
                        className="w-full px-3 py-2.5 outline-none bg-transparent placeholder:text-gray-400" 
                        required 
                      />
                    </div>
                    {form.confirmPassword && (
                      <p className={`text-xs mt-1 ml-1 font-medium ${
                        form.password === form.confirmPassword ? "text-[#16A34A]" : "text-red-500"
                      }`}>
                        {form.password === form.confirmPassword 
                          ? "✓ Les mots de passe correspondent" 
                          : "✗ Les mots de passe ne correspondent pas"}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                {step > 1 && (
                  <button 
                    type="button" 
                    onClick={prevStep} 
                    className="px-6 py-2.5 bg-green-300 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium flex items-center gap-2"
                  >
                    ← Précédent
                  </button>
                )}
                {step < 4 && (
                  <button 
                    type="button" 
                    onClick={nextStep} 
                    className={`ml-auto px-6 py-2.5 bg-[#16A34A] text-white rounded-lg hover:bg-[#15803D] transition font-medium flex items-center gap-2 shadow-md ${
                      step === 1 && (!form.nom_cand || !form.pren_cand || !form.genre || !form.dat_nais || !form.lieu_nais) ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={step === 1 && (!form.nom_cand || !form.pren_cand || !form.genre || !form.dat_nais || !form.lieu_nais)}
                  >
                    Suivant →
                  </button>
                )}
                {step === 4 && (
                  <button 
                    type="submit" 
                    disabled={loading || form.password !== form.confirmPassword} 
                    className="ml-auto px-6 py-2.5 bg-[#16A34A] text-white rounded-lg hover:bg-[#15803D] disabled:opacity-50 disabled:cursor-not-allowed transition font-medium flex items-center gap-2 shadow-md"
                  >
                    {loading ? (
                      <>
                        <span className="animate-spin">⏳</span> Création en cours...
                      </>
                    ) : (
                      "✓ Créer mon compte"
                    )}
                  </button>
                )}
              </div>
            </motion.form>
          </AnimatePresence>

          <p className="text-center text-gray-600 mt-6">
            Déjà un compte ?{" "}
            <a href="/Login" className="text-[#16A34A] font-semibold hover:underline">
              Se connecter
            </a>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
