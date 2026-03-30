import { cookies } from "next/headers";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { locales } from "@/i18n";
import {
  getSafeThemeSelection,
  getServerResolvedTheme,
  THEME_STORAGE_KEY,
} from "@/lib/theme";

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
  const initialTheme = getSafeThemeSelection(
    cookieStore.get(THEME_STORAGE_KEY)?.value
  );
  const initialResolvedTheme = getServerResolvedTheme(initialTheme);
  const themeScript = `
    try {
      const stored = localStorage.getItem('${THEME_STORAGE_KEY}') || '${initialTheme}';
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const resolved = stored === 'system' ? (prefersDark ? 'dark' : 'light') : stored;
      document.documentElement.dataset.theme = resolved;
      document.documentElement.dataset.themeSelection = stored;
      document.documentElement.style.colorScheme = resolved;
    } catch (e) {}
  `;

  return (
    <html
      lang={lang}
      data-theme={initialResolvedTheme}
      data-theme-selection={initialTheme}
      style={{ colorScheme: initialResolvedTheme }}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div id="hover-card-root" />
        <ThemeProvider initialTheme={initialTheme}>{children}</ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
