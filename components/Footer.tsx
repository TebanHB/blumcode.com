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
    <footer id="contacto" className="bg-black px-4 py-14 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
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

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} BlumCode. {t.rights}
        </div>
      </div>
    </footer>
  );
}