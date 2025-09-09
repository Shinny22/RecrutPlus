import { Card, CardContent } from "@/components/ui/card";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Jean M.",
      role: "Développeur embauché",
      message: "Grâce à ce site, j’ai trouvé un emploi en moins d’un mois !",
    },
    {
      name: "Aline K.",
      role: "Recruteuse",
      message: "Un vivier de talents incroyable, j’ai trouvé plusieurs profils adaptés.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Témoignages</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <Card key={i} className="p-6 shadow rounded-2xl">
              <CardContent>
                <p className="italic text-gray-600 mb-4">“{t.message}”</p>
                <h4 className="font-semibold">{t.name}</h4>
                <span className="text-sm text-gray-500">{t.role}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
