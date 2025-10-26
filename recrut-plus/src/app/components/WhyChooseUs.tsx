// import { Briefcase, Users, Globe } from "lucide-react";

// export default function WhyChooseUs() {
//   const avantages = [
//     {
//       icon: <Briefcase className="w-8 h-8 text-orange-600" />,
//       title: "Offres variées",
//       desc: "Des opportunités dans différents secteurs et pour tous les niveaux.",
//     },
//     {
//       icon: <Users className="w-8 h-8 text-orange-600" />,
//       title: "Communauté active",
//       desc: "Un réseau grandissant de recruteurs et de candidats.",
//     },
//     {
//       icon: <Globe className="w-8 h-8 text-orange-600" />,
//       title: "Accès global",
//       desc: "Postulez où que vous soyez, à tout moment.",
//     },
//   ];

//   return (
//     <section className="py-20 bg-white">
//       <div className="max-w-6xl mx-auto px-6 text-center">
//         <h2 className="text-3xl font-bold mb-12">Pourquoi nous choisir ?</h2>
//         <div className="grid md:grid-cols-3 gap-10">
//           {avantages.map((item, i) => (
//             <div key={i} className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
//               <div className="flex justify-center mb-4">{item.icon}</div>
//               <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
//               <p className="text-gray-600">{item.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



import { Briefcase, Users, Globe } from "lucide-react";

export default function WhyJoinUs() {
  const avantages = [
    {
      icon: <Briefcase className="w-8 h-8 text-green-600" />,
      title: "Environnement professionnel stimulant",
      desc: "Rejoignez un cadre de travail motivant avec des équipes expérimentées et un suivi personnalisé pour votre réussite.",
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Collaboration et esprit d’équipe",
      desc: "Travaillez avec des collègues passionnés et profitez d’un réseau actif de mentors et de professionnels pour enrichir votre parcours.",
    },
    {
      icon: <Globe className="w-8 h-8 text-green-600" />,
      title: "Flexibilité et accessibilité",
      desc: "Accédez à nos programmes et opportunités depuis n’importe où et bénéficiez d’une organisation qui s’adapte à vos besoins.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Pourquoi nous rejoindre ?</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {avantages.map((item, i) => (
            <div key={i} className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
