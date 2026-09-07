import type { Metadata } from "next";
import Link from "next/link";
import Fuse, { type IFuseOptions } from "fuse.js";
import { ProductGrid } from "@/components/features/catalog/ProductGrid";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SearchForm } from "@/components/layout/SearchForm";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { getCategory } from "@/lib/data/categories";
import { getManufacturer } from "@/lib/data/manufacturers";
import { getProducts } from "@/lib/data/products";
import type { Product } from "@/types/product";

export const metadata: Metadata = {
  title: `Поиск — ${siteConfig.name}`,
  description:
    "Поиск по каталогу оборудования: название, модель, артикул, производитель, описание, категория.",
};

// Толерантный к опечаткам поиск по каталогу через fuse.js (утилитарная библиотека —
// Coding Rules.md). /search — решённый роут (Architecture.md, раздел 2): серверный
// компонент, данные из локального каталога тем же getProducts(), что и остальные
// страницы, без сетевого слоя.

// К каждому товару добавляем имя производителя и название категории, чтобы искать и по
// ним; ProductGrid при этом продолжает работать с обычным Product (лишние поля ему не
// мешают).
type SearchEntry = Product & { manufacturerName: string; categoryName: string };

function buildSearchEntries(): SearchEntry[] {
  return getProducts().map((product) => ({
    ...product,
    manufacturerName: product.manufacturer
      ? (getManufacturer(product.manufacturer)?.name ?? "")
      : "",
    categoryName: getCategory(product.category)?.name ?? "",
  }));
}

// threshold 0.3 — строже прежних 0.35 (ужесточено 2026-09-07, Frontend.md, раздел 8.10):
// на маленьком каталоге при 0.35 короткие запросы («КИП») вытягивали нечёткие совпадения
// по обрывкам слов в описании (погрузчик, центрифуга). minMatchCharLength 2 отсекает
// одно-символьный нечёткий шум, не мешая реальным коротким запросам (модели, «КИП»).
// ignoreLocation — совпадение важно в любом месте строки, а не только в начале. Веса
// (Frontend.md, раздел 8.4): точное попадание в название/модель весит больше всего;
// артикул и производитель — средне; описание и категория — меньше всего, чтобы запрос по
// применению («котельная», «расходомер») находил товар, но не вытеснял совпадения по
// названию/модели. Fuse суммирует вклад полей с учётом weight.
const FUSE_OPTIONS: IFuseOptions<SearchEntry> = {
  threshold: 0.3,
  ignoreLocation: true,
  minMatchCharLength: 2,
  keys: [
    { name: "title", weight: 0.5 },
    { name: "model", weight: 0.25 },
    { name: "sku", weight: 0.12 },
    { name: "manufacturerName", weight: 0.12 },
    { name: "description", weight: 0.1 },
    { name: "categoryName", weight: 0.1 },
  ],
};

// Индекс строится один раз при загрузке модуля, а не на каждый запрос: каталог —
// локальные данные, не меняющиеся во время работы процесса, пересборка Fuse на
// каждый рендер страницы была лишней работой.
const SEARCH_INDEX = new Fuse(buildSearchEntries(), FUSE_OPTIONS);

export default async function SearchPage(props: PageProps<"/search">) {
  const { q } = await props.searchParams;
  const query = (typeof q === "string" ? q : "").trim();

  const results: Product[] = query ? SEARCH_INDEX.search(query).map((result) => result.item) : [];

  return (
    <Container as="main" className="py-10">
      <Breadcrumbs items={[{ label: "Поиск" }]} />
      <h1 className="mt-4 text-4xl font-semibold text-primary md:text-5xl">Поиск по каталогу</h1>

      {/* Поле поиска на самой странице (Frontend.md, раздел 8.4) — предзаполнено текущим
          запросом, чтобы уточнять его, не возвращаясь к шапке. */}
      <SearchForm defaultValue={query} className="mt-6 max-w-xl" />

      {query === "" ? (
        <p className="mt-6 text-secondary">
          Введите название, модель, артикул, производителя или задачу — поиск идёт по всему
          каталогу.
        </p>
      ) : results.length > 0 ? (
        <>
          <p className="mt-2 text-secondary">
            По запросу «{query}» найдено: {results.length}
          </p>
          <div className="mt-8">
            <ProductGrid products={results} />
          </div>
        </>
      ) : (
        <div className="mt-6 flex flex-col items-start gap-3">
          <p className="text-secondary">
            По запросу «{query}» ничего не найдено. Попробуйте изменить формулировку.
          </p>
          {/* Нулевой результат — момент максимального намерения (Frontend.md, раздел 8.10):
              не сливаем клиента в общий каталог, а предлагаем описать задачу менеджеру.
              Тот же спокойный блок, что внизу /catalog (раздел 8.8). */}
          <div className="mt-2 w-full rounded-2xl border border-gray-200 bg-secondary p-6">
            <h2 className="text-xl font-semibold text-primary">Не нашли нужное?</h2>
            <p className="mt-2 max-w-2xl text-secondary">
              Каталог — примеры оборудования, которое мы поставляем. Опишите требуемые
              характеристики, и менеджер подберёт и привезёт подходящую позицию под заказ.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/contacts"
                className="inline-flex items-center justify-center rounded-2xl bg-brand-800 px-5 py-2.5 text-base font-semibold text-white transition-colors duration-200 ease-out hover:bg-brand-600"
              >
                Связаться с менеджером
              </Link>
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center rounded-2xl border border-brand-800 px-5 py-2.5 text-base font-semibold text-brand-800 transition-colors duration-200 ease-out hover:bg-brand-800/5"
              >
                Перейти в каталог
              </Link>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
