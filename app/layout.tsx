import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BlumCode - Desarrollo de Software a Medida | Soluciones Tecnológicas Personalizadas",
  description:
    "BlumCode ofrece desarrollo de software a medida, mantenimiento, optimización, desarrollo móvil y web, e integración entre sistemas. Soluciones tecnológicas modernas y personalizadas.",
  alternates: {
    canonical: "https://blumcode.com",
  },
  openGraph: {
    title: "BlumCode - Desarrollo de Software a Medida | Soluciones Tecnológicas Personalizadas",
    description:
      "BlumCode ofrece desarrollo de software a medida, mantenimiento, optimización, desarrollo móvil y web, e integración entre sistemas.",
    url: "https://blumcode.com",
    siteName: "BlumCode",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlumCode - Desarrollo de Software a Medida",
    description:
      "Soluciones tecnológicas personalizadas: desarrollo, mantenimiento, optimización e integración de software.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}