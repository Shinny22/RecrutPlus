
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Menu, X, ChevronDown } from "lucide-react";

// // Importer les vrais formulaires
// import LoginForm from "./LoginForm";
// import RegisterForm from "./RegisterForm";

// type User = {
//   name: string;
//   role?: string;
//   avatar?: string;
// };

// export default function Navbar({ user }: { user?: User | null }) {
//   const [open, setOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);

//   // states pour modals
//   const [showLogin, setShowLogin] = useState(false);
//   const [showRegister, setShowRegister] = useState(false);

//   return (
//     <header className="w-full bg-white/90 backdrop-blur-sm ring-1 ring-black/5 fixed top-0 z-50">
//       <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Left: Brand */}
//           <Link href="/" className="flex items-center gap-3">
//             <div className="relative w-10 h-10 rounded-md overflow-hidden bg-orange-600 flex items-center justify-center">
//               <span className="text-white font-bold">CR</span>
//             </div>
//             <span className="text-lg font-semibold text-gray-900">CFI-Recrute</span>
//           </Link>

//           {/* Middle: Links */}
//           <div className="hidden md:flex md:items-center md:space-x-6">
//             <Link href="/Offres" className="text-gray-700 hover:text-orange-600 transition">
//               Offres
//             </Link>
//             <Link href="/Consulter" className="text-gray-700 hover:text-orange-600 transition">
//               Postuler
//             </Link>
//             <Link href="/entreprise/contact" className="text-gray-700 hover:text-orange-600 transition">
//               Contact
//             </Link>
//           </div>

//           {/* Right: Auth buttons / profile */}
//           <div className="flex items-center gap-3">
//             {!user ? (
//               <>
//                 <button
//                   onClick={() => setShowRegister(true)}
//                   className="hidden sm:inline-block px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition"
//                 >
//                   Créer un compte
//                 </button>
//                 <button
//                   onClick={() => setShowLogin(true)}
//                   className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold bg-orange-600 text-white hover:bg-orange-700 transition"
//                 >
//                   Se connecter
//                 </button>
//               </>
//             ) : (
//               <div className="relative">
//                 <button
//                   onClick={() => setProfileOpen((s) => !s)}
//                   className="inline-flex items-center gap-2 px-3 py-2 rounded-lg ring-1 ring-black/5 hover:shadow-sm transition"
//                 >
//                   {user.avatar ? (
//                     <Image src={user.avatar} alt={user.name} width={32} height={32} className="rounded-full" />
//                   ) : (
//                     <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-700">
//                       {user.name.charAt(0).toUpperCase()}
//                     </div>
//                   )}
//                   <span className="text-sm font-medium text-gray-800 hidden sm:inline">{user.name}</span>
//                   <ChevronDown size={16} className="text-gray-600" />
//                 </button>

//                 {profileOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black/5 z-20">
//                     <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
//                       Mon profil
//                     </Link>
//                     <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
//                       Espace admin
//                     </Link>
//                     <Link href="/deconnexion" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
//                       Se déconnecter
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Mobile menu button */}
//             <button
//               className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
//               onClick={() => setOpen((v) => !v)}
//             >
//               {open ? <X size={20} /> : <Menu size={20} />}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile panel */}
//       {open && (
//         <div className="md:hidden bg-white/95 border-t ring-1 ring-black/5">
//           <div className="px-4 py-4 space-y-2">
//             <Link href="/Offres" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
//               Offres
//             </Link>
//             <Link href="/entreprise/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
//               Contact
//             </Link>

//             {!user ? (
//               <>
//                 <button
//                   onClick={() => {
//                     setOpen(false);
//                     setShowRegister(true);
//                   }}
//                   className="block w-full px-3 py-2 text-base text-gray-700 hover:bg-gray-50 text-left"
//                 >
//                   Créer un compte
//                 </button>
//                 <button
//                   onClick={() => {
//                     setOpen(false);
//                     setShowLogin(true);
//                   }}
//                   className="block w-full px-3 py-2 font-semibold bg-orange-600 text-white rounded-lg text-center"
//                 >
//                   Se connecter
//                 </button>
//               </>
//             ) : (
//               <div className="border-t pt-3">
//                 <Link href="/profile" className="block px-3 py-2 text-base text-gray-700 hover:bg-gray-50">
//                   Mon profil
//                 </Link>
//                 <Link href="/deconnexion" className="block px-3 py-2 text-base text-gray-700 hover:bg-gray-50">
//                   Se déconnecter
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* --- Modals --- */}
//       {showLogin && (
//         <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50">
//           <div className="relative w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl animate-[fadeIn_0.3s_ease-out]">
//             <button
//               onClick={() => setShowLogin(false)}
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
//             >
//               <X size={20} />
//             </button>
//             {/* Utilisation du formulaire connecté à l’API */}
//             <LoginForm />
//           </div>
//         </div>
//       )}

//       {showRegister && (
//         <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50">
//           <div className="relative w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl animate-[fadeIn_0.3s_ease-out]">
//             <button
//               onClick={() => setShowRegister(false)}
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
//             >
//               <X size={20} />
//             </button>
//             {/* Utilisation du formulaire connecté à l’API */}
//             <RegisterForm />
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }




"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

// Importer tes vrais formulaires
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

type User = {
  name: string;
  role?: string;
  avatar?: string;
};

export default function Navbar({ user }: { user?: User | null }) {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <header className="w-full fixed top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* --- Left: Logo --- */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-green-700 flex items-center justify-center shadow-md transition group-hover:scale-105">
              <span className="text-white font-bold tracking-wide">CFI</span>
            </div>
            <span className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition">
              CFI-Recrute
            </span>
          </Link>

          {/* --- Middle: Links (desktop) --- */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              href="/Offres"
              className="text-gray-700 hover:text-green-700 font-medium transition"
            >
              Offres
            </Link>
            <Link
              href="/Consulter"
              className="text-gray-700 hover:text-green-700 font-medium transition"
            >
              Postuler
            </Link>
            <Link
              href="/entreprise/contact"
              className="text-gray-700 hover:text-green-700 font-medium transition"
            >
              Contact
            </Link>
          </div>

          {/* --- Right: Auth / Profile --- */}
          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <button
                  onClick={() => setShowRegister(true)}
                  className="hidden sm:inline-block px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-green-700 hover:bg-gray-100 transition"
                >
                  Créer un compte
                </button>
                <button
                  onClick={() => setShowLogin(true)}
                  className="inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-green-700 text-white hover:bg-orange-600 shadow-sm transition"
                >
                  Se connecter
                </button>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen((s) => !s)}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:shadow-md transition"
                >
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-sm font-bold text-green-700">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-800 hidden sm:inline">
                    {user.name}
                  </span>
                  <ChevronDown size={16} className="text-gray-600" />
                </button>

                {/* Dropdown profile */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 z-20 overflow-hidden animate-[fadeIn_0.2s_ease-out]">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Mon profil
                    </Link>
                    <Link
                      href="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Espace admin
                    </Link>
                    <Link
                      href="/deconnexion"
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Se déconnecter
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Bouton mobile */}
            <button
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- Mobile menu --- */}
      {open && (
        <div className="md:hidden bg-white/95 border-t border-gray-100">
          <div className="px-4 py-4 space-y-2">
            <Link
              href="/Offres"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50"
            >
              Offres
            </Link>
            <Link
              href="/Consulter"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50"
            >
              Postuler
            </Link>
            <Link
              href="/entreprise/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50"
            >
              Contact
            </Link>

            {!user ? (
              <>
                <button
                  onClick={() => {
                    setOpen(false);
                    setShowRegister(true);
                  }}
                  className="block w-full px-3 py-2 text-base text-gray-700 hover:text-green-700 hover:bg-gray-50 text-left"
                >
                  Créer un compte
                </button>
                <button
                  onClick={() => {
                    setOpen(false);
                    setShowLogin(true);
                  }}
                  className="block w-full px-3 py-2 font-semibold bg-green-700 text-white rounded-lg text-center hover:bg-orange-600 transition"
                >
                  Se connecter
                </button>
              </>
            ) : (
              <div className="border-t pt-3">
                <Link
                  href="/profile"
                  className="block px-3 py-2 text-base text-gray-700 hover:bg-gray-50"
                >
                  Mon profil
                </Link>
                <Link
                  href="/deconnexion"
                  className="block px-3 py-2 text-base text-red-600 hover:bg-red-50"
                >
                  Se déconnecter
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- Modals --- */}
      {showLogin && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl animate-[fadeIn_0.3s_ease-out]">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>
            <LoginForm />
          </div>
        </div>
      )}

      {showRegister && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl animate-[fadeIn_0.3s_ease-out]">
            <button
              onClick={() => setShowRegister(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>
            <RegisterForm />
          </div>
        </div>
      )}
    </header>
  );
}
