import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Sunset Port Festival — 22 & 23 August 2026 · Pomorie Port",
  description: "Sunset Port Festival — a boutique open-air festival on the Black Sea coast. 22 & 23 August 2026, Pomorie Port, Bulgaria.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
