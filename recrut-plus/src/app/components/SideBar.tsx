"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const menu = [
    { name: "Tableau de bord", path: "/dashboard" },
    { name: "Mon CV", path: "/dashboard/mon-cv" },
    { name: "Offres de stage", path: "/dashboard/offres" },
    { name: "Mes candidatures", path: "/dashboard/candidatures" },
  ];

  return (
    <aside className="w-64 bg-white shadow-md p-6 h-screen flex flex-col justify-between fixed">
      <div>
        <h1 className="text-2xl font-bold text-green-600 mb-8">CFI-Recrute</h1>
        <nav className="space-y-2">
          {menu.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`block py-2 px-3 rounded-md text-sm font-medium ${
                pathname === item.path
                  ? "bg-green-100 text-green-700 border-l-4 border-green-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <p className="text-xs text-gray-400 text-center mt-6">© 2025 CFI-Recrute</p>
    </aside>
  );
}
