export default function Process() {
  return (
    <section className="py-16 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Nuestro Proceso de Trabajo
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto">
            Seguimos un proceso estructurado para garantizar el éxito de tu proyecto.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="text-center">
            <div className="w-20 h-20 bg-blum-blue text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              1
            </div>

            <h3 className="text-xl font-semibold mb-3">
              Consulta Inicial
            </h3>

            <p className="text-gray-600">
              Analizamos tus necesidades y objetivos.
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-blum-blue text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              2
            </div>

            <h3 className="text-xl font-semibold mb-3">
              Desarrollo
            </h3>

            <p className="text-gray-600">
              Construimos tu software con tecnología moderna.
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-blum-blue text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              3
            </div>

            <h3 className="text-xl font-semibold mb-3">
              Pruebas
            </h3>

            <p className="text-gray-600">
              Probamos exhaustivamente el sistema.
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-blum-blue text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              4
            </div>

            <h3 className="text-xl font-semibold mb-3">
              Entrega
            </h3>

            <p className="text-gray-600">
              Implementamos la solución y damos soporte.
            </p>
          </div>

        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center px-6 py-3 bg-blum-yellow rounded-full font-semibold">
            ✓ Proceso transparente y comunicación constante
          </div>
        </div>

      </div>

    </section>
  )
}