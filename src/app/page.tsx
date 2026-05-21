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
    <main className="relative">
      <Navbar />
      <CookieBanner />
      <HeroSection />

      <div className="section-band section-divider-top">
        <HowItWorks />
      </div>

      <div className="section-band-soft section-divider-top">
        <JobCategories />
      </div>

      <div className="section-band section-divider-top">
        <FeaturedJobs />
      </div>

      <div className="section-band-soft section-divider-top">
        <AboutSection />
      </div>

      <div className="section-band section-divider-top">
        <WhyChooseUs />
      </div>

      <div className="section-band-soft section-divider-top">
        <Testimonials />
      </div>

      <div className="section-band section-divider-top">
        <CallToAction />
      </div>

      <div className="section-band-soft section-divider-top">
        <ContactForm />
      </div>

      <div className="section-band section-divider-top section-divider-bottom">
        <Companies />
      </div>

      <Footer />
    </main>
  );
}
