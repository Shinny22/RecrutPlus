"use client";

import Image from "next/image";

type ProfileUser = {
  photo?: string;
  nom_cand?: string;
  pren_cand?: string;
  email?: string;
  telephone1?: string;
  lieu_nais?: string;
  dat_nais?: string;
  date_nais?: string;
  diplome?: {
    designation?: string;
  } | string | null;
};

type ProfileCardProps = {
  user?: ProfileUser | null;
};

export default function ProfileCard({ user }: ProfileCardProps) {
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
        <p>
          🎓{" "}
          {typeof user?.diplome === "string"
            ? user.diplome
            : user?.diplome?.designation}
        </p>
        <p>📍 {user?.lieu_nais}</p>
        <p>🗓️ {user?.dat_nais ?? user?.date_nais}</p>
      </div>
    </div>
  );
}
