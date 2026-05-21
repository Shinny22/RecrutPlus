"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const handleConsent = async (choice: "accept" | "reject") => {
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://recrutplus-back.onrender.com";
      await fetch(`${API_BASE}/set-cookie-consent/`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `consent=${choice}`,
      });
      Cookies.set("cookie_consent", choice, { expires: 365 });
      setVisible(false);
    } catch (error) {
      console.error("Erreur d’enregistrement du consentement", error);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-[60] px-3 sm:px-6">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 rounded-2xl border border-emerald-200 bg-white/95 p-4 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-700">
          Nous utilisons des cookies pour améliorer votre expérience.
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => handleConsent("accept")}
            className="brand-btn px-4 py-2 text-sm"
          >
            Tout accepter
          </button>
          <button
            onClick={() => handleConsent("reject")}
            className="brand-btn-secondary px-4 py-2 text-sm"
          >
            Tout refuser
          </button>
        </div>
      </div>
    </div>
  );
}
