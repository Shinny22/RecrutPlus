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
    <div className="fixed bottom-0 w-full bg-gray-100 border-t border-gray-300 p-4 text-center shadow-md z-50">
      <p className="text-sm mb-2">
        Nous utilisons des cookies pour améliorer votre expérience. Vous pouvez
        accepter ou refuser leur utilisation.
      </p>
      <div className="flex justify-center gap-3">
        <button
          onClick={() => handleConsent("accept")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Tout accepter
        </button>
        <button
          onClick={() => handleConsent("reject")}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Tout refuser
        </button>
      </div>
    </div>
  );
}
