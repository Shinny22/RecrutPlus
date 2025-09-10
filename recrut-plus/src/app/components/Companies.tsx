export default function Companies() {
    const logos = [
      "./images/logo_cfi_white.png",
      "./images/logo_cfi_white.png",
      "./images/logo_cfi_white.png",
      "./images/logo_cfi_white.png",
    ];
  
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-8">Ils nous font confiance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {logos.map((logo, i) => (
              <img key={i} src={logo} alt="Company logo" className="h-24 mx-auto bg-green-300 p-4 rounded-xl opacity-70 hover:opacity-100 transition" />
            ))}
          </div>
        </div>
      </section>
    );
  }
  