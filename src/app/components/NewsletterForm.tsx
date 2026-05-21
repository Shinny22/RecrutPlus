"use client";

import { useState } from "react";
import axios from "axios";
import { Send } from "lucide-react";
import { toast } from "sonner";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNewsletterSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error("Veuillez entrer votre adresse email.");
      return;
    }

    try {
      setLoading(true);
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://recrutplus-back.onrender.com";
      const response = await axios.post(`${API_BASE}/candidat/newsletter/`, { email });

      if (response.status === 201) {
        toast.success(response.data.message || "Abonnement réussi.");
        setIsSubscribed(true);
      } else if (response.status === 200 && response.data.alert) {
        toast.info("Vous êtes déjà inscrit à la newsletter.");
      }

      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    } catch (error) {
      console.error("Erreur newsletter:", error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.error || "Échec de l’inscription à la newsletter.");
      } else {
        toast.error("Une erreur inattendue est survenue.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/20 bg-white/8 p-6 backdrop-blur-sm">
      <h3 className="text-xl font-semibold text-white">Newsletter</h3>
      <p className="mt-1 text-sm text-emerald-50/90">
        Recevez les nouvelles offres et annonces importantes.
      </p>

      <form onSubmit={handleNewsletterSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Votre adresse email"
          className="h-11 w-full rounded-xl border border-white/30 bg-white/12 px-4 text-sm text-white placeholder:text-emerald-50/70 focus:border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-200/40"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white bg-white px-5 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50 disabled:opacity-70"
        >
          <Send size={15} />
          {loading ? "Envoi..." : "S’abonner"}
        </button>
      </form>

      {isSubscribed && (
        <p className="mt-3 rounded-lg bg-emerald-500/25 px-3 py-2 text-xs text-emerald-50">
          Merci. Votre inscription à la newsletter est confirmée.
        </p>
      )}
    </div>
  );
}
