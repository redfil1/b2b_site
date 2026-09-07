import Link from "next/link";
import { CategoryIcon } from "@/components/features/catalog/CategoryIcon";
import { HeroSlider } from "@/components/features/home/HeroSlider";
import { ManufacturerLogos } from "@/components/features/home/ManufacturerLogos";
import { RecentlyViewedProducts } from "@/components/features/home/RecentlyViewedProducts";
import { Container } from "@/components/ui/Container";
import { getCategories } from "@/lib/data/categories";

export default function Home() {
  const categories = getCategories();

  return (
    <Container as="main" className="py-10">
      {/* Слайдер главной — Frontend.md, раздел 4.3.4 (тестовые слайды-заглушки). */}
      <HeroSlider />

      {/* Hero — заголовок и краткое УТП. Факты — из CLAUDE.md (описание проекта),
          без маркетинговых обещаний, которых нет в доках. Заголовок сокращён 2026-09-07
          (Frontend.md, раздел 8.10): прежний «B2B-магазин промышленного оборудования»
          на мобильном занимал три строки и дословно повторял первый слайд слайдера. */}
      <section className="flex flex-col items-start gap-4 py-6 md:py-10">
        <h1 className="max-w-3xl text-4xl font-semibold text-primary md:text-5xl">
          Промышленное оборудование под заказ
        </h1>
        <p className="max-w-2xl text-secondary md:text-lg">
          Поставляем газоанализаторы, КИП, лабораторное оборудование и спецтехнику под заказ из
          Китая. Склада в РФ нет — каждая позиция поставляется под заказ.
        </p>
        {/* Действие в теле главной (Frontend.md, раздел 8.10) — раньше на первом экране
            не было ни одной кнопки, кроме шапки. «Каталог» — внутренняя навигация;
            «Связаться с менеджером» → /contacts, единственный внешний CTA по правилам
            проекта (CLAUDE.md). */}
        <div className="mt-2 flex flex-wrap gap-3">
          <Link
            href="/catalog"
            className="inline-flex items-center justify-center rounded-2xl bg-brand-800 px-5 py-2.5 text-base font-semibold text-white transition-colors duration-200 ease-out hover:bg-brand-600"
          >
            Перейти в каталог
          </Link>
          <Link
            href="/contacts"
            className="inline-flex items-center justify-center rounded-2xl border border-brand-800 px-5 py-2.5 text-base font-semibold text-brand-800 transition-colors duration-200 ease-out hover:bg-brand-800/5"
          >
            Связаться с менеджером
          </Link>
        </div>
      </section>

      {/* Блок «Вы недавно смотрели» (Frontend.md, разделы 8.7, 8.10) — поднят выше
          категорий: на мобильном внизу длинной страницы вернувшийся клиент его не
          долистывал. По данным localStorage, не рендерится при пустом списке. */}
      <RecentlyViewedProducts />

      {/* Блок «Производители» — Frontend.md, раздел 4.3.4 (не отдельный роут). */}
      <section className="mt-6">
        <ManufacturerLogos />
      </section>

      {/* Обзор категорий каталога — Architecture.md, раздел "Структура страниц":
          категория обязательна у товара, здесь — вход в каталог по категориям.
          Плитка (иконка + текст) — та же вёрстка, что на /catalog (Frontend.md,
          раздел 4.3.1), поэтому не через ui/Card: подложка идёт в край плитки. Иконка —
          временная схематичная замена фото категории, декоративна (aria-hidden), т.к.
          название уже есть текстом ниже. */}
      <section className="mt-6 flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-primary md:text-3xl">Категории каталога</h2>
        <div className="grid grid-cols-2 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                    p-6) — без переноса они вылезали за рамки h3 и обрезались внешним
                    overflow-hidden плитки (нужен для скругления угла иконки).
                    hyphens-auto — перенос по слогам через дефис (словарь берётся из
                    lang="ru" на <html>, layout.tsx), не произвольный разрыв символов;
                    break-words — подстраховка на случай браузера без словаря переноса
                    для русского, чтобы слово в крайнем случае перенеслось, а не
                    обрезалось молча. */}
                <h3 className="text-base font-semibold text-primary break-words hyphens-auto sm:text-xl">
                  {category.name}
                </h3>
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
      </section>
    </Container>
  );
}
