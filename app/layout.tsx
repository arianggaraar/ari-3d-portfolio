import type { Metadata } from "next";
import "./globals.css";
import { DynamicThreeBackground } from "@/components/canvas/DynamicThreeBackground";
import { PageTransition } from "@/components/layout/PageTransition";
import { ProfileProvider } from "@/components/providers/ProfileProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "Ari Anggara — 3D Interactive Portfolio",
  description: "Portfolio 3D interaktif dengan live editor dan export resume PDF, Word, Excel."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <ProfileProvider>
            <DynamicThreeBackground />
            <PageTransition>{children}</PageTransition>
          </ProfileProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
