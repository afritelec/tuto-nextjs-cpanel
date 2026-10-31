import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mes tâches — démonstration Next.js",
  description: "Application de démonstration déployée sur un hébergement cPanel ODOIP.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
