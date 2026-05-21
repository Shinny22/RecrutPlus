"use client";

import { useCallback, useMemo, useState, type ReactNode } from "react";
import axios from "axios";
import { Mail, MessageCircle, User } from "lucide-react";
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

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://recrutplus-back.onrender.com";
const CONTACT_MESSAGE_ENDPOINT = `${API_BASE}/api/contact-message/`;

export default function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setValues((previousValues) => ({ ...previousValues, [name]: value }));
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
          toast.success("Message envoyé avec succès.");
          setHasSubmitted(true);
          resetForm();
          return;
        }
        toast.error("Échec de l’envoi du message.");
      } catch (error) {
        console.error("Erreur envoi message:", error);
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.error ?? "Échec de l’envoi du message.");
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
    <section id="contact" className="relative">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <span className="section-kicker">Contact</span>
            <h2 className="section-title">Parlons de votre projet professionnel</h2>
            <p className="mt-4 max-w-xl text-slate-600">
              Une question sur les offres, le processus de candidature ou les conditions
              d’inscription ? Notre équipe vous répond rapidement.
            </p>

            <ul className="mt-7 space-y-2 text-sm text-slate-700 sm:text-base">
              <li>Adresse: Immeuble CFI-CIRAS, rue Lamothe, B.P. 1542, Brazzaville</li>
              <li>Téléphone: +242 06 403 85 36</li>
              <li>Email: contact@cfi-ciras.cg</li>
            </ul>
          </div>

          <div className="surface-card">
            {!hasSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormField
                  icon={<User className="h-5 w-5 text-emerald-700/80" />}
                  control={
                    <input
                      type="text"
                      name="nom"
                      value={nom}
                      onChange={handleChange}
                      placeholder="Votre nom complet"
                      required
                      className="input-shell pl-11"
                    />
                  }
                />

                <FormField
                  icon={<Mail className="h-5 w-5 text-emerald-700/80" />}
                  control={
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      placeholder="votre@email.com"
                      required
                      className="input-shell pl-11"
                    />
                  }
                />

                <FormField
                  icon={<MessageCircle className="h-5 w-5 text-emerald-700/80" />}
                  control={
                    <textarea
                      name="message"
                      value={message}
                      onChange={handleChange}
                      placeholder="Votre message..."
                      rows={5}
                      required
                      className="input-shell resize-none pl-11"
                    />
                  }
                />

                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="brand-btn w-full justify-center disabled:opacity-70"
                >
                  {isSubmitting ? "Envoi..." : "Envoyer le message"}
                </button>
              </form>
            ) : (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center text-emerald-800">
                Merci pour votre message. Nous revenons vers vous rapidement.
              </div>
            )}
          </div>
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
      <span className="pointer-events-none absolute left-3 top-3">{icon}</span>
      {control}
    </div>
  );
}
