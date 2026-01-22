"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://recrutplus-back.onrender.com";

export default function LogoutButton() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      const access = localStorage.getItem("accessToken");
      const refresh = localStorage.getItem("refreshToken");

      if (access && refresh) {
        await fetch(`${API_BASE}/logout/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
          body: JSON.stringify({ refresh }),
        });
      }
    } catch (error) {
      console.error("Erreur logout :", error);
    } finally {
      // 🔥 Sécurité maximale
      localStorage.clear();
      window.location.href = "/Login";
    }
  };

  return (
    <>
      {/* 🔘 Bouton */}
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition"
      >
        <LogOut className="w-4 h-4" />
        Déconnexion
      </button>

      {/* 🧊 Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Se déconnecter
            </h3>

            <p className="text-sm text-gray-600 mb-6">
              Voulez-vous vraiment vous déconnecter de votre espace ?
            </p>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowModal(false)}
                disabled={loading}
              >
                Annuler
              </Button>

              <Button
                variant="destructive"
                onClick={handleLogout}
                disabled={loading}
              >
                {loading ? "Déconnexion..." : "Se déconnecter"}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
