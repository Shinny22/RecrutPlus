

"use client";


import NavBar from "../components/NavBar";
import HeroSection from "../components/HeroSection";

import CandidateDashboard from "../components/CandidatDash";
import ProfilCard from "../components/ProfilCard";
import ProfileForm from "../components/ProfileForm";
import SideBar from "../components/SideBar";



export default function OffresPage() {
 

 

  return (
    <>
      {/* <NavBar /> */}
       <main className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          dash candidat
         </h1>

        
          <CandidateDashboard/>
          {/* <ProfilCard/>
          <ProfileForm/> */}



                  
           
      </main>
    </>
  );
 }
