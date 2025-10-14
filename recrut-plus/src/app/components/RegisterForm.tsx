
"use client";

import React, { useState } from "react";
import { User, Lock, Mail, Phone,X} from "lucide-react";
import Image from "next/image";

export default function RegisterFormWizard() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);

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
        window.location.href = "/login";
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
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="relative bg-white shadow-xl rounded-xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden border border-gray-200">
      
      <button
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          <X className="w-6 h-6" />
        </button>
        {/* Colonne gauche : logo + titre */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gray-100 w-1/2 p-10 border-r">
          <Image
            src="/images/logo cfi.png"
            alt="CFI-CIRAS"
            width={150}
            height={150}
            className="mb-6"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Créer un compte</h2>
          <p className="text-gray-600 text-center">
            Rejoignez le CFI-CIRAS.
          </p>
        </div>

        {/* Colonne droite : formulaire multi-étapes */}
        <div className="flex-1 p-8">
          {/* Progress bar */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex-1 text-center">
                <div
                  className={`mx-auto w-8 h-8 flex items-center justify-center rounded-full mb-2 font-semibold ${
                    s <= step ? "bg-green-600 text-white" : "bg-green-300 text-gray-600"
                  }`}
                >
                  {s}
                </div>
                <div className="text-xs text-gray-500">
                  {["Infos", "Contact", "Fichiers", "Sécurité"][s - 1]}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Étape 1 */}
            {step === 1 && (
              <div className="space-y-4">
                <input
                  type="text"
                  name="nom_cand"
                  value={form.nom_cand}
                  onChange={handleChange}
                  placeholder="Nom"
                  className="w-full border rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  name="pren_cand"
                  value={form.pren_cand}
                  onChange={handleChange}
                  placeholder="Prénom"
                  className="w-full border rounded px-3 py-2"
                  required
                />
                <select
                  name="genre"
                  value={form.genre}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="">Genre</option>
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                </select>
                <input
                  type="date"
                  name="dat_nais"
                  value={form.dat_nais}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  name="lieu_nais"
                  value={form.lieu_nais}
                  onChange={handleChange}
                  placeholder="Lieu de naissance"
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
            )}

            {/* Étape 2 */}
            {step === 2 && (
              <div className="space-y-4">
                <input
                  type="text"
                  name="telephone1"
                  value={form.telephone1}
                  onChange={handleChange}
                  placeholder="Téléphone 1"
                  className="w-full border rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  name="telephone2"
                  value={form.telephone2}
                  onChange={handleChange}
                  placeholder="Téléphone 2 (optionnel)"
                  className="w-full border rounded px-3 py-2"
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
            )}

            {/* Étape 3 */}
            {step === 3 && (
              <div className="space-y-4">
                <input
                  type="file"
                  name="diplome"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleChange}
                  className="w-full"
                  required
                />
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full"
                />
                <input
                  type="text"
                  name="sitmat"
                  value={form.sitmat}
                  onChange={handleChange}
                  placeholder="Situation matrimoniale"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            )}

            {/* Étape 4 */}
            {step === 4 && (
              <div className="space-y-4">
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Mot de passe"
                  className="w-full border rounded px-3 py-2"
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirmer le mot de passe"
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
            )}

            {/* Boutons navigation */}
            <div className="flex justify-between mt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Précédent
                </button>
              )}
              {step < 4 && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Suivant
                </button>
              )}
              {step === 4 && (
                <button
                  type="submit"
                  disabled={loading}
                  className="ml-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? "Création..." : "Créer un compte"}
                </button>
              )}
            </div>
          </form>

          {/* Déjà un compte ? */}
          <p className="text-center text-green-600 mt-6">
            Déjà un compte ?{" "}
            <a href="/login" className="text-red-600 font-semibold hover:underline">
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
