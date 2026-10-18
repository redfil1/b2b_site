import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RecentlyViewedProducts } from "@/components/features/home/RecentlyViewedProducts";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { getCategories } from "@/lib/data/categories";

// Временный noindex каталога снят 2026-10-18 — каталог наполнен реальными данными
// поставщика (docs/seo.md, раздел 9).
export const metadata: Metadata = {
  title: "Каталог — B2B-магазин контрольно-измерительного оборудования",
  description:
    "Осциллографы, анализаторы спектра и цепей, генераторы сигналов и другое контрольно-измерительное оборудование под заказ.",
};

export default function CatalogPage() {
  const categories = getCategories();

  return (
    <Container as="main" className="py-10">
      <Breadcrumbs items={[{ label: "Каталог" }]} />
      <h1 className="mt-4 text-4xl font-semibold text-primary md:text-5xl">Каталог</h1>

      {/* Плитки категорий — по образцу «Shop by category»: квадратное фото сверху,
          название и описание снизу. Не через ui/Card, т.к. фото идёт в край плитки (без
          внутренних отступов Card). */}
      <div className="mt-8 grid grid-cols-2 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/catalog/${category.slug}`}
            className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-transform duration-200 ease-out motion-safe:hover:scale-[1.02]"
          >
            {/* Фото категории (Category.image — фото одного из её товаров, Frontend.md, раздел 9)
                вместо прежней временной line-иконки. object-contain + p-4 — фото поставщика
                разных пропорций вписываются без обрезки. aspect-[4/3] на мобильном (2 колонки),
                с sm: — квадрат. alt = Category.name (SEO.md, раздел 6). */}
            <div
              className={`relative aspect-[4/3] w-full border-b border-gray-100 sm:aspect-square ${
                category.image ? "bg-white" : "bg-secondary"
              }`}
            >
              {category.image && (
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-contain p-4"
                />
              )}
            </div>
            <div className="flex flex-1 flex-col gap-3 p-6">
              {/* text-lg на мобильной ширине (2 колонки) — чтобы длинные однословные
                  названия («Прецизионные») не переносились посередине слова;
                  с sm: возвращается прежний размер. Даже так самые длинные слова не
                  всегда влезают в одну строку на самой узкой ширине (~150px минус
                  p-6) — без переноса они вылезали за рамки h2 и обрезались внешним
                  overflow-hidden плитки (нужен для скругления угла фото).
                  hyphens-auto — перенос по слогам через дефис (словарь берётся из
                  lang="ru" на <html>, layout.tsx), не произвольный разрыв символов;
                  break-words — подстраховка на случай браузера без словаря переноса
                  для русского, чтобы слово в крайнем случае перенеслось, а не
                  обрезалось молча. */}
              <h2 className="text-base font-semibold text-primary break-words hyphens-auto sm:text-2xl">
                {category.name}
              </h2>
              {/* line-clamp — чтобы описание не растягивало высоту узкой мобильной
                  плитки (2 колонки); с sm: плитка шире и описание обычно влезает целиком. */}
              {category.description && (
                <p className="text-secondary line-clamp-2 sm:line-clamp-none">
                  {category.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Блок «Вы недавно смотрели» (Frontend.md, разделы 8.7, 8.10) — над блоком
          «не нашли модель», а не в самом низу страницы. Не рендерится при пустом
          списке localStorage. */}
      <RecentlyViewedProducts />

      {/* Каталог — витрина-пример возможностей, не полный прайс: реальный ассортимент
          шире того, что заведено в локальных данных (Frontend.md, раздел 8.8;
          Architecture.md, раздел 2). Спокойный информационный блок; единственный
          призыв к действию вне карточки товара — ссылка на /contacts (CLAUDE.md). */}
      <div className="mt-12 rounded-2xl border border-gray-200 bg-secondary p-6">
        <h2 className="text-xl font-semibold text-primary">Не нашли нужную модель?</h2>
        <p className="mt-2 max-w-2xl text-secondary">
          В каталоге — примеры оборудования, которое мы поставляем. Опишите требуемые
          характеристики, и менеджер подберёт и привезёт подходящую позицию под заказ.
        </p>
        <Link
          href="/contacts"
          className="mt-4 inline-flex items-center justify-center rounded-2xl bg-brand-800 px-5 py-2.5 text-base font-semibold text-white transition-colors duration-200 ease-out hover:bg-brand-600"
        >
          Связаться с менеджером
        </Link>
      </div>
    </Container>
  );
}
