export default function Footer() {
  return (
    <footer id="contacto" className="bg-black px-4 py-14 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-2xl font-bold text-blum-blue">BlumCode</h3>
            <p className="max-w-md leading-7 text-gray-300">
              Soluciones tecnológicas modernas y personalizadas para empresas que quieren crecer.
            </p>
          </div>

          <div className="md:text-right">
            <h4 className="mb-4 text-lg font-semibold">Contacto</h4>
            <p className="text-gray-300">sales@blumcode.com</p>
            <p className="text-gray-300">Santa Cruz, Bolivia</p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-gray-400">
          © {new Date().getFullYear()} BlumCode. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}