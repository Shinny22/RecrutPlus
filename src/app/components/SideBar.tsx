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
    <aside className="surface-card fixed flex h-screen w-64 flex-col justify-between p-6">
      <div>
        <h1 className="mb-8 text-xl font-semibold text-emerald-800">CFI-Recrute</h1>
        <nav className="space-y-1">
          {menu.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`sidebar-nav-item ${
                pathname === item.path ? "sidebar-nav-item-active" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <p className="text-center text-xs text-slate-400">
        © {new Date().getFullYear()} CFI-Recrute
      </p>
    </aside>
  );
}
