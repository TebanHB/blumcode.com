import { cookies } from "next/headers";

import { ThemeProvider } from "@/components/ThemeProvider";
import { locales } from "@/i18n";

const STORAGE_KEY = "blumcode-theme";

function getSafeTheme(value: string | undefined) {
  return value === "light" || value === "dark" ? value : "dark";
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const cookieStore = await cookies();
  const initialTheme = getSafeTheme(cookieStore.get(STORAGE_KEY)?.value);

  return (
    <html
      lang={lang}
      data-theme={initialTheme}
      style={{ colorScheme: initialTheme }}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider initialTheme={initialTheme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
