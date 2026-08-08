import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./globals.css";

// Manrope — единственный explicit шрифт проекта (Frontend.md, раздел 4.2): geometric,
// поддерживает кириллицу. cyrillic обязателен — сайт на русском языке.
const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
});

// Заголовок сайта здесь задан временно как строковый литерал.
// Вынос в src/config/site.ts (название, meta по умолчанию, соцсети, контакты)
// — отдельный следующий шаг по структуре из docs/project-structure.md.
export const metadata: Metadata = {
  title: "B2B-магазин промышленного оборудования",
  description:
    "Промышленное и специализированное оборудование под заказ из Китая: газоанализаторы, КИП, лабораторное оборудование, спецтехника.",
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
