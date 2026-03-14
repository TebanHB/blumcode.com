export default function Services() {
  return (
    <section id="servicios" className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-16">
          Nuestros Servicios
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          <div className="bg-gray-50 p-8 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">
              Desarrollo a Medida
            </h3>
            <p className="text-gray-600">
              Creamos software personalizado adaptado a tu empresa.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">
              Mantenimiento
            </h3>
            <p className="text-gray-600">
              Soporte continuo para tus sistemas.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">
              Optimización
            </h3>
            <p className="text-gray-600">
              Mejoramos rendimiento y seguridad.
            </p>
          </div>

        </div>

      </div>

    </section>
  )
}