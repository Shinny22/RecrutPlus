

// // /components/HeroSection.tsx
// "use client";

// import { Search } from "lucide-react";
// import Image from "next/image";
// import { useKeenSlider } from "keen-slider/react";

// const images = [
//   { src: "/images/femme_cadre.png", alt: "Femme cadre" },
//   { src: "/images/Teamwork.jpg", alt: "Travail d'équipe" },   // <— attention à la casse
//   { src: "/images/office.jpg", alt: "Bureau" },
//   { src: "/images/success.jpg", alt: "Succès" },
// ];

// // Plugin autoplay recommandé (propre et fiable)
// function Autoplay(slider: any) {
//   let timeout: NodeJS.Timeout;
//   let mouseOver = false;

//   function clearNextTimeout() {
//     clearTimeout(timeout);
//   }
//   function nextTimeout() {
//     clearTimeout(timeout);
//     if (mouseOver) return;
//     timeout = setTimeout(() => slider.next(), 3000);
//   }

//   slider.on("created", () => {
//     slider.container.addEventListener("mouseover", () => {
//       mouseOver = true;
//       clearNextTimeout();
//     });
//     slider.container.addEventListener("mouseout", () => {
//       mouseOver = false;
//       nextTimeout();
//     });
//     nextTimeout();
//   });
//   slider.on("dragStarted", clearNextTimeout);
//   slider.on("animationEnded", nextTimeout);
//   slider.on("updated", nextTimeout);
// }

// export default function HeroSection() {
//   const [sliderRef] = useKeenSlider<HTMLDivElement>(
//     {
//       loop: true,
//       duration: 300,
//       renderMode: "performance",
//       slides: { perView: 1 },
//       drag: false,
//     },
//     [Autoplay] // <— plugin branché ici
//   );

//   return (
//     <section className="bg-green-50 py-16">
//       <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
//         {/* CONTENU GAUCHE */}
//         <div className="space-y-6">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
//             CFI-Recrute <br />
//             <span className="text-orange-600">Plateforme de recrutement du CFI-CIRAS</span>
//           </h1>
//           <p className="text-gray-600">
//              Plateforme de recrutement du centre de formation en informatique du Centre d'information et de recherche de l'armée et de la sécurité
//           </p>

//           {/* BARRE DE RECHERCHE */}
//           <div className="flex items-center bg-white shadow-lg rounded-xl p-2 w-full max-w-lg ring-1 ring-black/5">
//             <input
//               type="text"
//               placeholder="Rechercher un titre de poste ou un mot-clé"
//               className="flex-grow px-4 py-2 outline-none rounded-l-xl"
//             />
//             <button className="bg-green-800 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-orange-700">
//               <Search size={18} />
//               Rechercher
//             </button>
//           </div>
//         </div>

//         {/* CARROUSEL D'IMAGES DROIT */}
//         <div className="flex justify-center">
//           <div
//             ref={sliderRef}
//             className="keen-slider w-full max-w-md md:max-w-lg rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5"
//           >
//             {images.map((img, i) => (
//               <div key={i} className="keen-slider__slide relative">
//                 {/* Aspect ratio propre pour éviter le “saut” de layout */}
//                 <div className="relative w-full aspect-[4/3]">
//                   <Image
//                     src={img.src}
//                     alt={img.alt}
//                     fill
//                     className="object-cover"
//                     priority={i === 0}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }




// /components/HeroSection.tsx
"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import { motion } from "framer-motion";
import "keen-slider/keen-slider.min.css";

const slides = [
  {
    src: "/images/cfi_image.jpg",
    alt: "Femme cadre",
    title: "Construisez votre avenir avec le CFI-CIRAS",
    subtitle: "Rejoins notre équipe dynamique et professionelle. Des opportunités uniques pour votre carrière",
  },
  {
    src: "/images/Teamwork.jpg",
    alt: "Travail d'équipe",
    title: "Rejoignez une équipe dynamique",
    subtitle: "Collaborez avec des experts du numérique,de la sécurité, des sciences et de l'administation",
  },
  {
    src: "/images/office.jpg",
    alt: "Bureau",
    title: "Un environnement moderne",
    subtitle: "Un cadre professionnel pour exceller",
  },
  {
    src: "/images/success.jpg",
    alt: "Succès",
    title: "Réussissez vos ambitions",
    subtitle: "Votre avenir commence ici avec CFI-Recrute",
  },
];

// Plugin autoplay
function Autoplay(slider: any) {
  let timeout: NodeJS.Timeout;
  let mouseOver = false;

  function clearNextTimeout() {
    clearTimeout(timeout);
  }
  function nextTimeout() {
    clearTimeout(timeout);
    if (mouseOver) return;
    timeout = setTimeout(() => slider.next(), 5000);
  }

  slider.on("created", () => {
    slider.container.addEventListener("mouseover", () => {
      mouseOver = true;
      clearNextTimeout();
    });
    slider.container.addEventListener("mouseout", () => {
      mouseOver = false;
      nextTimeout();
    });
    nextTimeout();
  });
  slider.on("dragStarted", clearNextTimeout);
  slider.on("animationEnded", nextTimeout);
  slider.on("updated", nextTimeout);
}

export default function HeroSection() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      duration: 1000,
      renderMode: "performance",
      slides: { perView: 1 },
    },
    [Autoplay]
  );

  return (
    <section className="relative bg-gray-10 pb-10 ">
      {/* Slider */}
      <div ref={sliderRef} className="keen-slider relative h-[95vh]  overflow-hidden " >
        {slides.map((slide, i) => (
          <div key={i} className="keen-slider__slide relative ">
            {/* Image background */}
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              className="object-cover"
            />

            {/* Overlay sombre */}
            <div className="absolute inset-0 bg-black/40 pb-10" />
            <div className="absolute inset-0 bg-green-700/30 pb-10" />
            


            {/* Texte animé */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute inset-0 flex flex-col justify-center items-center text-center px-6"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="mt-4 text-lg md:text-xl text-gray-100 max-w-2xl">
                {slide.subtitle}
              </p>

              {/* Barre de recherche */}
              {i === 0 && (
                <div className="lg:max-w-md md:max-w-lg mt-8 flex items-center bg-white  shadow-lg rounded-xl p-2 w-full max-w-xl ring-1 ring-black/10">
                  <input
                    type="text"
                    placeholder="Rechercher un titre de poste ou un mot-clé"
                    className="flex-grow px-4 py-2 outline-none rounded-l-xl"
                  />
                  <button className="lg:max-w-lg  md:max-w-md bg-green-700 text-white px-6 py-2 rounded-xl flex items-center gap-2 hover:bg-green-600 transition">
                    <Search size={18} />
                    Rechercher
                  </button>
                </div>
              )}
            </motion.div>
          </div>
          
        ))}
      </div>
    </section>
  );
}
