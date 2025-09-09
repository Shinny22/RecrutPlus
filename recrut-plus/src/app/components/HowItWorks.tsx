// /components/HowItWorks.tsx
import { Search, FileText, CheckCircle } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT SIDE - Steps */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            How It Work? <br /> 
            <span className="text-orange-600">Get a Job & Quickly Faster</span>
          </h2>
          <ul className="space-y-6">
            <li className="flex items-center gap-4">
              <div className="bg-orange-100 p-4 rounded-full">
                <Search className="text-orange-600" size={28} />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Search a Job</h3>
                <p className="text-gray-600">Find the right job that matches your skills.</p>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <div className="bg-orange-100 p-4 rounded-full">
                <FileText className="text-orange-600" size={28} />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Apply For Job</h3>
                <p className="text-gray-600">Easily apply online with your resume.</p>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <div className="bg-orange-100 p-4 rounded-full">
                <CheckCircle className="text-orange-600" size={28} />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Get Hired</h3>
                <p className="text-gray-600">Start your career with top companies.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* RIGHT SIDE - Card */}
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <h3 className="text-xl font-semibold mb-6">Search Your Career</h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Job title or keyword"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
            <input
              type="text"
              placeholder="Location"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
            <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700">
              Search Job
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
