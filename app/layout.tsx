import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const metadata: Metadata = {
  title: "Sunset Port Festival — 22 & 23 August 2026 · Pomorie Port",
  description: "Sunset Port Festival — a boutique open-air festival on the Black Sea coast. 22 & 23 August 2026, Pomorie Port, Bulgaria.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Preload fonts */}
        <link rel="preload" href="/fonts/Montserrat-Bold.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Montserrat-VariableFont_wght.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        {/* Preload hero assets */}
        <link rel="preload" href="/assets/hero-poster.jpg" as="image" />
        <link rel="preload" href="/assets/hero-scrub-hq.mp4" as="video" type="video/mp4" />
        {/* Preload logo */}
        <link rel="preload" href="/assets/logo-icon.webp" as="image" />
        {/* Preload sun */}
        <link rel="preload" href="/assets/sun.png" as="image" />
      </head>
      <body>
        <LanguageProvider>
          <SmoothScroll />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
