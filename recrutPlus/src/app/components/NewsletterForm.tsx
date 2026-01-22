// "use client";

// import { useState } from "react";
// import { Send } from "lucide-react";
// import axios from "axios";
// import { toast } from "sonner";

// export default function NewsletterForm() {
//   const [email, setEmail] = useState("");
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleNewsletterSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!email) {
//       toast.error("Veuillez entrer votre adresse email.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await axios.post("http://127.0.0.1:8000/candidat/newsletter/", { email });

//       // Nouveau abonné
//       if (res.status === 201) {
//         toast.success(res.data.message || "Abonnement réussie !");
//         setIsSubscribed(true);
//       }
//       // Déjà inscrit
//       else if (res.status === 200 && res.data.alert) {
//         toast.info("Vous êtes déjà inscrit à la newsletter.", {
//           description: res.data.alert,
//         });
//       }

//       setEmail("");

//       // Reset notification après 3 secondes
//       setTimeout(() => setIsSubscribed(false), 3000);

//     } catch (error) {
//       console.error("Erreur Newsletter:", error);
//       if (axios.isAxiosError(error) && error.response) {
//         toast.error(error.response.data.error || "Échec de l’inscription à la newsletter.");
//       } else {
//         toast.error("Une erreur inattendue est survenue.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-full mx-auto px-6 mt-16  text-center bg-gray-600/25 p-10 rounded-lg w-full">
//       <h3 className="text-xl font-semibold text-white mb-4">Newsletter</h3>
//       <p className="text-sm mb-4">
//         Restez informé des dernières offres d'emploi et formations disponibles.
//       </p>

//       <form onSubmit={handleNewsletterSubmit} className="flex p-6  ml-60 space-x-3">
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Votre adresse email"
//           className="w-md px-4 py-2 bg-gray-800 border border-green-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
//           required
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-[1/2] bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition duration-200 font-medium disabled:opacity-70"
//         >
//           <Send size={16} />
//           {loading ? "Envoi..." : "S'abonner"}
//         </button>
//       </form>

//       {isSubscribed && (
//         <div className="mt-3 p-2 bg-green-600 text-white text-sm rounded-lg text-center">
//           ✓ Vous êtes abonné à la newsletter ! Consultez votre boîte mail.
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Veuillez entrer votre adresse email.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://127.0.0.1:8000/candidat/newsletter/", { email });

      if (res.status === 201) {
        toast.success(res.data.message || "Abonnement réussi !");
        setIsSubscribed(true);
      } else if (res.status === 200 && res.data.alert) {
        toast.info("Vous êtes déjà inscrit à la newsletter.", {
          description: res.data.alert,
        });
      }

      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    } catch (error) {
      console.error("Erreur Newsletter:", error);
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
    <div className="max-w-4xl mx-auto px-6 mt-16 text-center bg-gray-600/25 p-8 rounded-lg w-full">
      <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">Newsletter</h3>
      <p className="text-sm md:text-base mb-6 text-white/90">
        Restez informé des dernières offres d'emploi et formations disponibles.
      </p>

      <form
        onSubmit={handleNewsletterSubmit}
        className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre adresse email"
          className="w-full sm:flex-1 px-4 py-3 bg-gray-800 border border-green-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition duration-200 font-medium disabled:opacity-70"
        >
          <Send size={16} />
          {loading ? "Envoi..." : "S'abonner"}
        </button>
      </form>

      {isSubscribed && (
        <div className="mt-4 p-3 bg-green-600 text-white text-sm rounded-lg text-center animate-fadeIn">
          ✓ Vous êtes abonné à la newsletter ! Consultez votre boîte mail.
        </div>
      )}
    </div>
  );
}
