import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { CartPageClient } from "./CartPageClient";

// Не индексируется постоянно (не временно, как noindex каталога, SEO.md, раздел 9) —
// содержимое /cart уникально для конкретного браузера клиента (localStorage) и без
// товаров в нём не несёт общего для всех посетителей контента (Architecture.md, 2.3).
// Не добавляется в app/sitemap.ts по той же причине — тем же принципом, что и /search.
export const metadata: Metadata = {
  title: "Корзина",
  robots: { index: false },
};

// Страница сама остаётся серверным компонентом (нужен export const metadata — он
// недопустим в файле с "use client"), а вся интерактивная часть (чтение корзины,
// редактирование количества, email/копирование) вынесена в клиентский CartPageClient
// (Architecture.md, 2.3; Frontend.md, раздел 7.4).
export default function CartPage() {
  return (
    <Container as="main" className="py-10">
      <Breadcrumbs items={[{ label: "Корзина" }]} />
      <h1 className="mt-4 text-4xl font-semibold text-primary md:text-5xl">Корзина</h1>
      <CartPageClient />
    </Container>
  );
}
