import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <section className="py-20 bg-orange-600 text-white text-center">
      <h2 className="text-3xl font-bold mb-6">Prêt à booster votre carrière ?</h2>
      <p className="mb-8">Inscrivez-vous dès aujourd’hui et trouvez l’opportunité qui vous correspond.</p>
      <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 font-semibold">
        S’inscrire maintenant
      </Button>
    </section>
  );
}
