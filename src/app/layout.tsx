import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import MotionProvider from "@/components/providers/MotionProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mauricio Morell | Ecommerce & Web a Medida",
  description:
    "Portfolio de desarrollo web y ecommerce. Sitios a medida, tiendas online y sistemas de turnos con foco en conversión.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-theme="light"
      className={`${spaceGrotesk.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
