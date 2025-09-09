import { Briefcase, Users, Globe } from "lucide-react";

export default function WhyChooseUs() {
  const avantages = [
    {
      icon: <Briefcase className="w-8 h-8 text-orange-600" />,
      title: "Offres variées",
      desc: "Des opportunités dans différents secteurs et pour tous les niveaux.",
    },
    {
      icon: <Users className="w-8 h-8 text-orange-600" />,
      title: "Communauté active",
      desc: "Un réseau grandissant de recruteurs et de candidats.",
    },
    {
      icon: <Globe className="w-8 h-8 text-orange-600" />,
      title: "Accès global",
      desc: "Postulez où que vous soyez, à tout moment.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Pourquoi nous choisir ?</h2>
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
