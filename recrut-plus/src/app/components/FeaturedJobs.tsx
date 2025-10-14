// /components/FeaturedJobs.tsx
import { MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

const jobs = [
  {
    title: "Développeur Fullstack",
    company: "CFI-CIRAS",
    location: "Brazzaville, Congo",
    type: "Temps plein",
  },
  {
    title: "Administrateur Système et Réseaux",
    company: "CFI-CIRAS",
    location: "Pointe-Noire, Congo",
    type: "Temps plein",
  },
  {
    title: "Chargé de Communication Digitale",
    company: "CFI-CIRAS",
    location: "À distance",
    type: "Contrat",
  },
  {
    title: "Analyste Financier",
    company: "CFI-CIRAS",
    location: "Brazzaville, Congo",
    type: "Temps plein",
  },
  {
    title: "Assistant Administratif",
    company: "CFI-CIRAS",
    location: "Pointe-Noire, Congo",
    type: "Temps partiel",
  },
  {
    title: "Formateur en Cybersécurité",
    company: "CFI-CIRAS",
    location: "Brazzaville, Congo",
    type: "Contrat",
  },
];

export default function FeaturedJobs() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 text-center">
        {/* Titre */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Offres d’emploi en vedette
        </h2>
        <p className="text-gray-600 mb-12">
          Découvrez les meilleures opportunités sélectionnées pour vous au CFI-CIRAS.
        </p>

        {/* Grille des offres d'emploi */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md border p-6 flex flex-col text-left hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {job.title}
              </h3>
              <p className="text-gray-600 mb-4">{job.company}</p>

              <div className="flex items-center text-gray-500 text-sm mb-2">
                <MapPin size={16} className="mr-2" />
                {job.location}
              </div>

              <div className="flex items-center text-gray-500 text-sm mb-4">
                <Briefcase size={16} className="mr-2" />
                {job.type}
              </div>

              <Button className="w-full bg-green-600 hover:bg-orange-700 text-white">
                Postuler maintenant
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
