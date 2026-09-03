import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/config/site";
import "./globals.css";

// Manrope — единственный explicit шрифт проекта (Frontend.md, раздел 4.2): geometric,
// поддерживает кириллицу. cyrillic обязателен — сайт на русском языке.
const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
});

// Метаданные по умолчанию — из src/config/site.ts (единый источник констант сайта,
// Architecture.md, 2.2). Заголовок/описание конкретных страниц задаются в их
// собственных generateMetadata / export const metadata.
export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${manrope.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
