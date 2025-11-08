// ProfileForm.jsx
export default function ProfileForm() {
    return (
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Modifier mes informations
        </h2>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Prénom"
              defaultValue="Gloire Jérémie Nissi"
              className="border p-2 rounded-md w-full focus:ring focus:ring-green-200"
            />
            <input
              type="text"
              placeholder="Nom"
              defaultValue="OYERE"
              className="border p-2 rounded-md w-full focus:ring focus:ring-green-200"
            />
          </div>
  
          <input
            type="date"
            defaultValue="2003-07-06"
            className="border p-2 rounded-md w-full focus:ring focus:ring-green-200"
          />
  
          <input
            type="email"
            defaultValue="shinnyoyere@gmail.com"
            className="border p-2 rounded-md w-full focus:ring focus:ring-green-200"
          />
  
          <input
            type="text"
            placeholder="Ville"
            defaultValue="Brazzaville"
            className="border p-2 rounded-md w-full focus:ring focus:ring-green-200"
          />
  
          <input
            type="text"
            placeholder="Université / École"
            defaultValue="CFI-CIRAS"
            className="border p-2 rounded-md w-full focus:ring focus:ring-green-200"
          />
  
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Niveau"
              defaultValue="BAC+3"
              className="border p-2 rounded-md w-full focus:ring focus:ring-green-200"
            />
            <input
              type="text"
              placeholder="Promotion"
              defaultValue="2024"
              className="border p-2 rounded-md w-full focus:ring focus:ring-green-200"
            />
          </div>
  
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="border p-2 rounded-md w-full"
          />
  
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all"
          >
            Enregistrer les modifications
          </button>
        </form>
      </div>
    );
  }
  