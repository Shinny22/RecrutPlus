// "use client";
// import { useState } from "react";

import AboutSection from "./components/AboutSection";
import CallToAction from "./components/CallToAction";
import Companies from "./components/Companies";
import FeaturedJobs from "./components/FeaturedJobs";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import JobCategories from "./components/JobCategories";
import Navbar from "./components/NavBar";
import Testimonials from "./components/Testimonials";
import WhyChooseUs from "./components/WhyChooseUs";

// export default function AdminLogin() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     const res = await fetch("http://127.0.0.1:8000/api/auth/login/", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, password }),
//     });

//     if (res.ok) {
//       const data = await res.json();
//       localStorage.setItem("access", data.access);
//       localStorage.setItem("refresh", data.refresh);
//       alert("Connexion réussie !");
//     } else {
//       alert("Identifiants invalides");
//     }
//   };

//   return (
//     <div className="p-4 w-96 mx-auto">
//       <h2 className="text-xl font-bold mb-2">Admin Login</h2>
//       <input
//         type="text"
//         placeholder="Nom d'utilisateur"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         className="border p-2 w-full mb-2"
//       />
//       <input
//         type="password"
//         placeholder="Mot de passe"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="border p-2 w-full mb-2"
//       />
//       <button
//         onClick={handleLogin}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Se connecter
//       </button>
//     </div>
//   );
// }




export default function Home() {
  return (
    <main>
      <Navbar/>
      <HeroSection />
      <HowItWorks />
      <JobCategories />
      <FeaturedJobs />
      <AboutSection />
      <WhyChooseUs />
      <Companies />
      <Testimonials />
      <CallToAction />
      <Footer />

    </main>
  );
}
