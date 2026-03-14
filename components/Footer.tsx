import Image from "next/image";

export default function Footer({
  t,
}: {
  t: {
    description: string;
    contact: string;
    city: string;
    rights: string;
    email: string;
  };
}) {
  return (
    <footer
      id="contacto"
      className="relative overflow-hidden bg-[linear-gradient(to_bottom,#020617,#000000)] px-4 py-18 text-white sm:px-6 lg:px-8"
    >
      <div className="absolute left-0 top-0 h-48 w-48 rounded-full bg-blum-blue/12 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-blum-yellow/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="rounded-[30px] border border-white/10 bg-white/5 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.20)] backdrop-blur-sm">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <Image
                src="/logo-blanco.svg"
                alt="BlumCode Logo"
                width={180}
                height={60}
                className="h-10 w-auto object-contain sm:h-11"
              />
              <p className="mt-4 max-w-md leading-7 text-gray-300">
                {t.description}
              </p>
            </div>

            <div className="md:text-right">
              <h4 className="mb-4 text-lg font-semibold">{t.contact}</h4>
              <p className="text-gray-300">{t.email}</p>
              <p className="text-gray-300">{t.city}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} BlumCode. {t.rights}
        </div>
      </div>
    </footer>
  );
}