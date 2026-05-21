"use client";

import { ChangeEvent, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

type Campagne = {
  cod_anne: string;
  description: string;
  dat_debut: string;
  dat_fin: string;
  etat: string;
};

type FormState = {
  nom_cand: string;
  pren_cand: string;
  genre: string;
  dat_nais: string;
  lieu_nais: string;
  telephone1: string;
  telephone2: string;
  email: string;
  anne_obt_dip: string;
  campagne: string;
};

type FileState = {
  photo: File | null;
  diplome_fichier: File | null;
  cv: File | null;
};

const initialFormState: FormState = {
  nom_cand: "",
  pren_cand: "",
  genre: "",
  dat_nais: "",
  lieu_nais: "",
  telephone1: "",
  telephone2: "",
  email: "",
  anne_obt_dip: "",
  campagne: "",
};

const initialFileState: FileState = {
  photo: null,
  diplome_fichier: null,
  cv: null,
};

const PostulerForm = ({ campagnes }: { campagnes: Campagne[] }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState<FormState>(initialFormState);
  const [files, setFiles] = useState<FileState>(initialFileState);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleFileChange =
    (field: keyof FileState) => (event: ChangeEvent<HTMLInputElement>) => {
      setFiles((current) => ({
        ...current,
        [field]: event.target.files?.[0] ?? null,
      }));
    };

  const handleSelectChange = (field: keyof FormState, value: string) => {
    setFormValues((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const onSubmit = async () => {
    setLoading(true);

    try {
      const formData = new FormData();

      Object.entries(formValues).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value);
        }
      });

      Object.entries(files).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value);
        }
      });

      await axios.post("https://recrutplus-back.onrender.com/postuler/", formData);
      alert("Demande envoyee avec succes !");
      setFormValues(initialFormState);
      setFiles(initialFileState);
      setStep(1);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'envoi de la demande.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-3xl border-white/80 bg-white/92 p-6 shadow-[0_20px_45px_-28px_rgba(15,23,42,0.55)] sm:p-8">
      <CardContent className="px-2 sm:px-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="section-kicker m-0 border-emerald-200 bg-emerald-50 text-emerald-800">
            Candidature
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Étape {step}/2
          </span>
        </div>

        <div className="mb-8 flex justify-between gap-2">
          {[1, 2].map((currentStep) => (
            <motion.div
              key={currentStep}
              className={`h-2 flex-1 rounded-full ${
                step >= currentStep ? "bg-emerald-600" : "bg-slate-200"
              } transition`}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
            />
          ))}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            void onSubmit();
          }}
          className="space-y-6"
        >
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                Informations personnelles
              </h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="nom_cand">Nom</Label>
                  <Input
                    id="nom_cand"
                    name="nom_cand"
                    value={formValues.nom_cand}
                    onChange={handleInputChange}
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <Label htmlFor="pren_cand">Prenom</Label>
                  <Input
                    id="pren_cand"
                    name="pren_cand"
                    value={formValues.pren_cand}
                    onChange={handleInputChange}
                    placeholder="Votre prenom"
                  />
                </div>

                <div>
                  <Label>Genre</Label>
                  <Select
                    value={formValues.genre}
                    onValueChange={(value) => handleSelectChange("genre", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="-- Selectionnez votre genre --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Masculin</SelectItem>
                      <SelectItem value="F">Feminin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="dat_nais">Date de naissance</Label>
                  <Input
                    id="dat_nais"
                    name="dat_nais"
                    type="date"
                    value={formValues.dat_nais}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="lieu_nais">Lieu de naissance</Label>
                  <Input
                    id="lieu_nais"
                    name="lieu_nais"
                    value={formValues.lieu_nais}
                    onChange={handleInputChange}
                    placeholder="Ville / Pays"
                  />
                </div>

                <div>
                  <Label htmlFor="telephone1">Telephone principal</Label>
                  <Input
                    id="telephone1"
                    name="telephone1"
                    value={formValues.telephone1}
                    onChange={handleInputChange}
                    placeholder="+242 ..."
                  />
                </div>

                <div>
                  <Label htmlFor="telephone2">
                    Telephone secondaire (facultatif)
                  </Label>
                  <Input
                    id="telephone2"
                    name="telephone2"
                    value={formValues.telephone2}
                    onChange={handleInputChange}
                    placeholder="+242 ..."
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    placeholder="exemple@mail.com"
                  />
                </div>

                <div>
                  <Label htmlFor="photo">Photo (JPG/PNG)</Label>
                  <Input id="photo" type="file" onChange={handleFileChange("photo")} />
                </div>

                <Button type="button" onClick={() => setStep(2)} className="w-full">
                  Suivant →
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
              <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                Diplome et campagne
              </h2>

              <div>
                <Label htmlFor="diplome_fichier">Diplome obtenu</Label>
                <Input
                  id="diplome_fichier"
                  type="file"
                  onChange={handleFileChange("diplome_fichier")}
                />
              </div>

              <div>
                <Label htmlFor="anne_obt_dip">Annee d&apos;obtention</Label>
                <Input
                  id="anne_obt_dip"
                  name="anne_obt_dip"
                  type="number"
                  value={formValues.anne_obt_dip}
                  onChange={handleInputChange}
                  placeholder="Ex : 2023"
                />
              </div>

              <div>
                <Label>Campagne</Label>
                <Select
                  value={formValues.campagne}
                  onValueChange={(value) => handleSelectChange("campagne", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="-- Choisir une campagne --" />
                  </SelectTrigger>
                  <SelectContent>
                    {campagnes.map((campagne) => (
                      <SelectItem
                        key={campagne.cod_anne}
                        value={campagne.cod_anne}
                      >
                        {campagne.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="cv">CV (PDF)</Label>
                <Input id="cv" type="file" onChange={handleFileChange("cv")} />
              </div>

              <div className="mt-4 flex justify-between gap-3">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  ← Précédent
                </Button>
                <Button type="submit" disabled={loading} className="min-w-[140px]">
                  {loading ? "Envoi..." : "Envoyer la candidature"}
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
