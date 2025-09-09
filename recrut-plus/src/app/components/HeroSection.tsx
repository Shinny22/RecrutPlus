// /components/HeroSection.tsx
import { Search } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-orange-50 py-16">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            We Help You Find <br />
            <span className="text-orange-600">Your Dream Job</span>
          </h1>
          <p className="text-gray-600">
            Browse thousands of job opportunities and connect with top companies.
            Start your journey to a better career today.
          </p>

          {/* SEARCH BAR */}
          <div className="flex items-center bg-white shadow-lg rounded-xl p-2 w-full max-w-lg">
            <input
              type="text"
              placeholder="Search job title or keyword"
              className="flex-grow px-4 py-2 outline-none rounded-l-xl"
            />
            <button className="bg-orange-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-orange-700">
              <Search size={18} />
              Search
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">
          <img
            src="/images/femme_cadre.jpg"
            alt="Job Search Illustration"
            className="w-full max-w-md md:max-w-lg"
          />
        </div>
      </div>
    </section>
  );
}
