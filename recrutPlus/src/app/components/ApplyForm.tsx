//Version2

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Button,
} from "@/components/ui/button";
import {
  Input,
} from "@/components/ui/input";
import {
  Label,
} from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

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
  diplome_fichier?: FileList;
  cv: FileList;
  anne_obt_dip: number;
  campagne: string;
}

const PostulerForm = ({ campagnes }: { campagnes: any[] }) => {
  const [step, setStep] = useState(1);
  const { register, handleSubmit } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof FileList) {
          if (value.length > 0) formData.append(key, value[0]);
        } else {
          formData.append(key, value as any);
        }
      });
      await axios.post("https://recrutplus-back.onrender.com/postuler/", formData, );
      alert("Demande envoyée avec succès !");
      setStep(1);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'envoi de la demande.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto p-8 shadow-lg rounded-2xl bg-white">
      <CardContent>
        {/* Step Indicator */}
        <div className="flex justify-between mb-8">
          {[1, 2].map((s) => (
            <motion.div
              key={s}
              className={`flex-1 h-2 rounded-full ${step >= s ? "bg-green-600" : "bg-gray-300"} transition`}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Informations personnelles</h2>

              <div className="space-y-4">
                <div>
                  <Label>Nom</Label>
                  <Input {...register("nom_cand")} placeholder="Votre nom" />
                </div>

                <div>
                  <Label>Prénom</Label>
                  <Input {...register("pren_cand")} placeholder="Votre prénom" />
                </div>

                <div>
                  <Label>Genre</Label>
                  <Select {...register("genre")}>
                    <SelectTrigger>
                      <SelectValue placeholder="-- Sélectionnez votre genre --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Masculin</SelectItem>
                      <SelectItem value="F">Féminin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Date de naissance</Label>
                  <Input type="date" {...register("dat_nais")} />
                </div>

                <div>
                  <Label>Lieu de naissance</Label>
                  <Input {...register("lieu_nais")} placeholder="Ville / Pays" />
                </div>

                <div>
                  <Label>Téléphone principal</Label>
                  <Input {...register("telephone1")} placeholder="+242 ..." />
                </div>

                <div>
                  <Label>Téléphone secondaire (facultatif)</Label>
                  <Input {...register("telephone2")} placeholder="+242 ..." />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input type="email" {...register("email")} placeholder="exemple@mail.com" />
                </div>

                <div>
                  <Label>Photo (JPG/PNG)</Label>
                  <Input type="file" {...register("photo")} />
                </div>

                <Button type="button" onClick={() => setStep(2)} className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Suivant
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Diplôme et campagne</h2>

              <div>
                <Label>Diplôme obtenu</Label>
                <Input type="file" {...register("diplome_fichier")} />
              </div>

              <div>
                <Label>Année d'obtention</Label>
                <Input type="number" {...register("anne_obt_dip")} placeholder="Ex : 2023" />
              </div>

              <div>
                <Label>Campagne</Label>
                <Select {...register("campagne")}>
                  <SelectTrigger>
                    <SelectValue placeholder="-- Choisir une campagne --" />
                  </SelectTrigger>
                  <SelectContent>
                    {campagnes.map((c) => (
                      <SelectItem key={c.cod_anne} value={c.cod_anne}>
                        {c.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>CV (PDF)</Label>
                <Input type="file" {...register("cv")} />
              </div>

              <div className="flex justify-between mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  Précédent
                </Button>
                <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700 text-white">
                  {loading ? "Envoi..." : "Postuler"}
                </Button>
              </div>
            </motion.div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default PostulerForm;
