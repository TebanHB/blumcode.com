import type { Metadata, Viewport } from "next";

import { ORGANIZATION_LOGO_HEIGHT, ORGANIZATION_LOGO_PATH, ORGANIZATION_LOGO_WIDTH, SITE_NAME, SITE_URL } from "@/lib/seo";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      {
        url: ORGANIZATION_LOGO_PATH,
        sizes: `${ORGANIZATION_LOGO_WIDTH}x${ORGANIZATION_LOGO_HEIGHT}`,
        type: "image/png",
      },
      { url: "/blumcode-icon-fixed.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      {
        url: ORGANIZATION_LOGO_PATH,
        sizes: `${ORGANIZATION_LOGO_WIDTH}x${ORGANIZATION_LOGO_HEIGHT}`,
        type: "image/png",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

const themeScript = `
  try {
    const stored = localStorage.getItem('blumcode-theme') || 'dark';
    document.documentElement.dataset.theme = stored;
    document.documentElement.style.colorScheme = stored;
  } catch (e) {}
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      {children}
    </>
  );
}
