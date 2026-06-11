import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgroNodo",
  description: "Inteligencia agricola para productores rurales de Boyaca.",
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
