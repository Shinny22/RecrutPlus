// // /components/FeaturedJobs.tsx
// import { MapPin, Briefcase } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const jobs = [
//   {
//     title: "Développeur Fullstack",
//     company: "CFI-CIRAS",
//     location: "Brazzaville, Congo",
//     type: "Temps plein",
//   },
//   {
//     title: "Administrateur Système et Réseaux",
//     company: "CFI-CIRAS",
//     location: "Pointe-Noire, Congo",
//     type: "Temps plein",
//   },
//   {
//     title: "Chargé de Communication Digitale",
//     company: "CFI-CIRAS",
//     location: "À distance",
//     type: "Contrat",
//   },
//   {
//     title: "Analyste Financier",
//     company: "CFI-CIRAS",
//     location: "Brazzaville, Congo",
//     type: "Temps plein",
//   },
//   {
//     title: "Assistant Administratif",
//     company: "CFI-CIRAS",
//     location: "Pointe-Noire, Congo",
//     type: "Temps partiel",
//   },
//   {
//     title: "Formateur en Cybersécurité",
//     company: "CFI-CIRAS",
//     location: "Brazzaville, Congo",
//     type: "Contrat",
//   },
// ];

// export default function FeaturedJobs() {
//   return (
//     <section className="py-20">
//       <div className="container mx-auto px-6 text-center">
//         {/* Titre */}
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//           Offres d’emploi en vedette
//         </h2>
//         <p className="text-gray-600 mb-12">
//           Découvrez les meilleures opportunités sélectionnées pour vous au CFI-CIRAS.
//         </p>

//         {/* Grille des offres d'emploi */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {jobs.map((job, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-2xl shadow-md border p-6 flex flex-col text-left hover:shadow-xl transition"
//             >
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                 {job.title}
//               </h3>
//               <p className="text-gray-600 mb-4">{job.company}</p>

//               <div className="flex items-center text-gray-500 text-sm mb-2">
//                 <MapPin size={16} className="mr-2" />
//                 {job.location}
//               </div>

//               <div className="flex items-center text-gray-500 text-sm mb-4">
//                 <Briefcase size={16} className="mr-2" />
//                 {job.type}
//               </div>

//               <Button className="w-full bg-green-600 hover:bg-orange-700 text-white">
//                 Postuler maintenant
//               </Button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }




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
    <section className="py-20 bg-gray-70">
      <div className="container mx-auto px-6 text-center">
        {/* Titre principal */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Offres d’emploi en vedette
        </h2>
        <p className="text-gray-700 mb-12 max-w-2xl mx-auto">
          Découvrez les meilleures opportunités sélectionnées pour vous au <span className="font-semibold text-green-700">CFI-CIRAS</span>.  
          Donnez un élan à votre carrière dès aujourd’hui.
        </p>

        {/* Grille des offres */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="group relative bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden p-6 text-left"
            >
              {/* Accent coloré au survol */}
              <div className="absolute top-0 left-0 w-0 h-1 bg-gradient-to-r from-green-600  group-hover:w-full transition-all duration-500"></div>

              {/* Contenu */}
              <div className="pt-2 pb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-green-700 transition">
                  {job.title}
                </h3>
                <p className="text-gray-500 mb-4">{job.company}</p>

                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <MapPin size={16} className="mr-2 text-green-600" />
                  {job.location}
                </div>

                <div className="flex items-center text-gray-600 text-sm mb-6">
                  <Briefcase size={16} className="mr-2 text-yellow-600" />
                  {job.type}
                </div>

                {/* Bouton animé */}
                <Button
                  className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-300 transform group-hover:scale-[1.03] hover:bg-green-800"
                >
                  Postuler maintenant
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
