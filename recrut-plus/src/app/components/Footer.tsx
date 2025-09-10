export default function Footer() {
    return (
      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-white mb-4">CFI-Recrute</h3>
            <p>Votre plateforme pour trouver les meilleurs talents et opportunités.</p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Liens utiles</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Offres</a></li>
              <li><a href="#" className="hover:text-white">Candidats</a></li>
              <li><a href="#" className="hover:text-white">Recruteurs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Contact</h3>
            <p>Email : contact@CFI-Recrute.com</p>
            <p>Téléphone : +242 06 000 0000</p>
          </div>
        </div>
        <div className="text-center text-gray-500 mt-10">
          © 2025 CFI-Recrute - Tous droits réservés
        </div>
      </footer>
    );
  }
  