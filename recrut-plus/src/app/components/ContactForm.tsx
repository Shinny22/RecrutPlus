"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    nom: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici tu pourrais envoyer via fetch("/api/contact", { method:"POST", body: JSON.stringify(form) })
    console.log("Message envoyé :", form);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        {/* Titre */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-green-800">Nous contacter</h2>
          <p className="text-gray-600 mt-2">
            Vous avez une question ? Envoyez-nous un message, notre équipe vous répondra rapidement.
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 max-w-2xl mx-auto">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                <input
                  type="text"
                  name="nom"
                  value={form.nom}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600"
                  placeholder="Votre message..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 rounded-lg bg-green-700 text-white font-medium hover:bg-green-800 transition shadow-sm"
              >
                Envoyer
              </button>
            </form>
          ) : (
            <div className="text-center text-green-700 font-medium">
              ✅ Merci pour votre message ! Nous vous répondrons sous peu.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
