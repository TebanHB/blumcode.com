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
      className="relative overflow-hidden bg-[linear-gradient(to_bottom,#020617,#000000)] px-4 py-14 text-white sm:px-6 sm:py-16 lg:px-8 lg:py-18"
    >
      <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-blum-blue/10 blur-2xl" />
      <div className="absolute bottom-0 right-0 h-44 w-44 rounded-full bg-blum-yellow/6 blur-2xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="rounded-[24px] border border-white/10 bg-white/5 p-6 shadow-[0_14px_36px_rgba(0,0,0,0.18)] sm:rounded-[30px] sm:p-8">
          <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-10">
            <div className="text-center md:text-left">
              <div className="mx-auto flex h-10 w-[120px] items-center justify-center overflow-hidden md:mx-0 sm:h-11 sm:w-[135px]">
                <Image
                  src="/logo-blanco.svg"
                  alt="BlumCode Logo"
                  width={220}
                  height={60}
                  className="h-8 w-auto max-w-none object-contain object-left sm:h-9"
                />
              </div>

              <p className="mt-4 max-w-md leading-7 text-gray-300 md:max-w-none">
                {t.description}
              </p>
            </div>

            <div className="text-center md:text-right">
              <h4 className="mb-4 text-lg font-semibold">{t.contact}</h4>
              <p className="break-words text-gray-300">{t.email}</p>
              <p className="text-gray-300">{t.city}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-gray-400 sm:mt-10">
          © {new Date().getFullYear()} BlumCode. {t.rights}
        </div>
      </div>
    </footer>
  );
}