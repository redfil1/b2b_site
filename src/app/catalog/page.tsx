import type { Metadata } from "next";
import Link from "next/link";
import { CategoryIcon } from "@/components/features/catalog/CategoryIcon";
import { RecentlyViewedProducts } from "@/components/features/home/RecentlyViewedProducts";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { getCategories } from "@/lib/data/categories";

// ВРЕМЕННО (аудит 2026-09-05, см. docs/seo.md): каталог сейчас наполнен тестовыми
// данными, а не реальными товарами от поставщика — индексировать эти страницы
// поисковиками не нужно. noindex ставится на весь /catalog/* (эту страницу и оба
// динамических роута ниже). Снять, когда каталог наполнится реальными данными.
export const metadata: Metadata = {
  title: "Каталог — B2B-магазин промышленного оборудования",
  description: "Категории промышленного и специализированного оборудования под заказ.",
  robots: { index: false },
};

export default function CatalogPage() {
  const categories = getCategories();

  return (
    <Container as="main" className="py-10">
      <Breadcrumbs items={[{ label: "Каталог" }]} />
      <h1 className="mt-4 text-4xl font-semibold text-primary md:text-5xl">Каталог</h1>

      {/* Плитки категорий — по образцу «Shop by category»: квадратная подложка с иконкой
          сверху, название и описание снизу. Не через ui/Card, т.к. подложка идёт в край
          плитки (без внутренних отступов Card). Иконка — временная схематичная замена
          фото категории на время, пока каталог не наполнен реальными данными (см.
          Category.image в Architecture.md, 1.1, и Frontend.md, раздел 4.3.1); название
          категории уже есть текстом ниже, поэтому иконка декоративна (aria-hidden). */}
      <div className="mt-8 grid grid-cols-2 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/catalog/${category.slug}`}
            className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-transform duration-200 ease-out motion-safe:hover:scale-[1.02]"
          >
            {/* aspect-[4/3] на мобильном (было square на всех ширинах) — чтобы все
                четыре плитки категорий комфортно ложились в первый экран телефона
                (оценка innovator); с sm: — прежний квадрат. */}
            <div className="flex aspect-[4/3] w-full items-center justify-center bg-secondary sm:aspect-square">
              {/* На мобильной ширине плитка вдвое уже (2 колонки вместо 1), поэтому
                  иконка внутри пропорционально меньше; с sm: — прежний размер. */}
              <CategoryIcon
                slug={category.slug}
                aria-hidden="true"
                className="h-14 w-14 sm:h-24 sm:w-24"
              />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-6">
              {/* text-lg на мобильной ширине (2 колонки) — чтобы длинные однословные
                  названия («Газоанализаторы») не переносились посередине слова;
                  с sm: возвращается прежний размер. Даже так самые длинные слова не
                  всегда влезают в одну строку на самой узкой ширине (~150px минус
                  p-6) — без переноса они вылезали за рамки h2 и обрезались внешним
                  overflow-hidden плитки (нужен для скругления угла иконки).
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

      {/* Блок «Вы недавно смотрели» (Frontend.md, раздел 8.7) — не рендерится при пустом
          списке localStorage. */}
      <RecentlyViewedProducts />
    </Container>
  );
}
