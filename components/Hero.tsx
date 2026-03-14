export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-20 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

        <div className="text-center lg:text-left">

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Desarrollo de Software
            <span className="text-blum-blue"> a Medida</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            En BlumCode transformamos tus ideas en soluciones tecnológicas innovadoras.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">

            <button className="bg-blum-blue text-white px-8 py-4 rounded-lg font-semibold text-lg">
              Solicitar Cotización
            </button>

            <button className="border-2 border-blum-blue text-blum-blue px-8 py-4 rounded-lg font-semibold text-lg">
              Ver Nuestros Proyectos
            </button>

          </div>

        </div>

        <img
          src="https://cdn.ailandingpage.ai/ai-landingpage/user-generate/1046af44-b971-4d82-929b-afe21f1ece96/1046af44-b971-4d82-929b-afe21f1ece96/hero/hero-main-291336271c124133b163823b16698d6b.png"
          className="rounded-2xl"
        />

      </div>

    </section>
  )
}