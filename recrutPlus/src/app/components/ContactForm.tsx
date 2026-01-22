"use client";

import { useCallback, useMemo, useState, type ReactNode } from "react";
import { Mail, MessageCircle, User } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

type ContactFormValues = {
  nom: string;
  email: string;
  message: string;
};

const INITIAL_VALUES: ContactFormValues = {
  nom: "",
  email: "",
  message: "",
};

const CONTACT_MESSAGE_ENDPOINT = "http://127.0.0.1:8000/api/contact-message/";

export default function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;

      setValues((previousValues) => ({
        ...previousValues,
        [name]: value,
      }));
    },
    []
  );

  const resetForm = useCallback(() => {
    setValues(INITIAL_VALUES);
  }, []);

  const isFormValid = useMemo(() => {
    const { nom, email, message } = values;

    return Boolean(nom.trim() && email.trim() && message.trim());
  }, [values]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!isFormValid) {
        toast.error("Tous les champs sont requis.");
        return;
      }

      setIsSubmitting(true);

      try {
        const response = await axios.post(CONTACT_MESSAGE_ENDPOINT, values);

        if (response.status >= 200 && response.status < 300) {
          toast.success("✅ Message envoyé avec succès !");
          setHasSubmitted(true);
          resetForm();
          return;
        }

        toast.error("Échec de l’envoi du message.");
      } catch (error) {
        console.error("Erreur envoi message:", error);

        if (axios.isAxiosError(error)) {
          const errorMessage =
            error.response?.data?.error ?? "Échec de l’envoi du message.";

          toast.error(errorMessage);
          return;
        }

        toast.error("Une erreur inattendue est survenue.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [isFormValid, resetForm, values]
  );

  const { nom, email, message } = values;

  return (
    <section id="contact" className="relative py-16 bg-gray-100 overflow-hidden">
      <div className="absolute inset-0 bg-bottom bg-no-repeat bg-cover opacity-20 pointer-events-none" style={{ backgroundImage: "url('/images/cfi_image.jpg')" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 flex flex-col lg:flex-row items-start gap-12">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-4">
            Contactez-nous
          </h2>
          <p className="text-gray-600 mb-6 text-base sm:text-lg">
            Une question ? Notre équipe est là pour vous répondre rapidement et
            vous accompagner dans votre parcours.
          </p>
          <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
            <li>
              📍 Adresse : Immeuble CFI-CIRAS, rue Lamothe, B.P. 1542,
              Brazzaville
            </li>
            <li>📞 Téléphone : +242 06 403 85 36</li>
            <li>✉️ Email : contact@cfi-ciras.cg</li>
          </ul>
        </div>

        <div className="lg:w-1/2 w-full bg-white/90 backdrop-blur rounded-2xl p-6 sm:p-10 shadow-lg">
          {!hasSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <FormField
                icon={<User className="text-gray-400" size={20} />}
                control={
                  <input
                    type="text"
                    name="nom"
                    value={nom}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    required
                    className="w-full pl-10 pr-4 py-2 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition"
                  />
                }
              />

              <FormField
                icon={<Mail className="text-gray-400" size={20} />}
                control={
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    required
                    className="w-full pl-10 pr-4 py-2 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition"
                  />
                }
              />

              <FormField
                icon={<MessageCircle className="text-gray-400" size={20} />}
                control={
                  <textarea
                    name="message"
                    value={message}
                    onChange={handleChange}
                    placeholder="Votre message..."
                    rows={5}
                    required
                    className="w-full pl-10 pr-4 py-2 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition resize-none"
                  />
                }
              />

              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="w-full py-3 px-6 rounded-xl bg-green-700 text-white font-semibold hover:bg-green-800 hover:shadow-lg transition-transform transform hover:-translate-y-1 disabled:opacity-70"
              >
                {isSubmitting ? "Envoi..." : "Envoyer"}
              </button>
            </form>
          ) : (
            <div className="text-center text-green-700 font-semibold text-lg animate-fadeIn">
              ✅ Merci pour votre message ! Nous reviendrons vers vous rapidement.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

type FormFieldProps = {
  icon: ReactNode;
  control: ReactNode;
};

function FormField({ icon, control }: FormFieldProps) {
  return (
    <div className="relative">
      <span className="absolute top-3 left-3">{icon}</span>
      {control}
    </div>
  );
}
 
