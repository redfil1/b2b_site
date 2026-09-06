import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CartProvider } from "@/components/layout/CartProvider";
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
//
// metadataBase (SEO.md, раздел 2) делает абсолютными все относительные URL в
// метаданных ниже по дереву: OG-картинку из app/opengraph-image.tsx и
// alternates.canonical на страницах каталога. Значение — из config/site.ts.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${manrope.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        {/* CartProvider оборачивает Header (счётчик в шапке, раздел 7.1) и все страницы
            (кнопки "Добавить в корзину", /cart) — единый источник состояния корзины
            (Architecture.md, 2.3; Project_Structure.md, "Корзина — React Context"). */}
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
        {/* Vercel Analytics/Speed Insights — без cookies и без сбора персональных
            данных (агрегированные метрики страниц/производительности), решено в
            диалоге с пользователем, 2026-09-06 — совместимость с ограничением
            152-ФЗ обоснована в docs/tech-stack.md. Внизу body, а не внутри
            CartProvider — не относится к состоянию корзины. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
