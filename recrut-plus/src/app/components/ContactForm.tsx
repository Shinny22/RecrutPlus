"use client";

import { useState } from "react";
import { User, Mail, MessageCircle } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

export default function ContactForm() {
  const [form, setForm] = useState({ nom: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.nom || !form.email || !form.message) {
      toast.error("Tous les champs sont requis.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://127.0.0.1:8000/api/contact-messages/", form);
      
      if (res.status === 201 || res.status === 200) {
        toast.success("✅ Message envoyé avec succès !");
        setSubmitted(true);
        setForm({ nom: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Erreur envoi message:", error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.error || "Échec de l’envoi du message.");
      } else {
        toast.error("Une erreur inattendue est survenue.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-800">Contactez-nous</h2>
          <p className="text-gray-600 mt-2 text-lg">
            Une question ? Notre équipe vous répondra rapidement.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-2xl mx-auto">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                <User className="absolute top-10 left-3 text-gray-400" size={20} />
                <input
                  type="text"
                  name="nom"
                  value={form.nom}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition"
                  placeholder="Votre nom"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Mail className="absolute top-10 left-3 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition"
                  placeholder="votre@email.com"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <MessageCircle className="absolute top-10 left-3 text-gray-400" size={20} />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition"
                  placeholder="Votre message..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 rounded-xl bg-green-700 text-white font-semibold hover:bg-green-800 hover:shadow-lg transition-transform transform hover:-translate-y-1 disabled:opacity-70"
              >
                {loading ? "Envoi..." : "Envoyer"}
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
