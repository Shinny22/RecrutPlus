// /components/FeaturedJobs.tsx
import { MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

const jobs = [
  {
    title: "UI/UX Designer",
    company: "Creative Agency",
    location: "Paris, France",
    type: "Full-Time",
  },
  {
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Remote",
    type: "Contract",
  },
  {
    title: "Marketing Specialist",
    company: "Global Media",
    location: "Berlin, Germany",
    type: "Part-Time",
  },
  {
    title: "Project Manager",
    company: "Consulting Group",
    location: "London, UK",
    type: "Full-Time",
  },
];

export default function FeaturedJobs() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Featured Jobs
        </h2>
        <p className="text-gray-600 mb-12">
          Explore top job opportunities curated for you.
        </p>

        {/* Jobs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md border p-6 flex flex-col text-left hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {job.title}
              </h3>
              <p className="text-gray-600 mb-4">{job.company}</p>

              <div className="flex items-center text-gray-500 text-sm mb-2">
                <MapPin size={16} className="mr-2" />
                {job.location}
              </div>

              <div className="flex items-center text-gray-500 text-sm mb-4">
                <Briefcase size={16} className="mr-2" />
                {job.type}
              </div>

              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                Apply Now
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
