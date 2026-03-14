export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <div className="text-2xl font-bold text-blum-blue">
            Blum
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#servicios" className="text-gray-700 hover:text-blum-blue">
              Servicios
            </a>
            <a href="#soluciones" className="text-gray-700 hover:text-blum-blue">
              Soluciones
            </a>
            <a href="#sobre-nosotros" className="text-gray-700 hover:text-blum-blue">
              Sobre Nosotros
            </a>
            <a href="#contacto" className="text-gray-700 hover:text-blum-blue">
              Contacto
            </a>
          </nav>

          <button className="bg-blum-blue text-white px-6 py-2 rounded-lg">
            Comenzar Proyecto
          </button>

        </div>
      </div>
    </header>
  )
}