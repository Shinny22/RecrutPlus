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
import ContactForm from "./components/ContactForm";
import CookieBanner from "./components/CookieBanner";



export default function Home() {
  return (
    <main>
      <Navbar/>
      <CookieBanner />
      <HeroSection />
      <HowItWorks />
      <JobCategories />
      <FeaturedJobs />
      <AboutSection />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
      <ContactForm/>
      <Companies />
      <Footer />

    </main>
  );
}
