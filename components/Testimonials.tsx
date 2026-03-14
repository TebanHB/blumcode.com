export default function Testimonials() {
  return (
    <section id="sobre-nosotros" className="py-16 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Lo Que Dicen Nuestros Clientes
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto">
            La satisfacción de nuestros clientes es nuestra mejor carta de presentación.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-8 rounded-2xl shadow-sm">

            <h4 className="font-semibold mb-2">
              María González
            </h4>

            <p className="text-gray-500 text-sm mb-4">
              CEO, TechStart Solutions
            </p>

            <p className="text-gray-700 italic">
              "BlumCode transformó completamente nuestro sistema de gestión. El resultado superó nuestras expectativas."
            </p>

          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm">

            <h4 className="font-semibold mb-2">
              Carlos Mendoza
            </h4>

            <p className="text-gray-500 text-sm mb-4">
              Director, Innovación Digital
            </p>

            <p className="text-gray-700 italic">
              "La aplicación móvil que desarrollaron aumentó nuestra productividad en un 40%."
            </p>

          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm">

            <h4 className="font-semibold mb-2">
              Ana Rodríguez
            </h4>

            <p className="text-gray-500 text-sm mb-4">
              Fundadora, EcoCommerce
            </p>

            <p className="text-gray-700 italic">
              "El mantenimiento y optimización de nuestro e-commerce fue impecable."
            </p>

          </div>

        </div>

      </div>

    </section>
  )
}