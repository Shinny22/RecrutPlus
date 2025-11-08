// ProfileCard.jsx
export default function ProfileCard() {
    return (
      <div className="bg-white rounded-2xl shadow p-6 text-center">
        <div className="w-20 h-20 bg-green-100 text-green-700 rounded-full mx-auto flex items-center justify-center text-3xl font-semibold">
          GO
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-800">
          Gloire Jérémie Nissi OYERE
        </h3>
        <p className="text-sm text-gray-500">CFI-CIRAS — 2024</p>
        <p className="text-sm text-gray-500 mt-1">BAC+3</p>
  
        <div className="mt-4 text-sm text-gray-600 space-y-1">
          <p>📧 shinnyoyere@gmail.com</p>
          <p>📞 068503126</p>
          <p>📍 Brazzaville, Congo</p>
        </div>
  
        <div className="mt-6 border-t pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Statistiques</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-green-50 p-2 rounded-md">Acceptées: 0</div>
            <div className="bg-yellow-50 p-2 rounded-md">En attente: 0</div>
          </div>
        </div>
      </div>
    );
  }
  