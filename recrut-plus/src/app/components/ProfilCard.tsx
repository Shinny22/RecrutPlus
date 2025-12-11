"use client";

import Image from "next/image";

export default function ProfileCard({ user }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 text-center">
      <Image
        src={user?.photo || "/images/default_user.png"}
        alt="avatar"
        width={80}
        height={80}
        className="w-20 h-20 rounded-full object-cover mx-auto"
      />

      <h3 className="mt-4 text-lg font-semibold text-gray-800">
        {user?.nom_cand} {user?.pren_cand}
      </h3>

      <p className="text-sm text-gray-500">{user?.email}</p>
      <p className="text-sm text-gray-500">{user?.telephone1}</p>

      <div className="mt-4 text-sm text-gray-600 space-y-1">
        <p>🎓 {user?.diplome?.designation}</p>
        <p>📍 {user?.lieu_nais}</p>
        <p>🗓️ {user?.date_nais}</p>
      </div>
    </div>
  );
}
