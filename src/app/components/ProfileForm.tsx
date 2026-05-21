"use client";

type ProfileUser = {
  nom_cand?: string;
  pren_cand?: string;
  email?: string;
  telephone1?: string;
  lieu_nais?: string;
  dat_nais?: string;
  date_nais?: string;
};

type ProfileFormProps = {
  user?: ProfileUser | null;
};

export default function ProfileForm({ user }: ProfileFormProps) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Modifier mes informations
      </h2>

      <form className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input className="input" defaultValue={user?.nom_cand} placeholder="Nom" />
          <input className="input" defaultValue={user?.pren_cand} placeholder="Prénoms" />
        </div>

        <input className="input" type="email" defaultValue={user?.email} />
        <input className="input" defaultValue={user?.telephone1} />

        <input className="input" defaultValue={user?.lieu_nais} placeholder="Ville" />

        <input
          className="input"
          type="date"
          defaultValue={user?.dat_nais ?? user?.date_nais}
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all">
          Enregistrer
        </button>
      </form>
    </div>
  );
}
