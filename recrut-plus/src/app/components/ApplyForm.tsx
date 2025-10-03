// components/PostulerForm.tsx
"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

interface FormValues {
  nom_cand: string;
  pren_cand: string;
  genre: string;
  dat_nais: string;
  lieu_nais: string;
  telephone1: string;
  telephone2?: string;
  email: string;
  photo?: FileList;
  diplome: string;
  cv: FileList;
  anne_obt_dip: number;
  campagne: string;
}

const PostulerForm = ({ campagnes }: { campagnes: any[] }) => {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, watch, control } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const formData = new FormData();

      // Ajouter toutes les données
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof FileList) {
          if (value.length > 0) formData.append(key, value[0]);
        } else {
          formData.append(key, value as any);
        }
      });

      // POST vers ton endpoint Django
      await axios.post("http://localhost:8000/postuler/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Demande envoyée avec succès !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'envoi de la demande.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto p-4 space-y-4">
      {step === 1 && (
        <div className="space-y-2">
          <h2 className="text-xl font-bold">Informations personnelles</h2>
          <input {...register("nom_cand")} placeholder="Nom" className="input"/>
          <input {...register("pren_cand")} placeholder="Prénom" className="input"/>
          <select {...register("genre")} className="input">
            <option value="">-- Genre --</option>
            <option value="M">Masculin</option>
            <option value="F">Féminin</option>
          </select>
          <input type="date" {...register("dat_nais")} className="input"/>
          <input {...register("lieu_nais")} placeholder="Lieu de naissance" className="input"/>
          <input {...register("telephone1")} placeholder="Téléphone 1" className="input"/>
          <input {...register("telephone2")} placeholder="Téléphone 2 (facultatif)" className="input"/>
          <input type="email" {...register("email")} placeholder="Email" className="input"/>
          <input type="file" {...register("photo")} className="input"/>
          <button type="button" onClick={() => setStep(2)} className="btn-primary mt-2">
            Suivant
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-2">
          <h2 className="text-xl font-bold">Diplôme et campagne</h2>
          <input {...register("diplome")} placeholder="Diplôme" className="input"/>
          <input type="number" {...register("anne_obt_dip")} placeholder="Année obtention" className="input"/>
          <select {...register("campagne")} className="input">
            <option value="">-- Choisir une campagne --</option>
            {campagnes.map(c => (
              <option key={c.cod_anne} value={c.cod_anne}>
                {c.description}
              </option>
            ))}
          </select>
          <input type="file" {...register("cv")} className="input"/>
          <div className="flex justify-between mt-2">
            <button type="button" onClick={() => setStep(1)} className="btn-secondary">Précédent</button>
            <button type="submit" className="btn-primary">Postuler</button>
          </div>
        </div>
      )}
    </form>
  );
};

export default PostulerForm;
