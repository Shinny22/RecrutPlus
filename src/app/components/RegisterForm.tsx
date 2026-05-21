"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

type RegisterFormProps = {
  onClose?: () => void;
};

type RegisterState = {
  nom_cand: string;
  pren_cand: string;
  genre: string;
  dat_nais: string;
  lieu_nais: string;
  telephone1: string;
  telephone2: string;
  email: string;
  password: string;
  confirmPassword: string;
  sitmat: string;
  diplome: File | null;
  photo: File | null;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://recrutplus-back.onrender.com";

export default function RegisterForm({ onClose }: RegisterFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);
  const [form, setForm] = useState<RegisterState>({
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
    diplome: null,
    photo: null,
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const stepTitle = ["Informations", "Contact", "Documents", "Sécurité"][step - 1];

  const isStepValid = useMemo(() => {
    if (step === 1) {
      return Boolean(form.nom_cand && form.pren_cand && form.genre && form.dat_nais && form.lieu_nais);
    }
    if (step === 2) {
      return Boolean(form.telephone1 && form.email);
    }
    if (step === 3) {
      return Boolean(form.diplome);
    }
    return Boolean(form.password && form.confirmPassword && form.password === form.confirmPassword);
  }, [form, step]);

  const handleClose = () => {
    setVisible(false);
    if (onClose) {
      onClose();
      return;
    }
    router.push("/");
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    if (name === "photo" || name === "diplome") {
      const file = (event.target as HTMLInputElement).files?.[0] ?? null;
      setForm((current) => ({ ...current, [name]: file }));
      return;
    }
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          formData.append(key, value instanceof File ? value : String(value));
        }
      });

      const response = await fetch(`${API_BASE}/register/`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.error || "Erreur lors de la création du compte.");
        return;
      }

      alert("Compte créé avec succès.");
      router.push("/Login");
    } catch (error) {
      console.error(error);
      alert("Erreur réseau, veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <section className="fixed inset-0 z-[70] min-h-screen overflow-y-auto bg-white md:grid md:grid-cols-[0.42fr_0.58fr]">
      <aside
        className="relative hidden min-h-screen items-center justify-center px-8 text-white md:flex"
        style={{
          backgroundImage:
            "linear-gradient(145deg, rgba(6,78,59,0.9), rgba(5,150,105,0.78)), url('/images/cfi_image.jpg')",
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
          <h2 className="mt-5 text-3xl font-semibold">Créer votre compte</h2>
          <p className="mt-3 text-emerald-50/95">
            Configurez votre profil pour accéder aux offres et suivre vos candidatures.
          </p>
        </div>
      </aside>

      <div className="relative flex min-h-screen items-center justify-center px-4 py-8 sm:px-6">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-100"
          aria-label="Fermer l’inscription"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="surface-card w-full max-w-2xl p-7 sm:p-9">
          <div className="mb-7">
            <h3 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Inscription candidat</h3>
            <p className="mt-1 text-sm text-slate-600">Étape {step}/4: {stepTitle}</p>
          </div>

          <div className="mb-7 grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-2 rounded-full bg-slate-200">
                <div
                  className={`h-2 rounded-full transition-all ${
                    item <= step ? "w-full bg-emerald-600" : "w-0"
                  }`}
                />
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={step}
              onSubmit={handleSubmit}
              className="space-y-4"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25 }}
            >
              {step === 1 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Nom">
                    <input name="nom_cand" value={form.nom_cand} onChange={handleChange} className="input-shell" required />
                  </Field>
                  <Field label="Prénom">
                    <input name="pren_cand" value={form.pren_cand} onChange={handleChange} className="input-shell" required />
                  </Field>
                  <Field label="Genre">
                    <select name="genre" value={form.genre} onChange={handleChange} className="input-shell" required>
                      <option value="">Sélectionnez</option>
                      <option value="M">Masculin</option>
                      <option value="F">Féminin</option>
                    </select>
                  </Field>
                  <Field label="Date de naissance">
                    <input
                      type="date"
                      name="dat_nais"
                      value={form.dat_nais}
                      onChange={handleChange}
                      max={new Date().toISOString().split("T")[0]}
                      className="input-shell"
                      required
                    />
                  </Field>
                  <Field label="Lieu de naissance" className="sm:col-span-2">
                    <input name="lieu_nais" value={form.lieu_nais} onChange={handleChange} className="input-shell" required />
                  </Field>
                </div>
              )}

              {step === 2 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Téléphone principal">
                    <input name="telephone1" value={form.telephone1} onChange={handleChange} className="input-shell" required />
                  </Field>
                  <Field label="Téléphone secondaire">
                    <input name="telephone2" value={form.telephone2} onChange={handleChange} className="input-shell" />
                  </Field>
                  <Field label="Adresse e-mail" className="sm:col-span-2">
                    <input type="email" name="email" value={form.email} onChange={handleChange} className="input-shell" required />
                  </Field>
                </div>
              )}

              {step === 3 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Diplôme / Certificat" className="sm:col-span-2">
                    <input
                      type="file"
                      name="diplome"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleChange}
                      className="input-shell"
                      required
                    />
                  </Field>
                  <Field label="Photo de profil (optionnel)" className="sm:col-span-2">
                    <input type="file" name="photo" accept="image/*" onChange={handleChange} className="input-shell" />
                  </Field>
                  <Field label="Situation matrimoniale">
                    <input name="sitmat" value={form.sitmat} onChange={handleChange} className="input-shell" />
                  </Field>
                </div>
              )}

              {step === 4 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Mot de passe">
                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      minLength={8}
                      className="input-shell"
                      required
                    />
                  </Field>
                  <Field label="Confirmer le mot de passe">
                    <input
                      type="password"
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      className="input-shell"
                      required
                    />
                  </Field>
                  {form.confirmPassword && form.password !== form.confirmPassword && (
                    <p className="text-sm text-rose-600 sm:col-span-2">
                      Les mots de passe ne correspondent pas.
                    </p>
                  )}
                </div>
              )}

              <div className="mt-2 flex items-center justify-between border-t border-emerald-100 pt-5">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((currentStep) => Math.max(currentStep - 1, 1))}
                    className="brand-btn-secondary"
                  >
                    Précédent
                  </button>
                ) : (
                  <span />
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={() => setStep((currentStep) => Math.min(currentStep + 1, 4))}
                    disabled={!isStepValid}
                    className="brand-btn disabled:opacity-60"
                  >
                    Suivant
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading || !isStepValid}
                    className="brand-btn disabled:opacity-60"
                  >
                    {loading ? "Création..." : "Créer mon compte"}
                  </button>
                )}
              </div>
            </motion.form>
          </AnimatePresence>

          <p className="mt-5 text-sm text-slate-600">
            Déjà inscrit ?{" "}
            <a href="/Login" className="font-semibold text-emerald-700 hover:text-emerald-800">
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="mb-1 block text-sm font-medium text-slate-700">{label}</label>
      {children}
    </div>
  );
}
