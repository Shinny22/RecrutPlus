import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <section className="relative py-20   text-white text-center"  style={{
      backgroundImage: "url('/images/cfi_image.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <div className="absolute inset-0 bg-black/25 blur-lg" />
      <h2 className="text-3xl font-bold mb-6">Prêt à booster votre carrière ?</h2>
      <p className="mb-8">Inscrivez-vous dès aujourd’hui et trouvez l’opportunité qui vous correspond.</p>
      <Button size="lg" className="bg-white text-green-700 hover:bg-green-800 hover:text-white font-semibold">
        S’inscrire maintenant
      </Button>
    </section>
  );
}
